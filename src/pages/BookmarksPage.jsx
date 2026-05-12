import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../hooks/useStyles';
import { injectScript, cleanupScripts } from '../utils/scripts';
import { 
  initDB, 
  getAllBookmarks, 
  removeBookmarkFromDB, 
  clearAllBookmarks, 
  updateBookmarkNoteInDB 
} from '../services/db';
import { GATE_SUBJECTS, detectSubject } from '../services/subject_detector';

const ITEMS_PER_PAGE = 50;

export default function BookmarksPage() {
  useStyles(['/css/exam_style.css', '/css/result_style.css', '/css/bookmarks_style.css', '/css/home.css', '/css/theme_overrides.css']);

  const [bookmarks, setBookmarks] = useState([]);
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
        const data = await getAllBookmarks();
        setBookmarks(data);
      } catch (e) {
        console.error("Failed to load bookmarks", e);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
      await injectScript('/js/dark_mode.js');
    }
    boot();

    return () => { cleanupScripts(); };
  }, []);

  // Filtered Data
  const filteredBookmarks = useMemo(() => {
    let f = bookmarks;
    const search = searchQuery.toLowerCase();

    if (search) {
      f = f.filter(b => 
        (b.questionText || '').toLowerCase().includes(search) || 
        (b.examTitle || '').toLowerCase().includes(search)
      );
    }
    if (filterExam !== 'all') {
      f = f.filter(b => b.examTitle === filterExam);
    }
    if (filterSubject !== 'all') {
      f = f.filter(b => {
        const m = detectSubject(b.examTitle);
        return m && m.id === filterSubject;
      });
    }
    if (filterStatus !== 'all') {
      f = f.filter(b => b.status === filterStatus);
    }
    if (filterType !== 'all') {
      if (filterType === 'nat') {
        f = f.filter(b => b.type === 'nat' || b.type === 'numerical' || b.type === 'numeric');
      } else {
        f = f.filter(b => b.type === filterType);
      }
    }
    return f;
  }, [bookmarks, searchQuery, filterExam, filterSubject, filterStatus, filterType]);

  // Derived state
  const totalPages = Math.max(1, Math.ceil(filteredBookmarks.length / ITEMS_PER_PAGE));
  const validCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
  
  const currentItems = useMemo(() => {
    const start = (validCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredBookmarks.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBookmarks, validCurrentPage]);

  const uniqueExams = useMemo(() => [...new Set(bookmarks.map(b => b.examTitle))], [bookmarks]);

  // Handle MathJax typeset on render
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise) {
      if (window.MathJax.typesetClear) window.MathJax.typesetClear();
      window.MathJax.typesetPromise().catch((err) => console.log('MathJax error:', err));
    }
  }, [currentItems]);

  // Actions
  const handleRemove = async (hash) => {
    await removeBookmarkFromDB(hash);
    setBookmarks(prev => prev.filter(b => b.questionHash !== hash));
  };

  const handleClearAll = async () => {
    if (!window.confirm('Remove all bookmarked questions?')) return;
    await clearAllBookmarks();
    setBookmarks([]);
    setCurrentPage(1);
  };

  const handleExportJson = () => {
    if (!filteredBookmarks.length) {
      alert('No bookmarks to export!');
      return;
    }
    const data = {
      title: 'Bookmarks Revision (' + filteredBookmarks.length + ' Qs)',
      duration: Math.max(30, Math.ceil(filteredBookmarks.length * 3)),
      sections: [{
        name: 'Bookmarked Questions',
        questions: filteredBookmarks.map((b, i) => ({
          id: i + 1,
          question: b.questionText,
          type: b.type || 'single',
          options: b.options || [],
          correct_answer: b.correctAnswer,
          marks: b.maxMarks || 1,
          negative_marks: b.negativeMarks || 0,
          explanation: b.explanation || ''
        }))
      }]
    };
    const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks_revision.json';
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
    await updateBookmarkNoteInDB(hash, note);
    setBookmarks(prev => prev.map(b => b.questionHash === hash ? { ...b, notes: note } : b));
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
          <Link to="/mistakes" className="lcg-nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg> Mistakes
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
            <h1>📌 Bookmarked Questions</h1>
            <span className="bk-count">
              {filteredBookmarks.length === bookmarks.length
                ? `${bookmarks.length} bookmarked`
                : `${filteredBookmarks.length} of ${bookmarks.length} bookmarked`}
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

        {!loading && bookmarks.length === 0 && (
          <div className="bk-empty" style={{ display: 'flex' }}>
            <div className="bk-empty-icon">📭</div>
            <h2>No Bookmarked Questions</h2>
            <p>Bookmark questions from your exam results to review them here later.</p>
            <Link to="/" className="btn-pill btn-new-exam" style={{ marginTop: '15px' }}>Take an Exam</Link>
          </div>
        )}

        {!loading && bookmarks.length > 0 && filteredBookmarks.length === 0 && (
          <div className="bk-no-match" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No matching bookmarks found.
          </div>
        )}

        <div className="questions-list" style={{ display: filteredBookmarks.length > 0 ? 'flex' : 'none' }}>
          {currentItems.map(b => {
            const typeLabel = b.type === 'multiple' ? 'MSQ' : (isNAT(b.type) ? 'NAT' : 'MCQ');
            const dateStr = b.dateBookmarked ? new Date(b.dateBookmarked).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '';
            const marksStr = (b.marksObtained > 0 ? '+' : '') + parseFloat(b.marksObtained || 0).toFixed(2) + ' Marks';
            const marksClass = b.marksObtained > 0 ? 'marks-positive' : (b.marksObtained < 0 ? 'marks-negative' : 'marks-neutral');

            return (
              <div key={b.questionHash} className={`result-question-card ${b.status}`}>
                <div className="rq-header">
                  <span>
                    <span className="bk-exam-tag">{b.examTitle}</span> Q{b.questionId} ({typeLabel})
                  </span>
                  <div className="rq-header-right">
                    <span className="bk-date">{dateStr}</span>
                    <span className={`rq-marks ${marksClass}`}>{marksStr}</span>
                    <span className={`rq-status status-${b.status}`}>{b.status}</span>
                    <button className="bk-remove-btn" onClick={() => handleRemove(b.questionHash)} title="Remove">✕</button>
                  </div>
                </div>

                <div className="rq-text" dangerouslySetInnerHTML={{ __html: b.questionText }}></div>

                {b.options && b.options.length > 0 && (
                  <div className="rq-options">
                    {b.options.map((opt, i) => {
                      const isC = Array.isArray(b.correctAnswer) ? b.correctAnswer.includes(opt) : b.correctAnswer === opt;
                      const isU = Array.isArray(b.userAnswer) ? b.userAnswer.includes(i) : b.userAnswer === i;
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
                    Your Answer: <span className={b.status === 'correct' ? 'ans-correct' : 'ans-wrong'} dangerouslySetInnerHTML={{ __html: b.userAnswerDisplay || 'Not Attempted' }} />
                  </span>
                  <span className="ans-label">
                    Correct Answer: <span className="ans-correct" dangerouslySetInnerHTML={{ __html: b.correctAnswerDisplay }} />
                  </span>
                </div>

                {b.explanation && (
                  <details className="rq-explanation">
                    <summary>📖 View Explanation</summary>
                    <div className="rq-explanation-content" dangerouslySetInnerHTML={{ __html: b.explanation }}></div>
                  </details>
                )}

                <div className="bk-notes-section">
                  <div className="bk-notes-header">
                    <span>📝 My Notes:</span>
                    {editingNoteHash !== b.questionHash && (
                      <button className="bk-edit-note-btn" onClick={() => startEditingNote(b.questionHash, b.notes)}>✏️ Edit</button>
                    )}
                  </div>
                  
                  {editingNoteHash === b.questionHash ? (
                    <div className="bk-notes-edit">
                      <textarea
                        className="bk-notes-textarea"
                        rows="3"
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                      />
                      <div className="bk-notes-actions">
                        <button className="btn-pill btn-cancel-note" onClick={cancelEditingNote}>Cancel</button>
                        <button className="btn-pill btn-save-note" onClick={() => saveNote(b.questionHash)}>Save Note</button>
                      </div>
                    </div>
                  ) : (
                    <div className="bk-notes-display">
                      {b.notes ? (
                        <span dangerouslySetInnerHTML={{ __html: b.notes.replace(/\\n/g, '<br>') }} />
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

        {totalPages > 1 && filteredBookmarks.length > 0 && (
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
            <span className="page-info">Showing {(validCurrentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(validCurrentPage * ITEMS_PER_PAGE, filteredBookmarks.length)} of {filteredBookmarks.length}</span>
          </div>
        )}
      </div>

      <button id="scrollToTopBtn" className="scroll-to-top" title="Go to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>&#8679;</button>
    </>
  );
}
