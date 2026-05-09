export function injectScript(src) {
  return new Promise((resolve) => {
    if (document.querySelector(`script[data-src="${src}"]`)) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src;
    s.setAttribute('data-src', src);
    s.onload = resolve;
    s.onerror = resolve;
    document.head.appendChild(s);
  });
}

export function injectInlineScript(key, code) {
  if (document.querySelector(`script[data-src="${key}"]`)) return;
  const s = document.createElement('script');
  s.setAttribute('data-src', key);
  s.textContent = code;
  document.head.appendChild(s);
}

export function cleanupScripts() {
  document.querySelectorAll('script[data-src]').forEach(s => s.remove());
}
