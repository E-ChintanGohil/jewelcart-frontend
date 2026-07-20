// Google Analytics (gtag.js).
//
// Only active when VITE_GA_ID is set, which is done in .env.prod alone — staging
// and local dev stay untracked so they don't pollute the prod reports.
//
// Page views are left entirely to gtag: the `config` call sends the first one,
// and GA's enhanced measurement ("page changes based on browser history events",
// on by default) sends one for every client-side route change. Sending our own
// page_view events on top of that double-counts every page after the first.

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initAnalytics(): void {
  if (!GA_ID || initialized || typeof window === 'undefined') return;
  // Admin console is internal staff usage — keep it out of storefront reports.
  if (window.location.pathname.startsWith('/console')) return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // Must be a normal function — gtag relies on `arguments`, which arrow functions lack.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
}
