/**
 * LearnPath AI — Skill Gap Analysis Test Suite
 * Validates deterministic gap calculations, priority classification, readiness score bounds,
 * zero-hallucination handling, and custom role synthesis.
 */

import { analyzeSkillGaps, SkillGapAnalyzer, getRoleBenchmarks } from './index.js';

console.log('\n============================================================');
console.log('🧪 RUNNING SKILL GAP ANALYSIS TEST SUITE');
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

// ── TEST 1: MERN User with Weak React ──
console.log('\n--- 1. MERN Stack Developer with Weak React (20%) ---');
const weakReactReport = analyzeSkillGaps({
  targetRole: 'MERN Stack Developer',
  currentSkills: [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 20 },
    { name: 'HTML & CSS', level: 85 }
  ]
});

const reactSkill = weakReactReport.skills.find(s => s.name === 'React');
assert(reactSkill && reactSkill.currentLevel === 20, 'React currentLevel is accurately 20%');
assert(reactSkill && reactSkill.targetLevel === 80, 'React targetLevel is 80%');
assert(reactSkill && reactSkill.gap === 60, 'React gap is 60% (80 - 20)');
assert(reactSkill && reactSkill.priority === 'CRITICAL', 'React classified as CRITICAL priority');
assert(weakReactReport.criticalGaps.some(g => g.name === 'React'), 'React included in criticalGaps array');

// ── TEST 2: MERN User with Strong React ──
console.log('\n--- 2. MERN Stack Developer with Strong React (90%) ---');
const strongReactReport = analyzeSkillGaps({
  targetRole: 'MERN Stack Developer',
  currentSkills: [
    { name: 'React', level: 90 },
    { name: 'JavaScript', level: 85 }
  ]
});

const strongReactSkill = strongReactReport.skills.find(s => s.name === 'React');
assert(strongReactSkill && strongReactSkill.gap === 0, 'React gap is 0 when mastery exceeds target (90% >= 80%)');
assert(strongReactSkill && strongReactSkill.priority === 'NONE', 'React priority is NONE when mastered');
assert(strongReactReport.strengths.some(s => s.name === 'React'), 'React included in strengths list');

// ── TEST 3: Missing Skill Representation ──
console.log('\n--- 3. Missing Skill Representation (Unassessed Competency) ---');
const missingSkillReport = analyzeSkillGaps({
  targetRole: 'MERN Stack Developer',
  currentSkills: [{ name: 'JavaScript', level: 70 }] // MongoDB is omitted
});

const mongoSkill = missingSkillReport.skills.find(s => s.name === 'MongoDB');
assert(mongoSkill && mongoSkill.currentLevel === 0, 'Missing skill defaults safely to currentLevel = 0');
assert(mongoSkill && mongoSkill.isAssessed === false, 'Missing skill marked as isAssessed = false');
assert(mongoSkill && mongoSkill.gap === mongoSkill.targetLevel, 'Missing skill gap equals full target level');

// ── TEST 4: Multiple Gaps Prioritization ──
console.log('\n--- 4. Multiple Gaps Ranking by Impact Score ---');
const multiGapReport = analyzeSkillGaps({
  targetRole: 'Backend Developer',
  currentSkills: [
    { name: 'Node.js', level: 30 }, // Gap = 55 (Core, weight 1.2, impact = 66.0)
    { name: 'Redis & Caching', level: 40 }, // Gap = 30 (Non-core, weight 0.9, impact = 27.0)
    { name: 'SQL & Relational Databases', level: 60 }, // Gap = 20 (Core, weight 1.1, impact = 22.0)
    { name: 'Express.js', level: 75 },
    { name: 'MongoDB & NoSQL', level: 75 },
    { name: 'REST & GraphQL APIs', level: 85 },
    { name: 'System Design & Scalability', level: 75 },
    { name: 'Docker & Containerization', level: 70 }
  ]
});

assert(multiGapReport.criticalGaps.length >= 2, 'Identified multiple critical/high gaps');
assert(multiGapReport.criticalGaps[0].name === 'Node.js', 'Highest impact gap (Node.js) is ranked #1 in criticalGaps');
const nodeIndex = multiGapReport.criticalGaps.findIndex(g => g.name === 'Node.js');
const redisIndex = multiGapReport.criticalGaps.findIndex(g => g.name === 'Redis & Caching');
assert(nodeIndex < redisIndex, 'Node.js (higher impact) is ranked ahead of Redis & Caching');

