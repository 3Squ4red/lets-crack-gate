import { useEffect } from 'react'
import { useStyles } from '../hooks/useStyles'
import { injectScript, cleanupScripts } from '../utils/scripts'

export default function ResultPage() {
  useStyles(['/css/exam_style.css', '/css/result_style.css', '/css/home.css', '/css/theme_overrides.css'])

  useEffect(() => {
    const dark = localStorage.getItem('darkMode')
    if (dark === 'true') document.documentElement.setAttribute('data-theme', 'dark')

    async function boot() {
      await injectScript('/js/db.js')
      await injectScript('/js/subject_detector.js')
      await injectScript('/js/result_script.js')
      await injectScript('/js/dark_mode.js')
      document.dispatchEvent(new Event('DOMContentLoaded'))
    }
    boot()

    return () => { cleanupScripts() }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: resultHTML }} />
}

const resultHTML = `
<div class="result-container">
  <div class="result-header">
    <h1 id="pageTitle">📊 Exam Result</h1>
    <div class="header-buttons">
      <div class="btn-group">
        <a href="/bookmarks" class="btn-pill btn-bookmarks" style="display:flex;align-items:center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg> Bookmarks
        </a>
        <a href="/mistakes" class="btn-pill btn-silly-mistakes" style="display:flex;align-items:center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg> Silly Mistakes
        </a>
        <a href="/library" class="btn-pill btn-new-exam" style="display:flex;align-items:center;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> New Exam
        </a>
      </div>
    </div>
  </div>
  <div class="summary-section">
    <div class="score-card" id="scoreCard"></div>
    <div class="chart-container"><canvas id="performanceChart"></canvas></div>
  </div>
  <div class="analytics-section" id="strategyMetrics"></div>
  <div class="analytics-section" id="questionTypeSection"></div>
  <div class="analytics-section" id="marksBreakdown"></div>
  <div class="analytics-section" id="speedAccuracyQuadrant">
    <h3 style="margin-top:0;color:#3b5998;margin-bottom:5px;">⚡ Speed vs Accuracy Quadrant</h3>
    <p style="font-size:13px;color:var(--text-color);opacity:0.8;margin-bottom:15px;">Find your "Time Traps" (bottom-right) and "Quick Wins" (top-left).</p>
    <div class="chart-container" style="height:350px;"><canvas id="speedAccuracyChart"></canvas></div>
  </div>
  <div class="filter-bar">
    <label for="filterSelect">Filter by:</label>
    <select id="filterSelect" class="filter-select">
      <optgroup label="Status">
        <option value="all">All Questions</option>
        <option value="correct">✔ Correct</option>
        <option value="incorrect">✘ Incorrect</option>
        <option value="unanswered">— Unanswered</option>
      </optgroup>
      <optgroup label="Time">
        <option value="most_time">Most Time Taken</option>
        <option value="least_time">Least Time Taken</option>
        <option value="time_traps">🐢 Time Traps (&gt;3min &amp; Wrong)</option>
        <option value="quick_wins">⚡ Quick Wins (&lt;30s &amp; Correct)</option>
        <option value="slow_correct">🐌 Slow but Correct (&gt;3min)</option>
      </optgroup>
      <optgroup label="Marks Weight">
        <option value="marks_1">1-Mark Questions</option>
        <option value="marks_2">2-Mark Questions</option>
      </optgroup>
      <optgroup label="Question Type">
        <option value="type_mcq">MCQ Only</option>
        <option value="type_msq">MSQ Only</option>
        <option value="type_nat">NAT Only</option>
      </optgroup>
      <optgroup label="Strategy">
        <option value="negative_only">🔴 Negative Marks Only</option>
        <option value="marked_review">🟣 Marked for Review</option>
        <option value="easy_unattempted">💡 Unattempted Easy (1-mark)</option>
        <option value="bookmarked">⭐ Bookmarked</option>
        <option value="silly_mistake">🤦 Silly Mistakes</option>
      </optgroup>
      <optgroup label="Explanation">
        <option value="has_explanation">📖 With Explanation</option>
        <option value="no_explanation">❓ Without Explanation</option>
      </optgroup>
    </select>
    <div class="question-count" id="questionCount">Total: 0</div>
  </div>
  <div class="questions-list" id="questionsList"></div>
</div>
<button class="dark-mode-toggle" id="darkModeToggle" title="Toggle Dark Mode">
  <span class="icon-moon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span><span class="icon-sun"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>
</button>
<button id="scrollToTopBtn" class="scroll-to-top" title="Go to top">&#8679;</button>
`
