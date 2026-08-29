/**
 * LearnPath AI - Skills Taxonomy
 * Comprehensive standardized skill definitions, aliases, and prerequisite mappings.
 */

const SKILL_ALIASES = {
  // Frontend
  'html': 'HTML & CSS',
  'css': 'HTML & CSS',
  'html5': 'HTML & CSS',
  'css3': 'HTML & CSS',
  'html & css': 'HTML & CSS',
  'html/css': 'HTML & CSS',
  'javascript': 'JavaScript',
  'js': 'JavaScript',
  'es6': 'JavaScript',
  'es6+': 'JavaScript',
  'vanilla js': 'JavaScript',
  'typescript': 'TypeScript',
  'ts': 'TypeScript',
  'react': 'React.js',
  'reactjs': 'React.js',
  'react.js': 'React.js',
  'react native': 'React Native',
  'vue': 'Vue.js',
  'vuejs': 'Vue.js',
  'vue.js': 'Vue.js',
  'angular': 'Angular',
  'nextjs': 'Next.js',
  'next.js': 'Next.js',
  'tailwind': 'Tailwind CSS',
  'tailwindcss': 'Tailwind CSS',
  'redux': 'Redux & State Management',
  'redux toolkit': 'Redux & State Management',

  // Backend
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'express': 'Express.js',
  'expressjs': 'Express.js',
  'express.js': 'Express.js',
  'rest': 'REST APIs',
  'rest api': 'REST APIs',
  'rest apis': 'REST APIs',
  'restful apis': 'REST APIs',
  'graphql': 'GraphQL',
  'django': 'Django',
  'fastapi': 'FastAPI',
  'flask': 'Flask',
  'spring': 'Spring Boot',
  'spring boot': 'Spring Boot',
  'golang': 'Go (Golang)',
  'go': 'Go (Golang)',
  'auth': 'Authentication & Security',
  'jwt': 'Authentication & Security',
  'oauth': 'Authentication & Security',

  // Database
  'mongo': 'MongoDB',
  'mongodb': 'MongoDB',
  'sql': 'SQL & Relational Databases',
  'postgres': 'PostgreSQL',
  'postgresql': 'PostgreSQL',
  'mysql': 'MySQL',
  'redis': 'Redis & Caching',
  'orm': 'Database ORMs & Modeling',
  'prisma': 'Database ORMs & Modeling',

  // Data Science & AI/ML
  'python': 'Python Programming',
  'python3': 'Python Programming',
  'pandas': 'Pandas & Data Wrangling',
  'numpy': 'NumPy & Scientific Computing',
  'scikit-learn': 'Machine Learning Algorithms',
  'sklearn': 'Machine Learning Algorithms',
  'machine learning': 'Machine Learning Algorithms',
  'ml': 'Machine Learning Algorithms',
  'deep learning': 'Deep Learning & Neural Networks',
  'dl': 'Deep Learning & Neural Networks',
  'tensorflow': 'TensorFlow / PyTorch',
  'tf': 'TensorFlow / PyTorch',
  'pytorch': 'TensorFlow / PyTorch',
  'nlp': 'Natural Language Processing (NLP)',
  'natural language processing': 'Natural Language Processing (NLP)',
  'computer vision': 'Computer Vision (CV)',
  'cv': 'Computer Vision (CV)',
  'llm': 'LLM Engineering & Prompting',
  'llms': 'LLM Engineering & Prompting',
  'rag': 'RAG & Vector Databases',
  'statistics': 'Applied Statistics & Probability',
  'math': 'Applied Statistics & Probability',
  'data viz': 'Data Visualization & BI',
  'powerbi': 'Data Visualization & BI',
  'tableau': 'Data Visualization & BI',

  // Cloud & DevOps
  'git': 'Git & Version Control',
  'github': 'Git & Version Control',
  'docker': 'Docker & Containerization',
  'k8s': 'Kubernetes & Orchestration',
  'kubernetes': 'Kubernetes & Orchestration',
  'aws': 'AWS Cloud Fundamentals',
  'azure': 'Azure Cloud Fundamentals',
  'gcp': 'Google Cloud Platform (GCP)',
  'ci/cd': 'CI/CD Pipelines & Automation',
  'terraform': 'Infrastructure as Code (Terraform)',
  'linux': 'Linux & Shell Scripting',
  'bash': 'Linux & Shell Scripting',

  // Architecture & Engineering
  'dsa': 'Data Structures & Algorithms',
  'algorithms': 'Data Structures & Algorithms',
  'system design': 'System Design & Architecture',
  'microservices': 'Microservices Architecture',
  'testing': 'Unit & Integration Testing',
  'jest': 'Unit & Integration Testing',
  'security': 'Application Security & Hardening',
  'cybersecurity': 'Network & System Security',
};