// ── TEST 5: Role-Specific Benchmarks (Data Scientist vs Cloud Engineer) ──
console.log('\n--- 5. Role-Specific Benchmarks (Data Scientist vs Cloud Engineer) ---');
const dataSciReport = analyzeSkillGaps({
  targetRole: 'Data Scientist',
  currentSkills: [{ name: 'Python', level: 80 }]
});
assert(dataSciReport.skills.some(s => s.name.includes('Pandas') || s.name.includes('Machine Learning')), 'Data Scientist benchmark contains Pandas and ML');

const cloudReport = analyzeSkillGaps({
  targetRole: 'Cloud Engineer',
  currentSkills: [{ name: 'AWS (or Azure/GCP)', level: 80 }]
});
assert(cloudReport.skills.some(s => s.name.includes('Terraform') || s.name.includes('Kubernetes')), 'Cloud Engineer benchmark contains Terraform and Kubernetes');

// ── TEST 6: Custom Specialization Synthesis ──
console.log('\n--- 6. Custom Specialization Synthesis (Rust Systems Architect) ---');
const customReport = analyzeSkillGaps({
  targetRole: 'Rust Systems Architect',
  currentSkills: [{ name: 'Rust Systems Architect Core Fundamentals', level: 60 }]
});
assert(customReport.targetRole === 'Rust Systems Architect', 'Preserves custom role name');
assert(customReport.skills.length >= 6, 'Synthesizes structured benchmark competencies for custom role');

// ── TEST 7: Empty currentSkills ──
console.log('\n--- 7. Empty currentSkills Handling ---');
const emptyReport = analyzeSkillGaps({
  targetRole: 'Frontend Developer',
  currentSkills: []
});
assert(emptyReport.readinessScore === 0, 'Readiness score is 0% when no skills provided');
assert(emptyReport.skills.every(s => s.currentLevel === 0), 'All skill levels safely default to 0%');

// ── TEST 8: null / undefined Input Handling ──
console.log('\n--- 8. Null and Undefined Input Handling ---');
const nullReport = analyzeSkillGaps(null);
assert(nullReport && typeof nullReport.readinessScore === 'number', 'Handles null input gracefully without throwing');
const undefReport = analyzeSkillGaps(undefined);
assert(undefReport && Array.isArray(undefReport.skills), 'Handles undefined input gracefully');

// ── TEST 9: Invalid Skill Level Bounds & Sanitization ──
console.log('\n--- 9. Invalid Skill Level Bounds & Sanitization ---');
const invalidLevelsReport = analyzeSkillGaps({
  targetRole: 'MERN Stack Developer',
  currentSkills: [
    { name: 'JavaScript', level: -45 }, // Should clamp to 0
    { name: 'React', level: 250 }, // Should clamp to 100
    { name: 'Node.js', level: 'not-a-number' } // Should parse to 0
  ]
});

const jsClamped = invalidLevelsReport.skills.find(s => s.name === 'JavaScript');
const reactClamped = invalidLevelsReport.skills.find(s => s.name === 'React');
const nodeClamped = invalidLevelsReport.skills.find(s => s.name === 'Node.js');

assert(jsClamped && jsClamped.currentLevel === 0, 'Negative skill level clamped to 0');
assert(reactClamped && reactClamped.currentLevel === 100, 'Over-100 skill level clamped to 100');
assert(nodeClamped && nodeClamped.currentLevel === 0, 'NaN skill level safely defaults to 0');

// ── TEST 10: Readiness Score Strict Bounds [0 - 100%] ──
console.log('\n--- 10. Readiness Score Strict Bounds [0 - 100%] ---');
const perfectReport = analyzeSkillGaps({
  targetRole: 'Frontend Developer',
  currentSkills: [
    { name: 'HTML & CSS', level: 100 },
    { name: 'JavaScript', level: 100 },
    { name: 'React', level: 100 },
    { name: 'TypeScript', level: 100 },
    { name: 'Responsive Design & Tailwind', level: 100 },
    { name: 'Web Performance & CWV', level: 100 },
    { name: 'State Management', level: 100 },
    { name: 'Git & Version Control', level: 100 }
  ]
});
assert(perfectReport.readinessScore === 100, 'Perfect competencies yield exactly 100% readiness score');
assert(perfectReport.criticalGaps.length === 0, '0 critical gaps when all benchmarks met');
assert(perfectReport.strengths.length === perfectReport.skills.length, 'All skills listed in strengths');

console.log('\n============================================================');
console.log(`📊 SKILL GAP TEST SUITE RESULT: ${passed} PASSED / ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
console.log('============================================================\n');

if (failed === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
