/**
 * LearnPath AI — AI Assistant Full End-to-End Functional Verification Suite
 * Tests intent classification, dynamic skill gap generation, zero-hallucination metrics,
 * structured action payloads, and multi-skill generalization.
 */

import { generateAssistantResponse } from './ai-ml/assistant/index.js';
import { extractSkillFromQuery, buildPromptForMessage } from './ai-ml/assistant/prompts/index.js';
import { ContextManager } from './ai-ml/assistant/context/contextManager.js';

console.log('\n============================================================');
console.log('🧪 RUNNING AI ASSISTANT FULL END-TO-END VERIFICATION');
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

async function runVerification() {
  // ── TEST 1: "I am weak in JavaScript. What should I study?" ──
  console.log('\n--- 1. Testing: "I am weak in JavaScript. What should I study?" ---');
  const jsPayload = {
    message: 'I am weak in JavaScript. What should I study?',
    targetRole: 'Node.js Developer',
    currentSkills: [{ name: 'JavaScript', level: 35 }],
    learningContext: { currentPhase: 2 }
  };
  const jsRes = await generateAssistantResponse(jsPayload);
  
  assert(jsRes.response.includes('JavaScript'), 'Mentions JavaScript');
  assert(jsRes.response.includes('Node.js Developer'), 'Mentions active target role Node.js Developer');
  assert(jsRes.response.includes('35%'), 'Includes calibrated verified level 35%');
  assert(jsRes.response.includes('Phase 2'), 'Includes active Phase 2 roadmap alignment');
  assert(jsRes.response.includes('Async') || jsRes.response.includes('Promises'), 'Subtopic: Async/Promises included');
  assert(jsRes.response.includes('Event Loop'), 'Subtopic: Event Loop included');
  assert(jsRes.response.includes('Closures') || jsRes.response.includes('Scope'), 'Subtopic: Closures/Scope included');
  assert(jsRes.response.includes('AbortController') || jsRes.response.includes('practice'), 'Hands-on practice exercise included');
  assert(Array.isArray(jsRes.suggestedActions) && jsRes.suggestedActions.length >= 2, 'Returns structured action buttons');
  
  const quizAction = jsRes.suggestedActions.find(a => a.action === 'GENERATE_QUIZ');
  assert(quizAction && quizAction.payload?.skill === 'JavaScript', 'Action: GENERATE_QUIZ with skill payload JavaScript');
  assert(quizAction && quizAction.payload?.count === 3, 'Action: GENERATE_QUIZ payload specifies exact question count 3');
  assert(quizAction && quizAction.label.includes('3-Question'), 'Action label matches question count (3-Question)');

  // ── TEST 2: Multi-Skill Generalization ("I am weak in Python. What should I learn?") ──
  console.log('\n--- 2. Testing: "I am weak in Python. What should I learn?" ---');
  const pyPayload = {
    message: 'I am weak in Python. What should I learn?',
    targetRole: 'Data Scientist',
    currentSkills: [],
    learningContext: { currentPhase: 1 }
  };
  const pyRes = await generateAssistantResponse(pyPayload);
  assert(pyRes.response.includes('Python'), 'Mentions Python');
  assert(pyRes.response.includes('Data Scientist'), 'Mentions Data Scientist role');
  assert(pyRes.response.includes('not yet recorded'), 'Explicitly notes uncalibrated mastery level (zero hallucination)');
  assert(pyRes.response.includes('Data Structures') || pyRes.response.includes('NumPy'), 'Python-specific subtopics included');

  // ── TEST 3: Multi-Skill Generalization ("I am weak in MongoDB. What should I study?") ──
  console.log('\n--- 3. Testing: "I am weak in MongoDB. What should I study?" ---');
  const mongoPayload = {
    message: 'I am weak in MongoDB. What should I study?',
    targetRole: 'Backend Developer',
    currentSkills: [{ name: 'MongoDB', level: 40 }]
  };
  const mongoRes = await generateAssistantResponse(mongoPayload);
  assert(mongoRes.response.includes('MongoDB'), 'Mentions MongoDB');
  assert(mongoRes.response.includes('Aggregation') || mongoRes.response.includes('Indexing'), 'MongoDB-specific subtopics included');

  // ── TEST 4: Telemetry Metric — "How many courses have I completed?" (0 completed) ──
  console.log('\n--- 4. Testing: "How many courses have I completed?" (Count = 0) ---');
  const zeroCoursesPayload = {
    message: 'How many courses have I completed?',
    targetRole: 'Full Stack Developer',
    userMetrics: { completedCoursesCount: 0, completedCourses: [] }
  };
  const zeroRes = await generateAssistantResponse(zeroCoursesPayload);
  assert(zeroRes.response.includes('0 courses') || zeroRes.response.includes('0 course'), 'Explicitly states 0 courses completed');
  assert(!zeroRes.response.includes('4 courses') && !zeroRes.response.includes('12 courses'), 'Never hallucinates fake numbers');

  // ── TEST 5: Telemetry Metric — "How many courses have I completed?" (Count = 2) ──
  console.log('\n--- 5. Testing: "How many courses have I completed?" (Count = 2) ---');
  const posCoursesPayload = {
    message: 'How many courses have I completed?',
    targetRole: 'Full Stack Developer',
    userMetrics: {
      completedCoursesCount: 2,
      completedCourses: [
        { id: 'c1', title: 'Web Development & Modern JavaScript Foundations' },
        { id: 'c2', title: 'React 18 Architecture & Custom Hooks Design' }
      ]
    }
  };
  const posRes = await generateAssistantResponse(posCoursesPayload);
  assert(posRes.response.includes('2 courses'), 'Accurately reports 2 courses completed');
  assert(posRes.response.includes('React 18 Architecture'), 'Lists verified completed track title');

  // ── TEST 6: Telemetry Metric — Unavailable Context (Zero Hallucination) ──
  console.log('\n--- 6. Testing: "How many courses have I completed?" (Unavailable data) ---');
  const unavailPayload = {
    message: 'How many courses have I completed?',
    targetRole: 'Full Stack Developer',
    userMetrics: {}
  };
  const unavailRes = await generateAssistantResponse(unavailPayload);
  assert(unavailRes.response.includes("don't currently have") || unavailRes.response.includes("unavailable"), 'Explicitly states telemetry unavailable without guessing');

  // ── TEST 7: Telemetry Metric — XP & Streak ──
  console.log('\n--- 7. Testing: XP & Streak Telemetry Queries ---');
  const xpRes = await generateAssistantResponse({
    message: 'How much XP have I earned?',
    userMetrics: { totalXp: 1250 }
  });
  assert(xpRes.response.includes('1250 XP'), 'Accurately reports 1250 XP');

  const streakRes = await generateAssistantResponse({
    message: "What's my current streak?",
    userMetrics: { streakDays: 14 }
  });
  assert(streakRes.response.includes('14 days'), 'Accurately reports 14 days streak');

  // ── TEST 8: Coding Explanation — "Explain React hooks with an example" ──
  console.log('\n--- 8. Testing: "Explain React hooks with an example" ---');
  const hooksRes = await generateAssistantResponse({
    message: 'Explain React hooks with an example',
    targetRole: 'MERN Stack Developer'
  });
  assert(hooksRes.response.includes('useState') && hooksRes.response.includes('useEffect'), 'Explains useState and useEffect');
  assert(hooksRes.response.includes('```javascript') && hooksRes.response.includes('useFetchData'), 'Includes syntax-highlighted useFetchData custom hook');
  assert(hooksRes.suggestedActions.some(a => a.action === 'GENERATE_QUIZ'), 'Offers interactive React quiz action');

  // ── TEST 9: Interactive Quiz Request — "Create a 3-question quiz for JavaScript" ──
  console.log('\n--- 9. Testing: "Create a 3-question quiz for JavaScript" ---');
  const quizPromptRes = await generateAssistantResponse({
    message: 'Create a 3-question quiz for JavaScript',
    targetRole: 'Frontend Developer'
  });
  const qAction = quizPromptRes.suggestedActions.find(a => a.action === 'GENERATE_QUIZ');
  assert(qAction && qAction.payload?.skill === 'JavaScript' && qAction.payload?.count === 3, 'Returns GENERATE_QUIZ action button with count 3');
  assert(qAction && qAction.label.includes('3-Question'), 'Label states 3-Question Quiz');

  // ── TEST 10: Resource & Documentation Request ──
  console.log('\n--- 10. Testing: "Give me React documentation" ---');
  const docsRes = await generateAssistantResponse({
    message: 'Give me React documentation',
    targetRole: 'Frontend Developer'
  });
  assert(docsRes.response.includes('react.dev') || docsRes.response.includes('Documentation'), 'Provides documentation link');
  assert(docsRes.suggestedActions.some(a => a.action === 'OPEN_URL'), 'Returns OPEN_URL action button');

  console.log('\n============================================================');
  console.log(`📊 FULL VERIFICATION RESULT: ${passed} PASSED / ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
  console.log('============================================================\n');

  if (failed === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runVerification().catch(console.error);
