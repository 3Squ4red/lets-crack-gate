import { useEffect } from 'react'
import { useStyles } from '../hooks/useStyles'
import { injectScript, cleanupScripts } from '../utils/scripts'

export default function LibraryPage() {
  useStyles(['/css/exam_style.css', '/css/exam_library_style.css', '/css/home.css'])

  useEffect(() => {
    const dark = localStorage.getItem('darkMode')
    if (dark === 'true') document.documentElement.setAttribute('data-theme', 'dark')

    async function boot() {
      await injectScript('/js/subject_detector.js')
      await injectScript('/js/db.js')
      await injectScript('/exam_index.js?v=5')
      await injectScript('/js/exam_library_script.js')
      await injectScript('/js/home_inline.js')
      await injectScript('/js/exam_script.js')
      await injectScript('/js/dark_mode.js')
      document.dispatchEvent(new Event('DOMContentLoaded'))
    }
    boot()

    return () => {
      cleanupScripts()
      if (typeof window.examData !== 'undefined') window.examData = null
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: examHTML }} />
}

const examHTML = `
<div id="uploadSection" class="upload-section">

  <!-- Hidden file input for restore -->
  <input type="file" id="importFileInput" style="display:none" accept=".json" onchange="handleImportData(event)" />

  <!-- ── Navbar ── -->
  <nav class="lcg-navbar">
    <a class="lcg-brand" href="/">
      <div class="lcg-brand-icon" style="background: transparent;">
        <img src="${import.meta.env.BASE_URL}images/new_gate_logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;" />
      </div>
      <span class="lcg-brand-name">LetsCrack GATE</span>
    </a>

    <div class="lcg-nav-links">
      <a href="/analytics" class="lcg-nav-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg> Analytics
      </a>
      <a href="/bookmarks" class="lcg-nav-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg> Bookmarks
      </a>
      <a href="/mistakes" class="lcg-nav-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg> Mistakes
      </a>
      <a href="/support" class="lcg-nav-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg> Support
      </a>
    </div>

    <div class="lcg-nav-right">
      <div class="lcg-countdown-pill" style="display:flex;align-items:center;gap:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 
        GATE 2027 in <strong id="gateCountdownDisplay">...</strong>
      </div>
      <button onclick="handleExportData()" class="lcg-util-btn" style="display:flex;align-items:center;gap:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x1="12" y1="15" y2="3"/></svg> Backup
      </button>
      <button onclick="document.getElementById('importFileInput').click()" class="lcg-util-btn" style="display:flex;align-items:center;gap:6px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x1="12" y1="3" y2="15"/></svg> Restore
      </button>
      <button class="lcg-dark-btn dark-mode-toggle" id="uploadDarkToggle" title="Toggle Dark Mode">
        <span class="icon-moon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span><span class="icon-sun"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>
      </button>
    </div>
  </nav>


  <!-- ── Main Layout ── -->
  <div class="lcg-main">

    <!-- Top: Library -->
    <div class="lcg-card" style="width: 100%;">
      <!-- Header: search + controls -->
      <div class="lcg-card-header">
        <div class="lcg-card-title">
          <div class="lcg-card-title-dot"></div>
          Exam Library
          <span id="libStats" style="font-weight:400;color:var(--text-muted);font-size:12px;">Loading...</span>
        </div>
        <div class="lcg-controls-row">
          <div class="lcg-search-wrap">
            <span class="lcg-search-icon">🔍</span>
            <input type="text" id="libSearch" placeholder="Search exams..." />
          </div>
          <label class="lcg-toggle-label">
            <input type="checkbox" id="untimedModeToggle" />
            Untimed
          </label>
          <button id="multiSelectToggle" onclick="toggleMultiSelect()">✨ Multi-Select</button>
        </div>
      </div>

      <!-- Library tree -->
      <div id="libContent" style="max-height:420px;overflow-y:auto;margin-bottom:0">
        <div class="lib-loading"><div class="spinner"></div><br/>Loading exam library...</div>
      </div>

      <!-- Multi-select FAB (hidden by default) -->
      <div id="multiSelectFab" style="display:none;">
        <div class="fab-info"><span id="fabSelectedCount">0 exams selected</span></div>
        <div class="fab-controls">
          <label for="fabTotalQuestions">Total Questions:</label>
          <input type="number" id="fabTotalQuestions" min="1" max="200" value="30" class="fab-input" />
          <small id="fabAvailableCount" style="color:var(--text-muted);font-size:12px;display:none">(Max: 0)</small>
        </div>
        <button class="fab-generate-btn" id="fabGenerateBtn" onclick="generateCustomExam()">Generate &amp; Start ▶</button>
      </div>

      <!-- Custom Exam Builder -->
      <div class="lcg-custom-builder">
        <h3 style="display:flex;align-items:center;gap:8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> 
          Custom Practice Exam
        </h3>
        <p>Mix bookmarks &amp; mistakes into a focused revision session</p>
        <select id="customSubjectFilter" class="subject-filter-select" onchange="filterCustomExamBySubject()">
          <option value="all">All Subjects</option>
        </select>
        <div class="custom-inputs-row">
          <div class="custom-input-col">
            <label class="custom-input-label" style="display:flex;align-items:center;gap:6px;color:var(--text-primary);font-size:13px;font-weight:600;margin-bottom:4px;">
              From Bookmarks 
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            </label>
            <input type="number" id="customBkqInput" min="0" max="50" value="5" class="custom-num-input" placeholder="Bookmarks" />
            <small class="avail-text" id="availBkq">Avail: 0</small>
          </div>
          <div class="custom-input-col">
            <label class="custom-input-label" style="display:flex;align-items:center;gap:6px;color:var(--text-primary);font-size:13px;font-weight:600;margin-bottom:4px;">
              From Mistakes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
            </label>
            <input type="number" id="customSmInput" min="0" max="50" value="5" class="custom-num-input" placeholder="Mistakes" />
            <small class="avail-text" id="availSm">Avail: 0</small>
          </div>
        </div>
        <button id="startCustomExamBtn" class="btn-start custom-exam-btn">Start Custom Exam ✨</button>
      </div>

      <!-- Unfinished exam banner -->
      <div id="unfinishedExamActions" class="unfinished-actions" style="display:none">
        <p class="unfinished-text">⚠️ You have an unfinished exam in progress.</p>
        <div class="unfinished-btns">
          <button id="resumeExam" class="btn-resume">Resume</button>
          <button id="discardExam" class="btn-discard">Discard</button>
        </div>
      </div>
    </div>

    <!-- Bottom: History + Sidebar -->
    <div style="display: flex; gap: 24px; width: 100%; align-items: flex-start; flex-wrap: wrap;">

      <!-- Left: Test History -->
      <div id="historySection" class="lcg-history" style="flex: 2; min-width: 300px;">
        <div class="lcg-card">
          <div class="lcg-card-header">
            <div class="lcg-card-title"><div class="lcg-card-title-dot"></div>📋 Test History</div>
            <div class="lcg-controls-row">
              <input type="text" id="historySearch" placeholder="Search exams..." class="lcg-search-wrap" style="padding:7px 12px;border:1px solid var(--border);border-radius:8px;background:var(--surface2);color:var(--text-primary);font-size:13px;outline:none;" oninput="renderHistoryTable()" />
              <select id="historySubjectFilter" class="subject-filter-select" style="width:auto;margin:0" onchange="renderHistoryTable()"><option value="all">All Subjects</option></select>
              <select id="historySort" class="subject-filter-select" style="width:auto;margin:0" onchange="renderHistoryTable()">
                <option value="newest">Newest First</option><option value="oldest">Oldest First</option>
                <option value="score_high">Highest Score</option><option value="score_low">Lowest Score</option>
              </select>
              <button id="deleteAllExamsBtn" onclick="handleClearAllExams()" class="btn-pill" style="margin-left:auto; background:var(--surface2); color:var(--text-primary); border:1px solid var(--border); transition:0.2s; cursor:pointer;" onmouseover="this.style.background='var(--error-surface || #fee2e2)'; this.style.color='var(--error || #dc2626)'" onmouseout="this.style.background='var(--surface2)'; this.style.color='var(--text-primary)'">🗑️ Delete All</button>
            </div>
          </div>
          <div style="padding:16px;border-bottom:1px solid var(--border)">
            <canvas id="historyProgressChart" style="height:200px;width:100%"></canvas>
          </div>
          <div class="history-table-wrapper" style="padding:0">
            <table class="history-table">
              <thead><tr><th>#</th><th>Exam Title</th><th>Date</th><th>%</th><th>Marks</th><th>Actions</th></tr></thead>
              <tbody id="historyBody"></tbody>
            </table>
          </div>
          <div id="historyPagination" class="history-pagination" style="display:none;justify-content:center;align-items:center;padding:12px;gap:12px;">
            <button id="prevHistoryPage" class="btn-cancel" onclick="changeHistoryPage(-1)" style="padding:5px 14px;cursor:pointer">Previous</button>
            <span id="historyPageInfo" style="font-weight:bold;font-size:13px">Page 1 of 1</span>
            <button id="nextHistoryPage" class="btn-confirm" onclick="changeHistoryPage(1)" style="padding:5px 14px;cursor:pointer">Next</button>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="lcg-sidebar" style="flex: 1; min-width: 250px;">

      <!-- Subject Accuracy -->
      <div class="lcg-sidebar-card">
        <div class="lcg-sidebar-card-title">📈 Subject Accuracy</div>
        <div class="lcg-accuracy-chart-wrap">
          <canvas id="subjectAccuracyChartCanvas"></canvas>
          <div id="accuracyChartEmptyState" class="lcg-accuracy-empty" style="display:none">Take exams to see your subject-wise accuracy!</div>
        </div>
        <div id="accuracyMotivationalMsg" class="lcg-accuracy-msg">Loading insights...</div>
      </div>

    </div>
      </div>

    </div>
  </div>

  </div>

</div>

<!-- Exam Section -->
<div id="examSection" class="gate-exam-root" style="display:none">
  <div class="gate-top">
    <div class="gate-iit-org-logo"><img src="${import.meta.env.BASE_URL}images/logo_iit_madras_without_background.png" alt="IIT Madras Logo" /></div>
    <div class="gate-iit-org-name">
      <h1>GRADUATE APTITUDE TEST IN ENGINEERING (GATE 2027)</h1>
      <p>Organizing Institute: INDIAN INSTITUTE OF TECHNOLOGY MADRAS</p>
    </div>
    <div class="gate-iit-goal"><img src="${import.meta.env.BASE_URL}images/bombayTheGoal.png" alt="The Goal" /></div>
  </div>
  <div class="gate-ins-ques">
    <div class="gate-test-name"><p id="examTitle">GATE Exam</p></div>
    <div class="gate-ins-ques-btn">
      <a href="#"><div class="gate-info-icon-sprite"></div>Instructions</a>
      <a href="#" id="viewQuestionPaperBtn"><div class="gate-question-icon-sprite"></div>Question Paper</a>
    </div>
  </div>
  <div class="gate-workspace">
    <div class="gate-workspace-top">
      <div class="gate-top-left">
        <div class="gate-calc-section">
          <div class="gate-exam-name-con">
            <div class="gate-left-arrow-sprite"></div>
            <div class="gate-exam-name-pill">
              <p id="currentSectionPill">Section</p>
              <div class="gate-info-icon-wrapper">
                <div class="gate-info-icon-sprite gate-tab-icon"></div>
                <div class="gate-info-dropdown" id="gateExamInfoDropdown">
                  <div class="gate-info-title" id="gateInfoDropdownTitle">Overall</div>
                  <div class="gate-info-row"><div class="gate-sprite-shape gate-status-answered-small" id="legendAnswered">0</div> Answered</div>
                  <div class="gate-info-row"><div class="gate-sprite-shape gate-status-not-answered-small" id="legendNotAnswered">0</div> Not Answered</div>
                  <div class="gate-info-row"><div class="gate-sprite-shape gate-status-not-visited-small" id="legendNotVisited">0</div> Not Visited</div>
                  <div class="gate-info-row"><div class="gate-sprite-shape gate-status-review-small" id="legendMarked">0</div> Marked for Review</div>
                  <div class="gate-info-row"><div class="gate-sprite-shape gate-status-answered-review-small" id="legendMarkedAnswered">0</div> Answered &amp; Marked for Review</div>
                </div>
              </div>
            </div>
          </div>
          <div class="gate-calc-icon-con">
            <div class="gate-right-arrow-sprite"></div>
            <a href="javascript:void(0)" class="gate-calc-tooltip-trigger" data-tooltip="Calculator" id="calculatorBtn">
              <div class="gate-calc-icon"></div>
            </a>
          </div>
        </div>
        <div class="gate-time-left-sec">
          <p>Sections</p>
          <p>Time Left : <span id="timeDisplay" style="font-weight:bold">00:00:00</span></p>
        </div>
        <div class="gate-section-tabs-container">
          <div class="gate-section-nav-arrow"><div class="gate-left-arrow-sprite"></div></div>
          <div class="gate-tabs-left" id="sectionTabs"></div>
          <div class="gate-section-nav-arrow"><div class="gate-right-arrow-sprite"></div></div>
        </div>
      </div>
      <div class="gate-top-right">
        <div class="gate-prof-can-name-con">
          <div class="gate-profile-pic"><img src="${import.meta.env.BASE_URL}images/NewCandidateImage.jpg" alt="Candidate" width="60" /></div>
          <div class="gate-candidate-name" id="candidateNameSidebar">AIR 1</div>
        </div>
      </div>
    </div>
    <div class="gate-workspace-bottom">
      <div class="gate-ques-section">
        <div class="gate-question-header">
          <span class="gate-q-type">Question Type: <strong id="questionType">MCQ</strong></span>
          <span class="gate-q-marks">Marks for correct answer: <span class="gate-pos-marks" id="questionMarks">1</span> | Negative Marks: <span class="gate-neg-marks" id="questionNegMarks">0.33</span></span>
        </div>
        <div class="gate-question-area-wrapper">
          <div class="gate-question-content-box">
            <div class="gate-question-number-header">
              <b>Question No. <span id="questionNumber">1</span></b>
              <img src="${import.meta.env.BASE_URL}images/Down.png" class="gate-scroll-btn gate-scroll-down-btn" id="gate-scroll-down" onclick="gateScrollToBottom()" alt="Down" />
            </div>
            <div class="gate-question-scroll-body" id="gate-question-container" onscroll="gateCheckScroll()">
              <div class="gate-question-text" id="questionText">Loading question...</div>
              <div class="gate-options" id="optionsContainer"></div>
            </div>
            <img src="${import.meta.env.BASE_URL}images/Up.png" class="gate-scroll-btn gate-scroll-up-btn" id="gate-scroll-up" onclick="gateScrollToTop()" alt="Up" />
          </div>
          <div class="gate-sidebar-toggle close" onclick="gateToggleSidebar()"></div>
        </div>
        <div class="gate-question-footer">
          <div class="gate-footer-left">
            <button class="gate-footer-btn" id="markReview">Mark for Review &amp; Next</button>
            <button class="gate-footer-btn" id="clearResponse">Clear Response</button>
          </div>
          <div class="gate-footer-right">
            <button class="gate-footer-btn" id="previousBtn">Previous</button>
            <button class="gate-footer-btn gate-btn-primary" id="saveNext">Save &amp; Next</button>
          </div>
        </div>
      </div>
      <div class="gate-right-panel" id="gate-right-panel">
        <div class="gate-status-legend">
          <div class="gate-legend-row">
            <div class="gate-legend-item"><div class="gate-sprite-shape gate-status-answered-small" id="legendAnsweredPanel">0</div><span>Answered</span></div>
            <div class="gate-legend-item"><div class="gate-sprite-shape gate-status-not-answered-small" id="legendNotAnsweredPanel">0</div><span>Not Answered</span></div>
          </div>
          <div class="gate-legend-row">
            <div class="gate-legend-item"><div class="gate-sprite-shape gate-status-not-visited-small" id="legendNotVisitedPanel">0</div><span>Not Visited</span></div>
            <div class="gate-legend-item"><div class="gate-sprite-shape gate-status-review-small" id="legendMarkedPanel">0</div><span>Marked for Review</span></div>
          </div>
          <div class="gate-legend-row">
            <div class="gate-legend-item gate-full-width"><div class="gate-sprite-shape gate-status-answered-review-small" id="legendMarkedAnsweredPanel">0</div><span>Answered &amp; Marked for Review (will also be evaluated)</span></div>
          </div>
        </div>
        <div class="gate-palette-header" id="paletteHeader">Section</div>
        <div class="gate-palette-container">
          <p class="gate-choose-q-text">Choose a Question</p>
          <div class="gate-question-grid" id="questionPalette"></div>
        </div>
        <div class="gate-submit-container">
          <button class="gate-submit-btn gate-exit-btn" id="exitBtn">Exit</button>
          <button class="gate-submit-btn" id="submitBtn">Submit</button>
        </div>
      </div>
    </div>
  </div>
  <div class="gate-version-bar">Version : 17.07.00</div>
  <div id="calculator-modal" class="gate-calc-modal">
    <div class="gate-calc-header" id="calc-header">
      <span class="gate-calc-title">Scientific Calculator</span>
      <div class="gate-calc-controls">
        <button class="gate-calc-help-btn" id="calcHelpBtn">Help</button>
        <button class="gate-calc-window-btn" id="calcMinimizeBtn" title="minimize">—</button>
        <button class="gate-calc-window-btn" id="calcCloseBtn" title="close">×</button>
      </div>
    </div>
    <div class="gate-calc-body" id="calcBody">
      <iframe src="/Calculator/Calculator.html" frameborder="0" width="100%" height="100%"></iframe>
    </div>
  </div>
</div>

<div id="submitModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">Submit Confirmation</div>
    <p>Are you sure you want to submit the test?</p>
    <div class="summary-grid" id="summaryGrid"></div>
    <div class="modal-buttons">
      <button class="btn btn-cancel" id="cancelSubmit">Cancel</button>
      <button class="btn btn-confirm" id="confirmSubmit">Submit</button>
    </div>
  </div>
</div>

<div id="questionPaperModal" class="question-paper-modal" style="display:none">
  <div class="question-paper-container">
    <div class="question-paper-header">
      <h2>Question Paper</h2>
      <button class="qp-close-btn" id="closeQuestionPaperBtn">Close <span>×</span></button>
    </div>
    <div class="qp-warning-bar">Note that the timer is ticking while you read this question paper.</div>
    <div class="question-paper-content" id="questionPaperContent"></div>
  </div>
</div>

<button id="scrollToTopBtn" class="scroll-to-top" title="Go to top">&#8679;</button>
`
