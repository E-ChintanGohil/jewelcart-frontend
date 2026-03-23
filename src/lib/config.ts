export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5011/api';
export const UPLOADS_BASE_URL = import.meta.env.VITE_UPLOADS_BASE_URL || 'http://localhost:5011';

const categoryPlaceholders: Record<string, string> = {
  rings: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
  necklaces: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
  earrings: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
  bracelets: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
  pendants: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80',
  bangles: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80',
  default: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80',
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
