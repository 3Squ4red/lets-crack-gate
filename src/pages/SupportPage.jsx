import { useEffect } from 'react'
import { useStyles } from '../hooks/useStyles'

export default function SupportPage() {
  useStyles(['/css/exam_style.css', '/css/home.css', '/css/theme_overrides.css'])
  useEffect(() => {
    const dark = localStorage.getItem('darkMode');
    if (dark === 'true') document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <div className="lcg-main" style={{ height: '100vh', margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--surface2)' }}>
      <div style={{ position: 'absolute', top: 20, left: 20 }}>
        <a href="/" className="lcg-util-btn">← Back to Home</a>
      </div>
      <div className="lcg-card" style={{ padding: 30, textAlign: 'center', maxWidth: 450, width: '90%' }}>
        <div style={{ color: 'var(--p)', fontSize: 24, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          ☕ Buy me a coffee
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5, marginBottom: 24 }}>
          If this tool is helping you speed up your GATE prep, consider donating!<br />Thank You!
        </div>
        <div style={{ backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-sm)', padding: 20, border: '1px solid var(--border)' }}>
          <div style={{ color: 'var(--text-primary)', fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Scan and Pay using any UPI app</div>
          <img src="/images/ gate2027_toppers_upi.jpeg" alt="UPI QR Code" style={{ maxWidth: '100%', height: 'auto', borderRadius: 4, display: 'block' }} />
        </div>
      </div>
    </div>
  );
}
