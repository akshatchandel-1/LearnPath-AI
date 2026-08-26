/**
 * Comprehensive E2E Verification & Audit Test Suite for LearnPath AI
 * Tests all 21 key application features and API endpoints.
 */

const API_BASE = 'http://localhost:5000/api';

async function runAudit() {
  console.log('\n============================================================');
  console.log('🚀 RUNNING COMPREHENSIVE E2E AUDIT: LEARNPATH AI');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`⏳ Testing: ${name}... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log(`❌ FAILED: ${err.message}`);
      failed++;
    }
  }

  // 1. Health Endpoint
  await test('GET /api/health', async () => {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (data.status !== 'healthy') throw new Error('Status not healthy');
  });

  // 2. Demo Login
  let authToken = '';
  let demoUserId = '';
  await test('POST /api/auth/demo-login', async () => {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.token) throw new Error('No token returned');
    authToken = data.token;
    demoUserId = data.user._id;
  });

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  };

  // 3. User /me
  await test('GET /api/auth/me', async () => {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.user || !data.user.email) throw new Error('User not returned');
  });

  // 4. Skills Taxonomy
  await test('GET /api/skills', async () => {
    const res = await fetch(`${API_BASE}/skills`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.skills) || data.skills.length === 0) throw new Error('Skills empty');
  });

  // 5. Skill Gap Analysis
  await test('GET /api/skills/gap-analysis', async () => {
    const res = await fetch(`${API_BASE}/skills/gap-analysis`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.gapReport || !data.gapReport.gaps) throw new Error('Gap report missing');
  });

  // 6. Resources Catalog
  await test('GET /api/resources', async () => {
    const res = await fetch(`${API_BASE}/resources`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.resources) || data.resources.length === 0) throw new Error('Resources empty');
  });

  // 7. ML Recommendations
  let sampleRecId = '';
  await test('GET /api/recommendations', async () => {
    const res = await fetch(`${API_BASE}/recommendations`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.recommendations) || data.recommendations.length === 0) throw new Error('No recommendations');
    sampleRecId = data.recommendations[0]._id;
  });

  // 8. Recommendation Feedback
  if (sampleRecId) {
    await test('POST /api/recommendations/:id/feedback', async () => {
      const res = await fetch(`${API_BASE}/recommendations/${sampleRecId}/feedback`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ helpful: true, difficultyRating: 'Just Right' }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
    });
  }

  // 9. Learning Path (Roadmap)
  await test('GET /api/learning-path', async () => {
    const res = await fetch(`${API_BASE}/learning-path`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.learningPath || !data.learningPath.phases) throw new Error('Roadmap missing');
  });

  // 10. Adaptive Roadmap Recalibration
  await test('POST /api/learning-path/adapt', async () => {
    const res = await fetch(`${API_BASE}/learning-path/adapt`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ skill: 'JavaScript', percentage: 95 }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 11. Projects Blueprints
  await test('GET /api/projects', async () => {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data.projects) || data.projects.length === 0) throw new Error('No projects');
  });

  // 12. AI Quiz Generator
  let quizId = '';
  await test('POST /api/quiz/generate', async () => {
    const res = await fetch(`${API_BASE}/quiz/generate`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ skill: 'JavaScript', difficulty: 'Intermediate' }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.quiz || !data.quiz.questions) throw new Error('Quiz missing');
    quizId = data.quiz._id;
  });

  // 13. Quiz Submission & Skill Calibration
  if (quizId) {
    await test('POST /api/quiz/submit', async () => {
      const res = await fetch(`${API_BASE}/quiz/submit`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          quizId,
          answers: [
            { questionIndex: 0, selectedOption: 2 },
            { questionIndex: 1, selectedOption: 0 },
            { questionIndex: 2, selectedOption: 1 },
          ],
        }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      if (!data.result) throw new Error('Result missing');
    });
  }

  // 14. Quiz History
  await test('GET /api/quiz/history', async () => {
    const res = await fetch(`${API_BASE}/quiz/history`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 15. AI Mentor Chatbot
  await test('POST /api/ai/chat', async () => {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify({ message: 'Why should I learn Node.js now?' }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.message || !data.message.content) throw new Error('No mentor message');
  });

  // 16. AI Mentor Conversation History
  await test('GET /api/ai/conversation', async () => {
    const res = await fetch(`${API_BASE}/ai/conversation`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 17. AI Insights
  await test('GET /api/ai/insights', async () => {
    const res = await fetch(`${API_BASE}/ai/insights`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 18. Analytics Dashboard Metrics
  await test('GET /api/analytics/dashboard', async () => {
    const res = await fetch(`${API_BASE}/analytics/dashboard`, { headers: authHeaders });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const data = await res.json();
    if (!data.analytics) throw new Error('Analytics missing');
  });

  // 19. Goal NLP Analyzer
  await test('POST /api/ai/analyze-goal', async () => {
    const res = await fetch(`${API_BASE}/ai/analyze-goal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goalText: 'I want to build full stack web apps with React and Node' }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 20. Skill NLP Analyzer
  await test('POST /api/ai/analyze-skills', async () => {
    const res = await fetch(`${API_BASE}/ai/analyze-skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'I know HTML, CSS and basic JS' }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  // 21. Profile Update
  await test('PUT /api/profile', async () => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: authHeaders,
      body: JSON.stringify({
        careerGoal: 'Full Stack MERN Developer',
        weeklyStudyHours: 14,
      }),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
  });

  console.log('\n============================================================');
  console.log(`📊 FINAL AUDIT RESULT: ${passed} PASSED / ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
  console.log('============================================================\n');

  if (failed === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runAudit();
