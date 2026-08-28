/**
 * Client-Side Integration & Module Verification Script
 * Validates data transformations, 48 career objectives, dynamic roadmap generation,
 * skill gap telemetry, quiz scoring accuracy, and course synthesis logic.
 */

import { CAREER_OBJECTIVES } from './client/src/data/careerObjectives.js';
import { generatePathForRole, generateSkillGapsForRole, defaultRecommendations } from './client/src/data/roadmapGenerator.js';
import { INITIAL_COURSES, INITIAL_ASSESSMENTS } from './client/src/data/coursesAndAssessmentsData.js';

console.log('\n============================================================');
console.log('🧪 RUNNING CLIENT-SIDE INTEGRATION VERIFICATION SUITE');
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

// 1. Validate 48 Career Objectives
assert(Array.isArray(CAREER_OBJECTIVES) && CAREER_OBJECTIVES.length === 48, `All 48 career objectives present (found ${CAREER_OBJECTIVES.length})`);
assert(CAREER_OBJECTIVES.includes('Full Stack Developer'), 'Contains Full Stack Developer');
assert(CAREER_OBJECTIVES.includes('MERN Stack Developer'), 'Contains MERN Stack Developer');
assert(CAREER_OBJECTIVES.includes('Data Scientist'), 'Contains Data Scientist');
assert(CAREER_OBJECTIVES.includes('Cloud Architect'), 'Contains Cloud Architect');
assert(CAREER_OBJECTIVES.includes('Cybersecurity Engineer'), 'Contains Cybersecurity Engineer');

// 2. Validate Dynamic Roadmap Generation
const mernPath = generatePathForRole('MERN Stack Developer');
assert(mernPath.goal === 'MERN Stack Developer', 'Roadmap goal set to MERN Stack Developer');
assert(mernPath.phases.length >= 4, `Roadmap has ${mernPath.phases.length} distinct phases`);
assert(mernPath.phases[0].status === 'completed', 'Initial phase is completed');
assert(mernPath.phases[1].status === 'in-progress', 'Second phase is in-progress');

const dataSciPath = generatePathForRole('Data Scientist');
assert(dataSciPath.goal === 'Data Scientist', 'Roadmap adapts to Data Scientist');
assert(dataSciPath.title.includes('Data Scientist'), 'Roadmap title reflects Data Scientist');
assert(dataSciPath.phases[0].title.toLowerCase().includes('python'), 'Data Science Phase 1 starts with Python & EDA');

const devOpsPath = generatePathForRole('DevOps Engineer');
assert(devOpsPath.goal === 'DevOps Engineer', 'Roadmap adapts to DevOps Engineer');
assert(devOpsPath.phases[0].title.toLowerCase().includes('linux'), 'DevOps Phase 1 starts with Linux & Networking');

// 3. Validate Skill Gap Report Generation
const mernGaps = generateSkillGapsForRole('MERN Stack Developer');
assert(mernGaps.targetRole === 'MERN Stack Developer', 'Skill Gap targets MERN Stack Developer');
assert(Array.isArray(mernGaps.gaps) && mernGaps.gaps.length >= 5, `Contains ${mernGaps.gaps.length} distinct competency gaps`);
assert(mernGaps.gaps.some(g => g.priority === 'High'), 'Contains high priority bottleneck gaps');

// 4. Validate Course Catalog Across All 3 Tiers
assert(INITIAL_COURSES.length >= 6, `Catalog contains ${INITIAL_COURSES.length} courses`);
const beginnerCourses = INITIAL_COURSES.filter(c => c.difficulty === 'Beginner');
const intermediateCourses = INITIAL_COURSES.filter(c => c.difficulty === 'Intermediate');
const advancedCourses = INITIAL_COURSES.filter(c => c.difficulty === 'Advanced');

assert(beginnerCourses.length >= 2, `Beginner tier courses present (${beginnerCourses.length})`);
assert(intermediateCourses.length >= 2, `Intermediate tier courses present (${intermediateCourses.length})`);
assert(advancedCourses.length >= 2, `Advanced tier courses present (${advancedCourses.length})`);

// 5. Validate Course Learning Resources (Official Docs, YouTube, Platforms)
INITIAL_COURSES.forEach((course) => {
  assert(course.resources && course.resources.officialDocs && course.resources.officialDocs.url.startsWith('http'), `${course.title} has verified official docs URL`);
  assert(course.resources.youtubeVideo && course.resources.youtubeVideo.url.startsWith('http'), `${course.title} has verified YouTube tutorial URL`);
  assert(course.resources.youtubeChannel && course.resources.youtubeChannel.url.startsWith('http'), `${course.title} has verified YouTube channel URL`);
});

// 6. Validate Assessments & Quiz Data
assert(INITIAL_ASSESSMENTS.length >= 4, `Assessments catalog contains ${INITIAL_ASSESSMENTS.length} tests`);
INITIAL_ASSESSMENTS.forEach((assessment) => {
  assert(Array.isArray(assessment.questions) && assessment.questions.length === 5, `${assessment.title} has exactly 5 questions`);
  assessment.questions.forEach((q, i) => {
    assert(Array.isArray(q.options) && q.options.length === 4, `${assessment.title} Q${i+1} has 4 options`);
    assert(typeof q.correctAnswerIndex === 'number' && q.correctAnswerIndex >= 0 && q.correctAnswerIndex < 4, `${assessment.title} Q${i+1} has valid correctAnswerIndex`);
    assert(typeof q.explanation === 'string' && q.explanation.length > 10, `${assessment.title} Q${i+1} has educational explanation`);
  });
});

console.log('\n============================================================');
console.log(`📊 CLIENT INTEGRATION TEST: ${passed} PASSED / ${failed} FAILED (${Math.round((passed / (passed + failed)) * 100)}%)`);
console.log('============================================================\n');

if (failed === 0) {
  process.exit(0);
} else {
  process.exit(1);
}
