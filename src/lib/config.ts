export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5011/api';
export const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5011';

const categoryPlaceholders: Record<string, string> = {
  rings: '/placeholder.svg',
  necklaces: '/placeholder.svg',
  earrings: '/placeholder.svg',
  bracelets: '/placeholder.svg',
  pendants: '/placeholder.svg',
  bangles: '/placeholder.svg',
  default: '/placeholder.svg',
};

export function resolveImageUrl(src?: string | object | null): string | null {
  if (!src) return null;
  // Handle image objects like {imageUrl: '...', isPrimary: true}
  if (typeof src === 'object') {
    const url = (src as any).imageUrl || (src as any).image_url;
    return url ? resolveImageUrl(url) : null;
  }
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return `${UPLOADS_BASE_URL}${src}`;
  return src;
}

export function getProductImageUrl(product: {
  primary_image?: string;
  imageUrl?: string;
  image_url?: string;
  images?: Array<{ imageUrl?: string; image_url?: string; isPrimary?: boolean; is_primary?: boolean }>;
  category?: string;
  categoryName?: string;
  category_name?: string;
}): string {
  const imgPath = product.primary_image || product.imageUrl || product.image_url;
  if (imgPath) return resolveImageUrl(imgPath)!;

  if (product.images?.length) {
    const primary = product.images.find(img => img.isPrimary || img.is_primary) || product.images[0];
    const url = primary?.imageUrl || primary?.image_url;
    if (url) return resolveImageUrl(url)!;
  }

  const cat = (product.category || product.categoryName || product.category_name || '').toLowerCase();
  return categoryPlaceholders[cat] || categoryPlaceholders.default;
}
