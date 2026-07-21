// Product URLs use a "name-slug + id" shape for SEO, e.g.
//   /product/multicolor-tribal-necklace-31
// The trailing id is what actually identifies the product; the slug is there for
// search engines and shoppers. This means old /product/31 links keep working and
// a product rename never breaks a URL.

export function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')            // split accented chars so we can drop the marks
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')  // anything not a-z/0-9 becomes a dash
    .replace(/^-+|-+$/g, '')      // trim leading/trailing dashes
    .slice(0, 80);                // keep URLs sane
}

// Build the canonical path for a product link.
export function productPath(id: string | number, name?: string): string {
  const slug = name ? slugify(name) : '';
  return slug ? `/product/${slug}-${id}` : `/product/${id}`;
}

// Extract the numeric id from a route param that may be a plain id ("31") or a
// slugged form ("multicolor-tribal-necklace-31"). Returns the id as a string
// (matching how apiService.getProduct is called elsewhere), or '' if none found.
export function parseProductId(param?: string): string {
  if (!param) return '';
  const match = param.match(/(\d+)$/); // trailing digits
  return match ? match[1] : '';
}
