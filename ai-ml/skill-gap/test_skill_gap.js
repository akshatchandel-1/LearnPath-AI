/**
 * LearnPath AI — Skill Gap Engine Comprehensive Test Suite
 * Validates deterministic mathematical readiness, priority classifications,
 * edge cases, taxonomy coverage, and defensive resilience across 18 key scenarios.
 */

const {
  analyzeSkillGap,
  analyzeSkillGaps,
  SkillGapAnalyzer,
  SKILL_BENCHMARKS,
  getSupportedRoles
} = require('./index');

console.log('\n============================================================');
console.log('🧪 RUNNING AI SKILL GAP ENGINE COMPREHENSIVE TEST SUITE');
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

// -----------------------------------------------------------------------------
// 1. MERN Stack Developer
// -----------------------------------------------------------------------------
console.log('--- 1. MERN Stack Developer (Weak React & Partial Backend) ---');
const mernResult = analyzeSkillGap({
  targetRole: 'MERN Stack Developer',
  currentSkills: [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 20 },
    { name: 'HTML & CSS', level: 80 }
  ]
});

assert(mernResult.success === true, 'MERN Stack returns success: true');
assert(mernResult.targetRole === 'MERN Stack Developer', 'MERN Stack matches canonical target role');
assert(mernResult.overallReadiness > 0 && mernResult.overallReadiness < 100, 'MERN Stack calculates realistic readiness');
const mernReact = mernResult.gaps.find(g => g.skill === 'React.js' || g.name === 'React.js');
assert(mernReact && mernReact.currentLevel === 20, 'React currentLevel is 20');
assert(mernReact && mernReact.targetLevel === 85, 'React targetLevel is 85');
assert(mernReact && mernReact.gap === 65, 'React gap is 65 (85 - 20)');
assert(mernReact && mernReact.priority === 'critical', 'React (gap 65) classified as critical priority');
assert(mernReact && typeof mernReact.suggestion === 'string' && mernReact.suggestion.length > 15, 'React has actionable improvement suggestion');

