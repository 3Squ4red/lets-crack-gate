import { useEffect } from 'react'

export function useStyles(hrefs) {
  useEffect(() => {
    hrefs.forEach(href => {
      if (document.querySelector(`link[data-legacy-css="${href}"]`)) return;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href.startsWith('/') ? `${import.meta.env.BASE_URL}${href.slice(1)}` : href;
      link.setAttribute('data-legacy-css', href);
      document.head.appendChild(link);
    });
  }, []);
}
