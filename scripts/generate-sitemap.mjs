// Generates public/sitemap.xml from the live catalogue (products + categories)
// plus the fixed public pages, so Google gets a real list of URLs to crawl.
//
// Run standalone:  node scripts/generate-sitemap.mjs
// Runs automatically as part of `npm run build:prod` (see package.json).
//
// Resilient by design: if the API is unreachable it warns and keeps the
// existing sitemap.xml instead of failing the build or writing an empty one.
// The generated file is committed to the repo so a deploy always has a valid
// sitemap even when this script is skipped.

import { writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'public', 'sitemap.xml');

// Public site origin (no trailing slash). The live store is served on www.
const SITE_URL = (process.env.SITE_URL || 'https://www.jewelcart.shop').replace(/\/$/, '');
const API_BASE = (process.env.SITEMAP_API_BASE || 'https://api.jewelcart.shop/api').replace(/\/$/, '');

// Fixed, indexable pages. Auth/cart/checkout/profile/admin are intentionally left
// out — they are private or duplicate and should not be in search results.
const STATIC_PAGES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/shop', changefreq: 'daily', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.5' },
  { path: '/contact', changefreq: 'monthly', priority: '0.5' },
  { path: '/faq', changefreq: 'monthly', priority: '0.4' },
  { path: '/size-guide', changefreq: 'yearly', priority: '0.3' },
  { path: '/jewelry-care', changefreq: 'yearly', priority: '0.3' },
  { path: '/certifications', changefreq: 'yearly', priority: '0.3' },
  { path: '/shipping-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/refund-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/cancellation-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms-conditions', changefreq: 'yearly', priority: '0.3' },
  { path: '/payment-security', changefreq: 'yearly', priority: '0.3' },
];

// Mirror of src/lib/slug.ts — product URLs are name-slug + id.
const slugify = (text) =>
  String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

const productPath = (id, name) => {
  const slug = name ? slugify(name) : '';
  return slug ? `/product/${slug}-${id}` : `/product/${id}`;
};

const xmlEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const todayISO = () => new Date().toISOString().slice(0, 10);

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function getProducts() {
  const data = await fetchJson(`${API_BASE}/products?limit=1000`);
  const list = Array.isArray(data) ? data : data.products || [];
  return list
    .filter((p) => p && p.id != null)
    .map((p) => ({
      id: p.id,
      name: p.name || '',
      lastmod: (p.updated_at || p.updatedAt || '').slice(0, 10) || todayISO(),
    }));
}

function urlEntry({ path, lastmod, changefreq, priority }) {
  const lines = [
    '  <url>',
    `    <loc>${xmlEscape(SITE_URL + path)}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : '',
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : '',
    priority ? `    <priority>${priority}</priority>` : '',
    '  </url>',
  ];
  return lines.filter(Boolean).join('\n');
}

async function main() {
  let products = [];
  try {
    products = await getProducts();
    console.log(`  fetched ${products.length} products from ${API_BASE}`);
  } catch (err) {
    console.warn(`  ⚠ could not fetch products: ${err.message}`);
    if (existsSync(OUT)) {
      console.warn('  ⚠ keeping the existing public/sitemap.xml unchanged.');
      return;
    }
    console.warn('  ⚠ no existing sitemap — writing one with static pages only.');
  }

  const today = todayISO();
  const entries = [
    ...STATIC_PAGES.map((p) => urlEntry({ ...p, lastmod: today })),
    ...products.map((p) =>
      urlEntry({ path: productPath(p.id, p.name), lastmod: p.lastmod, changefreq: 'weekly', priority: '0.8' })
    ),
  ];

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.join('\n') +
    '\n</urlset>\n';

  writeFileSync(OUT, xml, 'utf8');
  console.log(`  wrote ${entries.length} URLs → public/sitemap.xml`);
}

main().catch((err) => {
  // Never fail the build over the sitemap.
  console.warn(`  ⚠ sitemap generation error: ${err.message}`);
  process.exit(0);
});
