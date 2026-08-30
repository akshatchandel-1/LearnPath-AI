/**
 * LearnPath AI â€” Client-Side Report Generator Utility
 * Generates beautifully styled, printable PDF documents for Skill Gaps and Progress Analytics.
 */

export const generateSkillGapReportPDF = (reportData, user) => {
  const targetRole = user?.targetRole || user?.careerGoal || reportData?.targetRole || 'Full Stack Developer';
  const readinessScore = reportData?.readinessScore ?? 0;
  const gaps = reportData?.gaps || [];
  const criticalGaps = reportData?.criticalGaps || [];
  const userName = user?.name || 'Learner';
  const userEmail = user?.email || 'learner@learnpath.ai';
  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download and print your Skill Gap Report.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>LearnPath AI â€” Skill Gap Competency Audit</title>
      <style>
        @page { size: A4; margin: 18mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #111418;
          background: #ffffff;
          line-height: 1.5;
          margin: 0;
          padding: 24px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #FF6B5F;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .brand {
          font-size: 24px;
          font-weight: 900;
          color: #111418;
        }
        .brand span {
          color: #FF6B5F;
        }
        .report-meta {
          text-align: right;
          font-size: 11px;
          color: #5F6368;
        }
        .hero {
          background: #FAF7F2;
          border: 1px solid #E6E0D7;
          border-radius: 12px;
          padding: 18px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .hero-title {
          font-size: 16px;
          font-weight: 800;
          color: #111418;
          margin-bottom: 4px;
        }
        .hero-subtitle {
          font-size: 12px;
          color: #5F6368;
        }
        .hero-score {
          text-align: center;
          background: #FFFFFF;
          border: 1px solid #FF6B5F;
          padding: 10px 18px;
          border-radius: 10px;
        }
        .score-num {
          font-size: 28px;
          font-weight: 900;
          color: #FF6B5F;
          font-family: monospace;
        }
        .score-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #5F6368;
        }
        h2 {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #111418;
          margin-top: 24px;
          margin-bottom: 12px;
          border-left: 4px solid #FF6B5F;
          padding-left: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 24px;
          font-size: 12px;
        }
        th {
          background: #F5F1E8;
          color: #111418;
          font-weight: 800;
          text-align: left;
          padding: 10px;
          border-bottom: 1px solid #D5CFC4;
        }
        td {
          padding: 10px;
          border-bottom: 1px solid #EAE5DC;
          color: #333;
        }
        .priority-high {
          color: #D93829;
          font-weight: 700;
          background: #FDF0EE;
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
        }
        .priority-med {
          color: #B45309;
          font-weight: 700;
          background: #FEF3C7;
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
        }
        .priority-low {
          color: #047857;
          font-weight: 700;
          background: #D1FAE5;
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
        }
        .actions-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px;
          font-size: 12px;
          line-height: 1.6;
        }
        .footer {
          margin-top: 40px;
          padding-top: 12px;
          border-top: 1px solid #E6E0D7;
          font-size: 10px;
          color: #8C877D;
          text-align: center;
        }
        @media print {
          body { padding: 0; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">LearnPath <span>AI</span></div>
          <div style="font-size: 11px; color: #8C877D; font-weight: 600;">AI-Powered Competency Recommender</div>
        </div>
        <div class="report-meta">
          <div><strong>Candidate:</strong> ${userName} (${userEmail})</div>
          <div><strong>Generated:</strong> ${generatedDate}</div>
          <div><strong>Report ID:</strong> LP-SKILL-${Math.random().toString(36).substring(2, 9).toUpperCase()}</div>
        </div>
      </div>

      <div class="hero">
        <div>
          <div class="hero-title">Target Career Role: ${targetRole}</div>
          <div class="hero-subtitle">Comprehensive Competency Delta & AI Curriculum Recommendations</div>
        </div>
        <div class="hero-score">
          <div class="score-num">${readinessScore}%</div>
          <div class="score-label">Role Readiness</div>
        </div>
      </div>

      <h2>1. Competency Matrix & Gap Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Skill / Competency</th>
            <th>Domain Category</th>
            <th>Current Verified</th>
            <th>Target Benchmark</th>
            <th>Gap Disparity</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          ${gaps.map(g => `
            <tr>
              <td><strong>${g.skill}</strong></td>
              <td>${g.category || 'General'}</td>
              <td>${g.currentLevel || 50}%</td>
              <td>${g.targetLevel || 85}%</td>
              <td style="color: #FF6B5F; font-weight: 700;">${g.gapDisparity || (g.targetLevel - g.currentLevel) + '%'}</td>
              <td>
                <span class="${g.priority === 'High' ? 'priority-high' : g.priority === 'Medium' ? 'priority-med' : 'priority-low'}">
                  ${g.priority}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>2. AI Strategic Recommendations & Next Steps</h2>
      <div class="actions-box">
        <p><strong>Primary Focus Areas:</strong> ${criticalGaps.length > 0 ? criticalGaps.join(', ') : 'Core Architecture and API Design'}</p>
        <p>Based on your current skill telemetry for <strong>${targetRole}</strong>, we recommend prioritizing the high-priority modules above to achieve production readiness. Complete the recommended bridge courses and take verified checkpoint quizzes to elevate your overall match score.</p>
      </div>

      <div class="footer">
        Â© 2026 LearnPath AI Platform â€¢ This competency report is generated deterministically based on learner activity telemetry and assessment benchmark data.
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

export const generateProgressReportPDF = (progressData, user, enrolledCourses = [], completedAssessments = []) => {
  const userName = user?.name || 'Learner';
  const userEmail = user?.email || 'learner@learnpath.ai';
  const targetRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';
  const userStreak = user?.streakDays ?? user?.streak ?? 0;
  const userXp = user?.totalXp || 0;
  const userHours = user?.completedHours || progressData?.totalTimeSpentHours || 0;
  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to download and print your Progress Report.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>LearnPath AI â€” Learning Journey & Study Progress Audit</title>
      <style>
        @page { size: A4; margin: 18mm; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #111418;
          background: #ffffff;
          line-height: 1.5;
          margin: 0;
          padding: 24px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #FF6B5F;
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .brand {
          font-size: 24px;
          font-weight: 900;
          color: #111418;
        }
        .brand span {
          color: #FF6B5F;
        }
        .report-meta {
          text-align: right;
          font-size: 11px;
          color: #5F6368;
        }
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .metric-card {
          background: #FAF7F2;
          border: 1px solid #E6E0D7;
          border-radius: 10px;
          padding: 14px;
          text-align: center;
        }
        .metric-val {
          font-size: 22px;
          font-weight: 900;
          color: #FF6B5F;
          font-family: monospace;
        }
        .metric-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #5F6368;
          margin-top: 2px;
        }
        h2 {
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #111418;
          margin-top: 20px;
          margin-bottom: 10px;
          border-left: 4px solid #FF6B5F;
          padding-left: 8px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 11px;
        }
        th {
          background: #F5F1E8;
          color: #111418;
          font-weight: 800;
          text-align: left;
          padding: 8px 10px;
          border-bottom: 1px solid #D5CFC4;
        }
        td {
          padding: 8px 10px;
          border-bottom: 1px solid #EAE5DC;
          color: #333;
        }
        .footer {
          margin-top: 40px;
          padding-top: 12px;
          border-top: 1px solid #E6E0D7;
          font-size: 10px;
          color: #8C877D;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="brand">LearnPath <span>AI</span></div>
          <div style="font-size: 11px; color: #8C877D; font-weight: 600;">Personalized Learning & Study Analytics</div>
        </div>
        <div class="report-meta">
          <div><strong>Candidate:</strong> ${userName} (${userEmail})</div>
          <div><strong>Career Target:</strong> ${targetRole}</div>
          <div><strong>Generated:</strong> ${generatedDate}</div>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-val">${userHours} hrs</div>
          <div class="metric-label">Study Time Logged</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">${userStreak} Days</div>
          <div class="metric-label">Active Streak</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">+${userXp} XP</div>
          <div class="metric-label">Total XP Earned</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">${enrolledCourses.length}</div>
          <div class="metric-label">Active Courses</div>
        </div>
      </div>

      <h2>1. Active Course Enrollments</h2>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Progress</th>
            <th>Lessons Completed</th>
          </tr>
        </thead>
        <tbody>
          ${enrolledCourses.length > 0 ? enrolledCourses.map(c => `
            <tr>
              <td><strong>${c.title}</strong></td>
              <td>${c.category}</td>
              <td>${c.difficulty}</td>
              <td>${c.progress}%</td>
              <td>${c.completedLessons || 0}/${c.totalLessons || 0}</td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="5" style="text-align: center; color: #8C877D; padding: 14px;">No courses currently enrolled.</td>
            </tr>
          `}
        </tbody>
      </table>

      <h2>2. Checkpoint & Assessment Scores</h2>
      <table>
        <thead>
          <tr>
            <th>Assessment Name</th>
            <th>Skill Domain</th>
            <th>Status</th>
            <th>Latest Score</th>
            <th>Attempts</th>
          </tr>
        </thead>
        <tbody>
          ${completedAssessments.length > 0 ? completedAssessments.map(a => `
            <tr>
              <td><strong>${a.title}</strong></td>
              <td>${a.skill || a.category}</td>
              <td style="color: ${a.status === 'Passed' ? '#047857' : '#B45309'}; font-weight: 700;">${a.status}</td>
              <td>${a.lastScore !== null ? a.lastScore + '%' : 'Pending'}</td>
              <td>${a.attemptsCount || 1}</td>
            </tr>
          `).join('') : `
            <tr>
              <td colspan="5" style="text-align: center; color: #8C877D; padding: 14px;">No assessments completed yet. Take a skill checkpoint in the Assessments tab.</td>
            </tr>
          `}
        </tbody>
      </table>

      <div class="footer">
        Â© 2026 LearnPath AI Platform â€¢ Official Learning Progress & Analytics Record
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};