const SKILLS_CATALOG = {
  'HTML & CSS': {
    category: 'Frontend',
    difficulty: 'Beginner',
    prerequisites: [],
    description: 'Semantic HTML5 structure, CSS3 grid/flexbox, and responsive layouts.',
  },
  'JavaScript': {
    category: 'Frontend',
    difficulty: 'Intermediate',
    prerequisites: ['HTML & CSS'],
    description: 'Core ES6+, closures, async/await, DOM, and Event Loop.',
  },
  'TypeScript': {
    category: 'Frontend',
    difficulty: 'Intermediate',
    prerequisites: ['JavaScript'],
    description: 'Type annotations, interfaces, generics, and compile-time verification.',
  },
  'React.js': {
    category: 'Frontend',
    difficulty: 'Intermediate',
    prerequisites: ['JavaScript'],
    description: 'Component lifecycles, hooks, virtual DOM reconciliation, and state management.',
  },
  'Tailwind CSS': {
    category: 'Frontend',
    difficulty: 'Beginner',
    prerequisites: ['HTML & CSS'],
    description: 'Utility-first CSS framework for modern design systems and responsiveness.',
  },
  'Next.js': {
    category: 'Frontend',
    difficulty: 'Intermediate',
    prerequisites: ['React.js'],
    description: 'Server Components, SSR/SSG, App Router, and fullstack React optimization.',
  },
  'Node.js': {
    category: 'Backend',
    difficulty: 'Intermediate',
    prerequisites: ['JavaScript'],
    description: 'V8 runtime, event-driven I/O, streams, and npm ecosystem.',
  },
  'Express.js': {
    category: 'Backend',
    difficulty: 'Beginner',
    prerequisites: ['Node.js'],
    description: 'Server routing, middleware pipelines, error handling, and API construction.',
  },
  'REST APIs': {
    category: 'Backend',
    difficulty: 'Intermediate',
    prerequisites: ['Express.js'],
    description: 'HTTP methods, status codes, payload structures, idempotency, and CRUD standards.',
  },
  'Authentication & Security': {
    category: 'Backend',
    difficulty: 'Intermediate',
    prerequisites: ['Express.js'],
    description: 'JWT lifecycles, bcrypt hashing, cookies, CORS, and role-based access control.',
  },
  'MongoDB': {
    category: 'Database',
    difficulty: 'Intermediate',
    prerequisites: ['Node.js'],
    description: 'Document data modeling, Mongoose schemas, indexing, and aggregation pipelines.',
  },
  'PostgreSQL': {
    category: 'Database',
    difficulty: 'Intermediate',
    prerequisites: ['SQL & Relational Databases'],
    description: 'Relational tables, foreign keys, ACID guarantees, joins, and indexing.',
  },
  'SQL & Relational Databases': {
    category: 'Database',
    difficulty: 'Intermediate',
    prerequisites: [],
    description: 'SQL queries, aggregations, schema normalization, and relational joins.',
  },
  'Python Programming': {
    category: 'Programming',
    difficulty: 'Beginner',
    prerequisites: [],
    description: 'Python syntax, data structures, OOP, functional paradigms, and package ecosystem.',
  },
  'Pandas & Data Wrangling': {
    category: 'Data Science',
    difficulty: 'Intermediate',
    prerequisites: ['Python Programming'],
    description: 'DataFrames, series manipulation, missing value treatment, and ETL workflows.',
  },
  'NumPy & Scientific Computing': {
    category: 'Data Science',
    difficulty: 'Intermediate',
    prerequisites: ['Python Programming'],
    description: 'N-dimensional arrays, vectorization, linear algebra, and broadcasting.',
  },
  'Machine Learning Algorithms': {
    category: 'AI & ML',
    difficulty: 'Intermediate',
    prerequisites: ['Python Programming', 'Applied Statistics & Probability'],
    description: 'Supervised/unsupervised models, regression, classification, clustering, and scikit-learn.',
  },
  'Deep Learning & Neural Networks': {
    category: 'AI & ML',
    difficulty: 'Advanced',
    prerequisites: ['Machine Learning Algorithms'],
    description: 'Backpropagation, CNNs, RNNs, Transformers, and gradient descent optimization.',
  },
  'TensorFlow / PyTorch': {
    category: 'AI & ML',
    difficulty: 'Advanced',
    prerequisites: ['Deep Learning & Neural Networks'],
    description: 'Deep learning frameworks, custom layers, GPU training, and model serialization.',
  },
  'LLM Engineering & Prompting': {
    category: 'AI & ML',
    difficulty: 'Intermediate',
    prerequisites: ['Python Programming'],
    description: 'Prompt design, context windows, fine-tuning, embeddings, and generative AI APIs.',
  },
  'RAG & Vector Databases': {
    category: 'AI & ML',
    difficulty: 'Intermediate',
    prerequisites: ['LLM Engineering & Prompting'],
    description: 'Chunking strategies, dense embeddings, vector search (Chroma, Pinecone), and retrieval.',
  },
  'Applied Statistics & Probability': {
    category: 'Data Science',
    difficulty: 'Intermediate',
    prerequisites: [],
    description: 'Hypothesis testing, p-values, distributions, Bayes theorem, and regression metrics.',
  },
  'Data Visualization & BI': {
    category: 'Data Science',
    difficulty: 'Beginner',
    prerequisites: ['SQL & Relational Databases'],
    description: 'Visual storytelling, interactive charts, Tableau/PowerBI, and Matplotlib/Seaborn.',
  },
  'Docker & Containerization': {
    category: 'DevOps & Cloud',
    difficulty: 'Intermediate',
    prerequisites: ['Linux & Shell Scripting'],
    description: 'Dockerfiles, container lifecycles, volume mounts, and multi-container Docker Compose.',
  },
  'Kubernetes & Orchestration': {
    category: 'DevOps & Cloud',
    difficulty: 'Advanced',
    prerequisites: ['Docker & Containerization'],
    description: 'Pods, deployments, services, ingress controllers, ConfigMaps, and cluster autoscaling.',
  },
  'AWS Cloud Fundamentals': {
    category: 'DevOps & Cloud',
    difficulty: 'Intermediate',
    prerequisites: ['Linux & Shell Scripting'],
    description: 'EC2, S3, IAM, Lambda, VPC networking, and cloud architecture principles.',
  },
  'CI/CD Pipelines & Automation': {
    category: 'DevOps & Cloud',
    difficulty: 'Intermediate',
    prerequisites: ['Git & Version Control'],
    description: 'GitHub Actions, automated testing triggers, build pipelines, and zero-downtime deployment.',
  },
  'Linux & Shell Scripting': {
    category: 'DevOps & Cloud',
    difficulty: 'Beginner',
    prerequisites: [],
    description: 'Bash scripting, file permissions, process management, SSH, and server administration.',
  },
  'Git & Version Control': {
    category: 'Software Engineering',
    difficulty: 'Beginner',
    prerequisites: [],
    description: 'Branching strategies, merge conflict resolution, rebasing, and pull request workflows.',
  },
  'Data Structures & Algorithms': {
    category: 'Computer Science',
    difficulty: 'Intermediate',
    prerequisites: [],
    description: 'Arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming.',
  },
  'System Design & Architecture': {
    category: 'Software Engineering',
    difficulty: 'Advanced',
    prerequisites: ['REST APIs', 'SQL & Relational Databases'],
    description: 'Scalability, load balancing, caching, database sharding, and fault tolerance.',
  },
  'Network & System Security': {
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    prerequisites: ['Linux & Shell Scripting'],
    description: 'TCP/IP networking, firewalls, threat modeling, vulnerability scanning, and pen testing.',
  },
  'React Native': {
    category: 'Mobile',
    difficulty: 'Intermediate',
    prerequisites: ['React.js'],
    description: 'Cross-platform mobile UI, native bridges, mobile navigation, and app store deployment.',
  },
};

/**
 * Normalizes any skill name against known aliases and standard catalog.
 * @param {string} skillName
 * @returns {string} Normalized standard skill name
 */
function normalizeSkillName(skillName) {
  if (!skillName || typeof skillName !== 'string') return '';
  const trimmed = skillName.trim();
  const lower = trimmed.toLowerCase();

  // 1. Direct alias match
  if (SKILL_ALIASES[lower]) {
    return SKILL_ALIASES[lower];
  }

  // 2. Direct catalog match
  for (const catalogName of Object.keys(SKILLS_CATALOG)) {
    if (catalogName.toLowerCase() === lower) {
      return catalogName;
    }
  }

  // 3. Substring matching in aliases
  for (const [aliasKey, standardName] of Object.entries(SKILL_ALIASES)) {
    if (lower === aliasKey || lower.startsWith(`${aliasKey} `) || lower.endsWith(` ${aliasKey}`)) {
      return standardName;
    }
  }

  // 4. Return title-cased trimmed version as fallback
  return trimmed;
}

module.exports = {
  SKILL_ALIASES,
  SKILLS_CATALOG,
  normalizeSkillName,
};