// -----------------------------------------------------------------------------
// 2. Frontend Developer
// -----------------------------------------------------------------------------
console.log('\n--- 2. Frontend Developer (UI & CSS Foundations) ---');
const frontendResult = analyzeSkillGap({
  targetRole: 'Frontend Developer',
  currentSkills: [
    { name: 'HTML & CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'Tailwind CSS', level: 85 }
  ]
});

assert(frontendResult.targetRole === 'Frontend Developer', 'Frontend Developer matches role');
const feReact = frontendResult.gaps.find(g => g.skill === 'React.js');
assert(feReact && feReact.currentLevel === 0 && feReact.status === 'missing', 'Unprovided React.js marked as missing');
assert(frontendResult.overallReadiness > 20, 'Frontend Developer partial skills contribute to readiness');

// -----------------------------------------------------------------------------
// 3. Data Scientist
// -----------------------------------------------------------------------------
console.log('\n--- 3. Data Scientist (Prompt Example: Python 70, SQL 50) ---');
const dsResult = analyzeSkillGap({
  targetRole: 'Data Scientist',
  currentSkills: [
    { name: 'Python', level: 70 },
    { name: 'SQL', level: 50 }
  ]
});

assert(dsResult.targetRole === 'Data Scientist', 'Data Scientist matches role');
assert(dsResult.overallReadiness > 0 && dsResult.overallReadiness !== 50, 'Data Scientist readiness is calculated (never fake 50%)');
const dsML = dsResult.gaps.find(g => g.skill === 'Machine Learning Algorithms');
assert(dsML && dsML.targetLevel === 85, 'ML Algorithms target level is 85');
assert(dsML && dsML.currentLevel === 0, 'Unassessed ML Algorithms currentLevel is 0');
assert(dsML && (dsML.priority === 'critical' || dsML.priority === 'high'), 'ML Algorithms is high/critical priority gap');

// -----------------------------------------------------------------------------
// 4. Data Analyst
// -----------------------------------------------------------------------------
console.log('\n--- 4. Data Analyst (SQL & BI Mastery) ---');
const daResult = analyzeSkillGap({
  targetRole: 'Data Analyst',
  currentSkills: [
    { name: 'SQL & Relational Databases', level: 90 },
    { name: 'Data Visualization & BI', level: 90 },
    { name: 'Excel & Spreadsheets', level: 80 }
  ]
});

assert(daResult.targetRole === 'Data Analyst', 'Data Analyst matches role');
assert(daResult.strengths.some(s => s.skill.includes('SQL') || s.name.includes('SQL')), 'SQL is categorized in strengths');
assert(daResult.overallReadiness >= 50, 'Data Analyst core competencies reflect high readiness');

// -----------------------------------------------------------------------------
// 5. Cloud Engineer
// -----------------------------------------------------------------------------
console.log('\n--- 5. Cloud Engineer (Multi-Cloud & Containerization) ---');
const cloudResult = analyzeSkillGap({
  targetRole: 'Cloud Engineer',
  currentSkills: [
    { name: 'aws', level: '80' },
    { name: 'docker', level: 'intermediate' },
    { name: 'k8s', level: 'beginner' },
    { name: 'bash', level: 90 }
  ]
});

assert(cloudResult.targetRole === 'Cloud Engineer', 'Cloud Engineer matches role');
const awsGap = cloudResult.gaps.find(g => g.skill === 'AWS Cloud Fundamentals');
assert(awsGap && awsGap.currentLevel === 80, 'AWS parsed from string "80" to 80');
const dockerGap = cloudResult.gaps.find(g => g.skill === 'Docker & Containerization');
assert(dockerGap && dockerGap.currentLevel === 60, 'Docker converted from "intermediate" to 60');
const k8sGap = cloudResult.gaps.find(g => g.skill === 'Kubernetes & Orchestration');
assert(k8sGap && k8sGap.currentLevel === 30, 'K8s converted from "beginner" to 30');

// -----------------------------------------------------------------------------
// 6. Empty Skills
// -----------------------------------------------------------------------------
console.log('\n--- 6. Empty Skills (Strict 0% Readiness) ---');
const emptyResult = analyzeSkillGap({
  targetRole: 'Software Engineer',
  currentSkills: []
});

assert(emptyResult.overallReadiness === 0, 'Empty currentSkills yields strictly 0% readiness');
assert(emptyResult.readinessScore === 0, 'readinessScore is strictly 0');
assert(emptyResult.gaps.every(g => g.currentLevel === 0), 'Every gap currentLevel is 0');
assert(emptyResult.gaps.every(g => g.status === 'missing'), 'Every gap marked as missing');

// -----------------------------------------------------------------------------
// 7. Partial Skills
// -----------------------------------------------------------------------------
console.log('\n--- 7. Partial Skills (Meaningful Range) ---');
const partialResult = analyzeSkillGap({
  targetRole: 'Backend Developer',
  currentSkills: [
    { name: 'Node.js', level: 45 },
    { name: 'Express.js', level: 40 }
  ]
});

assert(partialResult.overallReadiness > 0 && partialResult.overallReadiness < 50, 'Partial skills yield proportional readiness (0 < r < 50)');
assert(partialResult.gaps.length > 0, 'Gaps identified for remaining competencies');

// -----------------------------------------------------------------------------
// 8. Strong Skills
// -----------------------------------------------------------------------------
console.log('\n--- 8. Strong Skills (Near Mastery) ---');
const strongResult = analyzeSkillGap({
  targetRole: 'Mobile Developer',
  currentSkills: [
    { name: 'React Native', level: 90 },
    { name: 'JavaScript', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'React.js', level: 80 },
    { name: 'REST APIs', level: 80 },
    { name: 'Git & Version Control', level: 75 }
  ]
});

assert(strongResult.overallReadiness === 100, 'Strong skills matching all benchmarks achieve 100% readiness');
assert(strongResult.readinessTier === 'Job Ready', 'Readiness tier is Job Ready');
assert(strongResult.gaps.length === 0, '0 gaps remaining when all targets met');

// -----------------------------------------------------------------------------
// 9. Unknown Skill Handling
// -----------------------------------------------------------------------------
console.log('\n--- 9. Unknown Skill Handling (Graceful Non-Interference) ---');
const unknownSkillResult = analyzeSkillGap({
  targetRole: 'Cybersecurity Engineer',
  currentSkills: [
    { name: 'Network & System Security', level: 85 },
    { name: 'Ancient Cryptography Language', level: 100 }
  ]
});

assert(unknownSkillResult.success === true, 'Does not crash on unknown skill');
assert(unknownSkillResult.targetRole === 'Cybersecurity Engineer', 'Target role evaluated properly');
assert(unknownSkillResult.allSkills ? unknownSkillResult.allSkills.length > 0 : unknownSkillResult.skills.length > 0, 'Benchmark skills evaluated');

// -----------------------------------------------------------------------------
// 10. Unknown Role Handling
// -----------------------------------------------------------------------------
console.log('\n--- 10. Unknown Role Handling (Structured Error) ---');
const unknownRoleResult = analyzeSkillGap({
  targetRole: 'Quantum Teleportation Architect',
  currentSkills: [{ name: 'Physics', level: 90 }]
});

assert(unknownRoleResult.success === false, 'Unknown role returns success: false');
assert(unknownRoleResult.error && unknownRoleResult.error.code === 'UNKNOWN_ROLE', 'Returns error code UNKNOWN_ROLE');
assert(typeof unknownRoleResult.error.message === 'string', 'Returns descriptive error message');
assert(Array.isArray(unknownRoleResult.supportedRoles) && unknownRoleResult.supportedRoles.length >= 13, 'Includes list of supported roles');

// -----------------------------------------------------------------------------
// 11. Missing targetRole Handling
// -----------------------------------------------------------------------------
console.log('\n--- 11. Missing targetRole Handling ---');
const missingRole1 = analyzeSkillGap({});
assert(missingRole1.success === false && missingRole1.error.code === 'MISSING_ROLE', 'Empty object returns MISSING_ROLE error');

const missingRole2 = analyzeSkillGap({ targetRole: '   ' });
assert(missingRole2.success === false && missingRole2.error.code === 'MISSING_ROLE', 'Whitespace targetRole returns MISSING_ROLE error');

// -----------------------------------------------------------------------------
// 12. Invalid Skill Levels Bounds & Sanitization
// -----------------------------------------------------------------------------
console.log('\n--- 12. Invalid Skill Levels (Negative, > 100, NaN) ---');
const invalidLevelsResult = analyzeSkillGap({
  targetRole: 'DevOps Engineer',
  currentSkills: [
    { name: 'Docker & Containerization', level: -45 },
    { name: 'Kubernetes & Orchestration', level: 999 },
    { name: 'Linux & Shell Scripting', level: 'not-a-number' }
  ]
});

const dockerSanitized = invalidLevelsResult.gaps.find(g => g.skill.includes('Docker'));
const k8sSanitized = invalidLevelsResult.skills.find(s => s.skill.includes('Kubernetes'));
const linuxSanitized = invalidLevelsResult.gaps.find(g => g.skill.includes('Linux'));

assert(dockerSanitized && dockerSanitized.currentLevel === 0, 'Negative level (-45) clamped to 0');
assert(k8sSanitized && k8sSanitized.currentLevel === 100, 'Over-100 level (999) clamped to 100');
assert(linuxSanitized && linuxSanitized.currentLevel === 0, 'NaN level safely defaults to 0');

// -----------------------------------------------------------------------------
// 13. Duplicate Skills Merging
// -----------------------------------------------------------------------------
console.log('\n--- 13. Duplicate Skills Handling (Keep Highest) ---');
const duplicateResult = analyzeSkillGap({
  targetRole: 'MERN Stack Developer',
  currentSkills: [
    { name: 'React', level: 30 },
    { name: 'React.js', level: 75 },
    { name: 'reactjs', level: 50 }
  ]
});

const reactMerged = duplicateResult.skills.find(s => s.skill === 'React.js');
assert(reactMerged && reactMerged.currentLevel === 75, 'Duplicate aliases merge to highest level (75)');

// -----------------------------------------------------------------------------
// 14. Malformed Input Resilience
// -----------------------------------------------------------------------------
console.log('\n--- 14. Malformed Input Resilience (null, undefined, primitives) ---');
const nullRes = analyzeSkillGap(null);
assert(nullRes.success === false && nullRes.error.code === 'INVALID_INPUT', 'null input returns INVALID_INPUT');

const undefRes = analyzeSkillGap(undefined);
assert(undefRes.success === false && undefRes.error.code === 'INVALID_INPUT', 'undefined input returns INVALID_INPUT');

const stringRes = analyzeSkillGap('just a string');
assert(stringRes.success === false && stringRes.error.code === 'INVALID_INPUT', 'string input returns INVALID_INPUT');

// -----------------------------------------------------------------------------
// 15. Readiness Calculation Formula Verification
// -----------------------------------------------------------------------------
console.log('\n--- 15. Readiness Calculation Mathematical Verification ---');
// Create a controlled input for AI Engineer
const aiResult = analyzeSkillGap({
  targetRole: 'AI Engineer',
  currentSkills: [
    { name: 'Python Programming', level: 90 }, // 90/90 * 1.2
    { name: 'LLM Engineering & Prompting', level: 45 } // 45/90 * 1.2
  ]
});

assert(aiResult.overallReadiness > 0 && aiResult.overallReadiness <= 100, 'Weighted readiness within valid bounds [0, 100]');
assert(aiResult.overallReadiness === aiResult.readinessScore, 'overallReadiness matches readinessScore');

// -----------------------------------------------------------------------------
// 16. Priority Classification Verification
// -----------------------------------------------------------------------------
console.log('\n--- 16. Priority Classification (critical, high, medium, low, none) ---');
const priorityCheck = analyzeSkillGap({
  targetRole: 'Backend Developer',
  currentSkills: [
    { name: 'Node.js', level: 30 }, // gap: 90 - 30 = 60 (isCore) -> critical
    { name: 'Express.js', level: 60 }, // gap: 85 - 60 = 25 (isCore) -> critical / high
    { name: 'SQL & Relational Databases', level: 73 }, // gap: 85 - 73 = 12 -> medium
    { name: 'PostgreSQL', level: 75 } // gap: 80 - 75 = 5 -> low
  ]
});

const nodeGap = priorityCheck.gaps.find(g => g.skill === 'Node.js');
const sqlGap = priorityCheck.gaps.find(g => g.skill === 'SQL & Relational Databases');
const pgGap = priorityCheck.gaps.find(g => g.skill === 'PostgreSQL');

assert(nodeGap && nodeGap.priority === 'critical', 'Gap >= 40 classified as critical');
assert(sqlGap && sqlGap.priority === 'medium', 'Gap 12 classified as medium');
assert(pgGap && pgGap.priority === 'low', 'Gap 5 classified as low');

// -----------------------------------------------------------------------------
// 17. Missing Skill Defaults to currentLevel 0
// -----------------------------------------------------------------------------
console.log('\n--- 17. Missing Skill Explicit Representation ---');
const missingCheck = analyzeSkillGap({
  targetRole: 'Frontend Developer',
  currentSkills: [{ name: 'HTML & CSS', level: 90 }]
});

const missingTypeScript = missingCheck.skills.find(s => s.skill === 'TypeScript');
assert(missingTypeScript && missingTypeScript.currentLevel === 0, 'Unprovided skill currentLevel is strictly 0');
assert(missingTypeScript && missingTypeScript.isAssessed === false, 'Unprovided skill isAssessed is false');
assert(missingTypeScript && missingTypeScript.gap === missingTypeScript.targetLevel, 'Unprovided skill gap equals targetLevel');

// -----------------------------------------------------------------------------
// 18. All Skills Mastered -> 100% Readiness
// -----------------------------------------------------------------------------
console.log('\n--- 18. All Skills Mastered -> Exactly 100% Readiness ---');
const perfectFrontend = analyzeSkillGap({
  targetRole: 'Frontend Developer',
  currentSkills: [
    { name: 'HTML & CSS', level: 100 },
    { name: 'JavaScript', level: 100 },
    { name: 'React.js', level: 100 },
    { name: 'TypeScript', level: 100 },
    { name: 'Tailwind CSS', level: 100 },
    { name: 'Next.js', level: 100 },
    { name: 'REST APIs', level: 100 },
    { name: 'Web Performance & CWV', level: 100 },
    { name: 'Git & Version Control', level: 100 }
  ]
});

assert(perfectFrontend.overallReadiness === 100, 'All benchmarks met yields exactly 100% readiness');
assert(perfectFrontend.gaps.length === 0, '0 remaining gaps when all skills mastered');
assert(perfectFrontend.strengths.length === perfectFrontend.skills.length, 'All skills included in strengths');

// -----------------------------------------------------------------------------
// Backward Compatibility Check: analyzeSkillGaps plural alias
// -----------------------------------------------------------------------------
console.log('\n--- Compatibility: analyzeSkillGaps plural API alias ---');
const pluralCheck = analyzeSkillGaps({
  targetRole: 'MERN Stack Developer',
  currentSkills: [{ name: 'React', level: 50 }]
});
assert(pluralCheck && pluralCheck.targetRole === 'MERN Stack Developer', 'analyzeSkillGaps produces identical valid analysis');

console.log('\n============================================================');
console.log(`📊 SKILL GAP TEST SUITE RESULT: ${passed} PASSED / ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
console.log('============================================================\n');

if (failed === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
