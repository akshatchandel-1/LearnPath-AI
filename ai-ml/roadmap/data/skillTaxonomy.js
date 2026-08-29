/**
 * LearnPath AI — Skill Taxonomy & Knowledge Graph
 * Defines technical skills, domain categories, prerequisite relationships, and baseline study hours.
 */

export const SKILL_TAXONOMY = {
  // Frontend
  'html': { category: 'Frontend', domain: 'Web Core', defaultHours: 10, prerequisites: [] },
  'css': { category: 'Frontend', domain: 'Web Core', defaultHours: 15, prerequisites: ['html'] },
  'javascript': { category: 'Frontend', domain: 'Web Core', defaultHours: 30, prerequisites: ['html'] },
  'typescript': { category: 'Frontend', domain: 'Languages', defaultHours: 20, prerequisites: ['javascript'] },
  'react': { category: 'Frontend', domain: 'Frameworks', defaultHours: 35, prerequisites: ['javascript', 'html', 'css'] },
  'nextjs': { category: 'Frontend', domain: 'Frameworks', defaultHours: 25, prerequisites: ['react', 'typescript'] },
  'vue': { category: 'Frontend', domain: 'Frameworks', defaultHours: 25, prerequisites: ['javascript'] },
  'angular': { category: 'Frontend', domain: 'Frameworks', defaultHours: 35, prerequisites: ['typescript'] },
  'tailwind': { category: 'Frontend', domain: 'Styling', defaultHours: 12, prerequisites: ['css'] },
  'redux': { category: 'Frontend', domain: 'State Management', defaultHours: 15, prerequisites: ['react'] },
  'zustand': { category: 'Frontend', domain: 'State Management', defaultHours: 8, prerequisites: ['react'] },

  // Backend
  'nodejs': { category: 'Backend', domain: 'Runtime', defaultHours: 25, prerequisites: ['javascript'] },
  'express': { category: 'Backend', domain: 'Frameworks', defaultHours: 20, prerequisites: ['nodejs'] },
  'nestjs': { category: 'Backend', domain: 'Frameworks', defaultHours: 25, prerequisites: ['nodejs', 'typescript'] },
  'python': { category: 'Backend', domain: 'Languages', defaultHours: 30, prerequisites: [] },
  'django': { category: 'Backend', domain: 'Frameworks', defaultHours: 30, prerequisites: ['python'] },
  'fastapi': { category: 'Backend', domain: 'Frameworks', defaultHours: 20, prerequisites: ['python'] },
  'java': { category: 'Backend', domain: 'Languages', defaultHours: 40, prerequisites: [] },
  'springboot': { category: 'Backend', domain: 'Frameworks', defaultHours: 35, prerequisites: ['java'] },
  'golang': { category: 'Backend', domain: 'Languages', defaultHours: 25, prerequisites: [] },
  'rust': { category: 'Backend', domain: 'Languages', defaultHours: 45, prerequisites: [] },
  'graphql': { category: 'Backend', domain: 'APIs', defaultHours: 15, prerequisites: ['nodejs'] },
  'restapi': { category: 'Backend', domain: 'APIs', defaultHours: 15, prerequisites: ['javascript'] },
  'websockets': { category: 'Backend', domain: 'Realtime', defaultHours: 12, prerequisites: ['nodejs'] },
  'grpc': { category: 'Backend', domain: 'Microservices', defaultHours: 15, prerequisites: ['backend'] },

  // Database
  'sql': { category: 'Database', domain: 'Relational', defaultHours: 20, prerequisites: [] },
  'postgresql': { category: 'Database', domain: 'Relational', defaultHours: 25, prerequisites: ['sql'] },
  'mysql': { category: 'Database', domain: 'Relational', defaultHours: 20, prerequisites: ['sql'] },
  'mongodb': { category: 'Database', domain: 'NoSQL', defaultHours: 20, prerequisites: ['javascript'] },
  'redis': { category: 'Database', domain: 'Caching', defaultHours: 15, prerequisites: [] },
  'prisma': { category: 'Database', domain: 'ORM', defaultHours: 10, prerequisites: ['typescript', 'sql'] },

  // Data Science & AI/ML
  'numpy': { category: 'Data Science', domain: 'Numerical', defaultHours: 15, prerequisites: ['python'] },
  'pandas': { category: 'Data Science', domain: 'Data Wrangling', defaultHours: 20, prerequisites: ['python', 'numpy'] },
  'scikitlearn': { category: 'Machine Learning', domain: 'ML Core', defaultHours: 30, prerequisites: ['python', 'numpy', 'pandas'] },
  'pytorch': { category: 'Deep Learning', domain: 'Neural Networks', defaultHours: 40, prerequisites: ['python', 'numpy'] },
  'tensorflow': { category: 'Deep Learning', domain: 'Neural Networks', defaultHours: 40, prerequisites: ['python', 'numpy'] },
  'nlp': { category: 'AI', domain: 'Language Models', defaultHours: 30, prerequisites: ['pytorch'] },
  'computervision': { category: 'AI', domain: 'Vision Models', defaultHours: 30, prerequisites: ['pytorch'] },
  'rag': { category: 'AI', domain: 'Generative AI', defaultHours: 20, prerequisites: ['python', 'nlp'] },
  'vector_databases': { category: 'AI', domain: 'Databases', defaultHours: 12, prerequisites: ['rag'] },

  // Cloud & DevOps
  'git': { category: 'DevOps', domain: 'Version Control', defaultHours: 10, prerequisites: [] },
  'docker': { category: 'DevOps', domain: 'Containers', defaultHours: 20, prerequisites: ['linux'] },
  'kubernetes': { category: 'DevOps', domain: 'Orchestration', defaultHours: 35, prerequisites: ['docker'] },
  'linux': { category: 'Infrastructure', domain: 'OS', defaultHours: 20, prerequisites: [] },
  'aws': { category: 'Cloud', domain: 'Cloud Provider', defaultHours: 40, prerequisites: ['linux'] },
  'gcp': { category: 'Cloud', domain: 'Cloud Provider', defaultHours: 35, prerequisites: ['linux'] },
  'azure': { category: 'Cloud', domain: 'Cloud Provider', defaultHours: 35, prerequisites: ['linux'] },
  'terraform': { category: 'DevOps', domain: 'IaC', defaultHours: 25, prerequisites: ['aws'] },
  'cicd': { category: 'DevOps', domain: 'Automation', defaultHours: 18, prerequisites: ['git', 'docker'] },
  'prometheus': { category: 'Observability', domain: 'Monitoring', defaultHours: 15, prerequisites: ['docker'] },

  // Architecture & Systems
  'systemdesign': { category: 'Architecture', domain: 'Distributed Systems', defaultHours: 40, prerequisites: ['backend', 'database'] },
  'datastructures': { category: 'Computer Science', domain: 'Algorithms', defaultHours: 35, prerequisites: [] },
  'algorithms': { category: 'Computer Science', domain: 'Algorithms', defaultHours: 40, prerequisites: ['datastructures'] },
  'security': { category: 'Security', domain: 'AppSec', defaultHours: 25, prerequisites: ['backend', 'networking'] },
  'networking': { category: 'Infrastructure', domain: 'Protocols', defaultHours: 20, prerequisites: [] }
};

