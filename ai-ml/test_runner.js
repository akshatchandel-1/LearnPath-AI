/**
 * LearnPath AI - Master AI/ML Test Runner
 * Executes both Skill Gap Engine and Recommendation Engine test suites and verifies contracts.
 */

const skillGapTestSuite = require('./skill-gap/tests/skillGap.test');
const recommendationTestSuite = require('./recommendation/tests/recommendation.test');

function runAll() {
  console.log('\n============================================================');
  console.log('🚀 LEARNPATH AI — AI/ML MODULE INTEGRATION TEST RUNNER');
  console.log('============================================================');

  const skillGapResults = skillGapTestSuite.runTests();
  const recResults = recommendationTestSuite.runTests();

  const totalPassed = skillGapResults.passed + recResults.passed;
  const totalFailed = skillGapResults.failed + recResults.failed;
  const totalTests = totalPassed + totalFailed;

  console.log('\n============================================================');
  console.log('🏁 FINAL TEST SUMMARY');
  console.log('============================================================');
  console.log(`✅ Skill Gap Tests:     ${skillGapResults.passed} passed / ${skillGapResults.failed} failed`);
  console.log(`✅ Recommendation Tests: ${recResults.passed} passed / ${recResults.failed} failed`);
  console.log(`📊 TOTAL:                ${totalPassed} / ${totalTests} passed (${Math.round((totalPassed / totalTests) * 100)}%)`);
  console.log('============================================================\n');

  if (totalFailed > 0) {
    process.exit(1);
  }
}

runAll();
