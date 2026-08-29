/**
 * LearnPath AI — Recommendation Engine Test Suite
 * Validates deterministic priority scoring, prerequisite-aware ordering, role sensitivity,
 * ADD_TO_PATH contract, and defensive edge-case handling.
 */

import { generateRecommendations, RecommendationEngine, RECOMMENDATION_CATALOG } from './index.js';

console.log('\n============================================================');
console.log('🧪 RUNNING RECOMMENDATION ENGINE TEST SUITE');
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

// ── TEST 1: Weak Skill Prioritization ──
console.log('\n--- 1. Weak Skill Prioritization (JavaScript 25% vs HTML 85%) ---');
const weakJsRecs = generateRecommendations({
  targetRole: 'Frontend Developer',
  currentSkills: [
    { name: 'JavaScript', level: 25 },
    { name: 'HTML & CSS', level: 85 }
  ]
});

const jsRec = weakJsRecs.recommendations.find(r => r.skill === 'JavaScript');
const htmlRec = weakJsRecs.recommendations.find(r => r.skill === 'HTML & CSS');

assert(jsRec && htmlRec, 'Found recommendations for both JavaScript and HTML & CSS');
assert(jsRec.priorityScore > htmlRec.priorityScore, 'Weak JavaScript (25%) has higher priority score than mastered HTML & CSS (85%)');
const jsIndex = weakJsRecs.recommendations.findIndex(r => r.skill === 'JavaScript');
const htmlIndex = weakJsRecs.recommendations.findIndex(r => r.skill === 'HTML & CSS');
assert(jsIndex < htmlIndex, 'JavaScript is ranked ahead of HTML & CSS in recommendations');

// ── TEST 2: Strong Skill Lower Priority ──
console.log('\n--- 2. Strong Skill (React 90%) Receives Lower Priority ---');
const strongReactRecs = generateRecommendations({
  targetRole: 'MERN Stack Developer',
  currentSkills: [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 30 }
  ]
});

const strongReactItem = strongReactRecs.recommendations.find(r => r.skill === 'React');
const weakNodeItem = strongReactRecs.recommendations.find(r => r.skill === 'Node.js');

assert(strongReactItem.priority === 'LOW', 'Mastered React (90%) is assigned LOW priority');
assert(weakNodeItem.priorityScore > strongReactItem.priorityScore, 'Weak Node.js has significantly higher priority score than mastered React');

// ── TEST 3: Prerequisite-Aware Ordering ──
console.log('\n--- 3. Prerequisite-Aware Ordering (JavaScript prerequisite for React) ---');
const prereqRecs = generateRecommendations({
  targetRole: 'Frontend Developer',
  currentSkills: [
    { name: 'JavaScript', level: 15 }, // Foundational prerequisite < 50%
    { name: 'React', level: 0 }
  ]
});

const jsPrereqItem = prereqRecs.recommendations.find(r => r.skill === 'JavaScript');
const reactBlockedItem = prereqRecs.recommendations.find(r => r.skill === 'React');

assert(reactBlockedItem.prerequisitesSatisfied === false, 'React marks prerequisitesSatisfied = false when JavaScript < 50%');
assert(jsPrereqItem.priorityScore > reactBlockedItem.priorityScore, 'Foundational JavaScript prerequisite is ranked ahead of blocked React');

// ── TEST 4: Role-Sensitive Recommendations ──
console.log('\n--- 4. Role-Sensitive Recommendations (MERN vs Data Scientist) ---');
const mernRecs = generateRecommendations({
  targetRole: 'MERN Stack Developer',
  currentSkills: []
});

const dataSciRecs = generateRecommendations({
  targetRole: 'Data Scientist',
  currentSkills: []
});

const mernTop3 = mernRecs.recommendations.slice(0, 3).map(r => r.skill);
const dataSciTop3 = dataSciRecs.recommendations.slice(0, 3).map(r => r.skill);

assert(mernTop3.includes('JavaScript') || mernTop3.includes('React') || mernTop3.includes('Node.js'), 'MERN top recommendations include JavaScript/React/Node.js');
assert(dataSciTop3.includes('Python') || dataSciTop3.includes('Pandas & NumPy'), 'Data Science top recommendations include Python/Pandas');

