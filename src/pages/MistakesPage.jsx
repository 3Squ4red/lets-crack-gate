import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../hooks/useStyles';
import { injectScript, cleanupScripts } from '../utils/scripts';
import { 
  initDB, 
  getAllSillyMistakes, 
  removeSillyMistakeFromDB, 
  clearAllSillyMistakes, 
  updateSillyMistakeNoteInDB 
} from '../services/db';
import { GATE_SUBJECTS, detectSubject } from '../services/subject_detector';

const ITEMS_PER_PAGE = 50;

export default function MistakesPage() {
  useStyles(['/css/exam_style.css', '/css/result_style.css', '/css/bookmarks_style.css', '/css/home.css', '/css/theme_overrides.css']);

  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filterExam, setFilterExam] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Notes editing state
  const [editingNoteHash, setEditingNoteHash] = useState(null);
  const [tempNote, setTempNote] = useState('');

  useEffect(() => {
    const dark = localStorage.getItem('darkMode');
    if (dark === 'true') document.documentElement.setAttribute('data-theme', 'dark');

    async function boot() {
      try {
        await initDB();
        const data = await getAllSillyMistakes();
        setMistakes(data);
      } catch (e) {
        console.error("Failed to load silly mistakes", e);
        setMistakes([]);
      } finally {
        setLoading(false);
      }
      await injectScript('/js/dark_mode.js');
    }
    boot();

    return () => { cleanupScripts(); };
  }, []);

  // Filtered Data
  const filteredMistakes = useMemo(() => {
    let f = mistakes;
    const search = searchQuery.toLowerCase();

    if (search) {
      f = f.filter(m => 
        (m.questionText || '').toLowerCase().includes(search) || 
        (m.examTitle || '').toLowerCase().includes(search)
      );
    }
    if (filterExam !== 'all') {
      f = f.filter(m => m.examTitle === filterExam);
    }
    if (filterSubject !== 'all') {
      f = f.filter(m => {
        const d = detectSubject(m.examTitle);
        return d && d.id === filterSubject;
      });
    }
    if (filterStatus !== 'all') {
      f = f.filter(m => m.status === filterStatus);
    }
    if (filterType !== 'all') {
      if (filterType === 'nat') {
        f = f.filter(m => m.type === 'nat' || m.type === 'numerical' || m.type === 'numeric');
      } else {
        f = f.filter(m => m.type === filterType);
      }
    }
    return f;
  }, [mistakes, searchQuery, filterExam, filterSubject, filterStatus, filterType]);

  // Derived state
  const totalPages = Math.max(1, Math.ceil(filteredMistakes.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  
  const currentItems = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredMistakes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMistakes, validCurrentPage]);

  const uniqueExams = useMemo(() => [...new Set(mistakes.map(m => m.examTitle))], [mistakes]);

  // Handle MathJax typeset on render
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      if (window.MathJax.typesetClear) window.MathJax.typesetClear();
      window.MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
    }
  }, [currentItems]);

  // Actions
  const handleRemove = async (hash) => {
    await removeSillyMistakeFromDB(hash);
    setMistakes(prev => prev.filter(m => m.questionHash !== hash));
  };

  const handleClearAll = async () => {
    if (!window.confirm('Remove all silly mistakes?')) return;
    await clearAllSillyMistakes();
    setMistakes([]);
    setCurrentPage(1);
  };

  const handleExportJson = () => {
    if (!filteredMistakes.length) {
      alert('No silly mistakes to export!');
      return;
    }
    const data = {
      title: 'Silly Mistakes Revision (' + filteredMistakes.length + ' Qs)',
      duration: Math.max(30, Math.ceil(filteredMistakes.length * 3)),
      sections: [{
        name: 'Silly Mistakes',
        questions: filteredMistakes.map((m, i) => ({
          id: i + 1,
          question: m.questionText,
          type: m.type || 'single',
          options: m.options || [],
          correct_answer: m.correctAnswer,
          marks: m.maxMarks || 1,
          negative_marks: m.negativeMarks || 0,
          explanation: m.explanation || ''
        }))
      }]
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'silly_mistakes_revision.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const startEditingNote = (hash, currentNote) => {
    setEditingNoteHash(hash);
    setTempNote(currentNote || '');
  };

  const cancelEditingNote = () => {
    setEditingNoteHash(null);
    setTempNote('');
  };

  const saveNote = async (hash) => {
    const note = tempNote.trim();
    await updateSillyMistakeNoteInDB(hash, note);
    setMistakes(prev => prev.map(m => m.questionHash === hash ? { ...m, notes: note } : m));
    cancelEditingNote();
  };

  // Pagination helper
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const p = [1];
    if (validCurrentPage > 3) p.push('...');
    for (let i = Math.max(2, validCurrentPage - 1); i <= Math.min(totalPages - 1, validCurrentPage + 1); i++) p.push(i);
    if (validCurrentPage < totalPages - 2) p.push('...');
    p.push(totalPages);
    return p;
  };

  const isNAT = (t) => t === 'nat' || t === 'numerical' || t === 'numeric';

  return (
    <>
      <nav className="lcg-navbar">
        <Link className="lcg-brand" to="/">
          <div className="lcg-brand-icon" style={{ background: 'transparent' }}>
            <img src={`${import.meta.env.BASE_URL}images/new_gate_logo.png`} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span className="lcg-brand-name">LetsCrack GATE</span>
        </Link>

        <div className="lcg-nav-links">
          <Link to="/analytics" className="lcg-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M3 3v18h18" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg> Analytics
          </Link>
          <Link to="/library" className="lcg-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg> Library
          </Link>
          <Link to="/bookmarks" className="lcg-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg> Bookmarks
          </Link>
          <Link to="/support" className="lcg-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><path d="M17 8h1a4 4 0 1 1 0 8h-1" /><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" /><line x1="6" x2="6" y1="2" y2="4" /><line x1="10" x2="10" y1="2" y2="4" /><line x1="14" x2="14" y1="2" y2="4" /></svg> Support
          </Link>
        </div>

        <div className="lcg-nav-right">
          <button className="lcg-dark-btn dark-mode-toggle" id="uploadDarkToggle" title="Toggle Dark Mode">
            <span className="icon-moon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg></span>
            <span className="icon-sun"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg></span>
          </button>
        </div>
      </nav>

      <div className="bookmarks-container">
        <div className="bookmarks-header">
          <div className="bk-header-left">
            <h1>🤦 Silly Mistakes</h1>
            <span className="bk-count">
              {filteredMistakes.length === mistakes.length
                ? `${mistakes.length} marked`
                : `${filteredMistakes.length} of ${mistakes.length} marked`}
            </span>
          </div>
          <div className="bk-header-right">
            <button onClick={handleExportJson} className="btn-pill btn-export">📥 Export as JSON</button>
            <button onClick={handleClearAll} className="btn-pill btn-clear-all">🗑️ Clear All</button>
          </div>
        </div>

        <div className="bk-controls">
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search by question text or exam title..."
            className="bk-search"
          />
          <select value={filterExam} onChange={e => { setFilterExam(e.target.value); setCurrentPage(1); }} className="bk-filter">
            <option value="all">All Exams</option>
            {uniqueExams.map(ex => <option key={ex} value={ex}>{ex}</option>)}
          </select>
          <select value={filterSubject} onChange={e => { setFilterSubject(e.target.value); setCurrentPage(1); }} className="bk-filter">
            <option value="all">All Subjects</option>
            {GATE_SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
          </select>
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setCurrentPage(1); }} className="bk-filter">
            <option value="all">All Status</option>
            <option value="correct">✔ Correct</option>
            <option value="incorrect">✘ Incorrect</option>
            <option value="unanswered">— Unanswered</option>
          </select>
          <select value={filterType} onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }} className="bk-filter">
            <option value="all">All Types</option>
            <option value="single">MCQ</option>
            <option value="multiple">MSQ</option>
            <option value="nat">NAT</option>
          </select>
        </div>

        {!loading && mistakes.length === 0 && (
          <div className="bk-empty" style={{ display: 'flex' }}>
            <div className="bk-empty-icon">🤷</div>
            <h2>No Silly Mistakes Recorded</h2>
            <p>Mark questions as silly mistakes from your exam results to track them here.</p>
            <Link to="/" className="btn-pill btn-new-exam" style={{ marginTop: '15px' }}>Take an Exam</Link>
          </div>
        )}

        {!loading && mistakes.length > 0 && filteredMistakes.length === 0 && (
          <div className="bk-no-match" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No matching silly mistakes found.
          </div>
        )}

        <div className="questions-list" style={{ display: filteredMistakes.length > 0 ? 'flex' : 'none' }}>
          {currentItems.map(m => {
            const typeLabel = m.type === 'multiple' ? 'MSQ' : (isNAT(m.type) ? 'NAT' : 'MCQ');
            const dateStr = m.dateMarked ? new Date(m.dateMarked).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
            const marksStr = (m.marksObtained > 0 ? '+' : '') + parseFloat(m.marksObtained || 0).toFixed(2) + ' Marks';
            const marksClass = m.marksObtained > 0 ? 'marks-positive' : (m.marksObtained < 0 ? 'marks-negative' : 'marks-neutral');

            return (
              <div key={m.questionHash} className={`result-question-card ${m.status}`}>
                <div className="rq-header">
                  <span>
                    <span className="bk-exam-tag">{m.examTitle}</span> Q{m.questionId} ({typeLabel})
                  </span>
                  <div className="rq-header-right">
                    <span className="bk-date">{dateStr}</span>
                    <span className={`rq-marks ${marksClass}`}>{marksStr}</span>
                    <span className={`rq-status status-${m.status}`}>{m.status}</span>
                    <button className="bk-remove-btn" onClick={() => handleRemove(m.questionHash)} title="Remove">✕</button>
                  </div>
                </div>

                <div className="rq-text" dangerouslySetInnerHTML={{ __html: m.questionText }}></div>

                {m.options && m.options.length > 0 && (
                  <div className="rq-options">
                    {m.options.map((opt, i) => {
                      const isC = Array.isArray(m.correctAnswer) ? m.correctAnswer.includes(opt) : m.correctAnswer === opt;
                      const isU = Array.isArray(m.userAnswer) ? m.userAnswer.includes(i) : m.userAnswer === i;
                      const cls = isC ? 'correct-opt' : (isU && !isC ? 'wrong-opt' : '');
                      return (
                        <div key={i} className={`rq-option ${cls}`}>
                          <span>{isC ? '✔' : (isU ? '✘' : '○')}</span>
                          <span dangerouslySetInnerHTML={{ __html: opt }}></span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="rq-answer-info">
                  <span className="ans-label">
                    Your Answer: <span className={m.status === 'correct' ? 'ans-correct' : 'ans-wrong'} dangerouslySetInnerHTML={{ __html: m.userAnswerDisplay || 'Not Attempted' }} />
                  </span>
                  <span className="ans-label">
                    Correct Answer: <span className="ans-correct" dangerouslySetInnerHTML={{ __html: m.correctAnswerDisplay }} />
                  </span>
                </div>

                {m.explanation && (
                  <details className="rq-explanation">
                    <summary>📖 View Explanation</summary>
                    <div className="rq-explanation-content" dangerouslySetInnerHTML={{ __html: m.explanation }}></div>
                  </details>
                )}

                <div className="bk-notes-section">
                  <div className="bk-notes-header">
                    <span>📝 My Notes:</span>
                    {editingNoteHash !== m.questionHash && (
                      <button className="bk-edit-note-btn" onClick={() => startEditingNote(m.questionHash, m.notes)}>✏️ Edit</button>
                    )}
                  </div>
                  
                  {editingNoteHash === m.questionHash ? (
                    <div className="bk-notes-edit">
                      <textarea
                        className="bk-notes-textarea"
                        rows="3"
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                      />
                      <div className="bk-notes-actions">
                        <button className="btn-pill btn-cancel-note" onClick={cancelEditingNote}>Cancel</button>
                        <button className="btn-pill btn-save-note" onClick={() => saveNote(m.questionHash)}>Save Note</button>
                      </div>
                    </div>
                  ) : (
                    <div className="bk-notes-display">
                      {m.notes ? (
                        <span dangerouslySetInnerHTML={{ __html: m.notes.replace(/\\n/g, '<br>') }} />
                      ) : (
                        <em style={{ color: '#999', fontSize: '13px' }}>No notes added yet...</em>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && filteredMistakes.length > 0 && (
          <div className="pagination-bar" style={{ display: 'flex' }}>
            <button className="page-btn" onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={validCurrentPage === 1}>◀ Prev</button>
            {getPageNumbers().map((p, idx) => (
              p === '...' ? (
                <span key={`ell-${idx}`} className="page-ellipsis">…</span>
              ) : (
                <button key={`page-${p}`} className={`page-btn ${p === validCurrentPage ? 'active' : ''}`} onClick={() => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>{p}</button>
              )
            ))}
            <button className="page-btn" onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }} disabled={validCurrentPage === totalPages}>Next ▶</button>
            <span className="page-info">Showing {(validCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredMistakes.length)} of {filteredMistakes.length}</span>
          </div>
        )}
      </div>

      <button id="scrollToTopBtn" className="scroll-to-top" title="Go to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>&#8679;</button>
    </>
  );
}
