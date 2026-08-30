/**
 * LearnPath AI - Interactive AI/ML Demonstration Script
 * Demonstrates live execution of Recommendation and Skill-Gap Engines.
 */

const { generateRecommendations } = require('./recommendation');
const { analyzeSkillGap } = require('./skill-gap');

console.log('================================================================================');
console.log('🚀 LEARNPATH AI — LIVE AI RECOMMENDATION & SKILL GAP ENGINE DEMONSTRATION');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// DEMO 1: Skill Gap Analysis - Data Scientist
// -----------------------------------------------------------------------------
console.log('--------------------------------------------------------------------------------');
console.log('📊 DEMO 1: AI SKILL GAP ANALYSIS');
console.log('Target Role: Data Scientist');
console.log('--------------------------------------------------------------------------------');

const skillGapInput = {
  targetRole: 'Data Scientist',
  currentSkills: [
    { name: 'Python', level: 70 },
    { name: 'SQL', level: 50 }
  ]
};

console.log('📥 Input Payload:');
console.log(JSON.stringify(skillGapInput, null, 2));

const skillGapOutput = analyzeSkillGap(skillGapInput);

console.log('\n📤 Live Output Report:');
console.log(`Target Role:       ${skillGapOutput.targetRole}`);
console.log(`Overall Readiness: ${skillGapOutput.overallReadiness}% (${skillGapOutput.readinessTier})`);
console.log(`Status Summary:    ${skillGapOutput.statusSummary}`);
console.log('\nIdentified Gaps (Ordered by Priority):');
skillGapOutput.gaps.forEach((gap, index) => {
  const badge = gap.priority === 'high' ? '🔴 HIGH' : gap.priority === 'medium' ? '🟡 MED ' : '🟢 LOW ';
  console.log(`  [${badge}] ${gap.skill.padEnd(32)} | Current: ${String(gap.currentLevel).padStart(2)}% | Target: ${String(gap.targetLevel).padStart(2)}% | Gap: ${String(gap.gap).padStart(2)}%`);
  console.log(`         👉 Suggestion: ${gap.improvementSuggestion}`);
});

// -----------------------------------------------------------------------------
// DEMO 2: AI Course Recommendation - MERN Stack Developer
// -----------------------------------------------------------------------------
console.log('\n--------------------------------------------------------------------------------');
console.log('🎯 DEMO 2: AI COURSE RECOMMENDATION ENGINE');
console.log('Target Role: MERN Stack Developer');
console.log('--------------------------------------------------------------------------------');

const recInput = {
  targetRole: 'MERN Stack Developer',
  skills: [
    { name: 'React', level: 60 },
    { name: 'Node.js', level: 40 }
  ],
  completedCourses: [],
  learningPreferences: {
    style: 'Hands-on Projects',
    difficulty: 'Intermediate'
  }
};

console.log('📥 Input Payload:');
console.log(JSON.stringify(recInput, null, 2));

const recOutput = generateRecommendations(recInput);

console.log('\n📤 Live Output Recommendations:');
console.log(`Target Role:       ${recOutput.targetRole}`);
console.log(`Readiness:         ${recOutput.overallReadiness}% (${recOutput.readinessTier})`);
console.log(`Total Evaluated:   ${recOutput.metadata.totalEvaluated} courses`);
console.log(`Returned Count:    ${recOutput.metadata.returnedCount} recommendations\n`);

recOutput.recommendations.forEach((rec, idx) => {
  const priorityBadge = rec.priority === 'high' ? '🔥 HIGH PRIORITY' : '✨ RECOMMENDED';
  console.log(`#${idx + 1} [Score: ${rec.score}/100] [${priorityBadge}] ${rec.title}`);
  console.log(`   Type: ${rec.type.toUpperCase()} | Provider: ${rec.provider} | Duration: ${rec.estimatedHours}h | Rating: ⭐ ${rec.rating}`);
  console.log(`   Skills Covered: ${rec.skills.join(', ')}`);
  console.log(`   💡 Reason: ${rec.reason}`);
  console.log(`   🔗 URL: ${rec.url}\n`);
});

// -----------------------------------------------------------------------------
// DEMO 3: Edge Case Verification - Cloud Engineer with empty/string skills
// -----------------------------------------------------------------------------
console.log('--------------------------------------------------------------------------------');
console.log('🛡️ DEMO 3: ROBUSTNESS & ALIAS HANDLING (Cloud Engineer)');
console.log('--------------------------------------------------------------------------------');

const cloudInput = {
  targetRole: 'Cloud Engineer',
  currentSkills: [
    { name: 'aws', level: '80' },
    { name: 'docker', level: 'intermediate' },
    { name: 'k8s', level: 'beginner' }
  ]
};

const cloudOutput = analyzeSkillGap(cloudInput);
console.log(`Role: ${cloudOutput.targetRole} | Readiness: ${cloudOutput.overallReadiness}% (${cloudOutput.readinessTier})`);
console.log(`AWS Current Level:    ${cloudOutput.gaps.find(g => g.skill === 'AWS Cloud Fundamentals')?.currentLevel}% (Parsed from '80')`);
console.log(`Docker Current Level: ${cloudOutput.gaps.find(g => g.skill === 'Docker & Containerization')?.currentLevel}% (Mapped from 'intermediate')`);
console.log(`K8s Current Level:    ${cloudOutput.gaps.find(g => g.skill === 'Kubernetes & Orchestration')?.currentLevel}% (Mapped from 'beginner')`);

console.log('\n================================================================================');
console.log('✅ LIVE DEMONSTRATION COMPLETE — BOTH ENGINES ARE FULLY OPERATIONAL');
console.log('================================================================================\n');
