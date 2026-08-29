/**
 * LearnPath AI - Roles Taxonomy
 * Benchmark proficiency benchmarks, skill importance weights, and role definitions.
 */

const ROLES_TAXONOMY = {
  'mern stack developer': {
    roleKey: 'mern stack developer',
    displayName: 'MERN Stack Developer',
    category: 'Web Development',
    aliases: [
      'mern stack developer', 'mern developer', 'mern stack', 'mern',
      'react node developer', 'react and node developer', 'fullstack mern'
    ],
    description: 'Builds modern dynamic web applications using MongoDB, Express.js, React.js, and Node.js.',
    requiredSkills: [
      { name: 'JavaScript', targetLevel: 85, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master asynchronous JS, event loop, closures, ES6+, and promises.' },
      { name: 'React.js', targetLevel: 85, importance: 1.0, isCore: true, minRequired: 30, suggestions: 'Build custom hooks, state management patterns, and understand React virtual DOM reconciliation.' },
      { name: 'Node.js', targetLevel: 80, importance: 0.95, isCore: true, minRequired: 30, suggestions: 'Learn event-driven architecture, file system streams, buffer handling, and npm module design.' },
      { name: 'Express.js', targetLevel: 80, importance: 0.9, isCore: true, minRequired: 25, suggestions: 'Master middleware pipelines, router architecture, and robust centralized error handling.' },
      { name: 'MongoDB', targetLevel: 75, importance: 0.85, isCore: true, minRequired: 25, suggestions: 'Practice schema modeling with Mongoose, indexing strategies, and multi-stage aggregation pipelines.' },
      { name: 'REST APIs', targetLevel: 80, importance: 0.9, isCore: true, minRequired: 30, suggestions: 'Design stateless RESTful endpoints, proper HTTP status codes, and JSON contract standards.' },
      { name: 'Authentication & Security', targetLevel: 75, importance: 0.85, isCore: false, minRequired: 20, suggestions: 'Implement JWT authentication, refresh tokens, bcrypt password hashing, and CORS/CSRF protection.' },
      { name: 'HTML & CSS', targetLevel: 85, importance: 0.8, isCore: false, minRequired: 40, suggestions: 'Strengthen responsive layout design with Flexbox, CSS Grid, and semantic HTML5.' },
      { name: 'Git & Version Control', targetLevel: 75, importance: 0.75, isCore: false, minRequired: 20, suggestions: 'Master branch workflows, interactive rebase, pull requests, and conflict resolution.' },
      { name: 'Docker & Containerization', targetLevel: 65, importance: 0.7, isCore: false, minRequired: 10, suggestions: 'Containerize multi-container MERN applications with Dockerfiles and Docker Compose.' }
    ]
  },

  'frontend developer': {
    roleKey: 'frontend developer',
    displayName: 'Frontend Developer',
    category: 'Web Development',
    aliases: [
      'frontend developer', 'frontend engineer', 'front-end developer', 'front end developer',
      'ui engineer', 'react developer', 'web frontend'
    ],
    description: 'Designs and builds responsive, accessible, and high-performance client-side user interfaces.',
    requiredSkills: [
      { name: 'HTML & CSS', targetLevel: 95, importance: 1.0, isCore: true, minRequired: 50, suggestions: 'Master semantic markup, CSS Grid, Flexbox, media queries, and accessibility (a11y) standards.' },
      { name: 'JavaScript', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 45, suggestions: 'Deep dive into DOM manipulation, modern ES Next features, browser APIs, and asynchronous programming.' },
      { name: 'React.js', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master React component lifecycle, custom hooks, context, memoization (useMemo/useCallback), and state management.' },
      { name: 'Tailwind CSS', targetLevel: 85, importance: 0.85, isCore: false, minRequired: 25, suggestions: 'Build responsive design systems using Tailwind utility classes, custom theme extensions, and dark mode.' },
      { name: 'TypeScript', targetLevel: 80, importance: 0.85, isCore: true, minRequired: 20, suggestions: 'Adopt static typing for React props, state interfaces, generics, and union type narrowing.' },
      { name: 'Next.js', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 15, suggestions: 'Understand Server Side Rendering (SSR), Static Site Generation (SSG), and App Router architecture.' },
      { name: 'REST APIs', targetLevel: 80, importance: 0.8, isCore: false, minRequired: 25, suggestions: 'Master async HTTP requests using Fetch/Axios, caching with TanStack Query, and error boundaries.' },
      { name: 'Git & Version Control', targetLevel: 75, importance: 0.75, isCore: false, minRequired: 20, suggestions: 'Utilize feature branch workflows, code reviews, and commit hygiene.' }
    ]
  },

  'backend developer': {
    roleKey: 'backend developer',
    displayName: 'Backend Developer',
    category: 'Web Development',
    aliases: [
      'backend developer', 'backend engineer', 'back-end developer', 'back end developer',
      'server side developer', 'api engineer', 'node backend developer'
    ],
    description: 'Architects robust server systems, RESTful & GraphQL APIs, microservices, and databases.',
    requiredSkills: [
      { name: 'JavaScript', targetLevel: 85, importance: 0.9, isCore: true, minRequired: 35, suggestions: 'Strengthen Node runtime execution model, asynchronous patterns, and event emission.' },
      { name: 'Node.js', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master process management, clustering, memory profiling, and non-blocking I/O.' },
      { name: 'Express.js', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Build modular controllers, validation middleware, rate-limiting, and error-handling pipelines.' },
      { name: 'REST APIs', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Create scalable API endpoints following REST constraints, idempotent methods, and pagination.' },
      { name: 'MongoDB', targetLevel: 80, importance: 0.85, isCore: false, minRequired: 25, suggestions: 'Master NoSQL schema design, query optimization, indexing, and aggregation pipelines.' },
      { name: 'PostgreSQL', targetLevel: 85, importance: 0.9, isCore: true, minRequired: 25, suggestions: 'Design normalized schemas, manage foreign keys, transactions (ACID), and write complex joins.' },
      { name: 'Authentication & Security', targetLevel: 85, importance: 0.9, isCore: true, minRequired: 30, suggestions: 'Secure APIs with JWT, refresh token rotation, OAuth2, bcrypt hashing, and rate limiting.' },
      { name: 'Docker & Containerization', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 20, suggestions: 'Build lightweight Docker images for backend services and configure multi-container networking.' },
      { name: 'System Design & Architecture', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 15, suggestions: 'Learn caching with Redis, load balancing, message queues, and horizontal scaling strategies.' }
    ]
  },

  'full stack developer': {
    roleKey: 'full stack developer',
    displayName: 'Full Stack Developer',
    category: 'Web Development',
    aliases: [
      'full stack developer', 'fullstack developer', 'full stack engineer', 'fullstack engineer',
      'full stack', 'fullstack', 'web developer'
    ],
    description: 'Coordinates end-to-end development of web platforms across frontend, backend, and persistence tiers.',
    requiredSkills: [
      { name: 'HTML & CSS', targetLevel: 90, importance: 0.9, isCore: true, minRequired: 40, suggestions: 'Ensure responsive design foundations, accessible DOM structure, and CSS layouts.' },
      { name: 'JavaScript', targetLevel: 85, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master both client and server JavaScript execution, promises, and modular code architecture.' },
      { name: 'React.js', targetLevel: 85, importance: 1.0, isCore: true, minRequired: 35, suggestions: 'Build component trees, state managers, and data-fetching hooks connected to backend APIs.' },
      { name: 'Node.js', targetLevel: 80, importance: 0.95, isCore: true, minRequired: 30, suggestions: 'Develop server endpoints, handle file operations, and manage runtime packages.' },
      { name: 'Express.js', targetLevel: 80, importance: 0.9, isCore: true, minRequired: 25, suggestions: 'Create structured REST API routing, request validation, and middleware pipelines.' },
      { name: 'MongoDB', targetLevel: 75, importance: 0.85, isCore: false, minRequired: 20, suggestions: 'Model documents and build efficient queries with Mongoose.' },
      { name: 'SQL & Relational Databases', targetLevel: 75, importance: 0.85, isCore: false, minRequired: 20, suggestions: 'Understand relational schemas, foreign keys, and query syntax.' },
      { name: 'REST APIs', targetLevel: 85, importance: 0.9, isCore: true, minRequired: 30, suggestions: 'Bridge frontend client and server with standardized REST API contracts.' },
      { name: 'Git & Version Control', targetLevel: 75, importance: 0.75, isCore: false, minRequired: 20, suggestions: 'Manage fullstack repositories, branch protection, and CI integrations.' },
      { name: 'Docker & Containerization', targetLevel: 65, importance: 0.7, isCore: false, minRequired: 10, suggestions: 'Package full-stack web applications into deployable container services.' }
    ]
  },

  'data scientist': {
    roleKey: 'data scientist',
    displayName: 'Data Scientist',
    category: 'Data Science & AI',
    aliases: [
      'data scientist', 'data science engineer', 'data science', 'ds', 'applied scientist'
    ],
    description: 'Derives statistical insights, performs data modeling, and builds predictive machine learning solutions.',
    requiredSkills: [
      { name: 'Python Programming', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Write idiomatic Python, vectorization, OOP, and data structure manipulation.' },
      { name: 'Pandas & Data Wrangling', targetLevel: 85, importance: 1.0, isCore: true, minRequired: 35, suggestions: 'Clean noisy datasets, perform multi-table joins, pivoting, and aggregate transformations.' },
      { name: 'NumPy & Scientific Computing', targetLevel: 80, importance: 0.9, isCore: true, minRequired: 30, suggestions: 'Master tensor indexing, broadcasting, matrix arithmetic, and vector operations.' },
      { name: 'Applied Statistics & Probability', targetLevel: 85, importance: 0.95, isCore: true, minRequired: 35, suggestions: 'Apply hypothesis testing, p-value analysis, probability distributions, and regression analytics.' },
      { name: 'Machine Learning Algorithms', targetLevel: 85, importance: 1.0, isCore: true, minRequired: 30, suggestions: 'Train regression, classification, random forests, XGBoost, and evaluate with cross-validation and ROC/AUC.' },
      { name: 'SQL & Relational Databases', targetLevel: 75, importance: 0.85, isCore: true, minRequired: 25, suggestions: 'Query data warehouses with window functions, CTEs, and complex joins.' },
      { name: 'Data Visualization & BI', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 20, suggestions: 'Create exploratory visual charts with Matplotlib, Seaborn, and interactive dashboards.' },
      { name: 'Deep Learning & Neural Networks', targetLevel: 70, importance: 0.75, isCore: false, minRequired: 10, suggestions: 'Learn neural network basics, gradient descent, and PyTorch model architectures.' }
    ]
  },

  'data analyst': {
    roleKey: 'data analyst',
    displayName: 'Data Analyst',
    category: 'Data Science & AI',
    aliases: [
      'data analyst', 'bi analyst', 'business intelligence analyst', 'data analytics'
    ],
    description: 'Analyzes business data trends, crafts executive dashboards, and delivers actionable BI reporting.',
    requiredSkills: [
      { name: 'SQL & Relational Databases', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 45, suggestions: 'Master advanced SQL queries, window functions, CTEs, rollups, and aggregation pipelines.' },
      { name: 'Data Visualization & BI', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Build executive dashboards, storytelling visuals, and metric KPI monitoring.' },
      { name: 'Python Programming', targetLevel: 75, importance: 0.85, isCore: false, minRequired: 20, suggestions: 'Automate data extraction, cleaning scripts, and basic statistical reporting with Python.' },
      { name: 'Pandas & Data Wrangling', targetLevel: 80, importance: 0.9, isCore: true, minRequired: 25, suggestions: 'Manipulate tabular data, cleanse duplicates, impute null values, and calculate aggregations.' },
      { name: 'Applied Statistics & Probability', targetLevel: 75, importance: 0.85, isCore: true, minRequired: 25, suggestions: 'Conduct A/B testing, cohort analysis, variance estimation, and trend forecasting.' },
      { name: 'Git & Version Control', targetLevel: 65, importance: 0.7, isCore: false, minRequired: 15, suggestions: 'Track analysis scripts and query definitions in Git repositories.' }
    ]
  },

  'machine learning engineer': {
    roleKey: 'machine learning engineer',
    displayName: 'Machine Learning Engineer',
    category: 'Data Science & AI',
    aliases: [
      'machine learning engineer', 'ml engineer', 'mle', 'ml engineer / researcher'
    ],
    description: 'Designs, trains, and deploys production machine learning pipelines and deep learning models.',
    requiredSkills: [
      { name: 'Python Programming', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 45, suggestions: 'Master advanced Python, performance optimization, multithreading, and OOP model abstractions.' },
      { name: 'Machine Learning Algorithms', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Build robust training pipelines, feature engineering, hyperparameter tuning, and model validation.' },
      { name: 'Deep Learning & Neural Networks', targetLevel: 85, importance: 0.95, isCore: true, minRequired: 30, suggestions: 'Master backpropagation, CNNs, Transformers, attention mechanisms, and custom loss functions.' },
      { name: 'TensorFlow / PyTorch', targetLevel: 85, importance: 0.95, isCore: true, minRequired: 30, suggestions: 'Implement models in PyTorch, handle GPU data loaders, distributed training, and model export (ONNX).' },
      { name: 'NumPy & Scientific Computing', targetLevel: 85, importance: 0.9, isCore: true, minRequired: 30, suggestions: 'Optimize matrix calculations, vector operations, and custom numerical routines.' },
      { name: 'Pandas & Data Wrangling', targetLevel: 80, importance: 0.85, isCore: false, minRequired: 25, suggestions: 'Perform dataset preprocessing, feature creation, and data validation.' },
      { name: 'Docker & Containerization', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 20, suggestions: 'Package ML inference services into containerized microservices.' },
      { name: 'CI/CD Pipelines & Automation', targetLevel: 70, importance: 0.75, isCore: false, minRequired: 15, suggestions: 'Set up automated model retraining, regression testing, and MLOps pipelines.' }
    ]
  },

  'ai engineer': {
    roleKey: 'ai engineer',
    displayName: 'AI Engineer',
    category: 'Data Science & AI',
    aliases: [
      'ai engineer', 'generative ai engineer', 'genai engineer', 'artificial intelligence engineer', 'llm engineer'
    ],
    description: 'Builds intelligent applications powered by Large Language Models, RAG systems, and AI APIs.',
    requiredSkills: [
      { name: 'Python Programming', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 45, suggestions: 'Develop asynchronous Python services, API client integrations, and prompt orchestration.' },
      { name: 'LLM Engineering & Prompting', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master few-shot prompting, structured JSON schema outputs, function calling, and token optimization.' },
      { name: 'RAG & Vector Databases', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 35, suggestions: 'Build retrieval pipelines with semantic chunking, dense vector embeddings, reranking, and vector DBs.' },
      { name: 'Machine Learning Algorithms', targetLevel: 80, importance: 0.85, isCore: true, minRequired: 25, suggestions: 'Understand classification, cosine similarity, embeddings geometry, and evaluation metrics.' },
      { name: 'REST APIs', targetLevel: 85, importance: 0.85, isCore: false, minRequired: 30, suggestions: 'Expose AI agent endpoints via FastAPI / Express microservices with streaming SSE responses.' },
      { name: 'Docker & Containerization', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 20, suggestions: 'Containerize AI agents and local vector stores for scalable deployment.' },
      { name: 'Data Structures & Algorithms', targetLevel: 75, importance: 0.75, isCore: false, minRequired: 20, suggestions: 'Optimize graph traversal, priority queues, and indexing for retrieval agents.' }
    ]
  },

  'cloud engineer': {
    roleKey: 'cloud engineer',
    displayName: 'Cloud Engineer',
    category: 'Cloud & Infrastructure',
    aliases: [
      'cloud engineer', 'cloud architect', 'aws engineer', 'azure engineer', 'cloud infrastructure engineer'
    ],
    description: 'Architects and maintains reliable, secure, and scalable cloud infrastructure and serverless solutions.',
    requiredSkills: [
      { name: 'AWS Cloud Fundamentals', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master VPC subnet architecture, IAM least privilege, EC2, S3, RDS, and Lambda serverless.' },
      { name: 'Docker & Containerization', targetLevel: 85, importance: 0.95, isCore: true, minRequired: 35, suggestions: 'Design multi-stage container builds, security vulnerability scanning, and Docker Compose.' },
      { name: 'Kubernetes & Orchestration', targetLevel: 80, importance: 0.9, isCore: true, minRequired: 25, suggestions: 'Manage cluster deployments, services, ingress routing, ConfigMaps, and horizontal pod autoscaling.' },
      { name: 'Linux & Shell Scripting', targetLevel: 85, importance: 0.9, isCore: true, minRequired: 35, suggestions: 'Write robust bash scripts, manage systemd services, SSH keys, and network diagnostics.' },
      { name: 'CI/CD Pipelines & Automation', targetLevel: 80, importance: 0.85, isCore: true, minRequired: 25, suggestions: 'Implement Infrastructure-as-Code pipelines with GitHub Actions and automated compliance checks.' },
      { name: 'Git & Version Control', targetLevel: 75, importance: 0.75, isCore: false, minRequired: 20, suggestions: 'Manage GitOps infrastructure repositories and branch-based deployment workflows.' },
      { name: 'System Design & Architecture', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 20, suggestions: 'Design multi-region disaster recovery, content delivery networks (CDN), and high availability.' }
    ]
  },

  'devops engineer': {
    roleKey: 'devops engineer',
    displayName: 'DevOps Engineer',
    category: 'Cloud & Infrastructure',
    aliases: [
      'devops engineer', 'devops', 'platform engineer', 'release engineer', 'sre / devops'
    ],
    description: 'Automates deployment lifecycles, builds robust CI/CD pipelines, and manages container orchestration.',
    requiredSkills: [
      { name: 'Docker & Containerization', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 45, suggestions: 'Optimize minimal Docker image sizes, multi-stage caching, and rootless container security.' },
      { name: 'Kubernetes & Orchestration', targetLevel: 85, importance: 1.0, isCore: true, minRequired: 35, suggestions: 'Configure Helm charts, stateful sets, network policies, and cluster monitoring.' },
      { name: 'CI/CD Pipelines & Automation', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Construct automated build, lint, unit test, and blue-green deployment pipelines.' },
      { name: 'Linux & Shell Scripting', targetLevel: 90, importance: 0.95, isCore: true, minRequired: 40, suggestions: 'Master Linux kernel fundamentals, file permissions, cron automation, and system diagnostics.' },
      { name: 'AWS Cloud Fundamentals', targetLevel: 80, importance: 0.85, isCore: true, minRequired: 30, suggestions: 'Manage cloud resources, security groups, cloud watch logging, and IAM roles.' },
      { name: 'Git & Version Control', targetLevel: 80, importance: 0.8, isCore: false, minRequired: 25, suggestions: 'Implement trunk-based development and automated tag releases.' },
      { name: 'Network & System Security', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 20, suggestions: 'Enforce SSL/TLS certificates, firewall configurations, and secrets management (Vault/KMS).' }
    ]
  },

  'cybersecurity engineer': {
    roleKey: 'cybersecurity engineer',
    displayName: 'Cybersecurity Engineer',
    category: 'Security',
    aliases: [
      'cybersecurity engineer', 'security engineer', 'information security', 'infosec', 'cyber security'
    ],
    description: 'Protects systems, networks, and data by identifying vulnerabilities, threat modeling, and defense.',
    requiredSkills: [
      { name: 'Network & System Security', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 45, suggestions: 'Analyze network packets with Wireshark, configure firewalls, VPNs, and detect intrusion anomalies.' },
      { name: 'Authentication & Security', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master cryptographic primitives, public-key infrastructure (PKI), OAuth2/OIDC, and zero-trust auth.' },
      { name: 'Linux & Shell Scripting', targetLevel: 85, importance: 0.9, isCore: true, minRequired: 35, suggestions: 'Perform Linux log auditing, rootkit analysis, and write security automation scripts.' },
      { name: 'Python Programming', targetLevel: 80, importance: 0.85, isCore: false, minRequired: 25, suggestions: 'Write penetration testing scripts, port scanners, and API vulnerability fuzzers.' },
      { name: 'AWS Cloud Fundamentals', targetLevel: 75, importance: 0.8, isCore: false, minRequired: 20, suggestions: 'Audit cloud IAM permissions, KMS encryption at rest, and VPC security groups.' }
    ]
  },

  'software engineer': {
    roleKey: 'software engineer',
    displayName: 'Software Engineer',
    category: 'Core Software Engineering',
    aliases: [
      'software engineer', 'software developer', 'swe', 'software development engineer', 'sde'
    ],
    description: 'Designs reliable algorithms, writes clean maintainable code, and builds robust software architectures.',
    requiredSkills: [
      { name: 'Data Structures & Algorithms', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 45, suggestions: 'Solve complex algorithmic problems with trees, graphs, heaps, dynamic programming, and Big-O analysis.' },
      { name: 'JavaScript', targetLevel: 80, importance: 0.85, isCore: false, minRequired: 30, suggestions: 'Master core object-oriented and functional programming paradigms.' },
      { name: 'Python Programming', targetLevel: 80, importance: 0.85, isCore: false, minRequired: 30, suggestions: 'Write clean modular Python code, unit tests, and design pattern implementations.' },
      { name: 'System Design & Architecture', targetLevel: 80, importance: 0.9, isCore: true, minRequired: 25, suggestions: 'Study distributed system patterns, caching, database indexing, and CAP theorem.' },
      { name: 'SQL & Relational Databases', targetLevel: 75, importance: 0.8, isCore: true, minRequired: 20, suggestions: 'Design database schemas, foreign key constraints, and optimize slow queries.' },
      { name: 'Git & Version Control', targetLevel: 80, importance: 0.8, isCore: true, minRequired: 25, suggestions: 'Utilize trunk-based branching, interactive rebasing, and clean git history.' },
      { name: 'Docker & Containerization', targetLevel: 70, importance: 0.7, isCore: false, minRequired: 15, suggestions: 'Package software applications for reproducible local development and deployment.' }
    ]
  },

  'mobile developer': {
    roleKey: 'mobile developer',
    displayName: 'Mobile Developer',
    category: 'Mobile Development',
    aliases: [
      'mobile developer', 'mobile engineer', 'react native developer', 'ios developer', 'android developer', 'app developer'
    ],
    description: 'Builds responsive cross-platform and native mobile applications for iOS and Android devices.',
    requiredSkills: [
      { name: 'React Native', targetLevel: 90, importance: 1.0, isCore: true, minRequired: 40, suggestions: 'Master React Native core components, gestures, native bridges, and animations.' },
      { name: 'JavaScript', targetLevel: 85, importance: 0.95, isCore: true, minRequired: 35, suggestions: 'Strengthen asynchronous JS, event handlers, and data transformation.' },
      { name: 'TypeScript', targetLevel: 80, importance: 0.85, isCore: true, minRequired: 20, suggestions: 'Type component props, navigation parameters, and API response models.' },
      { name: 'React.js', targetLevel: 80, importance: 0.85, isCore: true, minRequired: 25, suggestions: 'Master hooks, context API, and state reconciliation.' },
      { name: 'REST APIs', targetLevel: 80, importance: 0.85, isCore: false, minRequired: 25, suggestions: 'Connect mobile clients with backend REST APIs, offline sync, and error handling.' },
      { name: 'Git & Version Control', targetLevel: 75, importance: 0.75, isCore: false, minRequired: 20, suggestions: 'Manage mobile repositories, fastlane release automations, and git tags.' }
    ]
  }
};

/**
 * Finds the closest matching role from taxonomy based on input string.
 * @param {string} roleName
 * @returns {object|null} Matching role definition or null
 */
function findRoleInTaxonomy(roleName) {
  if (!roleName || typeof roleName !== 'string') return null;
  const cleaned = roleName.trim().toLowerCase();

  // 1. Exact key match
  if (ROLES_TAXONOMY[cleaned]) {
    return ROLES_TAXONOMY[cleaned];
  }

  // 2. Direct alias match
  for (const role of Object.values(ROLES_TAXONOMY)) {
    if (role.aliases.some(alias => alias === cleaned)) {
      return role;
    }
  }

  // 3. Substring inclusion match
  for (const role of Object.values(ROLES_TAXONOMY)) {
    if (role.aliases.some(alias => cleaned.includes(alias) || alias.includes(cleaned))) {
      return role;
    }
  }

  return null;
}

/**
 * Returns list of all supported role names.
 * @returns {string[]} Array of role display names
 */
function getSupportedRoles() {
  return Object.values(ROLES_TAXONOMY).map(r => r.displayName);
}

module.exports = {
  ROLES_TAXONOMY,
  findRoleInTaxonomy,
  getSupportedRoles,
};
