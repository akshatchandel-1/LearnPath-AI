/**
 * LearnPath AI — Assistant Prompts Registry & Intent Classifier
 * Exports modular prompt generators and classifies message intents accurately.
 */

export { SYSTEM_PROMPT, getSystemPrompt } from './systemPrompt.js';
export { getCareerPrompt } from './careerPrompt.js';
export { getCodingPrompt } from './codingPrompt.js';
export { getLearningPrompt } from './learningPrompt.js';
export { getInterviewPrompt } from './interviewPrompt.js';
export { getSkillGapPrompt } from './skillGapPrompt.js';
export { getMetricsPrompt } from './metricsPrompt.js';

/**
 * Extracts specific skill names from query text (e.g. JavaScript, Python, MongoDB, React, Node.js, Docker, etc.)
 */
export const extractSkillFromQuery = (query = '') => {
  const q = query.toLowerCase();
  const knownSkills = [
    { name: 'JavaScript', aliases: ['javascript', 'js', 'es6', 'vanilla js'] },
    { name: 'TypeScript', aliases: ['typescript', 'ts'] },
    { name: 'React', aliases: ['react', 'react.js', 'reactjs', 'hooks'] },
    { name: 'Node.js', aliases: ['node.js', 'nodejs', 'node', 'express', 'express.js'] },
    { name: 'Python', aliases: ['python', 'py'] },
    { name: 'MongoDB', aliases: ['mongodb', 'mongo', 'nosql', 'mongoose'] },
    { name: 'SQL', aliases: ['sql', 'postgresql', 'postgres', 'mysql', 'database'] },
    { name: 'Docker', aliases: ['docker', 'containers', 'containerization'] },
    { name: 'Kubernetes', aliases: ['kubernetes', 'k8s'] },
    { name: 'AWS', aliases: ['aws', 'cloud', 'amazon web services'] },
    { name: 'HTML', aliases: ['html', 'html5'] },
    { name: 'CSS', aliases: ['css', 'css3', 'tailwind', 'flexbox', 'grid'] },
    { name: 'Git', aliases: ['git', 'github'] },
    { name: 'Redis', aliases: ['redis', 'caching'] },
    { name: 'GraphQL', aliases: ['graphql', 'apollo'] },
    { name: 'Next.js', aliases: ['next.js', 'nextjs', 'next'] },
    { name: 'Kafka', aliases: ['kafka', 'message queue', 'event streaming'] },
    { name: 'Rust', aliases: ['rust', 'rustlang'] },
    { name: 'Machine Learning', aliases: ['machine learning', 'ml', 'scikit-learn', 'scikit'] },
    { name: 'Deep Learning', aliases: ['deep learning', 'pytorch', 'tensorflow', 'neural network'] },
    { name: 'System Design', aliases: ['system design', 'distributed systems', 'architecture'] }
  ];

  for (const item of knownSkills) {
    for (const alias of item.aliases) {
      // Word boundary match
      const regex = new RegExp(`\\b${alias.replace('.', '\\.')}\\b`, 'i');
      if (regex.test(q)) {
        return item.name;
      }
    }
  }

  return null;
};

/**
 * Classifies user message intent and builds structured metadata payload.
 */
