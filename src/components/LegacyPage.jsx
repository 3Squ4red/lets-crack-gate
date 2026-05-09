import { useEffect, useRef } from 'react'

// Loads a script by src, returns a promise that resolves when loaded
function loadScript(src) {
  return new Promise((resolve, reject) => {
    // Avoid double-loading
    if (document.querySelector(`script[data-legacy="${src}"]`)) {
      resolve(); return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.setAttribute('data-legacy', src);
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

// Runs an inline script string in global scope
function runInlineScript(code) {
  const s = document.createElement('script');
  s.setAttribute('data-legacy-inline', 'true');
  s.textContent = code;
  document.head.appendChild(s);
  return s;
}

export default function LegacyPage({ scripts = [], inlineScript = '', className = '' }) {
  const containerRef = useRef(null);
  const inlineScriptRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Load scripts in order
      for (const src of scripts) {
        if (cancelled) return;
        try { await loadScript(src); } catch(e) { console.warn('Failed to load script:', src, e); }
      }
      if (cancelled) return;
      // Run inline script after all scripts loaded
      if (inlineScript) {
        inlineScriptRef.current = runInlineScript(inlineScript);
      }
      // Fire DOMContentLoaded-equivalent for legacy code that listens to it
      // (already fired, so dispatch a custom event legacy code can hook into)
      if (!cancelled) {
        document.dispatchEvent(new Event('DOMContentLoaded'));
      }
    }

    init();

    return () => {
      cancelled = true;
      // Clean up inline scripts added by this page
      document.querySelectorAll('script[data-legacy-inline]').forEach(s => s.remove());
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
