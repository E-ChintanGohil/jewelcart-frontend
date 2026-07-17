#!/usr/bin/env python3
"""
Frontend deployment — uploads dist/ to cPanel via UAPI (HTTPS, port 2083).

Why UAPI instead of FTPS: this server's Pure-FTPd advertises TLS but rejects
AUTH TLS with 504 (broken cert/config). UAPI works on the same credentials.

Usage:
  npm run deploy            # builds + uploads
  npm run deploy:upload     # uploads existing dist/

Reads credentials from .env.deploy (gitignored).
Preserves .htaccess and .well-known/ on the server (SSL cert verification).
"""

import os
import ssl
import sys
import time
import json
import urllib.parse
import urllib.request
from pathlib import Path

# ─── Load .env.deploy ─────────────────────────────────────────────────────────
def load_env(path: Path) -> dict:
    if not path.exists():
        sys.exit(f"❌ {path} not found. Copy .env.deploy.example to .env.deploy and fill in credentials.")
    env = {}
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "=" not in line:
            continue
        k, v = line.split("=", 1)
        env[k.strip()] = v.strip().strip('"').strip("'")
    return env

ROOT = Path(__file__).resolve().parent.parent
env = load_env(ROOT / ".env.deploy")

CP_HOST = env.get("FTP_HOST")  # reuse FTP_HOST as cPanel host
CP_USER = env.get("FTP_USER")
CP_PASS = env.get("FTP_PASS")
CP_PORT = int(env.get("CP_PORT", "2083"))
# PROD: apex jewelcart.shop docroot is /public_html, which ALSO contains the other
# domains as subfolders — so we NEVER clean-all here. We only delete the known
# coming-soon page files that our build replaces; everything else is left untouched.
REMOTE_DIR = "/public_html"
LOCAL_DIST = ROOT / env.get("LOCAL_DIST", "dist")

# Only these get removed before upload (the old coming-soon page). Everything else
# (jewelcart.store/, jeweltime.in/, staging*/, cgi-bin/, Archive.zip, etc.) is preserved.
DELETE_ONLY = {"index.html", "assets", "favicon.ico", "logo.png", "og-image.jpg", "placeholder.svg", "robots.txt"}
PRESERVE = set()  # unused in prod mode

if not all([CP_HOST, CP_USER, CP_PASS]):
    sys.exit("❌ Missing FTP_HOST/FTP_USER/FTP_PASS in .env.deploy")
if not LOCAL_DIST.exists():
    sys.exit(f"❌ {LOCAL_DIST} not found. Run `npm run build` first.")

# ─── HTTP helpers (Basic auth, ignore self-signed cert) ───────────────────────
ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

import base64
AUTH_HEADER = "Basic " + base64.b64encode(f"{CP_USER}:{CP_PASS}".encode()).decode()
BASE_URL = f"https://{CP_HOST}:{CP_PORT}"

def uapi(module: str, function: str, params: dict = None, method: str = "GET", data: bytes = None, content_type: str = None):
    """Call cPanel UAPI. Returns parsed JSON."""
    url = f"{BASE_URL}/execute/{module}/{function}"
    if params and method == "GET":
        url += "?" + urllib.parse.urlencode(params)
    headers = {"Authorization": AUTH_HEADER}
    if content_type:
        headers["Content-Type"] = content_type
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=60) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            try:
                return json.loads(body)
            except json.JSONDecodeError:
                return {"_raw": body}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        try:
            return json.loads(body)
        except Exception:
            return {"_error": str(e), "_raw": body}

def list_remote(directory: str):
    """List files in a remote directory."""
    result = uapi("Fileman", "list_files", {"dir": directory})
    if result.get("status") != 1:
        return None
    return result.get("data", [])

def delete_remote(directory: str, file: str):
    """Delete a file/dir on the remote (recursive for dirs)."""
    # UAPI Fileman/trash takes JSON-encoded array of full paths
    result = uapi("Fileman", "trash", {
        "files": json.dumps([f"{directory.rstrip('/')}/{file}"]),
    }, method="POST")
    if result.get("status") == 1:
        return True, result
    # Fallback: try remove_files
    result = uapi("Fileman", "remove_files", {
        "dirs": directory,
        "files": file,
    }, method="POST")
    return result.get("status") == 1, result

