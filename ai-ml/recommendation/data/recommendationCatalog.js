/**
 * LearnPath AI — Curated Educational Recommendation Catalog
 * Legitimate learning modules, practice tracks, and official documentation references
 * mapped across modern engineering competencies.
 */

export const RECOMMENDATION_CATALOG = [
  // ── JAVASCRIPT / TYPESCRIPT ──
  {
    id: 'rec-js-core',
    skill: 'JavaScript',
    title: 'Modern JavaScript (ES6+) & Asynchronous Architecture',
    type: 'COURSE',
    difficulty: 'Beginner',
    estimatedHours: 10,
    prerequisites: [],
    category: 'Programming',
    summary: 'Master closures, event loop microtasks, async/await control flow, and ES6+ modular design.',
    resources: [
      { title: 'MDN JavaScript Guide', type: 'DOCUMENTATION', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', source: 'MDN Web Docs' },
      { title: 'JavaScript.info Complete Reference', type: 'ARTICLE', url: 'https://javascript.info/', source: 'JavaScript.info' }
    ]
  },
  {
    id: 'rec-ts-enterprise',
    skill: 'TypeScript',
    title: 'TypeScript 5.x Mastery for Scalable Applications',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    prerequisites: ['JavaScript'],
    category: 'Programming',
    summary: 'Generics, discriminated unions, utility types, and runtime schema validation with Zod.',
    resources: [
      { title: 'TypeScript Official Handbook', type: 'DOCUMENTATION', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', source: 'TypeScript Official' },
      { title: 'TypeScript Playground & Samples', type: 'LAB', url: 'https://www.typescriptlang.org/play', source: 'TypeScript Official' }
    ]
  },

  // ── REACT & FRONTEND ──
  {
    id: 'rec-react-hooks',
    skill: 'React',
    title: 'React 18 Architecture & Custom Hooks Design',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 14,
    prerequisites: ['JavaScript'],
    category: 'Frontend',
    summary: 'Fiber reconciliation, custom hooks, referential equality with useMemo/useCallback, and state management.',
    resources: [
      { title: 'React Official Documentation', type: 'DOCUMENTATION', url: 'https://react.dev/learn', source: 'React.dev' },
      { title: 'React DevTools Profiling Guide', type: 'ARTICLE', url: 'https://react.dev/reference/react/Profiler', source: 'React.dev' }
    ]
  },
  {
    id: 'rec-html-css-foundations',
    skill: 'HTML & CSS',
    title: 'Semantic HTML5, CSS Grid, Flexbox & Responsive Layouts',
    type: 'COURSE',
    difficulty: 'Beginner',
    estimatedHours: 8,
    prerequisites: [],
    category: 'Frontend',
    summary: 'Semantic document structure, accessible ARIA roles, modern CSS Grid/Flexbox layouts, and Tailwind utilities.',
    resources: [
      { title: 'MDN HTML & CSS Learning Track', type: 'DOCUMENTATION', url: 'https://developer.mozilla.org/en-US/docs/Learn', source: 'MDN Web Docs' }
    ]
  },

  // ── NODE.JS & BACKEND ──
  {
    id: 'rec-node-express',
    skill: 'Node.js',
    title: 'Production Node.js & Express.js Microservices Architecture',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 14,
    prerequisites: ['JavaScript'],
    category: 'Backend',
    summary: 'libuv event loop concurrency, streams, asynchronous error boundaries, rate limiting, and RESTful routing.',
    resources: [
      { title: 'Node.js Official Documentation', type: 'DOCUMENTATION', url: 'https://nodejs.org/docs/latest/api/', source: 'Node.js Official' },
      { title: 'Express.js Production Best Practices', type: 'ARTICLE', url: 'https://expressjs.com/en/advanced/best-practice-performance.html', source: 'Express.js' }
    ]
  },
  {
    id: 'rec-sql-databases',
    skill: 'SQL & Relational Databases',
    title: 'Relational Database Design, SQL Queries & Index Optimization',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    prerequisites: [],
    category: 'Database',
    summary: 'ACID transactions, complex JOINs, window functions, composite indexing, and query execution plans.',
    resources: [
      { title: 'PostgreSQL Official Documentation', type: 'DOCUMENTATION', url: 'https://www.postgresql.org/docs/current/', source: 'PostgreSQL.org' }
    ]
  },
  {
    id: 'rec-mongodb-nosql',
    skill: 'MongoDB',
    title: 'MongoDB Schema Architecture & Aggregation Pipelines',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    prerequisites: [],
    category: 'Database',
    summary: 'Document data modeling, multi-stage aggregation pipelines ($match, $group, $lookup), and replica set indexing.',
    resources: [
      { title: 'MongoDB Manual & University Tutorials', type: 'DOCUMENTATION', url: 'https://www.mongodb.com/docs/manual/', source: 'MongoDB.com' }
    ]
  },

  // ── DEVOPS, CLOUD & CONTAINERS ──
  {
    id: 'rec-docker-containers',
    skill: 'Docker & Containerization',
    title: 'Docker Containers, Multi-Stage Builds & CI/CD Pipelines',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 10,
    prerequisites: [],
    category: 'DevOps',
    summary: 'Multi-stage Dockerfiles, image footprint optimization, layer caching, and docker-compose microservices.',
    resources: [
      { title: 'Docker Official Documentation', type: 'DOCUMENTATION', url: 'https://docs.docker.com/get-started/', source: 'Docker Docs' }
    ]
  },
  {
    id: 'rec-aws-cloud',
    skill: 'AWS (or Azure/GCP)',
    title: 'AWS Cloud Architecture & Scalable Infrastructure',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    prerequisites: [],
    category: 'Cloud Infrastructure',
    summary: 'EC2, S3, Lambda serverless, VPC networking, IAM security, and CloudFront CDN distribution.',
    resources: [
      { title: 'AWS Official Documentation & Whitepapers', type: 'DOCUMENTATION', url: 'https://docs.aws.amazon.com/', source: 'AWS Official' }
    ]
  },
  {
    id: 'rec-kubernetes-orchestration',
    skill: 'Kubernetes Cluster Management',
    title: 'Kubernetes Cluster Orchestration & Helm Deployment',
    type: 'COURSE',
    difficulty: 'Advanced',
    estimatedHours: 16,
    prerequisites: ['Docker & Containerization'],
    category: 'DevOps',
    summary: 'Pods, Deployments, Services, Ingress Controllers, ConfigMaps, Secrets, and rolling updates.',
    resources: [
      { title: 'Kubernetes Official Documentation', type: 'DOCUMENTATION', url: 'https://kubernetes.io/docs/home/', source: 'Kubernetes.io' }
    ]
  },

  // ── DATA SCIENCE & MACHINE LEARNING ──
  {
    id: 'rec-python-fundamentals',
    skill: 'Python',
    title: 'Python Programming, Data Structures & OOP Foundations',
    type: 'COURSE',
    difficulty: 'Beginner',
    estimatedHours: 10,
    prerequisites: [],
    category: 'Programming',
    summary: 'Core syntax, list comprehensions, decorators, generators, object-oriented design, and pytest suites.',
    resources: [
      { title: 'Python 3 Official Tutorial', type: 'DOCUMENTATION', url: 'https://docs.python.org/3/tutorial/', source: 'Python.org' }
    ]
  },
  {
    id: 'rec-pandas-numpy',
    skill: 'Pandas & NumPy',
    title: 'Data Wrangling & Vectorized Computations with NumPy & Pandas',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 12,
    prerequisites: ['Python'],
    category: 'Data Analysis',
    summary: 'Series/DataFrames, indexing, multi-level aggregation, vectorized array broadcasting, and missing data imputation.',
    resources: [
      { title: 'Pandas User Guide', type: 'DOCUMENTATION', url: 'https://pandas.pydata.org/docs/user_guide/index.html', source: 'PyData.org' }
    ]
  },
  {
    id: 'rec-scikit-learn-ml',
    skill: 'Machine Learning (Scikit-Learn)',
    title: 'Applied Machine Learning & Predictive Modeling',
    type: 'COURSE',
    difficulty: 'Intermediate',
    estimatedHours: 16,
    prerequisites: ['Python', 'Pandas & NumPy'],
    category: 'Machine Learning',
    summary: 'Supervised/unsupervised algorithms, cross-validation, hyperparameter tuning with GridSearchCV, and ROC/AUC metrics.',
    resources: [
      { title: 'Scikit-Learn User Guide', type: 'DOCUMENTATION', url: 'https://scikit-learn.org/stable/user_guide.html', source: 'Scikit-Learn.org' }
    ]
  },
  {
    id: 'rec-pytorch-deep-learning',
    skill: 'Deep Learning (PyTorch/TensorFlow)',
    title: 'Deep Learning with PyTorch: Tensors, Autograd & Neural Networks',
    type: 'COURSE',
    difficulty: 'Advanced',
    estimatedHours: 20,
    prerequisites: ['Python', 'Machine Learning (Scikit-Learn)'],
    category: 'Deep Learning',
    summary: 'CNNs, Transformers, backpropagation mechanics, loss optimization, and GPU model acceleration.',
    resources: [
      { title: 'PyTorch Official Tutorials', type: 'DOCUMENTATION', url: 'https://pytorch.org/tutorials/', source: 'PyTorch.org' }
    ]
  }
];

/**
 * Normalizes a skill name for catalog matching.
 */
export function normalizeCatalogSkill(skill = '') {
  if (!skill || typeof skill !== 'string') return '';
  const s = skill.toLowerCase().trim();

  if (s.includes('javascript') || s === 'js') return 'JavaScript';
  if (s.includes('typescript') || s === 'ts') return 'TypeScript';
  if (s.includes('react')) return 'React';
  if (s.includes('node')) return 'Node.js';
  if (s.includes('express')) return 'Node.js';
  if (s.includes('sql') || s.includes('postgres') || s.includes('relational')) return 'SQL & Relational Databases';
  if (s.includes('mongo')) return 'MongoDB';
  if (s.includes('docker') || s.includes('container')) return 'Docker & Containerization';
  if (s.includes('aws') || s.includes('cloud')) return 'AWS (or Azure/GCP)';
  if (s.includes('kubernetes') || s.includes('k8s')) return 'Kubernetes Cluster Management';
  if (s.includes('python')) return 'Python';
  if (s.includes('pandas') || s.includes('numpy')) return 'Pandas & NumPy';
  if (s.includes('scikit') || s.includes('machine learning')) return 'Machine Learning (Scikit-Learn)';
  if (s.includes('pytorch') || s.includes('tensorflow') || s.includes('deep learning')) return 'Deep Learning (PyTorch/TensorFlow)';
  if (s.includes('html') || s.includes('css')) return 'HTML & CSS';

  return skill.trim();
}
