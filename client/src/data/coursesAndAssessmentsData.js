/**
 * LearnPath AI — Verified Course & Assessment Catalog
 * Comprehensive curriculum across Beginner, Intermediate, and Advanced tiers.
 * Every course includes verified official docs, YouTube tutorials/channels, and practice platforms.
 */

export const INITIAL_COURSES = [
  // ── BEGINNER TIER COURSES ──
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
      officialDocs: {
        title: 'MDN Web Docs (JavaScript & Web APIs)',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
      },
      youtubeVideo: {
        title: 'JavaScript Full Course for Beginners — freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
      },
      youtubeChannel: {
        title: 'freeCodeCamp.org Channel',
        url: 'https://www.youtube.com/@freecodecamp'
      },
      learningPlatform: {
        title: 'JavaScript.info Interactive Tutorial',
        url: 'https://javascript.info/'
      }
    },
    modules: [
      {
        title: 'Module 1: HTML5 Semantics & CSS Layout Mastery',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l_bf1', title: 'Semantic HTML Elements & Accessibility (a11y)', duration: '40 mins', completed: false },
          { id: 'l_bf2', title: 'CSS Flexbox & CSS Grid Deep Dive', duration: '55 mins', completed: false },
          { id: 'l_bf3', title: 'Responsive Design & Mobile-First Media Queries', duration: '55 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Modern JavaScript ES6+ Core Concepts',
        duration: '3.5 hrs',
        lessons: [
          { id: 'l_bf4', title: 'Variables, Scope, Closures & Arrow Functions', duration: '50 mins', completed: false },
          { id: 'l_bf5', title: 'Arrays, Objects, Destructuring & Spread Operator', duration: '45 mins', completed: false },
          { id: 'l_bf6', title: 'DOM Selection, Event Listeners & Event Bubbling', duration: '55 mins', completed: false },
          { id: 'l_bf7', title: 'Async JS: Promises, Async/Await & Fetch API', duration: '60 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-python-basics',
    title: 'Python Programming & Data Structures Fundamentals',
    tagline: 'Learn Python programming syntax, control flow, object-oriented programming, and essential data structures.',
    category: 'Languages',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Essentials',
    instructor: 'Angela Yu (Senior Software Instructor)',
    duration: '5.5 Hours',
    rating: 4.8,
    reviewsCount: 480,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 9,
    xpReward: 250,
    skillsCovered: ['Python', 'OOP', 'Data Structures', 'File I/O'],
    targetRole: 'Data Scientist',
    assessmentId: 'assess-python-core',
    thumbnailGradient: 'from-blue-500/20 via-sky-600/10 to-indigo-950/30',
    resources: {
      officialDocs: {
        title: 'Python Official Documentation & Tutorial',
        url: 'https://docs.python.org/3/tutorial/'
      },
      youtubeVideo: {
        title: 'Python for Beginners — Programming with Mosh',
        url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc'
      },
      youtubeChannel: {
        title: 'Programming with Mosh Channel',
        url: 'https://www.youtube.com/@programmingwithmosh'
      },
      learningPlatform: {
        title: 'Real Python Tutorials & Guides',
        url: 'https://realpython.com/'
      }
    },
    modules: [
      {
        title: 'Module 1: Python Fundamentals & Flow Control',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l_py1', title: 'Python Syntax, Types, Lists, Dicts & Tuples', duration: '45 mins', completed: false },
          { id: 'l_py2', title: 'Loops, Conditionals & Comprehensions', duration: '50 mins', completed: false },
          { id: 'l_py3', title: 'Functions, Default Args & Lambda Expressions', duration: '55 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: OOP & Data Handling',
        duration: '3.0 hrs',
        lessons: [
          { id: 'l_py4', title: 'Classes, Objects, Inheritance & Dunder Methods', duration: '60 mins', completed: false },
          { id: 'l_py5', title: 'File Handling, JSON Parsing & Error Handling', duration: '60 mins', completed: false },
          { id: 'l_py6', title: 'Modules, Virtual Environments & Pip Packages', duration: '60 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-database-sql-basics',
    title: 'Relational Databases & SQL Query Fundamentals',
    tagline: 'Design normalized database schemas, write SQL queries, joins, group by aggregations, and subqueries.',
    category: 'Database',
    difficulty: 'Beginner',
    platform: 'LearnPath Curated',
    instructor: 'Alex Thorne (Database Specialist)',
    duration: '4.5 Hours',
    rating: 4.8,
    reviewsCount: 390,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 8,
    xpReward: 260,
    skillsCovered: ['SQL', 'PostgreSQL', 'Schema Design', 'Joins & Indexes'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-sql-fundamentals',
    thumbnailGradient: 'from-emerald-500/20 via-teal-600/10 to-slate-900/30',
    resources: {
      officialDocs: {
        title: 'PostgreSQL Official Documentation',
        url: 'https://www.postgresql.org/docs/current/'
      },
      youtubeVideo: {
        title: 'SQL Tutorial — Full Database Course for Beginners',
        url: 'https://www.youtube.com/watch?v=HXV3zeRR3h4'
      },
      youtubeChannel: {
        title: 'Traversy Media Channel',
        url: 'https://www.youtube.com/@TraversyMedia'
      },
      learningPlatform: {
        title: 'SQLBolt — Interactive Lessons',
        url: 'https://sqlbolt.com/'
      }
    },
    modules: [
      {
        title: 'Module 1: Relational Modeling & Basic Queries',
        duration: '2.0 hrs',
        lessons: [
          { id: 'l_sql1', title: 'Tables, Primary Keys & Foreign Key Constraints', duration: '35 mins', completed: false },
          { id: 'l_sql2', title: 'SELECT, WHERE, ORDER BY & LIMIT Filtering', duration: '40 mins', completed: false },
          { id: 'l_sql3', title: 'INSERT, UPDATE, DELETE & Transactions', duration: '45 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Advanced Joins & Aggregations',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l_sql4', title: 'INNER, LEFT, RIGHT, FULL OUTER Joins Explained', duration: '50 mins', completed: false },
          { id: 'l_sql5', title: 'GROUP BY, HAVING & Aggregate Functions', duration: '50 mins', completed: false },
          { id: 'l_sql6', title: 'Subqueries, CTEs (WITH clause) & View Basics', duration: '50 mins', completed: false },
        ]
      }
    ]
  },

  // ── INTERMEDIATE TIER COURSES ──
  {
    id: 'course-react-patterns',
    title: 'React 18 Architecture & Custom Hooks Design',
    tagline: 'Master component composition, custom hooks, atomic state management, and memory optimization.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'LearnPath Curated',
    instructor: 'Dr. Sarah Lin (Principal Frontend Architect)',
    duration: '6.5 Hours',
    rating: 4.9,
    reviewsCount: 384,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 350,
    skillsCovered: ['React.js', 'Custom Hooks', 'Concurrent Mode', 'State Management'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-react-core',
    thumbnailGradient: 'from-sky-500/20 via-cyan-600/10 to-blue-900/30',
    resources: {
      officialDocs: {
        title: 'React Official Documentation (react.dev)',
        url: 'https://react.dev/'
      },
      youtubeVideo: {
        title: 'React 18 Full Course — freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
      },
      youtubeChannel: {
        title: 'The Net Ninja Channel',
        url: 'https://www.youtube.com/@NetNinja'
      },
      learningPlatform: {
        title: 'React Patterns & Best Practices Guide',
        url: 'https://reactpatterns.js.org/'
      }
    },
    modules: [
      {
        title: 'Module 1: React 18 Fiber & Concurrent Features',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l1', title: 'Deep Dive into useTransition and useDeferredValue', duration: '35 mins', completed: false },
          { id: 'l2', title: 'Automatic Batching & Server Components Primer', duration: '35 mins', completed: false },
          { id: 'l3', title: 'Profiling Render Bottlenecks with React DevTools', duration: '40 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Advanced Hook Composition & State Architecture',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l4', title: 'Building Resilient Context Selectors without Re-renders', duration: '45 mins', completed: false },
          { id: 'l5', title: 'Compound Components & Slot Pattern Architecture', duration: '50 mins', completed: false },
          { id: 'l6', title: 'Custom Reducers with useReducer & Zustand State Store', duration: '55 mins', completed: false },
          { id: 'l7', title: 'TanStack Query for Optimistic Server State Caching', duration: '50 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-node-microservices',
    title: 'Production Express.js, MongoDB & REST API Architecture',
    tagline: 'Build battle-tested REST APIs with bulletproof auth, distributed caching, and Mongoose indexing.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Recommender',
    instructor: 'Marcus Vance (Senior Backend Lead)',
    duration: '8.0 Hours',
    rating: 4.8,
    reviewsCount: 512,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 400,
    skillsCovered: ['Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Redis'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-node-architecture',
    thumbnailGradient: 'from-emerald-500/20 via-sky-600/10 to-slate-900/30',
    resources: {
      officialDocs: {
        title: 'Node.js Official Documentation',
        url: 'https://nodejs.org/en/docs'
      },
      youtubeVideo: {
        title: 'Node.js and Express.js Full Course — freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
      },
      youtubeChannel: {
        title: 'Traversy Media Channel',
        url: 'https://www.youtube.com/@TraversyMedia'
      },
      learningPlatform: {
        title: 'MongoDB University & Manual',
        url: 'https://www.mongodb.com/docs/manual/'
      }
    },
    modules: [
      {
        title: 'Module 1: Modular Express Controller & Service Layers',
        duration: '3.5 hrs',
        lessons: [
          { id: 'l11', title: 'Clean Architecture Pattern for Enterprise Node.js', duration: '45 mins', completed: false },
          { id: 'l12', title: 'Async Error Handling & Centralized Logging with Winston', duration: '45 mins', completed: false },
          { id: 'l13', title: 'Input Sanitization and Zod/Joi Validation Schemas', duration: '45 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Advanced MongoDB & Performance Indexing',
        duration: '4.5 hrs',
        lessons: [
          { id: 'l14', title: 'Compound Indexes & Query Execution Plans ($explain)', duration: '50 mins', completed: false },
          { id: 'l15', title: 'Aggregation Pipeline Masterclass ($lookup, $facet)', duration: '60 mins', completed: false },
          { id: 'l16', title: 'HttpOnly Secure Cookies & Refresh Token Rotation', duration: '45 mins', completed: false },
          { id: 'l17', title: 'Redis Caching & Distributed Rate Limiting', duration: '50 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-typescript-fullstack',
    title: 'TypeScript 5.x Mastery for Enterprise Applications',
    tagline: 'Eliminate runtime bugs with generics, utility types, mapped types, and end-to-end type safety.',
    category: 'Languages',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Recommender',
    instructor: 'Elena Rostova (Staff Systems Engineer)',
    duration: '5.2 Hours',
    rating: 4.9,
    reviewsCount: 290,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 8,
    xpReward: 300,
    skillsCovered: ['TypeScript', 'Generics', 'Type Narrowing', 'Zod Integration'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-typescript-core',
    thumbnailGradient: 'from-blue-600/20 via-cyan-500/10 to-indigo-950/30',
    resources: {
      officialDocs: {
        title: 'TypeScript Official Handbook',
        url: 'https://www.typescriptlang.org/docs/handbook/intro.html'
      },
      youtubeVideo: {
        title: 'TypeScript Full Course for Beginners — freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=gp5H0Vw39yw'
      },
      youtubeChannel: {
        title: 'Fireship Channel',
        url: 'https://www.youtube.com/@Fireship'
      },
      learningPlatform: {
        title: 'Total TypeScript Interactive Guide by Matt Pocock',
        url: 'https://www.totaltypescript.com/tutorials'
      }
    },
    modules: [
      {
        title: 'Module 1: Advanced Type System Concepts',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l19', title: 'Conditional Types, infer Keyword & Template Literals', duration: '40 mins', completed: false },
          { id: 'l20', title: 'Discriminated Unions & Custom Type Guards', duration: '35 mins', completed: false },
          { id: 'l21', title: 'Mapped Types & Key Remapping in Practice', duration: '45 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: TypeScript with React & Node',
        duration: '2.7 hrs',
        lessons: [
          { id: 'l22', title: 'Typing Polymorphic React Components & forwardRef', duration: '50 mins', completed: false },
          { id: 'l23', title: 'Type-Safe Express Route Handlers & Zod Ingestion', duration: '45 mins', completed: false },
          { id: 'l24', title: 'Sharing Monorepo Types between Client & Server', duration: '55 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-docker-k8s',
    title: 'Docker Containers, CI/CD & Cloud Infrastructure',
    tagline: 'Containerize microservices, write multi-stage Dockerfiles, and automate CI/CD with GitHub Actions.',
    category: 'Cloud & DevOps',
    difficulty: 'Intermediate',
    platform: 'Cloud Academy Partner',
    instructor: 'Alex Thorne (DevOps Specialist)',
    duration: '7.0 Hours',
    rating: 4.8,
    reviewsCount: 215,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 8,
    xpReward: 380,
    skillsCovered: ['Docker', 'CI/CD', 'GitHub Actions', 'AWS ECS', 'NGINX'],
    targetRole: 'DevOps Engineer',
    assessmentId: 'assess-docker-devops',
    thumbnailGradient: 'from-cyan-600/20 via-sky-700/10 to-slate-900/30',
    resources: {
      officialDocs: {
        title: 'Docker Official Documentation',
        url: 'https://docs.docker.com/'
      },
      youtubeVideo: {
        title: 'Docker Tutorial for Beginners — TechWorld with Nana',
        url: 'https://www.youtube.com/watch?v=3c-iBn73dDE'
      },
      youtubeChannel: {
        title: 'TechWorld with Nana Channel',
        url: 'https://www.youtube.com/@TechWorldwithNana'
      },
      learningPlatform: {
        title: 'Play with Docker Interactive Lab',
        url: 'https://labs.play-with-docker.com/'
      }
    },
    modules: [
      {
        title: 'Module 1: Docker Fundamentals & Multi-Stage Builds',
        duration: '3.5 hrs',
        lessons: [
          { id: 'l25', title: 'Dockerizing React & Node APIs with Alpine Linux', duration: '50 mins', completed: false },
          { id: 'l26', title: 'Docker Compose for Multi-Service Local Networks', duration: '55 mins', completed: false },
          { id: 'l27', title: 'Volume Persistence, Bind Mounts & Security Scanning', duration: '50 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: CI/CD Pipelines & Cloud Deployment',
        duration: '3.5 hrs',
        lessons: [
          { id: 'l28', title: 'GitHub Actions Automated Testing & Container Push', duration: '60 mins', completed: false },
          { id: 'l29', title: 'NGINX Reverse Proxy, SSL Certs & Load Balancing', duration: '60 mins', completed: false },
        ]
      }
    ]
  },

  // ── ADVANCED TIER COURSES ──
  {
    id: 'course-system-design',
    title: 'High-Scale System Design & Distributed Architecture',
    tagline: 'Learn how top tech companies scale to millions of users with horizontal sharding, Kafka queues, and CDNs.',
    category: 'Architecture',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Executive',
    instructor: 'Vikram Mehta (VP of Engineering)',
    duration: '9.0 Hours',
    rating: 5.0,
    reviewsCount: 420,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 500,
    skillsCovered: ['System Design', 'Kafka', 'Redis Caching', 'Database Sharding', 'Microservices'],
    targetRole: 'Solutions Architect',
    assessmentId: 'assess-system-design',
    thumbnailGradient: 'from-indigo-600/20 via-sky-600/10 to-slate-950/30',
    resources: {
      officialDocs: {
        title: 'System Design Primer by Donne Martin',
        url: 'https://github.com/donnemartin/system-design-primer'
      },
      youtubeVideo: {
        title: 'System Design Interview — Step by Step Guide',
        url: 'https://www.youtube.com/watch?v=i53Gi_K3o7I'
      },
      youtubeChannel: {
        title: 'ByteByteGo Channel (Alex Xu)',
        url: 'https://www.youtube.com/@ByteByteGo'
      },
      learningPlatform: {
        title: 'High Scalability Architecture Case Studies',
        url: 'http://highscalability.com/'
      }
    },
    modules: [
      {
        title: 'Module 1: Scalability Patterns & Distributed Caching',
        duration: '4.5 hrs',
        lessons: [
          { id: 'l30', title: 'Cache Invalidation Strategies (Write-Through vs Cache-Aside)', duration: '55 mins', completed: false },
          { id: 'l31', title: 'Message Queues (Kafka, RabbitMQ) for Event-Driven Services', duration: '65 mins', completed: false },
          { id: 'l32', title: 'Rate Limiting Algorithms (Token Bucket vs Leaky Bucket)', duration: '50 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Database Scalability & High Availability',
        duration: '4.5 hrs',
        lessons: [
          { id: 'l33', title: 'Read Replicas, Horizontal Sharding & Consistent Hashing', duration: '65 mins', completed: false },
          { id: 'l34', title: 'CAP Theorem, Eventual Consistency & Distributed Locks', duration: '75 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-ai-llm-embeddings',
    title: 'Applied AI: Vector Databases & RAG Architectures',
    tagline: 'Build intelligent applications using LLM API integrations, LangChain, vector embeddings, and semantic retrieval.',
    category: 'AI/ML',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Labs',
    instructor: 'Dr. David Chen (Principal AI Researcher)',
    duration: '8.0 Hours',
    rating: 4.9,
    reviewsCount: 340,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 480,
    skillsCovered: ['Vector Databases', 'LangChain', 'Embeddings', 'RAG Pipelines', 'OpenAI / Gemini API'],
    targetRole: 'AI Engineer',
    assessmentId: 'assess-ai-rag',
    thumbnailGradient: 'from-violet-600/20 via-pink-600/10 to-slate-950/30',
    resources: {
      officialDocs: {
        title: 'Google AI Studio / Gemini API Documentation',
        url: 'https://ai.google.dev/docs'
      },
      youtubeVideo: {
        title: 'LangChain & RAG Crash Course — freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=aywZrzNaKjs'
      },
      youtubeChannel: {
        title: 'James Briggs AI Channel',
        url: 'https://www.youtube.com/@JamesBriggs'
      },
      learningPlatform: {
        title: 'Pinecone Vector Database Learning Center',
        url: 'https://www.pinecone.io/learn/'
      }
    },
    modules: [
      {
        title: 'Module 1: Embeddings & Vector Search Foundations',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l35', title: 'Text Embeddings & Cosine Similarity Mathematics', duration: '50 mins', completed: false },
          { id: 'l36', title: 'Vector Indexing (HNSW, IVFFlat) & Index Tuning', duration: '60 mins', completed: false },
          { id: 'l37', title: 'Chunking Strategies & Hybrid Search Patterns', duration: '50 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Production RAG Pipelines & Guardrails',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l38', title: 'Building Multi-Source Retrieval with LangChain / LlamaIndex', duration: '65 mins', completed: false },
          { id: 'l39', title: 'Context Window Optimization, Re-Ranking & Evaluation', duration: '65 mins', completed: false },
        ]
      }
    ]
  }
];

export const INITIAL_ASSESSMENTS = [
  {
    id: 'assess-js-foundations',
    title: 'JavaScript ES6+ & Web Core Benchmark',
    tagline: 'Validate your core knowledge of event loop, closures, async promises, and array manipulations.',
    skill: 'JavaScript',
    category: 'Frontend',
    duration: '20 mins',
    questionsCount: 5,
    difficulty: 'Beginner',
    lastScore: null,
    passingScore: 70,
    status: 'Ready to Take',
    xpReward: 150,
    badgeText: 'Core Skill',
    attemptsCount: 0,
    questions: [
      {
        question: 'What is the output of typeof null in standard JavaScript?',
        options: [
          '"object"',
          '"null"',
          '"undefined"',
          '"boolean"'
        ],
        correctAnswerIndex: 0,
        explanation: 'Due to a historical legacy bug in JavaScript first release, typeof null evaluates to "object".'
      },
      {
        question: 'Which method creates a new array populated with the results of calling a provided function on every element?',
        options: [
          'Array.prototype.forEach()',
          'Array.prototype.map()',
          'Array.prototype.filter()',
          'Array.prototype.reduce()'
        ],
        correctAnswerIndex: 1,
        explanation: 'map() creates and returns a brand new array containing transformed elements without mutating the source array.'
      },
      {
        question: 'What does Promise.all() do when any one of the input promises rejects?',
        options: [
          'It waits for the remaining promises to resolve and ignores the rejection.',
          'It immediately rejects with the reason of the first promise that rejected (fail-fast behavior).',
          'It converts the rejected value to undefined and resolves.',
          'It retries the failed promise up to 3 times.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Promise.all exhibits fail-fast behavior: if any single promise rejects, the returned master promise rejects immediately.'
      },
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A method that terminates a worker thread.',
          'A function bundled together with references to its surrounding lexical environment.',
          'A syntactic tag that prevents variable redeclaration.',
          'A CSS selector that isolates component styles.'
        ],
        correctAnswerIndex: 1,
        explanation: 'A closure gives an inner function access to an outer function scope even after the outer function has returned.'
      },
      {
        question: 'Which equality operator performs type coercion before comparison?',
        options: [
          '=== (Strict Equality)',
          '== (Loose Equality)',
          'Object.is()',
          '= (Assignment)'
        ],
        correctAnswerIndex: 1,
        explanation: 'The loose equality operator (==) converts operands to a common type before comparing values, whereas === compares without coercion.'
      }
    ]
  },
  {
    id: 'assess-react-core',
    title: 'React 18 Architecture & Hooks Benchmark',
    tagline: 'Evaluate your mastery of concurrent rendering, useMemo, custom hooks, and state patterns.',
    skill: 'React.js',
    category: 'Frontend',
    duration: '25 mins',
    questionsCount: 5,
    difficulty: 'Intermediate',
    lastScore: null,
    passingScore: 70,
    status: 'Ready to Take',
    xpReward: 200,
    badgeText: 'Priority Gap',
    attemptsCount: 0,
    questions: [
      {
        question: 'What is the primary architectural purpose of the useTransition hook in React 18?',
        options: [
          'To mark state updates as non-urgent transitions, keeping UI responsive for critical user input.',
          'To trigger automatic page reloads on route changes.',
          'To directly manipulate DOM CSS transitions without re-rendering.',
          'To replace Redux for global state management.'
        ],
        correctAnswerIndex: 0,
        explanation: 'useTransition lets you mark updates as non-urgent transitions so urgent user interactions (like typing in an input) remain instantaneous.'
      },
      {
        question: 'Why should you NOT rely on useMemo as a semantic guarantee that a computation will never re-run?',
        options: [
          'React documentation explicitly states useMemo is a performance hint and React may forget memoized values in future releases or low memory states.',
          'useMemo runs on a background web worker thread with race conditions.',
          'useMemo causes infinite loops if used inside event handlers.',
          'useMemo has a hard cap of storing only string values.'
        ],
        correctAnswerIndex: 0,
        explanation: 'React explicitly specifies that useMemo is a performance optimization, not a semantic guarantee.'
      },
      {
        question: 'What does the useDeferredValue hook achieve in React 18?',
        options: [
          'It forces an input element to only update on blur.',
          'It defers re-rendering a non-urgent part of the tree until more urgent updates are completed.',
          'It delays network requests by a fixed millisecond timeout.',
          'It turns a controlled component into an uncontrolled component.'
        ],
        correctAnswerIndex: 1,
        explanation: 'useDeferredValue lets you defer updating a non-critical portion of the UI while keeping the main input responsive.'
      },
      {
        question: 'Why should you avoid creating functions or objects inline inside the dependency array of useEffect?',
        options: [
          'JavaScript throws a SyntaxError on inline objects in arrays.',
          'New object/function references are created every render, causing the effect to re-run on every render cycle.',
          'Inline references cause memory leaks in React Native only.',
          'React removes inline dependencies automatically.'
        ],
        correctAnswerIndex: 1,
        explanation: 'JavaScript checks dependency arrays by referential equality (Object.is). An inline object or function creates a new reference on every render pass, triggering unnecessary effect executions.'
      },
      {
        question: 'How do React Server Components (RSC) differ from traditional SSR (Server-Side Rendering)?',
        options: [
          'RSCs require Node.js 12 or lower.',
          'RSCs do not ship any JavaScript bundle for server components to the client, while SSR hydrates client JS for all components.',
          'RSCs cannot connect to databases directly.',
          'RSCs only work with GraphQL.'
        ],
        correctAnswerIndex: 1,
        explanation: 'RSCs render purely on the server and return a serialized UI stream without shipping their JS dependency code to the browser bundle.'
      }
    ]
  },
  {
    id: 'assess-node-architecture',
    title: 'Node.js Event Loop & REST API Architecture',
    tagline: 'Test your understanding of the libuv event loop phases, async I/O, middleware chaining, and streams.',
    skill: 'Node.js',
    category: 'Backend',
    duration: '25 mins',
    questionsCount: 5,
    difficulty: 'Intermediate',
    lastScore: null,
    passingScore: 70,
    status: 'Ready to Take',
    xpReward: 200,
    badgeText: 'Recommended Gap',
    attemptsCount: 0,
    questions: [
      {
        question: 'In which libuv phase do setImmediate() callbacks execute?',
        options: [
          'Timers phase',
          'I/O Polling phase',
          'Check phase',
          'Close callbacks phase'
        ],
        correctAnswerIndex: 2,
        explanation: 'The Check phase of the Node.js event loop is dedicated specifically to executing callbacks registered via setImmediate().'
      },
      {
        question: 'What happens when process.nextTick() is called recursively inside a callback?',
        options: [
          'It schedules the callback for the next tick of the next event loop iteration.',
          'It starves the event loop I/O polling, causing a complete freeze/starvation of other operations.',
          'Node.js automatically throws a NextTickLimitExceededError.',
          'It runs in a separate thread on the worker pool.'
        ],
        correctAnswerIndex: 1,
        explanation: 'process.nextTick queue is processed before moving to the next event loop phase. Calling it recursively prevents the event loop from ever reaching the Poll/I/O phase.'
      },
      {
        question: 'Why is using Stream.pipe() or pipeline() superior to fs.readFile() for transmitting large files in Express?',
        options: [
          'Streams buffer the entire file into RAM at once for faster reading.',
          'Streams process data chunk-by-chunk, maintaining minimal memory footprint and applying backpressure.',
          'fs.readFile is deprecated in Node.js 20.',
          'Streams automatically compress files to .zip format.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Streams read and transmit data in small chunks (e.g. 64KB), preventing heap memory overflow and handling slow clients gracefully via automatic backpressure.'
      },
      {
        question: 'How should unhandled Promise rejections be handled in modern Node.js applications?',
        options: [
          'Ignore them because Node.js recovers automatically.',
          'Listen to process.on("unhandledRejection"), log the stack trace with contextual metadata, and gracefully terminate/restart the worker.',
          'Wrap every single file in an eval() block.',
          'Set NODE_ENV=production which silently discards rejected promises.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Unhandled promise rejections leave the process in an undefined state. Best practice is to log the telemetry, close active connections gracefully, and let a process supervisor restart the worker.'
      },
      {
        question: 'In Express middleware, what is the critical requirement for error-handling middleware functions?',
        options: [
          'They must be defined at the top before all route handlers.',
          'They must accept exactly 4 arguments: (err, req, res, next).',
          'They must return an async Promise.',
          'They cannot use res.status() code.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Express inspects function.length. Only middleware with 4 arguments (err, req, res, next) are recognized by Express internal router as error handlers.'
      }
    ]
  },
  {
    id: 'assess-system-design',
    title: 'Distributed Systems & Scalability Benchmark',
    tagline: 'Validate your knowledge of caching, database sharding, CAP theorem, and event-driven queues.',
    skill: 'System Design',
    category: 'Architecture',
    duration: '30 mins',
    questionsCount: 5,
    difficulty: 'Advanced',
    lastScore: null,
    passingScore: 70,
    status: 'Ready to Take',
    xpReward: 250,
    badgeText: 'Advanced Skill',
    attemptsCount: 0,
    questions: [
      {
        question: 'Under high write concurrency, which cache invalidation strategy guarantees zero stale reads by invalidating or updating the cache within the database transaction?',
        options: [
          'Write-Through Caching',
          'Cache-Aside (Lazy Loading)',
          'Write-Behind (Write-Back) Caching',
          'Time-To-Live (TTL) Only'
        ],
        correctAnswerIndex: 0,
        explanation: 'Write-Through updates both the cache and underlying database synchronously, preventing stale reads at the cost of higher write latency.'
      },
      {
        question: 'What is the primary benefit of Consistent Hashing over simple Modulo Hashing in distributed cache clusters?',
        options: [
          'It eliminates all network latency.',
          'When a node is added or removed, only K/N keys need to be remapped instead of almost all keys.',
          'It compresses keys into 32-bit integers.',
          'It converts NoSQL queries into SQL.'
        ],
        correctAnswerIndex: 1,
        explanation: 'In consistent hashing on a hash ring, adding or removing a node only redistributes keys belonging to the immediate neighbor node (1/N of keys), avoiding mass cache thundering herds.'
      },
      {
        question: 'According to the CAP theorem, what does a distributed system choose during a network partition (P) if it prioritizes Availability (A)?',
        options: [
          'It guarantees every read receives the most recent write (Consistency).',
          'It returns responses from all non-failing nodes even if some nodes contain stale data.',
          'It shuts down all nodes immediately.',
          'It deletes all partitions.'
        ],
        correctAnswerIndex: 1,
        explanation: 'In AP systems, during a partition the system remains available to process reads and writes, accepting eventual consistency rather than rejecting operations.'
      },
      {
        question: 'What problem does an Exponential Backoff with Jitter algorithm solve in distributed microservices?',
        options: [
          'It compiles TypeScript code faster.',
          'It prevents synchronized retry spikes (thundering herd problem) from overwhelming a recovering downstream service.',
          'It compresses images on the edge.',
          'It enforces ACID transactions across MongoDB.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Adding random jitter to exponential backoff decorrelates client retry attempts, smoothing traffic load on struggling downstream dependencies.'
      },
      {
        question: 'What is Database Sharding and what is its primary limitation?',
        options: [
          'Compressing table columns with gzip.',
          'Partitioning data horizontally across multiple database instances based on a shard key; cross-shard joins and transactions become complex and expensive.',
          'Replacing relational tables with Redis strings.',
          'Duplicating 100% of data across all nodes.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Horizontal sharding scales database write throughput across instances, but cross-shard queries, joins, and distributed transactions incur significant latency penalties.'
      }
    ]
  }
];
