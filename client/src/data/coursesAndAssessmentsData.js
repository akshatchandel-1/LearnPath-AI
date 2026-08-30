/**
 * LearnPath AI - Verified Multi-Role Course & Assessment Catalog
 * Covers beginner to advanced tiers across all supported engineering & analytics roles.
 */

export const INITIAL_COURSES = [
  // --- FRONTEND DEVELOPER ---
  {
    id: 'course-web-foundations',
    title: 'Web Development & Modern JavaScript Foundations',
    tagline: 'Master semantic HTML5, modern CSS flexbox/grid, responsive layouts, and ES6+ JavaScript fundamentals.',
    category: 'Frontend',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Academy',
    instructor: 'David Malan & Colt Steele',
    duration: '6.0 Hours',
    rating: 4.9,
    reviewsCount: 640,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 250,
    skillsCovered: ['HTML5', 'CSS3', 'JavaScript ES6+', 'DOM Manipulation'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-js-foundations',
    thumbnailGradient: 'from-amber-500/20 via-orange-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      youtubeVideo: { title: 'JavaScript Full Course for Beginners', url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg' },
      youtubeChannel: { title: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
      learningPlatform: { title: 'JavaScript.info Tutorial', url: 'https://javascript.info/' }
    },
    modules: [
      {
        title: 'Module 1: HTML5 Semantics & CSS Layouts',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l_bf1', title: 'Semantic HTML Elements & Accessibility (a11y)', duration: '40 mins', completed: false },
          { id: 'l_bf2', title: 'CSS Flexbox & CSS Grid Deep Dive', duration: '55 mins', completed: false },
          { id: 'l_bf3', title: 'Responsive Design & Mobile-First Media Queries', duration: '55 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Modern JavaScript ES6+ Core',
        duration: '3.5 hrs',
        lessons: [
          { id: 'l_bf4', title: 'Variables, Scope, Closures & Arrow Functions', duration: '50 mins', completed: false },
          { id: 'l_bf5', title: 'Arrays, Objects, Destructuring & Spread Operator', duration: '45 mins', completed: false },
          { id: 'l_bf6', title: 'Async JS: Promises, Async/Await & Fetch API', duration: '60 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-react-pro',
    title: 'React 18 Architecture, Custom Hooks & State Management',
    tagline: 'Build scalable React apps with hooks, context API, performance optimization, and clean component design.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Labs',
    instructor: 'Dan Abramov & Kent C. Dodds',
    duration: '8.0 Hours',
    rating: 4.9,
    reviewsCount: 820,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 350,
    skillsCovered: ['React.js', 'Custom Hooks', 'State Management', 'Tailwind CSS'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-react-core',
    thumbnailGradient: 'from-cyan-500/20 via-blue-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'React 18 Documentation', url: 'https://react.dev/' },
      youtubeVideo: { title: 'React 18 Full Course Tutorial', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
      youtubeChannel: { title: 'Web Dev Simplified', url: 'https://www.youtube.com/@WebDevSimplified' },
      learningPlatform: { title: 'React Official Hands-on Playground', url: 'https://react.dev/learn' }
    },
    modules: [
      {
        title: 'Module 1: Component Tree Decomposition & Hooks',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l_rf1', title: 'Virtual DOM, Reconciliation & JSX Rendering', duration: '50 mins', completed: false },
          { id: 'l_rf2', title: 'State & Effect Lifecycles with useState and useEffect', duration: '60 mins', completed: false },
          { id: 'l_rf3', title: 'Custom Hook Design & Reusable Logic Extraction', duration: '65 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: State & Performance Optimization',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l_rf4', title: 'Context API and Global Store Hydration', duration: '60 mins', completed: false },
          { id: 'l_rf5', title: 'useMemo, useCallback & Profiler Optimization', duration: '65 mins', completed: false },
        ]
      }
    ]
  },

  // --- BACKEND DEVELOPER ---
  {
    id: 'course-backend-node',
    title: 'Node.js, Express & RESTful API Engineering',
    tagline: 'Architect high-throughput REST APIs, asynchronous worker pipelines, authentication, and error handling.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Backend Track',
    instructor: 'Ryan Dahl & Maximilian Schwarzmuller',
    duration: '7.5 Hours',
    rating: 4.8,
    reviewsCount: 710,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 300,
    skillsCovered: ['Node.js', 'Express.js', 'RESTful APIs', 'JWT & Security'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-backend-node',
    thumbnailGradient: 'from-emerald-500/20 via-teal-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Node.js Documentation', url: 'https://nodejs.org/docs/latest/api/' },
      youtubeVideo: { title: 'Node.js and Express.js Full Course', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' },
      youtubeChannel: { title: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia' },
      learningPlatform: { title: 'Express.js Official Guide', url: 'https://expressjs.com/en/starter/installing.html' }
    },
    modules: [
      {
        title: 'Module 1: Node.js Runtime & Asynchronous Streams',
        duration: '3.5 hrs',
        lessons: [
          { id: 'l_nd1', title: 'Event Loop Phases, Timers & process.nextTick', duration: '50 mins', completed: false },
          { id: 'l_nd2', title: 'Buffers, Streams & High-Volume I/O Pipelines', duration: '55 mins', completed: false },
          { id: 'l_nd3', title: 'Error Handling Patterns & Centralized Middleware', duration: '45 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: REST API Security & Database Integration',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l_nd4', title: 'JWT Authentication, Bcrypt & Role-Based Access', duration: '60 mins', completed: false },
          { id: 'l_nd5', title: 'MongoDB Indexing & Schema Validation with Mongoose', duration: '60 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-database-arch',
    title: 'Database Architecture: MongoDB & PostgreSQL Scaling',
    tagline: 'Master indexing strategies, ACID transactions, aggregation pipelines, and sharded relational/NoSQL clusters.',
    category: 'Backend',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Architecture',
    instructor: 'Martin Kleppmann (Data Systems)',
    duration: '8.5 Hours',
    rating: 4.9,
    reviewsCount: 540,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 8,
    xpReward: 400,
    skillsCovered: ['MongoDB', 'PostgreSQL', 'Database Modeling', 'Redis'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-backend-node',
    thumbnailGradient: 'from-green-500/20 via-emerald-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/' },
      youtubeVideo: { title: 'Database Indexing & Systems Deep Dive', url: 'https://www.youtube.com/watch?v=-qNSXK7s7_w' },
      youtubeChannel: { title: 'Hussein Nasser Systems', url: 'https://www.youtube.com/@hnasr' },
      learningPlatform: { title: 'MongoDB University', url: 'https://learn.mongodb.com/' }
    },
    modules: [
      {
        title: 'Module 1: Query Execution & Index Profiling',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l_db1', title: 'B-Tree vs Hash Indexes & ESR Optimization', duration: '60 mins', completed: false },
          { id: 'l_db2', title: 'ACID Transactions & Lock Concurrency in Postgres', duration: '65 mins', completed: false },
        ]
      }
    ]
  },

  // --- DATA SCIENTIST ---
  {
    id: 'course-python-data-science',
    title: 'Python for Data Science, NumPy & Pandas Analytics',
    tagline: 'Vectorized computing, exploratory data analysis, data wrangling, and numerical statistical processing.',
    category: 'Data Science',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Data Lab',
    instructor: 'Wes McKinney (Creator of Pandas)',
    duration: '7.0 Hours',
    rating: 4.9,
    reviewsCount: 910,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 300,
    skillsCovered: ['Python', 'Pandas', 'NumPy', 'Data Analysis'],
    targetRole: 'Data Scientist',
    assessmentId: 'assess-data-science',
    thumbnailGradient: 'from-blue-500/20 via-sky-600/10 to-indigo-950/30',
    resources: {
      officialDocs: { title: 'Pandas Documentation', url: 'https://pandas.pydata.org/docs/' },
      youtubeVideo: { title: 'Python Pandas Data Science Tutorial', url: 'https://www.youtube.com/watch?v=vmEHCJofslg' },
      youtubeChannel: { title: 'Keith Galli Data Science', url: 'https://www.youtube.com/@KeithGalli' },
      learningPlatform: { title: 'Kaggle Python Micro-Courses', url: 'https://www.kaggle.com/learn' }
    },
    modules: [
      {
        title: 'Module 1: Vectorized Numerical Computations',
        duration: '3.5 hrs',
        lessons: [
          { id: 'l_ds1', title: 'NumPy N-Dimensional Arrays & SIMD Vectorization', duration: '50 mins', completed: false },
          { id: 'l_ds2', title: 'Pandas DataFrames, GroupBy & Window Aggregations', duration: '60 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-machine-learning-mastery',
    title: 'Machine Learning & Statistical Model Evaluation',
    tagline: 'Supervised learning, gradient boosting, feature engineering, regularization, and production ML pipelines.',
    category: 'Data Science',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Data Lab',
    instructor: 'Andrew Ng (Stanford / DeepLearning.AI)',
    duration: '9.0 Hours',
    rating: 5.0,
    reviewsCount: 1150,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 12,
    xpReward: 400,
    skillsCovered: ['Machine Learning', 'Scikit-Learn', 'Statistics', 'Model Evaluation'],
    targetRole: 'Data Scientist',
    assessmentId: 'assess-data-science',
    thumbnailGradient: 'from-violet-500/20 via-purple-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Scikit-Learn User Guide', url: 'https://scikit-learn.org/stable/' },
      youtubeVideo: { title: 'Machine Learning Specialization Walkthrough', url: 'https://www.youtube.com/watch?v=jGwO_b/Rre8' },
      youtubeChannel: { title: 'StatQuest with Josh Starmer', url: 'https://www.youtube.com/@statquest' },
      learningPlatform: { title: 'DeepLearning.AI Portal', url: 'https://www.deeplearning.ai/' }
    },
    modules: [
      {
        title: 'Module 1: Feature Engineering & Supervised Learning',
        duration: '4.5 hrs',
        lessons: [
          { id: 'l_ml1', title: 'Linear Models, Regularization (Lasso/Ridge) & Cost Functions', duration: '60 mins', completed: false },
          { id: 'l_ml2', title: 'Decision Trees, Random Forests & XGBoost Pipelines', duration: '65 mins', completed: false },
          { id: 'l_ml3', title: 'Cross-Validation, Precision-Recall & ROC-AUC Metrics', duration: '55 mins', completed: false },
        ]
      }
    ]
  },

  // --- DEVOPS ENGINEER ---
  {
    id: 'course-devops-docker-k8s',
    title: 'Docker Containers, Kubernetes & CI/CD Pipelines',
    tagline: 'Containerize microservices, orchestrate Kubernetes clusters, and automate GitHub Actions deployment pipelines.',
    category: 'DevOps',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Cloud Lab',
    instructor: 'Kelsey Hightower & Bret Fisher',
    duration: '8.0 Hours',
    rating: 4.9,
    reviewsCount: 780,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 350,
    skillsCovered: ['Docker', 'Kubernetes', 'CI/CD Pipelines', 'Linux'],
    targetRole: 'DevOps Engineer',
    assessmentId: 'assess-devops',
    thumbnailGradient: 'from-indigo-500/20 via-blue-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Kubernetes Documentation', url: 'https://kubernetes.io/docs/' },
      youtubeVideo: { title: 'Docker and Kubernetes Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=Wf2eSG3owoA' },
      youtubeChannel: { title: 'TechWorld with Nana', url: 'https://www.youtube.com/@TechWorldwithNana' },
      learningPlatform: { title: 'Play with Docker Interactive', url: 'https://labs.play-with-docker.com/' }
    },
    modules: [
      {
        title: 'Module 1: Containerization & Cluster Orchestration',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l_dv1', title: 'Multi-Stage Dockerfiles & Image Size Optimization', duration: '50 mins', completed: false },
          { id: 'l_dv2', title: 'Kubernetes Pods, Deployments & Service Routing', duration: '60 mins', completed: false },
          { id: 'l_dv3', title: 'Automated CI/CD with GitHub Actions & Registry Push', duration: '55 mins', completed: false },
        ]
      }
    ]
  },

  // --- BUSINESS ANALYST ---
  {
    id: 'course-business-analysis',
    title: 'Business Analysis, Requirements Engineering & SQL/Excel',
    tagline: 'Master BRD/FRD creation, relational SQL for business insights, advanced Excel modeling, and Power BI dashboards.',
    category: 'Business Analytics',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Analytics',
    instructor: 'Alex The Analyst & Barbara Minto',
    duration: '6.5 Hours',
    rating: 4.8,
    reviewsCount: 620,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 9,
    xpReward: 250,
    skillsCovered: ['Requirements Engineering', 'SQL', 'Advanced Excel', 'Power BI'],
    targetRole: 'Business Analyst',
    assessmentId: 'assess-business-analyst',
    thumbnailGradient: 'from-rose-500/20 via-pink-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Microsoft Power BI Documentation', url: 'https://learn.microsoft.com/en-us/power-bi/' },
      youtubeVideo: { title: 'Business Analyst Full Course', url: 'https://www.youtube.com/watch?v=pzoBvWkUjE0' },
      youtubeChannel: { title: 'Alex The Analyst', url: 'https://www.youtube.com/@AlexTheAnalyst' },
      learningPlatform: { title: 'IIBA Business Analysis Standards', url: 'https://www.iiba.org/' }
    },
    modules: [
      {
        title: 'Module 1: Business Requirements & Process Mapping',
        duration: '3.0 hrs',
        lessons: [
          { id: 'l_ba1', title: 'Stakeholder Interviews, BRD & FRD Specifications', duration: '45 mins', completed: false },
          { id: 'l_ba2', title: 'Relational SQL for Business Queries & KPI Aggregation', duration: '55 mins', completed: false },
          { id: 'l_ba3', title: 'Advanced Excel Financial & Operational Modeling', duration: '50 mins', completed: false },
        ]
      }
    ]
  },

  // --- FULL STACK / MERN DEVELOPER ---
  {
    id: 'course-fullstack-mern',
    title: 'Full Stack MERN Architecture & Production Deployment',
    tagline: 'Connect React client with Node/Express REST APIs, MongoDB atlas, JWT auth, and cloud production deployment.',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Academy',
    instructor: 'Brad Traversy & John Smilga',
    duration: '9.5 Hours',
    rating: 4.9,
    reviewsCount: 960,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 12,
    xpReward: 400,
    skillsCovered: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Full Stack Architecture'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fullstack-mern',
    thumbnailGradient: 'from-orange-500/20 via-amber-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'MERN Stack Guide', url: 'https://www.mongodb.com/mern-stack' },
      youtubeVideo: { title: 'MERN Stack Full Tutorial with Auth', url: 'https://www.youtube.com/watch?v=-0exw-9YJCE' },
      youtubeChannel: { title: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
      learningPlatform: { title: 'FullStackOpen University Course', url: 'https://fullstackopen.com/en/' }
    },
    modules: [
      {
        title: 'Module 1: End-to-End MERN Integration',
        duration: '5.0 hrs',
        lessons: [
          { id: 'l_fs1', title: 'REST API & State Synchronization with Axios', duration: '55 mins', completed: false },
          { id: 'l_fs2', title: 'Cookie & JWT Authentication Lifecycles', duration: '60 mins', completed: false },
          { id: 'l_fs3', title: 'Production Build & Dockerized Deployment', duration: '60 mins', completed: false },
        ]
      }
    ]
  }
];

export const INITIAL_ASSESSMENTS = [
  // 1. FRONTEND
  {
    id: 'assess-js-foundations',
    title: 'JavaScript ES6+ & Web Core Benchmark',
    category: 'Frontend',
    difficulty: 'Intermediate',
    targetRole: 'Frontend Developer',
    skillTested: 'JavaScript',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 5,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the primary output order of console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4); in JavaScript?',
        options: ['1, 4, 3, 2', '1, 2, 3, 4', '1, 4, 2, 3', '1, 3, 4, 2'],
        correctAnswerIndex: 0,
        explanation: 'Microtasks (Promises) execute before macrotasks (setTimeout) after synchronous evaluation completes.',
        skillSubtopic: 'Event Loop & Microtasks',
      },
      {
        question: 'How does Object.freeze() differ from Object.seal() in JavaScript?',
        options: [
          'freeze makes existing properties read-only, whereas seal allows modifying existing writable properties',
          'seal prevents adding properties while freeze allows adding new properties',
          'freeze is for arrays only while seal is for objects only',
          'There is no functional difference between them',
        ],
        correctAnswerIndex: 0,
        explanation: 'Object.freeze() sets writable to false; Object.seal() allows mutating existing writable properties.',
        skillSubtopic: 'Object Mutability',
      },
      {
        question: 'Which web API is designed to cancel active asynchronous fetch() requests?',
        options: ['AbortController', 'fetch.cancel()', 'window.stopFetch()', 'Promise.reject()'],
        correctAnswerIndex: 0,
        explanation: 'AbortController provides an AbortSignal to abort active fetch connections cleanly.',
        skillSubtopic: 'Asynchronous Control Flow',
      },
      {
        question: 'What is the return value of typeof null in standard JavaScript?',
        options: ['"object"', '"null"', '"undefined"', '"boolean"'],
        correctAnswerIndex: 0,
        explanation: 'typeof null returns "object" due to a legacy design quirk in the original JavaScript engine.',
        skillSubtopic: 'Data Types',
      },
      {
        question: 'How does the nullish coalescing operator (??) differ from logical OR (||)?',
        options: [
          '?? only falls back on null or undefined, whereas || falls back on all falsy values like 0 or empty string',
          '?? only checks booleans while || checks numbers',
          '?? executes asynchronously',
          'There is no difference',
        ],
        correctAnswerIndex: 0,
        explanation: 'Nullish coalescing strictly handles nullish values (null and undefined) rather than all falsy values.',
        skillSubtopic: 'Operators',
      },
    ]
  },
  {
    id: 'assess-react-core',
    title: 'React 18 Architecture & Hooks Benchmark',
    category: 'Frontend',
    difficulty: 'Intermediate',
    targetRole: 'Frontend Developer',
    skillTested: 'React.js',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'When does the cleanup callback returned by useEffect execute?',
        options: [
          'Before component unmounts and before re-running the effect on dependency changes',
          'Only when the browser window closes',
          'Synchronously before the initial render starts',
          'Immediately when state is declared',
        ],
        correctAnswerIndex: 0,
        explanation: 'React executes the cleanup callback before unmounting and prior to applying new effect updates.',
        skillSubtopic: 'Hooks Lifecycle',
      },
      {
        question: 'What is the main benefit of using useCallback in React?',
        options: [
          'It caches a function definition between renders to maintain reference equality for memoized child components',
          'It accelerates mathematical calculations',
          'It automatically syncs state with LocalStorage',
          'It fetches data in the background',
        ],
        correctAnswerIndex: 0,
        explanation: 'useCallback preserves callback reference equality, preventing unnecessary re-renders in memoized children.',
        skillSubtopic: 'Performance & Memoization',
      },
      {
        question: 'Why must state never be mutated directly in React components?',
        options: [
          'Direct mutations bypass React shallow comparison and fail to schedule a re-render',
          'Direct mutations crash the JavaScript runtime',
          'Direct mutations only work in class components',
          'Direct mutations cause memory leaks',
        ],
        correctAnswerIndex: 0,
        explanation: 'React relies on immutable state updates to trigger virtual DOM reconciliation.',
        skillSubtopic: 'State Immutability',
      },
      {
        question: 'What does the useMemo hook return in React?',
        options: [
          'A memoized calculated value from an expensive computation',
          'A DOM element reference',
          'A global Redux store',
          'An event listener callback',
        ],
        correctAnswerIndex: 0,
        explanation: 'useMemo caches the output of an expensive computation until dependencies change.',
        skillSubtopic: 'React Optimization',
      },
    ]
  },

  // 2. BACKEND
  {
    id: 'assess-backend-node',
    title: 'Node.js, Express & REST API Architecture Checkpoint',
    category: 'Backend',
    difficulty: 'Intermediate',
    targetRole: 'Backend Developer',
    skillTested: 'Node.js',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What signature identifies custom error-handling middleware in Express.js?',
        options: [
          'A middleware function with 4 arguments: (err, req, res, next)',
          'A middleware function with 2 arguments: (req, res)',
          'An explicit call to process.exit(1)',
          'A try-catch block inside server.js',
        ],
        correctAnswerIndex: 0,
        explanation: 'Express differentiates error middleware specifically by its 4-parameter signature: (err, req, res, next).',
        skillSubtopic: 'Express Middleware',
      },
      {
        question: 'What is the difference between process.nextTick() and setImmediate() in Node.js?',
        options: [
          'process.nextTick() executes immediately after the current operation before the next event loop phase; setImmediate() runs in the Check phase',
          'setImmediate() always executes before process.nextTick()',
          'process.nextTick() only runs inside worker threads',
          'There is no execution phase difference',
        ],
        correctAnswerIndex: 0,
        explanation: 'nextTick queue is drained immediately following the current tick, while setImmediate runs during the Check phase.',
        skillSubtopic: 'Event Loop Phases',
      },
      {
        question: 'In MongoDB, which method inspects query execution plan and verifies index utilization?',
        options: ['cursor.explain("executionStats")', 'db.profile()', 'db.indexScan()', 'db.verifyQuery()'],
        correctAnswerIndex: 0,
        explanation: 'explain("executionStats") details whether a COLLSCAN (collection scan) or IXSCAN (index scan) occurred.',
        skillSubtopic: 'MongoDB Index Profiling',
      },
      {
        question: 'Why are Node.js Streams preferred over fs.readFile() for processing large files?',
        options: [
          'Streams process data in chunks without buffering the whole file into RAM',
          'Streams automatically compress files to zip format',
          'fs.readFile is deprecated',
          'Streams execute directly on the GPU',
        ],
        correctAnswerIndex: 0,
        explanation: 'Streams maintain constant low memory consumption by reading and transferring chunks incrementally.',
        skillSubtopic: 'Streams & I/O',
      },
    ]
  },

  // 3. DATA SCIENTIST
  {
    id: 'assess-data-science',
    title: 'Data Science, Statistics & Machine Learning Benchmark',
    category: 'Data Science',
    difficulty: 'Intermediate',
    targetRole: 'Data Scientist',
    skillTested: 'Python',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'In Python, what is the memory advantage of a generator expression over a list comprehension?',
        options: [
          'Generators yield items lazily on-demand with O(1) space complexity instead of storing all elements in RAM',
          'Generators compile directly to machine bytecode',
          'Generators run on multi-threaded background workers',
          'Generators only store integers',
        ],
        correctAnswerIndex: 0,
        explanation: 'Generators compute values on-the-fly, preserving minimal memory footprint during large dataset iterations.',
        skillSubtopic: 'Generators & Memory',
      },
      {
        question: 'In Pandas, why are vectorized operations preferred over row iteration with for loops or .iterrows()?',
        options: [
          'Vectorized operations execute in compiled C/SIMD instructions without Python interpreter loop overhead',
          'Vectorization automatically encrypts data',
          'iterrows() cannot process numerical columns',
          'Vectorization reduces disk size',
        ],
        correctAnswerIndex: 0,
        explanation: 'Vectorized Pandas operations delegate calculations to precompiled C routines for 100x-1000x speedup.',
        skillSubtopic: 'Pandas Vectorization',
      },
      {
        question: 'How does L1 regularization (Lasso) differ from L2 regularization (Ridge) in linear models?',
        options: [
          'L1 penalizes absolute coefficient weights driving unneeded features to exact zero; L2 penalizes squared weights',
          'L1 is only for classification; L2 is only for regression',
          'L2 eliminates features completely while L1 keeps all features',
          'L1 cannot be used with gradient descent',
        ],
        correctAnswerIndex: 0,
        explanation: 'L1 regularization acts as automated feature selection by zeroing out non-essential coefficients.',
        skillSubtopic: 'Model Regularization',
      },
      {
        question: 'When evaluating a classification model on an imbalanced dataset, why is AUC-ROC / PR-AUC preferred over raw Accuracy?',
        options: [
          'Accuracy can be deceptively high by simply predicting the majority class, masking poor minority detection',
          'Accuracy cannot be calculated on numerical data',
          'AUC-ROC requires fewer computation cycles',
          'PR-AUC only applies to clustering tasks',
        ],
        correctAnswerIndex: 0,
        explanation: 'Accuracy overlooks class imbalance, whereas Precision-Recall and ROC curves evaluate discriminative trade-offs.',
        skillSubtopic: 'Model Evaluation Metrics',
      },
    ]
  },

  // 4. DEVOPS ENGINEER
  {
    id: 'assess-devops',
    title: 'DevOps, Docker, Kubernetes & CI/CD Checkpoint',
    category: 'DevOps',
    difficulty: 'Intermediate',
    targetRole: 'DevOps Engineer',
    skillTested: 'Docker',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the difference between Docker CMD and ENTRYPOINT in a Dockerfile?',
        options: [
          'ENTRYPOINT sets the default executable, while CMD provides default parameters that can be overridden at runtime',
          'CMD runs during build time while ENTRYPOINT runs during container startup',
          'ENTRYPOINT can only run shell scripts; CMD runs binary files',
          'There is no difference in execution',
        ],
        correctAnswerIndex: 0,
        explanation: 'ENTRYPOINT specifies the command binary, while CMD sets default arguments that users can override.',
        skillSubtopic: 'Containerization & Docker',
      },
      {
        question: 'In Kubernetes, what is the role of a Pod compared to a Deployment?',
        options: [
          'A Pod is the smallest deployable compute unit (one or more containers); a Deployment manages replica sets, scaling, and rolling updates',
          'A Deployment runs on developer laptops while a Pod runs only in production',
          'A Pod stores persistent volumes while a Deployment only stores network routes',
          'A Pod is a physical server while a Deployment is a virtual machine',
        ],
        correctAnswerIndex: 0,
        explanation: 'Pods encapsulate container instances, whereas Deployments manage replication, health checks, and rolling updates.',
        skillSubtopic: 'Kubernetes Orchestration',
      },
      {
        question: 'What is the core principle of Infrastructure as Code (IaC) with tools like Terraform?',
        options: [
          'Declaring cloud infrastructure state in version-controlled configuration files for repeatable, automated provisioning',
          'Writing manual shell commands inside production servers',
          'Replacing all databases with flat JSON files',
          'Preventing developers from writing unit tests',
        ],
        correctAnswerIndex: 0,
        explanation: 'IaC manages infrastructure declaratively with version control, state drift detection, and automated provisioning.',
        skillSubtopic: 'Infrastructure as Code',
      },
      {
        question: 'In a CI/CD deployment pipeline, what is the purpose of Canary Deployments?',
        options: [
          'Routing a small fraction of live traffic to a new version to validate stability before full rollout',
          'Encrypting code before sending to Git',
          'Running tests on a developer local machine',
          'Deleting old database backups',
        ],
        correctAnswerIndex: 0,
        explanation: 'Canary releases minimize blast radius by verifying the new build on a small sample of production users.',
        skillSubtopic: 'Deployment Strategies',
      },
    ]
  },

  // 5. BUSINESS ANALYST
  {
    id: 'assess-business-analyst',
    title: 'Business Analysis, Requirements & BI Metrics Benchmark',
    category: 'Business Analytics',
    difficulty: 'Intermediate',
    targetRole: 'Business Analyst',
    skillTested: 'Requirements Engineering',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the primary difference between a Business Requirements Document (BRD) and a Functional Requirements Document (FRD)?',
        options: [
          'A BRD describes high-level business goals and problem statements; an FRD details exact system behavior, inputs, outputs, and workflows',
          'A BRD is written by software developers; an FRD is written by sales teams',
          'A BRD is only used in Waterfall; an FRD is only used in Scrum',
          'There is no functional distinction',
        ],
        correctAnswerIndex: 0,
        explanation: 'The BRD outlines business objectives and ROI, whereas the FRD specifies technical requirements and system capabilities.',
        skillSubtopic: 'Requirements Engineering',
      },
      {
        question: 'In Excel data modeling, why is INDEX-MATCH or XLOOKUP preferred over traditional VLOOKUP?',
        options: [
          'They do not break when columns are inserted/rearranged and can perform flexible left-lookups',
          'They only work with binary datasets',
          'VLOOKUP is not compatible with modern spreadsheet software',
          'They automatically format cells with colors',
        ],
        correctAnswerIndex: 0,
        explanation: 'INDEX-MATCH and XLOOKUP reference columns independently, providing robustness against structural spreadsheet changes.',
        skillSubtopic: 'Advanced Excel Analytics',
      },
      {
        question: 'What is a Star Schema in Data Warehousing and Business Intelligence?',
        options: [
          'A dimensional model with a central Fact table surrounded by Denormalized Dimension tables for fast BI querying',
          'A network topology connecting 5 client computers to a server',
          'A database that only stores user passwords',
          'A software testing methodology',
        ],
        correctAnswerIndex: 0,
        explanation: 'A Star Schema simplifies analytical queries by connecting metric Fact tables directly to descriptive Dimension tables.',
        skillSubtopic: 'BI & Data Warehousing',
      },
      {
        question: 'In relational SQL, what is the key difference between WHERE and HAVING clauses?',
        options: [
          'WHERE filters rows before aggregation; HAVING filters aggregated groups after GROUP BY',
          'WHERE only works with numbers; HAVING works with text',
          'HAVING is used exclusively for table creation',
          'WHERE is executed after HAVING',
        ],
        correctAnswerIndex: 0,
        explanation: 'WHERE filters individual table rows prior to aggregation, while HAVING filters group results.',
        skillSubtopic: 'SQL Query Optimization',
      },
    ]
  },

  // 6. FULL STACK DEVELOPER
  {
    id: 'assess-fullstack-mern',
    title: 'Full Stack MERN Architecture & Systems Benchmark',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    targetRole: 'Full Stack Developer',
    skillTested: 'Full Stack Architecture',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'How do you prevent Cross-Site Scripting (XSS) when handling user input in React and Express?',
        options: [
          'Rely on React built-in JSX auto-escaping and sanitize/validate inputs before storage on the Express backend',
          'Disable CORS on all Express routes',
          'Store all user tokens in plain text in cookies without httpOnly',
          'Only use class components',
        ],
        correctAnswerIndex: 0,
        explanation: 'React escapes variables in JSX by default; backend input sanitization and httpOnly cookies ensure layered XSS protection.',
        skillSubtopic: 'Web Security',
      },
      {
        question: 'What is the purpose of HTTP status code 401 vs 403 in REST APIs?',
        options: [
          '401 means Unauthorized (missing or invalid credentials); 403 means Forbidden (authenticated, but lacking permissions)',
          '401 means Server Error; 403 means Database Error',
          '401 is for GET requests; 403 is for POST requests',
          'There is no distinction',
        ],
        correctAnswerIndex: 0,
        explanation: '401 indicates unauthenticated identity; 403 indicates authenticated identity with insufficient access privileges.',
        skillSubtopic: 'REST Protocol & Auth',
      },
      {
        question: 'When storing passwords in a database, what is the best security practice?',
        options: [
          'Hash the password using a salted adaptive algorithm like Bcrypt or Argon2',
          'Encrypt the password with Base64 encoding',
          'Store the password in plain text inside an environment variable',
          'Save MD5 hashes without salt',
        ],
        correctAnswerIndex: 0,
        explanation: 'Bcrypt and Argon2 include salt and work-factor calibration to resist dictionary and rainbow-table attacks.',
        skillSubtopic: 'Authentication Security',
      },
      {
        question: 'What is the primary benefit of compound indexing with ESR (Equality, Sort, Range) in MongoDB?',
        options: [
          'It provides maximum query efficiency by filtering exact matches, avoiding in-memory sort, and applying range filters last',
          'It halves document storage size',
          'It encrypts all network requests',
          'It replaces the need for database backups',
        ],
        correctAnswerIndex: 0,
        explanation: 'ESR ordering minimizes index scan key operations and eliminates expensive in-memory sort stages.',
        skillSubtopic: 'Database Performance',
      },
    ]
  }
];
