/**
 * LearnPath AI - Recommendation Engine Test Suite
 * Tests role-based recommendations, gap-targeting, deduplication, explainability, and edge cases.
 */

const { generateRecommendations } = require('../index');

function runTests() {
  console.log('\n============================================================');
  console.log('🧪 RUNNING AI RECOMMENDATION ENGINE TESTS');
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

  // 1. MERN Stack Developer - Prompt Example
  {
    const input = {
      targetRole: 'MERN Stack Developer',
      skills: [
        { name: 'React', level: 60 },
        { name: 'Node.js', level: 40 },
      ],
      completedCourses: [],
      learningPreferences: {
        style: 'Hands-on Projects',
        difficulty: 'Intermediate',
      },
    };
    const result = generateRecommendations(input);
    assert('MERN Stack: matches target role', result.targetRole === 'MERN Stack Developer');
    assert('MERN Stack: returns non-empty recommendations array', Array.isArray(result.recommendations) && result.recommendations.length > 0);
    assert('MERN Stack: recommendations have title, type, reason, priority, skills', result.recommendations.every(r => r.title && r.type && r.reason && r.priority && Array.isArray(r.skills)));
    const hasHighPriority = result.recommendations.some(r => r.priority === 'high');
    assert('MERN Stack: includes high priority recommendations', hasHighPriority);
    const hasNodeOrMongo = result.recommendations.some(r => r.skills.includes('Node.js') || r.skills.includes('MongoDB') || r.skills.includes('Express.js'));
    assert('MERN Stack: targets crucial backend/database gaps (Node/Mongo/Express)', hasNodeOrMongo);
  }

  // 2. Data Scientist
  {
    const input = {
      targetRole: 'Data Scientist',
      skills: [
        { name: 'Python', level: 70 },
        { name: 'SQL', level: 50 },
      ],
      completedCourses: [],
      learningPreferences: {},
    };
    const result = generateRecommendations(input);
    assert('Data Scientist: returns valid recommendations', result.targetRole === 'Data Scientist');
    const hasMLOrStats = result.recommendations.some(r => r.skills.includes('Machine Learning Algorithms') || r.skills.includes('Applied Statistics & Probability') || r.skills.includes('Pandas & Data Wrangling'));
    assert('Data Scientist: prioritizes ML algorithms and statistical foundations', hasMLOrStats);
    assert('Data Scientist: reason explains gap and target role', result.recommendations[0].reason.length > 20);
  }

  // 3. Frontend Developer - Learning Style & Preference Match
  {
    const input = {
      targetRole: 'Frontend Developer',
      skills: [
        { name: 'HTML & CSS', level: 80 },
      ],
      completedCourses: [],
      learningPreferences: {
        style: 'Video',
        difficulty: 'Beginner',
      },
    };
    const result = generateRecommendations(input);
    assert('Frontend Developer: returns targeted recommendations', result.targetRole === 'Frontend Developer');
    const topRec = result.recommendations[0];
    assert('Frontend Developer: top recommendation addresses JavaScript or React', topRec.skills.includes('JavaScript') || topRec.skills.includes('React.js'));
  }

  // 4. Cloud Engineer
  {
    const input = {
      targetRole: 'Cloud Engineer',
      skills: [
        { name: 'Linux & Shell Scripting', level: 75 },
      ],
      completedCourses: [],
      learningPreferences: {},
    };
    const result = generateRecommendations(input);
    assert('Cloud Engineer: matches role', result.targetRole === 'Cloud Engineer');
    const hasAwsOrDocker = result.recommendations.some(r => r.skills.includes('AWS Cloud Fundamentals') || r.skills.includes('Docker & Containerization') || r.skills.includes('Kubernetes & Orchestration'));
    assert('Cloud Engineer: recommends AWS, Docker or Kubernetes', hasAwsOrDocker);
  }

  // 5. Data Analyst
  {
    const input = {
      targetRole: 'Data Analyst',
      skills: [
        { name: 'SQL & Relational Databases', level: 80 },
      ],
      completedCourses: [],
      learningPreferences: {},
    };
    const result = generateRecommendations(input);
    assert('Data Analyst: matches role', result.targetRole === 'Data Analyst');
    const hasDataViz = result.recommendations.some(r => r.skills.includes('Data Visualization & BI') || r.skills.includes('Pandas & Data Wrangling'));
    assert('Data Analyst: recommends BI/Visualization or Pandas', hasDataViz);
  }

  // 6. Completed Courses Filtering & Deduplication
  {
    const inputWithoutCompleted = {
      targetRole: 'MERN Stack Developer',
      skills: [{ name: 'React', level: 40 }],
      completedCourses: [],
    };
    const initialRecs = generateRecommendations(inputWithoutCompleted);
    const topCourseId = initialRecs.recommendations[0].id;
    const topCourseTitle = initialRecs.recommendations[0].title;

    const inputWithCompleted = {
      targetRole: 'MERN Stack Developer',
      skills: [{ name: 'React', level: 40 }],
      completedCourses: [topCourseId, topCourseTitle],
    };
    const filteredRecs = generateRecommendations(inputWithCompleted);
    const containsCompleted = filteredRecs.recommendations.some(r => r.id === topCourseId);
    assert('Completed Courses: successfully filters out completed course IDs/titles', !containsCompleted);
  }

  // 7. Empty Skills
  {
    const input = {
      targetRole: 'Frontend Developer',
      skills: [],
    };
    const result = generateRecommendations(input);
    assert('Empty Skills: generates recommendations without crashing', result.recommendations.length > 0);
    assert('Empty Skills: overall readiness is 0', result.overallReadiness === 0);
    assert('Empty Skills: all top recommendations are high priority', result.recommendations[0].priority === 'high');
  }

  // 8. Unknown Role
  {
    const input = {
      targetRole: 'Cybernetic Bio-Hacker',
      skills: [
        { name: 'Python', level: 80 },
      ],
    };
    const result = generateRecommendations(input);
    assert('Unknown Role: handles gracefully without crashing', result.targetRole === 'Cybernetic Bio-Hacker');
    assert('Unknown Role: returns fallback candidate courses', result.recommendations.length > 0);
  }

  // 9. Malformed and Defensive Inputs
  {
    const res1 = generateRecommendations(null);
    assert('Defensive: handles null input', res1 && res1.error && res1.recommendations.length === 0);

    const res2 = generateRecommendations({});
    assert('Defensive: handles empty object / missing targetRole', res2 && res2.error && res2.recommendations.length === 0);

    const res3 = generateRecommendations({
      targetRole: 'Software Engineer',
      skills: 'invalid_skills_string',
      completedCourses: null,
      learningPreferences: 'not_an_object',
    });
    assert('Defensive: handles invalid data types for skills, completedCourses, preferences', res3 && res3.recommendations.length > 0);
  }

  console.log('\n------------------------------------------------------------');
  console.log(`📊 RECOMMENDATION TEST RESULTS: ${passed} PASSED / ${failed} FAILED`);
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