def upload_file(remote_dir: str, local_path: Path):
    """Upload a single file to remote_dir using UAPI Fileman/upload_files (multipart, overwrite=1)."""
    boundary = "----CPUploadBoundary" + str(int(time.time() * 1000))
    body_parts = []
    # dir field
    body_parts.append(f"--{boundary}\r\n".encode())
    body_parts.append(b'Content-Disposition: form-data; name="dir"\r\n\r\n')
    body_parts.append(remote_dir.encode() + b"\r\n")
    # overwrite=1
    body_parts.append(f"--{boundary}\r\n".encode())
    body_parts.append(b'Content-Disposition: form-data; name="overwrite"\r\n\r\n')
    body_parts.append(b"1\r\n")
    # file field
    body_parts.append(f"--{boundary}\r\n".encode())
    body_parts.append(
        f'Content-Disposition: form-data; name="file"; filename="{local_path.name}"\r\n'.encode()
    )
    body_parts.append(b"Content-Type: application/octet-stream\r\n\r\n")
    body_parts.append(local_path.read_bytes())
    body_parts.append(f"\r\n--{boundary}--\r\n".encode())
    data = b"".join(body_parts)

    req = urllib.request.Request(
        f"{BASE_URL}/execute/Fileman/upload_files",
        data=data,
        method="POST",
        headers={
            "Authorization": AUTH_HEADER,
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
    )
    try:
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=300) as resp:
            return json.loads(resp.read().decode("utf-8", errors="replace"))
    except Exception as e:
        return {"_error": str(e)}

def mkdir_remote(directory: str, name: str):
    """Create a directory on remote (idempotent)."""
    result = uapi("Fileman", "mkdir", {
        "path": directory,
        "name": name,
    }, method="POST")
    return result

# ─── Step 1: Verify connection ────────────────────────────────────────────────
print(f"→ Connecting to {CP_HOST}:{CP_PORT} (cPanel UAPI)…")
test = uapi("Fileman", "list_files", {"dir": REMOTE_DIR})
if not test or test.get("status") != 1:
    sys.exit(f"❌ Connection failed: {test}")
print(f"  authenticated. {len(test.get('data', []))} entries in target dir.")

# ─── Step 2: Wipe target dir (preserving SSL/htaccess) ────────────────────────
print(f"\n→ Removing ONLY old coming-soon files in {REMOTE_DIR} ({', '.join(sorted(DELETE_ONLY))})…")
existing = list_remote(REMOTE_DIR)
if existing is None:
    sys.exit(f"❌ Couldn't list {REMOTE_DIR}")

# Safety: only ever delete names in DELETE_ONLY. Never touch the other-domain folders.
removed = 0
for entry in existing:
    name = entry.get("file")
    if not name or name not in DELETE_ONLY:
        continue
    ok, _ = delete_remote(REMOTE_DIR, name)
    if ok:
        removed += 1
        print(f"  removed {name}")
    else:
        print(f"  ⚠ couldn't remove {name}")
print(f"  removed {removed} entries (everything else preserved)")

# ─── Step 3: Upload dist recursively ──────────────────────────────────────────
print(f"\n→ Uploading {LOCAL_DIST}/ → {REMOTE_DIR}/")
start = time.time()

def upload_dir(local: Path, remote: str):
    # Ensure remote dir exists (skip for the root REMOTE_DIR which already exists)
    file_count = 0
    for entry in sorted(local.iterdir()):
        if entry.is_dir():
            mkdir_remote(remote, entry.name)
            file_count += upload_dir(entry, f"{remote}/{entry.name}")
        else:
            sys.stdout.write(f"\r  uploading {entry.name}{' ' * 30}")
            sys.stdout.flush()
            res = upload_file(remote, entry)
            if not res or res.get("status") != 1:
                print(f"\n  ⚠ upload failed for {entry.name}: {res}")
            else:
                file_count += 1
    return file_count

count = upload_dir(LOCAL_DIST, REMOTE_DIR)
elapsed = time.time() - start
print(f"\n  uploaded {count} files in {elapsed:.1f}s")

# ─── Step 4: Verify ───────────────────────────────────────────────────────────
print(f"\n→ Verifying…")
final = list_remote(REMOTE_DIR) or []
print(f"  {len(final)} entries in {REMOTE_DIR}")
for entry in sorted(final, key=lambda e: e.get("file", "")):
    name = entry.get("file", "?")
    is_dir = entry.get("type") == "dir"
    print(f"    {name}{'/' if is_dir else ''}")

print(f"\n✓ Deployed to https://staging.jewelcart.shop")
