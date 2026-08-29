/**
 * LearnPath AI — AI/ML Comprehensive Test Suite
 * Tests AI Learning Roadmap Generator, Recalibration, Intent Classification,
 * Zero-Hallucination Telemetry Reporting, Skill Gap Remediation, and AI Assistant Chat Engine.
 */

import {
  generateRoadmap,
  recalibrateRoadmap,
  generateAssistantResponse,
  RoadmapGenerator,
  ROLE_TEMPLATES,
  getRoleTemplate,
  SKILL_TAXONOMY,
  normalizeSkillName,
  ContextManager
} from './index.js';

console.log('\n============================================================');
console.log('🤖 RUNNING AI-ML COMPREHENSIVE VERIFICATION TEST SUITE');
console.log('============================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASSED: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAILED: ${message}`);
    failed++;
  }
}

async function runTests() {
  // ==========================================
  // 1. ROADMAP GENERATOR: MERN Stack Developer
  // ==========================================
  console.log('\n--- 1. Roadmap Generation: MERN Stack Developer (Fresh Learner) ---');
  const mernInput = {
    targetRole: 'MERN Stack Developer',
    weeklyHours: 10,
    currentSkills: [
      { name: 'HTML', level: 80 },
      { name: 'React', level: 40 }
    ]
  };

  const mernRoadmap = generateRoadmap(mernInput);
  assert(mernRoadmap.targetRole === 'MERN Stack Developer', 'Target role preserved as MERN Stack Developer');
  assert(typeof mernRoadmap.estimatedWeeks === 'number' && mernRoadmap.estimatedWeeks > 0, `Estimated weeks calculated (${mernRoadmap.estimatedWeeks} weeks)`);
  assert(Array.isArray(mernRoadmap.phases) && mernRoadmap.phases.length === 4, `4 curriculum phases generated (found ${mernRoadmap.phases.length})`);
  assert(mernRoadmap.phases[0].modules.length > 0, 'Phase 1 contains structured modules');
  assert(typeof mernRoadmap.phases[0].modules[0].estimatedHours === 'number', 'Modules contain numeric estimatedHours');

  // Verify skill hours calibration (HTML was 80%, so HTML module hours should be reduced)
  const htmlModule = mernRoadmap.phases[0].modules.find(m => m.title.toLowerCase().includes('html'));
  assert(htmlModule && htmlModule.estimatedHours <= 4, `Mastered skill (HTML 80%) has calibrated reduced hours (${htmlModule?.estimatedHours}h vs baseline 8h)`);

  // ==========================================
  // 2. ROADMAP GENERATOR: Data Scientist
  // ==========================================
  console.log('\n--- 2. Roadmap Generation: Data Scientist (Partial Skills) ---');
  const dataSciInput = {
    targetRole: 'Data Scientist',
    weeklyHours: 8,
    currentSkills: [
      { name: 'Python', level: 85 },
      { name: 'Pandas', level: 75 },
      { name: 'SQL', level: 60 }
    ]
  };

  const dataSciRoadmap = generateRoadmap(dataSciInput);
  assert(dataSciRoadmap.targetRole === 'Data Scientist', 'Target role set to Data Scientist');
  assert(dataSciRoadmap.phases[0].title.includes('Python') || dataSciRoadmap.phases[0].title.includes('Exploratory'), 'Phase 1 covers Python/EDA');
  assert(dataSciRoadmap.phases[1].title.includes('Machine Learning'), 'Phase 2 covers Machine Learning');
  assert(dataSciRoadmap.phases[3].title.includes('Deep Learning'), 'Phase 4 covers Deep Learning & MLOps');

  // ==========================================
  // 3. ROADMAP GENERATOR: Cloud Engineer & Frontend
  // ==========================================
  console.log('\n--- 3. Roadmap Generation: Cloud Engineer & Frontend Developer ---');
  const cloudRoadmap = generateRoadmap({
    targetRole: 'Cloud Engineer',
    weeklyHours: 15,
    currentSkills: [
      { name: 'Linux', level: 90 },
      { name: 'Docker', level: 85 }
    ]
  });
  assert(cloudRoadmap.targetRole === 'Cloud Engineer', 'Target role set to Cloud Engineer');
  assert(cloudRoadmap.phases.some(p => p.skills.includes('AWS') || p.skills.includes('Terraform') || p.skills.includes('Kubernetes')), 'Cloud roadmap includes AWS/Terraform/Kubernetes');

  const frontendRoadmap = generateRoadmap({
    targetRole: 'Frontend Developer',
    weeklyHours: 5,
    currentSkills: []
  });
  assert(frontendRoadmap.targetRole === 'Frontend Developer', 'Target role set to Frontend Developer');
  assert(frontendRoadmap.estimatedWeeks >= 15, `Low weekly hours (5h/w) yields realistic longer timeline (${frontendRoadmap.estimatedWeeks} weeks)`);

  // ==========================================
  // 4. ROADMAP GENERATOR: Arbitrary Custom Role
  // ==========================================
  console.log('\n--- 4. Roadmap Generation: Custom Specialization Synthesis ---');
  const customRoadmap = generateRoadmap({
    targetRole: 'Rust Systems Architect',
    weeklyHours: 12,
    currentSkills: [{ name: 'C++', level: 70 }]
  });
  assert(customRoadmap.targetRole === 'Rust Systems Architect', 'Synthesizes custom role Rust Systems Architect');
  assert(customRoadmap.phases.length === 4, 'Generates 4 structured phases for custom role');
  assert(customRoadmap.phases[0].title.includes('Rust Systems Architect'), 'Custom title injected into phase blueprints');

  // ==========================================
  // 5. ROADMAP RECALIBRATION & IMMUTABILITY
  // ==========================================
  console.log('\n--- 5. Roadmap Recalibration & Immutability Guarantee ---');
  const initialRoadmap = generateRoadmap({
    targetRole: 'MERN Stack Developer',
    weeklyHours: 10,
    currentSkills: []
  });

  const originalCopy = JSON.stringify(initialRoadmap);

  const recalibratedRoadmap = recalibrateRoadmap({
    existingRoadmap: initialRoadmap,
    newTargetRole: 'Data Scientist',
    currentSkills: [{ name: 'Python', level: 90 }],
    weeklyHours: 8
  });

  assert(recalibratedRoadmap.targetRole === 'Data Scientist', 'Recalibrated roadmap updated to Data Scientist');
  assert(recalibratedRoadmap.phases[0].title.includes('Python') || recalibratedRoadmap.phases[0].title.includes('Exploratory'), 'Recalibrated roadmap has Data Science phases');
  assert(JSON.stringify(initialRoadmap) === originalCopy, 'Original roadmap was NOT mutated during recalibration (immutability preserved)');

  // ==========================================
  // 6. AI ASSISTANT: Skill Gap Remediation ("I am weak in JavaScript. What should I study?")
  // ==========================================
  console.log('\n--- 6. AI Assistant: Skill Gap Remediation (JavaScript) ---');
  const jsGapQuery = {
    message: 'I am weak in JavaScript. What should I study?',
    targetRole: 'Node.js Developer',
    currentSkills: [{ name: 'JavaScript', level: 35 }],
    learningContext: { currentPhase: 2 }
  };

  const jsGapResponse = await generateAssistantResponse(jsGapQuery);
  assert(jsGapResponse.response.includes('JavaScript'), 'Identified JavaScript as target focus skill');
  assert(jsGapResponse.response.includes('35%'), 'Includes user current verified level (35%)');
  assert(jsGapResponse.response.includes('Async') || jsGapResponse.response.includes('Promises') || jsGapResponse.response.includes('Event Loop'), 'Outlines concrete JavaScript subtopics');
  assert(jsGapResponse.response.includes('AbortController') || jsGapResponse.response.includes('Practice'), 'Includes targeted hands-on practice exercise');
  assert(Array.isArray(jsGapResponse.suggestedActions) && jsGapResponse.suggestedActions.some(a => a.action === 'GENERATE_QUIZ'), 'Returns interactive GENERATE_QUIZ action button');
  assert(jsGapResponse.suggestedActions.some(a => a.action === 'OPEN_URL' || a.action === 'NAVIGATE_COURSES'), 'Returns documentation/course action buttons');

  // Dynamic Skill Gap: Python
  console.log('\n--- 6b. AI Assistant: Dynamic Skill Gap Remediation (Python) ---');
  const pyGapQuery = {
    message: 'I am weak in Python. What should I study?',
    targetRole: 'Data Scientist',
    currentSkills: [],
    learningContext: { currentPhase: 1 }
  };
  const pyGapResponse = await generateAssistantResponse(pyGapQuery);
  assert(pyGapResponse.response.includes('Python'), 'Identified Python as target focus skill');
  assert(pyGapResponse.response.includes('not yet recorded'), 'Explicitly notes unrecorded mastery level without hallucinating');
  assert(pyGapResponse.response.includes('Data Structures') || pyGapResponse.response.includes('NumPy') || pyGapResponse.response.includes('Decorators'), 'Outlines Python-specific subtopics');

  // ==========================================
  // 7. AI ASSISTANT: Telemetry & Metrics (Zero Hallucination Guardrails)
  // ==========================================
  console.log('\n--- 7. AI Assistant: Progress Telemetry (Completed Courses = 0) ---');
  const zeroCoursesQuery = {
    message: 'How many courses have I completed?',
    targetRole: 'Full Stack Developer',
    userMetrics: { completedCoursesCount: 0, completedCourses: [] }
  };
  const zeroCoursesResponse = await generateAssistantResponse(zeroCoursesQuery);
  assert(zeroCoursesResponse.response.includes('0 courses') || zeroCoursesResponse.response.includes('0 course'), 'Explicitly answers 0 courses completed');

  console.log('\n--- 7b. AI Assistant: Progress Telemetry (Completed Courses > 0) ---');
  const positiveCoursesQuery = {
    message: 'How many courses have I completed?',
    targetRole: 'Full Stack Developer',
    userMetrics: {
      completedCoursesCount: 3,
      completedCourses: [
        { id: 'c1', title: 'Modern JavaScript Essentials' },
        { id: 'c2', title: 'React 18 Architecture' },
        { id: 'c3', title: 'Node.js REST Services' }
      ]
    }
  };
  const positiveCoursesResponse = await generateAssistantResponse(positiveCoursesQuery);
  assert(positiveCoursesResponse.response.includes('3 courses'), 'Accurately reports 3 completed courses');
  assert(positiveCoursesResponse.response.includes('React 18 Architecture'), 'Lists verified completed tracks');

  console.log('\n--- 7c. AI Assistant: Progress Telemetry (Unavailable Metrics) ---');
  const unavailQuery = {
    message: 'How many courses have I completed?',
    targetRole: 'Full Stack Developer',
    userMetrics: {} // No fake metrics supplied
  };
  const unavailResponse = await generateAssistantResponse(unavailQuery);
  assert(unavailResponse.response.includes("don't currently have") || unavailResponse.response.includes("unavailable"), 'Explicitly states telemetry is unavailable without guessing');

  console.log('\n--- 7d. AI Assistant: Progress Telemetry (XP & Streak) ---');
  const xpStreakQuery = {
    message: 'How much XP have I earned and what is my current streak?',
    targetRole: 'Full Stack Developer',
    userMetrics: { totalXp: 850, streakDays: 5 }
  };
  const xpResponse = await generateAssistantResponse({
    message: 'How much XP have I earned?',
    userMetrics: { totalXp: 850 }
  });
  assert(xpResponse.response.includes('850 XP'), 'Accurately reports 850 XP without fabrication');

  const streakResponse = await generateAssistantResponse({
    message: "What's my current streak?",
    userMetrics: { streakDays: 7 }
  });
  assert(streakResponse.response.includes('7 days'), 'Accurately reports 7 days streak');

  // ==========================================
  // 8. AI ASSISTANT: Quiz & Resource Requests
  // ==========================================
  console.log('\n--- 8. AI Assistant: Interactive Quiz & Resource Requests ---');
  const quizGenQuery = {
    message: 'Create a 3-question quiz for JavaScript',
    targetRole: 'Frontend Developer'
  };
  const quizGenResponse = await generateAssistantResponse(quizGenQuery);
  assert(quizGenResponse.suggestedActions.some(a => a.action === 'GENERATE_QUIZ' && a.payload?.skill === 'JavaScript' && a.payload?.count === 3), 'Returns GENERATE_QUIZ action for JavaScript with count 3');

  const resourceQuery = {
    message: 'Give me React documentation and resources',
    targetRole: 'Frontend Developer'
  };
  const resourceResponse = await generateAssistantResponse(resourceQuery);
  assert(resourceResponse.response.includes('react.dev') || resourceResponse.response.includes('Documentation'), 'Provides verified documentation references');
  assert(resourceResponse.suggestedActions.some(a => a.action === 'OPEN_URL'), 'Returns OPEN_URL action button');

  // ==========================================
  // 9. AI ASSISTANT: Programming Explanations & Interview Prep
  // ==========================================
  console.log('\n--- 9. AI Assistant: Coding & Interview Prompts ---');
  const hooksResponse = await generateAssistantResponse({
    message: 'Explain React hooks with an example',
    targetRole: 'MERN Stack Developer'
  });
  assert(hooksResponse.response.includes('useState') && hooksResponse.response.includes('useEffect'), 'Explains React hooks');
  assert(hooksResponse.response.includes('```javascript'), 'Includes syntax-highlighted code block');

  const interviewResponse = await generateAssistantResponse({
    message: 'Prepare me for a backend interview',
    targetRole: 'Backend Developer'
  });
  assert(interviewResponse.response.includes('libuv') || interviewResponse.response.includes('Event Loop') || interviewResponse.response.includes('Interview'), 'Provides backend interview preparation');

  // ==========================================
  // 10. ERROR HANDLING & EDGE CASES
  // ==========================================
  console.log('\n--- 10. Error Handling & Edge Cases ---');
  const nullRoadmap = generateRoadmap(null);
  assert(nullRoadmap && Array.isArray(nullRoadmap.phases), 'generateRoadmap(null) handles null gracefully without crashing');

  const emptyAssistant = await generateAssistantResponse({});
  assert(emptyAssistant && typeof emptyAssistant.response === 'string', 'generateAssistantResponse({}) handles empty input gracefully');

  const invalidHoursRoadmap = generateRoadmap({ targetRole: 'Frontend Developer', weeklyHours: -5 });
  assert(invalidHoursRoadmap.estimatedWeeks > 0, 'Negative weekly hours clamped to safe minimum');

  const nonStringAssistant = await generateAssistantResponse({ message: 12345 });
  assert(nonStringAssistant && typeof nonStringAssistant.response === 'string', 'Non-string message handled gracefully');

  console.log('\n============================================================');
  console.log(`📊 AI-ML TEST SUITE RESULT: ${passed} PASSED / ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
  console.log('============================================================\n');

  if (failed === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests();
