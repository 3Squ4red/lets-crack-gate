import { useEffect } from 'react'
import { useStyles } from '../hooks/useStyles'
import { injectScript, cleanupScripts } from '../utils/scripts'

export default function AnalyticsPage() {
  useStyles(['/css/exam_style.css', '/css/analytics_style.css', '/css/home.css', '/css/theme_overrides.css'])
  useEffect(() => {
    const dark = localStorage.getItem('darkMode');
    if (dark === 'true') document.documentElement.setAttribute('data-theme', 'dark');

    async function boot() {
      await injectScript('/js/db.js');
      await injectScript('/js/dark_mode.js');
      await injectScript('/js/subject_detector.js');
      await injectScript('/js/analytics_script.js?v=2');
      document.dispatchEvent(new Event('DOMContentLoaded'));
    }
    boot();

    return () => { cleanupScripts() }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: analyticsHTML }} />;
}

const analyticsHTML = `
<div class="analytics-container">
  <div class="top-header">
    <div class="logo-area"><div class="gate-logo-circle"><img src="${import.meta.env.BASE_URL}images/logo_iit_madras_without_background.png" alt="logo"></div></div>
    <div class="header-title-area">
      <div class="exam-center-name">GRADUATE APTITUDE TEST IN ENGINEERING (GATE 2027)</div>
      <div class="organizing-institute">INDIAN INSTITUTE OF TECHNOLOGY MADRAS</div>
    </div>
    <div class="header-right-logos">
      <button class="dark-mode-toggle standalone" id="darkModeToggle" title="Toggle Dark Mode" style="position:static;margin-right:15px;">
        <span class="icon-moon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg></span><span class="icon-sun"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg></span>
      </button>
      <div class="gate-logo-circle"><img src="${import.meta.env.BASE_URL}images/bombayTheGoal.png" alt="The Goal"></div>
    </div>
  </div>
  <div class="nav-bar">
    <a href="${import.meta.env.BASE_URL}" class="nav-btn">⬅️ Back to Home</a>
    <h2 style="margin:0;color:white;">📊 AI Analytics Dashboard</h2>
    <div style="width:120px;"></div>
  </div>
  <div class="dashboard-content">
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-title">Total Tests Taken</div><div class="stat-value" id="totalTestsVal">0</div></div>
      <div class="stat-card"><div class="stat-title">Average Score</div><div class="stat-value" id="avgScoreVal">0%</div></div>
      <div class="stat-card"><div class="stat-title">Total Time Spent</div><div class="stat-value" id="totalTimeVal">0h 0m</div></div>
      <div class="stat-card"><div class="stat-title">Avg. Accuracy</div><div class="stat-value" id="avgAccuracyVal">0%</div></div>
    </div>
    <div class="charts-layout">
      <div class="chart-card full-width"><h3 class="chart-title">📈 Score Progress Over Time</h3><div class="chart-wrapper"><canvas id="progressChart"></canvas></div></div>
      <div class="chart-card half-width"><h3 class="chart-title">🎯 Concept Weak Areas (Most Wrong)</h3><div class="chart-wrapper"><canvas id="weakAreasChart"></canvas></div></div>
      <div class="chart-card half-width"><h3 class="chart-title">🚨 Negative Marking Trend</h3><div class="chart-wrapper"><canvas id="negativeMarksChart"></canvas></div></div>
    </div>
    <div class="subject-analytics-section">
      <h3 class="section-heading">📚 Subject-Wise Performance</h3>
      <div id="subjectNoData" style="display:none;text-align:center;padding:30px;color:var(--text-color);opacity:0.7;"><p>No subject-specific exams found yet.</p></div>
      <div id="subjectChartsArea">
        <div class="subject-filter-bar">
          <label for="subjectSourceFilter">📁 Filter by Source:</label>
          <select id="subjectSourceFilter" class="subject-filter-select"><option value="all">All Sources</option></select>
        </div>
        <div class="charts-layout">
          <div class="chart-card half-width"><h3 class="chart-title">🎯 Performance Comparison</h3><div class="chart-wrapper"><canvas id="subjectRadarChart"></canvas></div></div>
          <div class="chart-card half-width"><h3 class="chart-title">📊 Accuracy by Subject</h3><div class="chart-wrapper" style="height:400px;"><canvas id="subjectBarChart"></canvas></div></div>
        </div>
        <div class="chart-card full-width" style="margin-bottom:20px;">
          <h3 class="chart-title">📈 Subject Score Trend</h3>
          <div class="subject-filter-bar" style="margin-bottom:10px;">
            <label for="subjectTrendSelect">Select Subject:</label>
            <select id="subjectTrendSelect" class="subject-filter-select"><option value="">-- Select --</option></select>
          </div>
          <div class="chart-wrapper"><canvas id="subjectTrendChart"></canvas></div>
        </div>
        <div class="subject-table-container">
          <table class="subject-table" id="subjectTable">
            <thead><tr><th>Subject</th><th>Tests</th><th>Avg Score %</th><th>Accuracy %</th><th>Correct</th><th>Incorrect</th><th>Unanswered</th><th>Neg. Marks</th><th>Strength</th></tr></thead>
            <tbody id="subjectTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="charts-layout">
      <div class="chart-card half-width"><h3 class="chart-title">⏱️ Time Efficiency</h3><div class="chart-wrapper"><canvas id="timeEfficiencyChart"></canvas></div></div>
      <div class="chart-card half-width"><h3 class="chart-title">🔠 Question Type Mastery</h3><div class="chart-wrapper"><canvas id="questionMasteryChart"></canvas></div></div>
    </div>
    <div id="aiInsightsSection" class="insights-section" style="margin-top:30px;">
      <h3 class="chart-title" style="margin-bottom:15px;">🤖 AI Strategic Insights</h3>
      <div id="aiInsightsContent" style="color:var(--text-color);">Loading insights...</div>
    </div>
  </div>
</div>
`;
