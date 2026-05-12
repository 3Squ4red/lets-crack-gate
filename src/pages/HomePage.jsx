import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from '../hooks/useStyles'
import { injectScript } from '../utils/scripts'
import { initDB, getExamHistory } from '../services/db'

export default function HomePage() {
  useStyles(['/css/home.css'])

  const [streak, setStreak] = useState(0)
  const [countdown, setCountdown] = useState('')
  const [gateYear, setGateYear] = useState(new Date().getFullYear() + 1)
  const [customTargetDate, setCustomTargetDate] = useState(localStorage.getItem('customExamDate') || null)
  const dateInputRef = useRef(null)

  const getTodayLocalString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const getMaxLocalString = () => {
    const d = new Date();
    return `${d.getFullYear() + 5}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const handleDateChange = (e) => {
    const val = e.target.value;
    if (val) {
      localStorage.setItem('customExamDate', val);
      setCustomTargetDate(val);
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      if (dateInputRef.current.showPicker) {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
        dateInputRef.current.click();
      }
    }
  };

  useEffect(() => {
    // Read dark mode
    const dark = localStorage.getItem('darkMode')
    if (dark === 'true') document.documentElement.setAttribute('data-theme', 'dark')

    // Inject dark mode script for the toggle to work
    injectScript('/js/dark_mode.js')

    // Read streak from legacy DB (localStorage) as fallback initially
    const savedStreak = parseInt(localStorage.getItem("dailyStreakCount") || "0")
    setStreak(savedStreak)

    // Calculate robust streak from IndexedDB
    const calculateStreak = async () => {
      try {
        await initDB();
        const history = await getExamHistory();

        const activeDates = new Set();
        history.forEach((ex) => {
          if (ex.date) {
            const d = new Date(ex.date);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
            activeDates.add(dateStr);
          }
        });

        let calculatedStreak = 0;
        const today = new Date();
        let checkDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        while (true) {
          const dateStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;

          if (calculatedStreak === 0 && !activeDates.has(dateStr)) {
            checkDate.setDate(checkDate.getDate() - 1);
            const yesterdayStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
            if (!activeDates.has(yesterdayStr)) {
              break;
            }
          } else if (activeDates.has(dateStr)) {
            calculatedStreak++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break;
          }
        }

        setStreak(calculatedStreak);
        localStorage.setItem("dailyStreakCount", calculatedStreak.toString());
      } catch (err) {
        console.error("Failed to calculate streak from DB", err);
      }
    };

    calculateStreak();

  }, [])

  useEffect(() => {
    const getTargetInfo = () => {
      const now = new Date();
      let defaultY = now.getFullYear();
      if (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 10)) {
        defaultY += 1;
      }
      const defaultTarget = new Date(`${defaultY}-02-05T00:00:00+05:30`).getTime();

      if (customTargetDate) {
        const customTarget = new Date(`${customTargetDate}T00:00:00+05:30`).getTime();
        if (customTarget < now.getTime()) {
          return { year: defaultY, targetDate: defaultTarget, isCustom: false, isExpiredCustom: true };
        }
        return { year: customTargetDate.split('-')[0], targetDate: customTarget, isCustom: true, isExpiredCustom: false };
      }

      return { year: defaultY, targetDate: defaultTarget, isCustom: false, isExpiredCustom: false };
    };

    let { year, targetDate, isCustom, isExpiredCustom } = getTargetInfo();

    if (isExpiredCustom) {
      localStorage.removeItem('customExamDate');
      setCustomTargetDate(null);
      return;
    }

    setGateYear(year);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        if (isCustom) {
          localStorage.removeItem('customExamDate');
          setCustomTargetDate(null);
        } else {
          setCountdown("Its about time! Give your best 💪");
        }
      } else {
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setCountdown(`${d}d ${h}h`);
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [customTargetDate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--surface2)' }}>
      {/* Navbar */}
      <nav className="lcg-navbar">
        <div className="lcg-brand">
          <div className="lcg-brand-icon" style={{ background: 'transparent' }}>
            <img src={`${import.meta.env.BASE_URL}images/new_gate_logo.png`} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span className="lcg-brand-name">LetsCrack GATE</span>
        </div>
        <div className="lcg-nav-links">
          <Link to="/analytics" className="lcg-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg> Analytics
          </Link>
          <Link to="/library" className="lcg-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg> Library
          </Link>
          <Link to="/bookmarks" className="lcg-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg> Bookmarks
          </Link>
          <Link to="/mistakes" className="lcg-nav-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg> Mistakes
          </Link>

        </div>
        <div className="lcg-nav-right">
          <div
            className="lcg-countdown-pill"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', position: 'relative' }}
            onClick={openDatePicker}
            title="Set Custom Exam Date"
          >
            <input
              type="date"
              ref={dateInputRef}
              onChange={handleDateChange}
              min={getTodayLocalString()}
              max={getMaxLocalString()}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0, padding: 0, margin: 0, border: 'none' }}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {countdown === "Its about time! Give your best 💪" ? (
              <strong>{countdown}</strong>
            ) : (
              <>GATE {gateYear} in <strong>{countdown}</strong></>
            )}
          </div>
          <button className="lcg-dark-btn dark-mode-toggle" id="uploadDarkToggle" title="Toggle Dark Mode">
            <span className="icon-moon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg></span>
            <span className="icon-sun"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg></span>
          </button>
        </div>
      </nav>

      {/* Redesigned Hero */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
        {/* Background Glowing Orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '400px', height: '400px', background: 'var(--p-glow)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '10%', right: '20%', width: '300px', height: '300px', background: 'rgba(167, 139, 250, 0.2)', filter: 'blur(80px)', borderRadius: '50%', zIndex: 0 }}></div>

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', width: '100%' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '30px', color: 'var(--p)', fontSize: '13px', fontWeight: 600, marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
            Powered by GATEOverflow
          </div>

          <h1 style={{ fontSize: '64px', fontWeight: 800, color: 'var(--p)', letterSpacing: '-2px', marginBottom: '16px', lineHeight: 1.1 }}>
            LetsCrack GATE
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.5 }}>
            The most authentic GATE exam interface. Practice PYQs, analyze your mistakes, and boost your preparation.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '60px' }}>
            <Link to="/library" style={{ background: 'var(--p)', color: 'white', padding: '16px 32px', borderRadius: '12px', fontSize: '18px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px var(--p-glow)', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
              Go to Exam Library
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '30px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--p)', marginBottom: '4px' }}>2500+</div>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: 600 }}>Practice Tests</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--p)', marginBottom: '4px' }}>1987-2025</div>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: 600 }}>Year-Wise PYQs</div>
            </div>
            <div style={{ width: '1px', background: 'var(--border)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#f97316', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg>
                {streak}
              </div>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', fontWeight: 600 }}>Day Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