export const buildPromptForMessage = ({
  message = '',
  targetRole = 'Full Stack Developer',
  currentSkills = [],
  learningContext = {},
  userMetrics = {}
}) => {
  const lower = message.toLowerCase().trim();
  const targetSkill = extractSkillFromQuery(lower);

  let intent = 'GENERAL_LEARNING';
  let metricType = null;

  // 1. PROGRESS_METRICS Intent
  if (
    lower.includes('how many course') ||
    lower.includes('courses completed') ||
    lower.includes('completed course') ||
    lower.includes('courses have i') ||
    lower.includes('courses are active') ||
    lower.includes('active course') ||
    lower.includes('enrolled course') ||
    lower.includes('how much xp') ||
    lower.includes('my xp') ||
    lower.includes('xp have i') ||
    lower.includes('total xp') ||
    lower.includes('current streak') ||
    lower.includes('my streak') ||
    lower.includes('streak day') ||
    lower.includes('how many lesson') ||
    lower.includes('lessons completed') ||
    lower.includes('my progress')
  ) {
    intent = 'PROGRESS_METRICS';
    if (lower.includes('completed course') || lower.includes('courses completed') || lower.includes('courses have i')) {
      metricType = 'COMPLETED_COURSES';
    } else if (lower.includes('active') || lower.includes('enrolled')) {
      metricType = 'ACTIVE_COURSES';
    } else if (lower.includes('xp')) {
      metricType = 'TOTAL_XP';
    } else if (lower.includes('streak')) {
      metricType = 'STREAK_DAYS';
    } else if (lower.includes('lesson')) {
      metricType = 'COMPLETED_LESSONS';
    } else {
      metricType = 'OVERALL_PROGRESS';
    }
  }
  // 2. QUIZ_REQUEST Intent
  else if (
    lower.includes('create a quiz') ||
    lower.includes('generate quiz') ||
    lower.includes('quiz for') ||
    lower.includes('quiz on') ||
    lower.includes('quiz me') ||
    lower.includes('checkpoint quiz') ||
    lower.includes('test my knowledge')
  ) {
    intent = 'QUIZ_REQUEST';
  }
  // 3. RESOURCE_REQUEST / COURSE_RECOMMENDATION Intent
  else if (
    lower.includes('documentation') ||
    lower.includes('docs for') ||
    lower.includes('give me documentation') ||
    lower.includes('give me resources') ||
    lower.includes('resources for') ||
    lower.includes('recommend course') ||
    lower.includes('recommend a course') ||
    lower.includes('best course') ||
    lower.includes('tutorials for') ||
    (lower.includes('resource') && !lower.includes('human resource'))
  ) {
    intent = 'RESOURCE_REQUEST';
  }
  // 4. SKILL_GAP Intent
  else if (
    lower.includes('weak in') ||
    lower.includes('struggling with') ||
    lower.includes('my gap') ||
    lower.includes('skill gap') ||
    lower.includes('bad at') ||
    lower.includes('trouble with') ||
    lower.includes('improve my') ||
    lower.includes('dont know') ||
    lower.includes("don't know") ||
    lower.includes('improve on')
  ) {
    intent = 'SKILL_GAP';
  }
  // 5. INTERVIEW Intent
  else if (
    lower.includes('interview') ||
    lower.includes('prepare for') ||
    lower.includes('mock interview') ||
    lower.includes('interview question') ||
    lower.includes('hiring question')
  ) {
    intent = 'INTERVIEW';
  }
  // 6. CAREER Intent
  else if (
    lower.includes('career') ||
    lower.includes('job market') ||
    lower.includes('salary') ||
    lower.includes('transition to') ||
    lower.includes('portfolio') ||
    lower.includes('resume')
  ) {
    intent = 'CAREER';
  }
  // 7. LEARNING_PLAN / ROADMAP Intent
  else if (
    lower.includes('learn next') ||
    lower.includes('what should i study') ||
    lower.includes('what to study') ||
    lower.includes('next step') ||
    lower.includes('study plan') ||
    lower.includes('study cadence') ||
    lower.includes('roadmap') ||
    lower.includes('current phase')
  ) {
    intent = 'LEARNING_PLAN';
  }
  // 8. CODING Intent
  else if (
    lower.includes('explain') ||
    lower.includes('how does') ||
    lower.includes('how to build') ||
    lower.includes('code example') ||
    lower.includes('syntax') ||
    lower.includes('debug') ||
    lower.includes('error') ||
    lower.includes('bug') ||
    lower.includes('hook') ||
    lower.includes('event loop') ||
    lower.includes('architecture') ||
    lower.includes('pattern')
  ) {
    intent = 'CODING';
  }

  return {
    intent,
    metricType,
    targetSkill,
    targetRole,
    currentSkills,
    learningContext,
    userMetrics,
    userQuery: message
  };
};
