import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
  keywords?: string;
}

const SEO = ({
  title = 'JewelCart - Affordable Gold, Silver & Diamond Jewellery Online',
  description = 'Buy affordable Gold, Silver, and Diamond jewellery online from JewelCart. Trusted quality, secure shopping, transparent pricing, and fast delivery across India.',
  image = '/og-image.jpg',
  type = 'website',
  url,
  keywords = 'jewellery, diamonds, gold jewellery, silver jewellery, rings, necklaces, earrings, bracelets, affordable jewellery, online jewellery store india, jewelcart',
}: SEOProps) => {
  const location = useLocation();
  // Get site URL - prefer env variable, then current origin, then default
  const siteUrl = import.meta.env.VITE_SITE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : 'https://jewelcart.shop');
  const currentUrl = url || `${siteUrl}${location.pathname}`;
  
  // Ensure image URL is absolute (required for WhatsApp)
  let ogImage: string;
  if (image.startsWith('http://') || image.startsWith('https://')) {
    ogImage = image;
  } else {
    // Remove leading slash if present to avoid double slashes
    const imagePath = image.startsWith('/') ? image : `/${image}`;
    ogImage = `${siteUrl}${imagePath}`;
  }

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Open Graph Meta Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', currentUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:image:secure_url', ogImage, true); // Required for WhatsApp
    updateMetaTag('og:image:type', 'image/jpeg', true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:site_name', 'JewelCart', true);
    updateMetaTag('og:locale', 'en_IN', true);

    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);

    // Additional SEO Meta Tags
    updateMetaTag('author', 'JewelCart');
    updateMetaTag('robots', 'index, follow');

    // Organization structured data (JSON-LD)
    const orgSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'JewelCart',
      legalName: 'BVM Enterprise',
      url: siteUrl,
      logo: `${siteUrl}/og-image.jpg`,
      founder: {
        '@type': 'Person',
        name: 'Bhushan M Soni',
      },
      email: 'info@jewelcart.shop',
      telephone: '+91-9023002331',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '61 Thakorbaug Market, Nr. Sardar Patel Seva Samaj',
        addressLocality: 'Navrangpura, Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380009',
        addressCountry: 'IN',
      },
      sameAs: ['https://www.instagram.com/jewelcart.shop'],
    };
    let ldScript = document.getElementById('org-jsonld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'org-jsonld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify(orgSchema);
  }, [title, description, image, type, url, keywords, currentUrl, ogImage, siteUrl]);

  return null;
};

export default SEO;

