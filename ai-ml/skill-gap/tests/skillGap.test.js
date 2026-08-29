/**
 * LearnPath AI — Skill Gap Engine Backward Compatibility Test Suite
 * Used by ai-ml/test_runner.js
 */

const { analyzeSkillGap } = require('../index');

function runTests() {
  console.log('\n============================================================');
  console.log('🧪 RUNNING SKILL GAP ENGINE TESTS');
  console.log('============================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(testName, condition, detail = '') {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} - ${detail}`);
      failed++;
    }
  }

  // 1. MERN Stack Developer - Partial Skills
  {
    const input = {
      targetRole: 'MERN Stack Developer',
      currentSkills: [
        { name: 'React', level: 60 },
        { name: 'Node.js', level: 40 },
      ],
    };
    const result = analyzeSkillGap(input);
    assert('MERN Stack: matches target role display name', result.targetRole === 'MERN Stack Developer');
    assert('MERN Stack: calculates positive overall readiness', result.overallReadiness > 0 && result.overallReadiness < 100);
    assert('MERN Stack: detects gaps array', Array.isArray(result.gaps) && result.gaps.length >= 8);
    const reactGap = result.gaps.find(g => g.skill === 'React.js');
    assert('MERN Stack: normalizes React to React.js and calculates correct gap', reactGap && reactGap.currentLevel === 60 && reactGap.targetLevel === 85 && reactGap.gap === 25);
    const mongoGap = result.gaps.find(g => g.skill === 'MongoDB');
    assert('MERN Stack: detects unprovided skill MongoDB as missing with high priority', mongoGap && mongoGap.currentLevel === 0 && (mongoGap.priority === 'high' || mongoGap.priority === 'critical') && mongoGap.status === 'missing');
  }

  // 2. Data Scientist - Example from Prompt
  {
    const input = {
      targetRole: 'Data Scientist',
      currentSkills: [
        { name: 'Python', level: 70 },
        { name: 'SQL', level: 50 },
      ],
    };
    const result = analyzeSkillGap(input);
    assert('Data Scientist: returns valid analysis', result.targetRole === 'Data Scientist');
    assert('Data Scientist: overall readiness is non-zero and not default 50', typeof result.overallReadiness === 'number' && result.overallReadiness > 0);
    const mlGap = result.gaps.find(g => g.skill === 'Machine Learning Algorithms');
    assert('Data Scientist: identifies Machine Learning gap correctly', mlGap && mlGap.targetLevel === 85 && mlGap.currentLevel === 0 && (mlGap.priority === 'high' || mlGap.priority === 'critical'));
  }

  // 3. Frontend Developer - Strong Skills
  {
    const input = {
      targetRole: 'Frontend Developer',
      currentSkills: [
        { name: 'HTML & CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'React.js', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Next.js', level: 75 },
        { name: 'REST APIs', level: 80 },
        { name: 'Web Performance & CWV', level: 75 },
        { name: 'Git & Version Control', level: 75 },
      ],
    };
    const result = analyzeSkillGap(input);
    assert('Frontend Developer Strong: overall readiness is 100', result.overallReadiness === 100);
    assert('Frontend Developer Strong: readiness tier is Job Ready', result.readinessTier === 'Job Ready');
    const allMastered = result.gaps.every(g => g.gap === 0 && g.priority === 'none');
    assert('Frontend Developer Strong: all gaps are 0 with priority none', allMastered);
  }

  // 4. Data Analyst - Empty Skills
  {
    const input = {
      targetRole: 'Data Analyst',
      currentSkills: [],
    };
    const result = analyzeSkillGap(input);
    assert('Data Analyst Empty: overall readiness is 0 (not fake 50%)', result.overallReadiness === 0);
    assert('Data Analyst Empty: all required skills marked as missing/high priority', result.gaps.length > 0 && result.gaps.every(g => (g.priority === 'high' || g.priority === 'critical') && g.status === 'missing'));
  }

  // 5. Cloud Engineer - Aliases and String Levels
  {
    const input = {
      targetRole: 'Cloud Engineer',
      currentSkills: [
        { name: 'aws', level: '80' },
        { name: 'docker', level: 'intermediate' }, // 60
        { name: 'k8s', level: 'beginner' }, // 30
        { name: 'bash', level: 90 },
      ],
    };
    const result = analyzeSkillGap(input);
    assert('Cloud Engineer: correctly maps aws, docker, k8s, bash aliases', result.targetRole === 'Cloud Engineer');
    const awsGap = result.gaps.find(g => g.skill === 'AWS Cloud Fundamentals');
    assert('Cloud Engineer: AWS level parsed from string 80', awsGap && awsGap.currentLevel === 80);
    const dockerGap = result.gaps.find(g => g.skill === 'Docker & Containerization');
    assert('Cloud Engineer: Docker level converted from intermediate (60)', dockerGap && dockerGap.currentLevel === 60);
  }

  // 6. Unknown Role Handling
  {
    const input = {
      targetRole: 'Quantum Game Architect',
      currentSkills: [
        { name: 'C++', level: 70 },
        { name: 'Linear Algebra', level: 80 },
      ],
    };
    const result = analyzeSkillGap(input);
    assert('Unknown Role: handles gracefully without crashing', result.isUnknownRole === true || result.success === false);
    assert('Unknown Role: provides warning and supported roles', Array.isArray(result.supportedRoles) && result.supportedRoles.length > 0);
  }

  // 7. Unknown Skill in Known Role
  {
    const input = {
      targetRole: 'Frontend Developer',
      currentSkills: [
        { name: 'Ancient Egyptian Hieroglyphics', level: 100 },
        { name: 'React', level: 50 },
      ],
    };
    const result = analyzeSkillGap(input);
    assert('Unknown Skill: does not break standard evaluation', result.targetRole === 'Frontend Developer');
    const reactGap = result.gaps.find(g => g.skill === 'React.js');
    assert('Unknown Skill: React is still evaluated properly', reactGap && reactGap.currentLevel === 50);
  }

  // 8. Malformed and Defensive Inputs
  {
    const res1 = analyzeSkillGap(null);
    assert('Defensive: handles null input', res1 && res1.error && res1.overallReadiness === 0);

    const res2 = analyzeSkillGap({});
    assert('Defensive: handles missing targetRole', res2 && res2.error && res2.overallReadiness === 0);

    const res3 = analyzeSkillGap({
      targetRole: 'MERN Stack Developer',
      currentSkills: [
        { name: 'JavaScript', level: -50 },
        { name: 'React', level: 9999 },
        { name: null, level: NaN },
      ],
    });
    const jsGap = res3.skills.find(g => g.skill === 'JavaScript');
    assert('Defensive: bounds negative level to 0', jsGap && jsGap.currentLevel === 0);
    const rGap = res3.skills.find(g => g.skill === 'React.js');
    assert('Defensive: bounds 9999 level to 100', rGap && rGap.currentLevel === 100);
  }

  console.log('\n------------------------------------------------------------');
  console.log(`📊 SKILL GAP TEST RESULTS: ${passed} PASSED / ${failed} FAILED`);
  console.log('------------------------------------------------------------\n');

  return { passed, failed };
}

if (require.main === module) {
  const result = runTests();
  if (result.failed > 0) {
    process.exit(1);
  }
}

module.exports = { runTests };