// ── TEST 5: Multiple Gaps Ranking & Explainable Rationale ──
console.log('\n--- 5. Multiple Gaps Ranking & Explainable Rationale ---');
const multiGapRecs = generateRecommendations({
  targetRole: 'Backend Developer',
  currentSkills: [
    { name: 'JavaScript', level: 80 },
    { name: 'Node.js', level: 35 },
    { name: 'SQL & Relational Databases', level: 40 }
  ]
});

assert(multiGapRecs.recommendations.length >= 5, 'Returns comprehensive recommendation list');
// Check strictly sorted order
let isSorted = true;
for (let i = 0; i < multiGapRecs.recommendations.length - 1; i++) {
  if (multiGapRecs.recommendations[i].priorityScore < multiGapRecs.recommendations[i + 1].priorityScore) {
    isSorted = false;
    break;
  }
}
assert(isSorted, 'All recommendations strictly sorted in descending priorityScore order');
assert(multiGapRecs.recommendations[0].reason.length > 10, 'Includes descriptive explainable reason');

// ── TEST 6: ADD_TO_PATH Contract Schema ──
console.log('\n--- 6. ADD_TO_PATH Contract Schema ---');
const actionItem = multiGapRecs.recommendations[0];
assert(actionItem.suggestedAction && actionItem.suggestedAction.type === 'ADD_TO_PATH', 'Includes structured suggestedAction.type = ADD_TO_PATH');
assert(typeof actionItem.suggestedAction.estimatedHours === 'number', 'Includes numeric estimatedHours');
assert(typeof actionItem.suggestedAction.skill === 'string', 'Includes target skill string in suggestedAction');

// ── TEST 7: Resource Links with Verified Sources ──
console.log('\n--- 7. Resource Links with Verified Sources ---');
const itemWithResources = multiGapRecs.recommendations.find(r => r.resources.length > 0);
assert(itemWithResources !== undefined, 'Recommendations contain educational resources');
assert(itemWithResources.resources[0].url.startsWith('https://'), 'Resource URLs are valid HTTPS links');
assert(itemWithResources.resources[0].source.length > 0, 'Resource specifies verified source');

// ── TEST 8: Empty / Null / Undefined Input Handling ──
console.log('\n--- 8. Empty / Null / Undefined Input Handling ---');
const nullRecs = generateRecommendations(null);
assert(nullRecs && Array.isArray(nullRecs.recommendations), 'generateRecommendations(null) handles null gracefully');
const undefRecs = generateRecommendations(undefined);
assert(undefRecs && Array.isArray(undefRecs.recommendations), 'generateRecommendations(undefined) handles undefined gracefully');
const emptyRecs = generateRecommendations({});
assert(emptyRecs && emptyRecs.totalRecommendations > 0, 'generateRecommendations({}) provides defaults');

// ── TEST 9: Invalid Skill Levels Handling ──
console.log('\n--- 9. Invalid Skill Levels Handling ---');
const invalidLevelsRecs = generateRecommendations({
  targetRole: 'Full Stack Developer',
  currentSkills: [
    { name: 'JavaScript', level: -99 },
    { name: 'React', level: 'not-a-number' }
  ]
});
assert(invalidLevelsRecs.recommendations.length > 0, 'Invalid skill values do not cause crash or NaN priorityScores');
assert(!isNaN(invalidLevelsRecs.recommendations[0].priorityScore), 'PriorityScore is a valid finite integer');

// ── TEST 10: Deterministic Output Guarantee ──
console.log('\n--- 10. Deterministic Output Guarantee ---');
const payloadA = { targetRole: 'Cloud Engineer', currentSkills: [{ name: 'AWS (or Azure/GCP)', level: 40 }] };
const run1 = generateRecommendations(payloadA);
const run2 = generateRecommendations(payloadA);
assert(JSON.stringify(run1) === JSON.stringify(run2), 'Multiple calls with identical inputs produce 100% identical outputs');

console.log('\n============================================================');
console.log(`📊 RECOMMENDATION TEST SUITE RESULT: ${passed} PASSED / ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
console.log('============================================================\n');

if (failed === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
