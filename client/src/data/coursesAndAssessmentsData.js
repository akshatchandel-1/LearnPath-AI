/**
 * Rich Course & Assessment Data Catalog for Member 3 Workspace
 * Includes full syllabus, modules, quizzes, and difficulty taxonomy.
 */

export const INITIAL_COURSES = [
  {
    id: 'course-react-patterns',
    title: 'Advanced React 18 Design Patterns & Performance',
    tagline: 'Master concurrent rendering, custom hooks, atomic state management, and memory optimization.',
    category: 'Frontend',
    difficulty: 'Advanced',
    platform: 'LearnPath Curated',
    instructor: 'Dr. Sarah Lin (Principal Frontend Architect)',
    duration: '6.5 Hours',
    rating: 4.9,
    reviewsCount: 384,
    enrolled: true,
    progress: 75,
    completedLessons: 9,
    totalLessons: 12,
    xpReward: 350,
    skillsCovered: ['React.js', 'Custom Hooks', 'Concurrent Mode', 'State Management'],
    targetRole: 'Full Stack MERN Developer',
    assessmentId: 'assess-react-core',
    thumbnailGradient: 'from-sky-500/20 via-cyan-600/10 to-blue-900/30',
    modules: [
      {
        title: 'Module 1: React 18 Fiber & Concurrent Features',
        duration: '1.5 hrs',
        lessons: [
          { id: 'l1', title: 'Deep Dive into useTransition and useDeferredValue', duration: '25 mins', completed: true },
          { id: 'l2', title: 'Automatic Batching & Server Components Primer', duration: '35 mins', completed: true },
          { id: 'l3', title: 'Profiling Render Bottlenecks with React DevTools', duration: '30 mins', completed: true },
        ]
      },
      {
        title: 'Module 2: Advanced Hook Composition & Reusability',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l4', title: 'Building Resilient Context Selectors without Re-renders', duration: '40 mins', completed: true },
          { id: 'l5', title: 'Compound Components & Slot Architecture', duration: '50 mins', completed: true },
          { id: 'l6', title: 'Dynamic State Reducers with useReducer & Action Creators', duration: '40 mins', completed: true },
        ]
      },
      {
        title: 'Module 3: Production Performance & Virtualization',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l7', title: 'Windowing Large Data Sets with TanStack Virtual', duration: '45 mins', completed: true },
          { id: 'l8', title: 'Memory Leak Detection & Cleanup Patterns', duration: '35 mins', completed: true },
          { id: 'l9', title: 'Micro-Frontend Lazy Loading with Webpack 5 / Vite', duration: '40 mins', completed: true },
          { id: 'l10', title: 'End-to-End Performance Auditing (LCP, INP, CLS)', duration: '30 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-node-microservices',
    title: 'Production-Ready Express.js, MongoDB & Clean Architecture',
    tagline: 'Build battle-tested REST APIs with bulletproof auth, distributed caching, and Mongoose indexing.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'Coursera / Partner',
    instructor: 'Marcus Vance (Senior Backend Lead)',
    duration: '8.0 Hours',
    rating: 4.8,
    reviewsCount: 512,
    enrolled: true,
    progress: 45,
    completedLessons: 5,
    totalLessons: 11,
    xpReward: 400,
    skillsCovered: ['Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Redis'],
    targetRole: 'Full Stack MERN Developer',
    assessmentId: 'assess-node-architecture',
    thumbnailGradient: 'from-emerald-500/20 via-sky-600/10 to-slate-900/30',
    modules: [
      {
        title: 'Module 1: Modular Express Controller & Service Layers',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l11', title: 'Clean Architecture Pattern for Enterprise Node.js', duration: '45 mins', completed: true },
          { id: 'l12', title: 'Async Error Handling & Centralized Logging with Winston', duration: '40 mins', completed: true },
          { id: 'l13', title: 'Input Sanitization and Zod/Joi Validation Schemas', duration: '45 mins', completed: true },
        ]
      },
      {
        title: 'Module 2: Advanced MongoDB & Performance Indexing',
        duration: '3.0 hrs',
        lessons: [
          { id: 'l14', title: 'Compound Indexes & Query Execution Plans ($explain)', duration: '50 mins', completed: true },
          { id: 'l15', title: 'Aggregation Pipeline Masterclass ($lookup, $facet)', duration: '60 mins', completed: true },
          { id: 'l16', title: 'Transaction Management & Replica Set Guarantees', duration: '40 mins', completed: false },
        ]
      },
      {
        title: 'Module 3: Security, Rate Limiting & JWT Lifecycle',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l17', title: 'HttpOnly Secure Cookies & Refresh Token Rotation', duration: '45 mins', completed: false },
          { id: 'l18', title: 'Redis Caching & Distributed Rate Limiting', duration: '50 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-typescript-fullstack',
    title: 'TypeScript 5.x Mastery for Full Stack MERN Developers',
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
    totalLessons: 10,
    xpReward: 300,
    skillsCovered: ['TypeScript', 'Generics', 'Type Narrowing', 'Zod Integration'],
    targetRole: 'Full Stack MERN Developer',
    assessmentId: 'assess-typescript-core',
    thumbnailGradient: 'from-blue-600/20 via-cyan-500/10 to-indigo-950/30',
    modules: [
      {
        title: 'Module 1: Advanced Type System Concepts',
        duration: '2.0 hrs',
        lessons: [
          { id: 'l19', title: 'Conditional Types, infer Keyword & Template Literals', duration: '40 mins', completed: false },
          { id: 'l20', title: 'Discriminated Unions & Custom Type Guards', duration: '35 mins', completed: false },
          { id: 'l21', title: 'Mapped Types & Key Remapping in Practice', duration: '45 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: TypeScript with React & Node',
        duration: '3.2 hrs',
        lessons: [
          { id: 'l22', title: 'Typing Polymorphic React Components & forwardRef', duration: '50 mins', completed: false },
          { id: 'l23', title: 'Type-Safe Express Route Handlers & Middleware', duration: '45 mins', completed: false },
          { id: 'l24', title: 'Sharing Monorepo Types between Client & Server', duration: '55 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-docker-k8s',
    title: 'Docker Containers & Cloud Deployment for Web Apps',
    tagline: 'Containerize MERN microservices, multi-stage Docker builds, and automated CI/CD pipelines.',
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
    totalLessons: 9,
    xpReward: 380,
    skillsCovered: ['Docker', 'CI/CD', 'GitHub Actions', 'AWS ECS', 'NGINX'],
    targetRole: 'Full Stack MERN Developer',
    assessmentId: 'assess-docker-devops',
    thumbnailGradient: 'from-cyan-600/20 via-sky-700/10 to-slate-900/30',
    modules: [
      {
        title: 'Module 1: Docker Fundamentals & Optimized Multi-Stage Builds',
        duration: '3.0 hrs',
        lessons: [
          { id: 'l25', title: 'Dockerizing Vite React & Node APIs with Alpine', duration: '50 mins', completed: false },
          { id: 'l26', title: 'Docker Compose for Local Multi-Container Development', duration: '55 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Cloud Deployment & Reverse Proxy Setup',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l27', title: 'Configuring NGINX as an SSL Reverse Proxy & Load Balancer', duration: '60 mins', completed: false },
          { id: 'l28', title: 'GitHub Actions Automated Testing & Image Registry Push', duration: '60 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-system-design',
    title: 'System Design & Scalable Web Architecture',
    tagline: 'Learn how top tech companies scale to millions of users with horizontal sharding, queues, and CDNs.',
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
    totalLessons: 14,
    xpReward: 500,
    skillsCovered: ['System Design', 'Kafka', 'Redis Caching', 'Database Sharding', 'Microservices'],
    targetRole: 'Full Stack MERN Developer',
    assessmentId: 'assess-system-design',
    thumbnailGradient: 'from-indigo-600/20 via-sky-600/10 to-slate-950/30',
    modules: [
      {
        title: 'Module 1: Scalability Patterns & Distributed Caching',
        duration: '4.0 hrs',
        lessons: [
          { id: 'l29', title: 'Cache Invalidation Strategies (Write-Through vs Cache-Aside)', duration: '55 mins', completed: false },
          { id: 'l30', title: 'Message Queues (RabbitMQ & Kafka) for Event-Driven Microservices', duration: '65 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Database Scalability & High Availability',
        duration: '5.0 hrs',
        lessons: [
          { id: 'l31', title: 'Read Replicas, Horizontal Sharding & Consistent Hashing', duration: '65 mins', completed: false },
          { id: 'l32', title: 'CAP Theorem, Eventual Consistency & Vector Search', duration: '75 mins', completed: false },
        ]
      }
    ]
  },
  {
    id: 'course-nextjs-fullstack',
    title: 'Next.js 15 App Router & Server Actions in Depth',
    tagline: 'Build next-generation React apps with streaming SSR, Server Components, and seamless database mutations.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'Frontend Masters Partner',
    instructor: 'Claire Dupont (Next.js Core Contributor)',
    duration: '5.5 Hours',
    rating: 4.9,
    reviewsCount: 310,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 10,
    xpReward: 320,
    skillsCovered: ['Next.js', 'React Server Components', 'Server Actions', 'Streaming SSR'],
    targetRole: 'Full Stack MERN Developer',
    assessmentId: 'assess-nextjs-approuter',
    thumbnailGradient: 'from-sky-400/20 via-blue-600/10 to-slate-950/30',
    modules: [
      {
        title: 'Module 1: App Router Fundamentals',
        duration: '2.5 hrs',
        lessons: [
          { id: 'l33', title: 'Layouts, Templates, and Route Handlers', duration: '45 mins', completed: false },
          { id: 'l34', title: 'Suspense Boundaries & Streaming Hydration', duration: '50 mins', completed: false },
        ]
      },
      {
        title: 'Module 2: Server Actions & Mutations',
        duration: '3.0 hrs',
        lessons: [
          { id: 'l35', title: 'Optimistic UI Updates with useOptimistic', duration: '45 mins', completed: false },
          { id: 'l36', title: 'Revalidating Cached Tags & Paths on Mutation', duration: '55 mins', completed: false },
        ]
      }
    ]
  }
];

export const INITIAL_ASSESSMENTS = [
  {
    id: 'assess-react-core',
    title: 'React Core & Hooks Benchmark',
    tagline: 'Evaluate your mastery of React lifecycle, rendering loops, and hook dependency gotchas.',
    skill: 'React.js',
    category: 'Frontend',
    duration: '20 mins',
    questionsCount: 5,
    difficulty: 'Intermediate',
    lastScore: 92,
    passingScore: 70,
    status: 'Passed',
    xpReward: 150,
    badgeText: 'Verified Proficient',
    attemptsCount: 2,
    questions: [
      {
        question: 'Which of the following is true about how useEffect executes in React 18 with Concurrent Mode?',
        options: [
          'Effects run synchronously immediately before the DOM updates.',
          'Passive effects are batched and fired asynchronously after layout and paint.',
          'Effects never fire if a component unmounts within 100ms.',
          'Effects block the browser main thread until all async promises resolve.'
        ],
        correctAnswerIndex: 1,
        explanation: 'In React 18, useEffect callbacks are passive effects that execute asynchronously after the browser has completed the screen paint, preventing UI frame drops.'
      },
      {
        question: 'When using useMemo, why is it dangerous to rely on it for semantic guarantees (i.e. code correctness)?',
        options: [
          'React may "forget" memoized values on low memory or transitions and recalculate them.',
          'useMemo always runs on the server and never on the client.',
          'useMemo causes infinite loops if used inside event handlers.',
          'useMemo has a hard cap of storing only string values.'
        ],
        correctAnswerIndex: 0,
        explanation: 'React explicitly specifies that useMemo is a performance optimization, not a semantic guarantee. In future releases or low memory states, React may discard cached values.'
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
        explanation: 'useDeferredValue lets you defer updating a non-critical portion of the UI (e.g. filtered search results list) while keeping the main input responsive.'
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
        explanation: 'RSCs render purely on the server and return a serialized UI stream (JSON-like representation) without shipping their JS dependency code to the browser bundle.'
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
        explanation: 'Unhandled promise rejections leave the process in an undefined state. Best practice is to log the telemetry, close active connections gracefully, and let a process supervisor (like PM2 or K8s) restart the pod.'
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
    id: 'assess-mongodb-perf',
    title: 'MongoDB Query Performance & Indexing Strategies',
    tagline: 'Validate your expertise in compound indexes, explain plans, aggregation pipeline optimizations, and sharding.',
    skill: 'MongoDB',
    category: 'Database',
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
        question: 'Given an index on { status: 1, createdAt: -1 }, which query CANNOT effectively utilize this index according to the ESR (Equality, Sort, Range) rule?',
        options: [
          'db.orders.find({ status: "PAID" }).sort({ createdAt: -1 })',
          'db.orders.find({ status: "PAID", createdAt: { $gte: ISODate(...) } })',
          'db.orders.find({ createdAt: { $gte: ISODate(...) } }) without specifying status',
          'db.orders.find({ status: "PENDING" })'
        ],
        correctAnswerIndex: 2,
        explanation: 'In MongoDB compound indexes, queries must start with the prefix of the indexed fields. Querying only on createdAt skips the leading status field and cannot use the index efficiently.'
      },
      {
        question: 'What is a "Covered Query" in MongoDB and why does it deliver maximum throughput?',
        options: [
          'A query that encrypts data in flight with TLS 1.3.',
          'A query where all requested fields are satisfied entirely from the RAM index tree without loading raw documents from disk (totalDocsExamined: 0).',
          'A query wrapped in a multi-document ACID transaction.',
          'A query executed across 100% of all replica set secondary nodes.'
        ],
        correctAnswerIndex: 1,
        explanation: 'A covered query has all projection fields contained inside the index keys, so MongoDB never has to inspect raw documents on disk, yielding near microsecond responses.'
      },
      {
        question: 'In a MongoDB Aggregation Pipeline, where should $match and $project stages ideally be placed?',
        options: [
          'Always at the very end after all $lookup and $group operations.',
          'As early as possible in the pipeline to filter out records and limit fields before expensive transformations.',
          'MongoDB disregards order and executes everything in parallel.',
          'Only one $match stage is allowed per collection.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Placing $match and $project early drastically reduces the dataset size and memory footprint for subsequent stages, and enables index usage for the leading $match.'
      },
      {
        question: 'What is the function of the writeConcern option { w: "majority", j: true } in Mongoose/MongoDB?',
        options: [
          'It writes only to the primary node and skips replica synchronization.',
          'It guarantees that the write has been acknowledged by a majority of voting replica members and committed to the on-disk journal before confirming.',
          'It disables all disk writes and saves exclusively to RAM.',
          'It automatically retries queries 100 times.'
        ],
        correctAnswerIndex: 1,
        explanation: 'w: "majority" plus j: true provides the highest durability guarantee against sudden primary node crashes or network partitions.'
      },
      {
        question: 'What index type should be used for sub-document location querying with geospatial calculations?',
        options: [
          'Hashed index',
          '2dsphere index',
          'Wildcard index',
          'TTL index'
        ],
        correctAnswerIndex: 1,
        explanation: 'MongoDB 2dsphere indexes support queries that calculate geometries on an earth-like sphere, enabling $near and $geoWithin queries.'
      }
    ]
  },
  {
    id: 'assess-typescript-core',
    title: 'TypeScript Generics & Type-Level Programming',
    tagline: 'Demonstrate competency in mapped types, conditional infer keyword, and discriminated unions.',
    skill: 'TypeScript',
    category: 'Languages',
    duration: '20 mins',
    questionsCount: 5,
    difficulty: 'Intermediate',
    lastScore: null,
    passingScore: 70,
    status: 'Ready to Take',
    xpReward: 180,
    badgeText: 'High Priority Gap',
    attemptsCount: 0,
    questions: [
      {
        question: 'What is the purpose of the "infer" keyword in TypeScript conditional types?',
        options: [
          'To tell the compiler to bypass type checking.',
          'To introduce a type variable within a conditional check to deduce and extract an inner type.',
          'To convert runtime JavaScript variables into compile-time types automatically.',
          'To declare a class constructor parameter.'
        ],
        correctAnswerIndex: 1,
        explanation: 'type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any; uses infer R to deduce the return type of any function passed into T.'
      },
      {
        question: 'Why is `unknown` preferred over `any` when handling unexpected API payloads in TypeScript?',
        options: [
          '`unknown` takes up less memory in the compiled JavaScript output.',
          '`unknown` forces developers to perform explicit type narrowing (typeof, instanceof, zod validation) before accessing properties, preserving type safety.',
          '`unknown` allows calling any method without syntax errors.',
          '`unknown` is identical to `null`.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Unlike `any` which disables all type-checking, `unknown` is the type-safe counterpart where no operations are allowed until narrowed by type guards.'
      },
      {
        question: 'What does the `readonly` modifier on array types (e.g. ReadonlyArray<string> or readonly string[]) prevent?',
        options: [
          'It prevents reading items from the array.',
          'It prevents mutating methods like .push(), .pop(), .splice() or direct index assignments from being called.',
          'It makes the array immutable in compiled JavaScript runtime.',
          'It converts strings to numbers.'
        ],
        correctAnswerIndex: 1,
        explanation: 'In TypeScript compile time, readonly arrays forbid mutating methods like push, pop, shift, and index mutation.'
      },
      {
        question: 'What is a "Discriminated Union" in TypeScript?',
        options: [
          'A union of primitive types like string | number.',
          'A pattern where multiple object types share a common literal property (the discriminant) used by TypeScript to narrow down the exact variant.',
          'A union type that only accepts boolean flags.',
          'An ESLint rule for forbidding union types.'
        ],
        correctAnswerIndex: 1,
        explanation: 'A discriminated union uses a single common literal key (e.g. { kind: "success", data } | { kind: "error", error }) to allow exhaustiveness checking.'
      },
      {
        question: 'What does `keyof typeof MyObject` produce in TypeScript?',
        options: [
          'An array containing the string keys at runtime.',
          'A compile-time union type of all string/symbol keys belonging to the value MyObject.',
          'The prototype chain of MyObject.',
          'A boolean indicating if the object is empty.'
        ],
        correctAnswerIndex: 1,
        explanation: 'typeof captures the type structure of the value MyObject, and keyof produces a union of its literal key names (e.g. "id" | "name" | "price").'
      }
    ]
  },
  {
    id: 'assess-docker-devops',
    title: 'Docker Containers & Multi-Stage Production Builds',
    tagline: 'Test container orchestration, non-root security, layer caching, and health checks.',
    skill: 'Docker',
    category: 'Cloud & DevOps',
    duration: '20 mins',
    questionsCount: 5,
    difficulty: 'Intermediate',
    lastScore: null,
    passingScore: 70,
    status: 'Ready to Take',
    xpReward: 190,
    badgeText: 'Modern DevOps',
    attemptsCount: 0,
    questions: [
      {
        question: 'Why do production Dockerfiles for Node/React use multi-stage builds?',
        options: [
          'To run multiple operating systems concurrently inside one container.',
          'To build artifacts in an environment with full dev dependencies, and copy only the compiled static output into a clean, minimal runtime image.',
          'Because Docker requires at least two FROM statements to compile.',
          'To automatically push images to Docker Hub on every build.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Multi-stage builds drastically reduce final image sizes (from 1GB+ down to ~50MB) and eliminate attack vectors by excluding dev dependencies and build tools from production containers.'
      },
      {
        question: 'Why is it critical to specify `USER node` or a non-root user in production Dockerfiles?',
        options: [
          'Root users cannot access network ports above 1024.',
          'If an attacker achieves remote code execution in the container, non-root limits their privilege escalation and prevents host filesystem takeover.',
          'Docker crashes when executing Node.js as root in production.',
          'Non-root containers boot 5x faster.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Running containers as root is a major security hazard. A container breakout or vulnerable dependency could grant an attacker root access to the underlying host server.'
      },
      {
        question: 'How should you order Dockerfile instructions to maximize Docker build cache efficiency for Node.js apps?',
        options: [
          'COPY . . before COPY package*.json',
          'COPY package*.json, RUN npm install, then COPY . .',
          'RUN npm install at the very bottom after starting the server',
          'Order does not matter because Docker caches all layers randomly'
        ],
        correctAnswerIndex: 1,
        explanation: 'Placing package.json and npm install before copying the rest of the application code ensures that dependency installation layers are cached and only re-executed when package.json changes.'
      },
      {
        question: 'What is the purpose of the HEALTHCHECK instruction in a Dockerfile?',
        options: [
          'It runs unit tests inside GitHub Actions.',
          'It periodically tests the running container (e.g. querying http://localhost:5000/api/health) and reports healthy/unhealthy status to Docker and orchestrators.',
          'It checks if the server CPU temperature exceeds safe limits.',
          'It cleans up orphaned memory pages.'
        ],
        correctAnswerIndex: 1,
        explanation: 'HEALTHCHECK enables Docker engine and orchestrators like Docker Swarm or Kubernetes to automatically detect deadlocked containers and restart them.'
      },
      {
        question: 'In docker-compose.yml, what does `depends_on` with `condition: service_healthy` achieve?',
        options: [
          'It runs containers in alphabetic order.',
          'It ensures a dependent container (like the web API) only starts AFTER the prerequisite service (like MongoDB) has passed its health check.',
          'It shares environmental variables automatically.',
          'It combines both containers into a single binary.'
        ],
        correctAnswerIndex: 1,
        explanation: 'condition: service_healthy prevents race conditions where the web API starts before the database is ready to accept socket connections.'
      }
    ]
  }
];

export const INITIAL_ASSESSMENT_HISTORY = [
  {
    id: 'hist-1',
    assessmentTitle: 'React Core & Hooks Benchmark',
    skill: 'React.js',
    score: 92,
    passed: true,
    date: 'Yesterday, 4:30 PM',
    xpEarned: 150,
    previousSkillLevel: 70,
    newSkillLevel: 85,
    delta: '+15%'
  },
  {
    id: 'hist-2',
    assessmentTitle: 'JavaScript ES6+ & Async/Await',
    skill: 'JavaScript',
    score: 88,
    passed: true,
    date: '3 days ago',
    xpEarned: 100,
    previousSkillLevel: 65,
    newSkillLevel: 78,
    delta: '+13%'
  },
  {
    id: 'hist-3',
    assessmentTitle: 'CSS Grid & Responsive Flexbox',
    skill: 'CSS3',
    score: 95,
    passed: true,
    date: '5 days ago',
    xpEarned: 100,
    previousSkillLevel: 80,
    newSkillLevel: 92,
    delta: '+12%'
  }
];