/**
 * Normalizes skill names for fuzzy matching.
 * e.g. "React.js" -> "react", "Node JS" -> "nodejs", "Postgres" -> "postgresql"
 */
export const normalizeSkillName = (name) => {
  if (!name || typeof name !== 'string') return '';
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  const aliasMap = {
    'reactjs': 'react',
    'react': 'react',
    'nodejs': 'nodejs',
    'node': 'nodejs',
    'expressjs': 'express',
    'express': 'express',
    'js': 'javascript',
    'javascript': 'javascript',
    'ts': 'typescript',
    'typescript': 'typescript',
    'postgres': 'postgresql',
    'postgresql': 'postgresql',
    'mongo': 'mongodb',
    'mongodb': 'mongodb',
    'next': 'nextjs',
    'nextjs': 'nextjs',
    'k8s': 'kubernetes',
    'kubernetes': 'kubernetes',
    'scikit': 'scikitlearn',
    'scikitlearn': 'scikitlearn',
    'sklearn': 'scikitlearn',
    'tf': 'tensorflow',
    'tensorflow': 'tensorflow',
    'torch': 'pytorch',
    'pytorch': 'pytorch',
    'rest': 'restapi',
    'restapi': 'restapi',
    'dsa': 'datastructures',
    'algorithms': 'algorithms',
    'html5': 'html',
    'css3': 'css'
  };

  return aliasMap[clean] || clean;
};

/**
 * Retrieves metadata for a given skill or creates safe default.
 */
export const getSkillMetadata = (skillName) => {
  const norm = normalizeSkillName(skillName);
  return SKILL_TAXONOMY[norm] || {
    category: 'Engineering',
    domain: 'Core Competency',
    defaultHours: 15,
    prerequisites: []
  };
};
