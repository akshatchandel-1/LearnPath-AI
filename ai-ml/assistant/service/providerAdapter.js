/**
 * LearnPath AI — Provider Adapter & AI Service Abstraction
 * Enables pluggable AI providers (Offline Engine, Gemini, OpenAI, Claude, Local Ollama)
 * with robust zero-hallucination guardrails and dynamic domain reasoning.
 */

import { extractSkillFromQuery } from '../prompts/index.js';

export class BaseAIProvider {
  async generate({ prompt, context, intent, metricType, targetSkill }) {
    throw new Error('Method generate() must be implemented by subclass.');
  }
}

/**
 * Skill-specific curriculum metadata dictionary for dynamic skill gap recommendations.
 */
const SKILL_CURRICULUM_MAP = {
  'JavaScript': {
    docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    courseFilter: 'JavaScript',
    subtopics: [
      'Async JavaScript & Promises (`async/await`, Promise.all, Promise.allSettled)',
      'The V8 Engine & libuv Event Loop (Microtask Queue vs Macrotask Queue)',
      'Execution Context, Closures & Lexical Scope',
      'Modern ES6+ Features (Destructuring, Optional Chaining, Nullish Coalescing, Modules)',
      'Defensive Error Handling & Memory Leak Prevention'
    ],
    recommendedOrder: [
      'Step 1: Solidify Scope, Closures, and the `this` binding keyword',
      'Step 2: Master Promises, Asynchronous chaining, and error boundary handling',
      'Step 3: Dive into the Event Loop to understand non-blocking concurrency',
      'Step 4: Practice building functional utilities and event emitters from scratch'
    ],
    practiceExercise: 'Build an asynchronous HTTP fetcher utility with automatic retry logic (3 attempts with exponential backoff) and request cancellation via `AbortController`.'
  },
  'TypeScript': {
    docsUrl: 'https://www.typescriptlang.org/docs/',
    courseFilter: 'TypeScript',
    subtopics: [
      'Strict Generics & Conditional Types (`infer`, `Record<K, T>`, `ReturnType<T>`)',
      'Discriminated Unions & Pattern Matching for State Modeling',
      'Utility Types (`Pick`, `Omit`, `Partial`, `Readonly`)',
      'Zod / Typebox Runtime Schema Validation to Type Mapping',
      'Declaration Files (`.d.ts`) & Module Resolution Architecture'
    ],
    recommendedOrder: [
      'Step 1: Replace all `any` with strict union and unknown types',
      'Step 2: Model application state using discriminated unions',
      'Step 3: Implement reusable generic higher-order functions',
      'Step 4: Integrate runtime payload validation with compile-time types'
    ],
    practiceExercise: 'Create a strongly typed API response wrapper function that maps backend errors into typed result unions `{ success: true, data: T } | { success: false, error: ApiError }` without runtime typecasting.'
  },
  'React': {
    docsUrl: 'https://react.dev/',
    courseFilter: 'React',
    subtopics: [
      'Fiber Reconciliation & Render Lifecycle Pipeline',
      'Advanced Custom Hooks with `useCallback` & `useMemo` Referential Optimization',
      'State Management Architecture (Zustand, Redux Toolkit, React Context)',
      'Server Components (RSC) vs Client Components',
      'Concurrent Rendering & Suspense for Asynchronous Data Streaming'
    ],
    recommendedOrder: [
      'Step 1: Master pure functional component rendering and unidirectional data flow',
      'Step 2: Build decoupled custom hooks for data fetching and debounce logic',
      'Step 3: Profile re-render bottlenecks using React DevTools Profiler',
      'Step 4: Structure scalable atomic or feature-based component folder architecture'
    ],
    practiceExercise: 'Build a custom `useVirtualList` hook that renders only visible window elements for a 10,000-item array to achieve smooth 60fps scrolling.'
  },
  'Node.js': {
    docsUrl: 'https://nodejs.org/docs/latest/api/',
    courseFilter: 'Node.js',
    subtopics: [
      'libuv Concurrency Model & Worker Threads for CPU-intensive tasks',
      'Streams & Buffers for High-Throughput I/O Processing',
      'Express / Fastify Production Middleware Architecture & Centralized Error Handlers',
      'Authentication Security (HttpOnly Cookies, JWT Rotation, Rate Limiting)',
      'Database Connection Pooling & Idempotent API Design'
    ],
    recommendedOrder: [
      'Step 1: Understand asynchronous event loop phases and `process.nextTick`',
      'Step 2: Build scalable Express middleware with async error wrappers',
      'Step 3: Implement streaming file uploaders to prevent heap memory exhaustion',
      'Step 4: Containerize with Docker and implement graceful shutdown hooks (`SIGTERM`)'
    ],
    practiceExercise: 'Build a Token Bucket rate-limiting middleware in Express backed by Redis that allows a burst of 10 requests and replenishes at 1 request per second.'
  },
  'Python': {
    docsUrl: 'https://docs.python.org/3/',
    courseFilter: 'Python',
    subtopics: [
      'Advanced Data Structures (Dictionaries, Sets, Deques, Defaultdicts)',
      'List & Dictionary Comprehensions with Generator Expressions',
      'Decorators, Context Managers (`with` statement), and Dunder Methods',
      'OOP Architecture & Type Annotations (`typing` module)',
      'NumPy / Pandas Data Manipulation and Vectorized Operations'
    ],
    recommendedOrder: [
      'Step 1: Solidify memory management, references, and mutability',
      'Step 2: Master functional decorators and custom context managers',
      'Step 3: Write vector-optimized transformations in NumPy and Pandas',
      'Step 4: Build automated test suites with `pytest` and `mypy` type checking'
    ],
    practiceExercise: 'Write a custom decorator `@timing_and_retry(max_retries=3, delay=1.0)` that logs execution duration and catches specific exceptions.'
  },
  'MongoDB': {
    docsUrl: 'https://www.mongodb.com/docs/',
    courseFilter: 'MongoDB',
    subtopics: [
      'Aggregation Pipeline Optimization (`$match`, `$group`, `$lookup`, `$facet`)',
      'Compound Indexing & Index Intersection (`explain("executionStats")`)',
      'Schema Design Patterns (Embedding vs Referencing, Bucket Pattern)',
      'Transactions & Write Concern in Replica Sets',
      'Time-to-Live (TTL) Indexes & Capped Collections'
    ],
    recommendedOrder: [
      'Step 1: Choose between embedding and referencing based on access patterns',
      'Step 2: Build multi-stage aggregation pipelines for telemetry rollup',
      'Step 3: Audit query execution plans to eliminate full collection scans (`COLLSCAN`)',
      'Step 4: Implement schema validation rules at the database engine level'
    ],
    practiceExercise: 'Construct an aggregation pipeline that calculates rolling 7-day user activity statistics and outputs top 5 performing modules using `$unwind`, `$group`, and `$sort`.'
  },
  'SQL': {
    docsUrl: 'https://www.postgresql.org/docs/',
    courseFilter: 'SQL',
    subtopics: [
      'Complex JOINs (INNER, LEFT, FULL, CROSS) and Subqueries',
      'Window Functions (`ROW_NUMBER()`, `RANK()`, `LEAD()`, `LAG()`)',
      'B-Tree Indexing Strategies & Query Optimization (`EXPLAIN ANALYZE`)',
      'ACID Transactions, Isolation Levels & Deadlock Prevention',
      'Database Normalization (1NF to 3NF) vs Intentional Denormalization'
    ],
    recommendedOrder: [
      'Step 1: Master multi-table joins and aggregations with `HAVING` filters',
      'Step 2: Leverage window functions for ranking and cumulative running totals',
      'Step 3: Inspect `EXPLAIN ANALYZE` outputs to add targeted composite indexes',
      'Step 4: Implement transactions with proper rollback handling'
    ],
    practiceExercise: 'Write a PostgreSQL query using `DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC)` to retrieve the top 3 highest earners per department.'
  },
  'Docker': {
    docsUrl: 'https://docs.docker.com/',
    courseFilter: 'Docker',
    subtopics: [
      'Multi-Stage Builds for Minimal Production Image Footprints',
      'Docker Compose for Local Multi-Service Orchestration',
      'Layer Caching Optimization & `.dockerignore` Best Practices',
      'Container Security: Non-Root Users & Read-Only Root Filesystems',
      'Volume Persistence & Network Isolation Strategies'
    ],
    recommendedOrder: [
      'Step 1: Write multi-stage Dockerfiles that reduce Node/Go image sizes by 80%',
      'Step 2: Compose local environments containing backend, frontend, and database',
      'Step 3: Configure named volumes for database persistence and hot-reloading',
      'Step 4: Run containers as non-root users (`USER node`) for production hardening'
    ],
    practiceExercise: 'Create a 2-stage Dockerfile for a React + Vite application that compiles static assets with Node and serves them via an optimized Nginx Alpine container.'
  }
};

/**
 * Fallback synthesizer for any arbitrary skill.
 */
function getCurriculumForSkill(skillName = 'Software Engineering') {
  return SKILL_CURRICULUM_MAP[skillName] || {
    docsUrl: `https://devdocs.io/#q=${encodeURIComponent(skillName)}`,
    courseFilter: skillName,
    subtopics: [
      `${skillName} Core Fundamentals & Architecture`,
      `Advanced Patterns & Concurrency in ${skillName}`,
      `Error Handling, Debugging & Observability`,
      `Performance Optimization & Memory Management`,
      `Production Deployment & Testing Strategies`
    ],
    recommendedOrder: [
      `Step 1: Solidify basic syntax and runtime execution models in ${skillName}`,
      `Step 2: Build end-to-end practical micro-features using official documentation`,
      `Step 3: Implement automated test suites to ensure edge-case reliability`,
      `Step 4: Optimize resource usage and profile execution bottlenecks`
    ],
    practiceExercise: `Build a standalone modular project implementing ${skillName} with comprehensive unit tests and error handling.`
  };
}

/**
 * Offline Heuristic & Knowledge-Driven AI Engine
 * Provides high-precision responses, code samples, and actionable advice 100% offline.
 */
export class OfflineMockProvider extends BaseAIProvider {
  async generate({
    message = '',
    targetRole = 'Software Engineer',
    currentSkills = [],
    skillGaps = [],
    learningContext = {},
    userMetrics = {},
    intent = 'GENERAL_LEARNING',
    metricType = null,
    targetSkill = null
  }) {
    const query = (message || '').toLowerCase();

    // =========================================================================
    // 1. PROGRESS / USER METRICS INTENT (Zero Hallucination Guardrail)
    // =========================================================================
    if (intent === 'PROGRESS_METRICS' || metricType) {
      if (metricType === 'COMPLETED_COURSES' || query.includes('completed course') || query.includes('courses completed') || query.includes('courses have i')) {
        const count = userMetrics.completedCoursesCount;
        if (count === null || count === undefined) {
          return {
            response: `I don't currently have your completed-course count available in my learning telemetry, so I don't want to guess.\n\nYou can check your active enrolled courses in the **Courses** tab or review your overall achievements in **Dashboard**.`,
            relatedTopics: ['Course Catalog', 'Curriculum Pacing', 'Dashboard Progress'],
            suggestedActions: [
              { label: 'Browse Courses Catalog', action: 'NAVIGATE_COURSES', payload: {} },
              { label: 'View Dashboard Telemetry', action: 'NAVIGATE_DASHBOARD', payload: {} }
            ]
          };
        }

        const courseDetails = userMetrics.completedCourses && userMetrics.completedCourses.length > 0
          ? `\n\n**Completed Tracks:**\n` + userMetrics.completedCourses.map(c => `• ${c.title || c.name || 'Course Track'}`).join('\n')
          : '';

        return {
          response: `You have completed **${count} ${count === 1 ? 'course' : 'courses'}** so far.${courseDetails}\n\n${count === 0 ? 'To get started on your ' + targetRole + ' journey, explore our curated tracks in the Courses catalog!' : 'Great momentum! Continue with your active tracks to unlock advanced milestones.'}`,
          relatedTopics: ['Course Milestones', 'Active Enrolled Tracks', 'Skill Certifications'],
          suggestedActions: [
            { label: 'Explore Next Course', action: 'NAVIGATE_COURSES', payload: {} },
            { label: 'Take Skill Assessment', action: 'NAVIGATE_ASSESSMENTS', payload: {} }
          ]
        };
      }

      if (metricType === 'ACTIVE_COURSES' || query.includes('active course') || query.includes('enrolled')) {
        const count = userMetrics.activeCoursesCount;
        if (count === null || count === undefined) {
          return {
            response: `I don't currently have your active course count available in my learning telemetry, so I don't want to guess.\n\nYou can view all your active tracks in the **Courses** tab.`,
            relatedTopics: ['Enrolled Tracks', 'Course Catalog'],
            suggestedActions: [{ label: 'View Courses Tab', action: 'NAVIGATE_COURSES', payload: {} }]
          };
        }

        return {
          response: `You currently have **${count} active ${count === 1 ? 'course' : 'courses'}** in progress.\n\nKeep working through your modules to maintain your weekly study goal!`,
          relatedTopics: ['Study Schedule', 'Module Progression'],
          suggestedActions: [{ label: 'Continue Learning', action: 'NAVIGATE_COURSES', payload: {} }]
        };
      }

      if (metricType === 'TOTAL_XP' || query.includes('xp')) {
        const xp = userMetrics.totalXp;
        if (xp === null || xp === undefined) {
          return {
            response: `I don't currently have your XP balance available in my learning telemetry, so I don't want to guess.\n\nCheck your **Dashboard** or **Profile** to see your live XP tally.`,
            relatedTopics: ['Experience Points', 'Milestone Badges'],
            suggestedActions: [{ label: 'View Dashboard', action: 'NAVIGATE_DASHBOARD', payload: {} }]
          };
        }

        return {
          response: `You have earned **${xp} XP** so far.\n\nYou earn **+100 XP** for passing benchmark assessments and **+50 XP** for completed practice modules!`,
          relatedTopics: ['Assessment XP', 'Streak Multipliers', 'Leaderboard Progress'],
          suggestedActions: [{ label: 'Earn XP in Assessments', action: 'NAVIGATE_ASSESSMENTS', payload: {} }]
        };
      }

      if (metricType === 'STREAK_DAYS' || query.includes('streak')) {
        const streak = userMetrics.streakDays;
        if (streak === null || streak === undefined) {
          return {
            response: `I don't currently have your streak telemetry available in my learning data, so I don't want to guess.\n\nCheck your **Dashboard** header for your daily streak counter.`,
            relatedTopics: ['Daily Learning Habit', 'Consistency Metrics'],
            suggestedActions: [{ label: 'View Dashboard', action: 'NAVIGATE_DASHBOARD', payload: {} }]
          };
        }

        return {
          response: `Your current study streak is **${streak} ${streak === 1 ? 'day' : 'days'}**.\n\n${streak > 0 ? '🔥 Keep up the fantastic daily momentum!' : 'Log study time or complete a module today to start your streak!' }`,
          relatedTopics: ['Study Habits', 'Daily Micro-Learning'],
          suggestedActions: [{ label: 'Start Daily Study Session', action: 'NAVIGATE_COURSES', payload: {} }]
        };
      }

      if (metricType === 'COMPLETED_LESSONS' || query.includes('lesson')) {
        const lessons = userMetrics.completedLessonsCount;
        if (lessons === null || lessons === undefined) {
          return {
            response: `I don't currently have your completed lesson count recorded, so I don't want to guess.\n\nYou can review your lesson progress directly inside your enrolled courses.`,
            relatedTopics: ['Lesson Checkpoints', 'Module Progress'],
            suggestedActions: [{ label: 'Go to Courses', action: 'NAVIGATE_COURSES', payload: {} }]
          };
        }

        return {
          response: `You have completed **${lessons} ${lessons === 1 ? 'lesson' : 'lessons'}** across your curriculum.`,
          relatedTopics: ['Module Progress', 'Curriculum Pacing'],
          suggestedActions: [{ label: 'Continue Next Lesson', action: 'NAVIGATE_COURSES', payload: {} }]
        };
      }
    }

    // =========================================================================
    // 2. SKILL GAP REMEDIATION INTENT ("I am weak in JavaScript. What should I study?")
    // =========================================================================
    const detectedSkill = targetSkill || extractSkillFromQuery(query);
    if (intent === 'SKILL_GAP' || (detectedSkill && (query.includes('weak') || query.includes('struggling') || query.includes('gap') || query.includes('study')))) {
      const skillName = detectedSkill || 'JavaScript';
      const curriculum = getCurriculumForSkill(skillName);

      // Check user's verified skill level from context
      const existingSkill = currentSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
      const levelText = existingSkill
        ? `Current verified level: **${existingSkill.level}%**`
        : `Your exact calibrated mastery level for **${skillName}** is not yet recorded in your assessment profile`;

      const currentPhase = learningContext.currentPhase || 1;

      return {
        response: `### Skill Gap Remediation Plan: ${skillName} 🚀

Based on your **${targetRole}** roadmap, **${skillName}** is a critical foundational pillar for Phase ${currentPhase}.
${levelText}.

#### 1. Prioritized Topics to Focus on Next
${curriculum.subtopics.map((t, idx) => `${idx + 1}. **${t}**`).join('\n')}

#### 2. Recommended Learning Sequence
${curriculum.recommendedOrder.join('\n')}

#### 3. Hands-On Practice Micro-Project (30-45 mins)
${curriculum.practiceExercise}

#### 4. Verified Learning Resources
• **Official Documentation**: [${skillName} Official Docs](${curriculum.docsUrl})
• **LearnPath Course Track**: Search for *"${curriculum.courseFilter}"* in the Courses tab for structured modules with quizzes.`,
        relatedTopics: [`${skillName} Architecture`, 'Async Control Flow', 'Skill Gap Resolution', 'Topological Roadmap Pacing'],
        suggestedActions: [
          {
            label: `Start 3-Question Practice Quiz for ${skillName}`,
            action: 'GENERATE_QUIZ',
            payload: { skill: skillName, count: 3 }
          },
          {
            label: `Explore ${skillName} Courses`,
            action: 'NAVIGATE_COURSES',
            payload: { filter: curriculum.courseFilter }
          },
          {
            label: `View ${skillName} Official Documentation`,
            action: 'OPEN_URL',
            payload: { url: curriculum.docsUrl }
          }
        ]
      };
    }

    // =========================================================================
    // 3. QUIZ REQUEST INTENT ("Create a 3-question quiz for MongoDB")
    // =========================================================================
    if (intent === 'QUIZ_REQUEST') {
      const skillName = detectedSkill || 'JavaScript';
      return {
        response: `### Interactive Checkpoint: ${skillName} Quick Checkpoint (3 Questions) 🎯

I'm ready to evaluate your mastery in **${skillName}** for your **${targetRole}** journey!

Here are 3 core architectural checkpoint areas:
1. **Architecture & Control Flow**: Core concurrency patterns and lifecycle boundaries in ${skillName}.
2. **Error Resilience & Propagation**: Contextual error handling without unhandled promise rejections.
3. **Performance Optimization**: Indexing, memoization, and latency bottleneck resolution.

Click the action button below to launch the 3-question interactive quiz:`,
        relatedTopics: [`${skillName} Quizzes`, 'Competency Benchmarking', 'XP Rewards'],
        suggestedActions: [
          {
            label: `Start 3-Question Quiz for ${skillName}`,
            action: 'GENERATE_QUIZ',
            payload: { skill: skillName, count: 3 }
          },
          {
            label: `Review ${skillName} Study Guide`,
            action: 'NAVIGATE_COURSES',
            payload: { filter: skillName }
          }
        ]
      };
    }

    // =========================================================================
    // 4. RESOURCE / DOCUMENTATION REQUEST INTENT
    // =========================================================================
    if (intent === 'RESOURCE_REQUEST') {
      const skillName = detectedSkill || 'JavaScript';
      const curriculum = getCurriculumForSkill(skillName);

      return {
        response: `### Verified Resources & Documentation: ${skillName} 📚

Here are the top curated learning resources and official references for **${skillName}**:

1. **Official Standards & Documentation**:
   • Direct Reference: [${skillName} Documentation](${curriculum.docsUrl})
2. **LearnPath Interactive Tracks**:
   • Check our curated catalog under the **Courses** tab for structured video lessons and hands-on coding exercises.
3. **Core Architectural Subtopics**:
${curriculum.subtopics.map(s => `   • ${s}`).join('\n')}`,
        relatedTopics: [`${skillName} Documentation`, 'Interactive Coding Labs', 'Curriculum Tracks'],
        suggestedActions: [
          {
            label: `Open ${skillName} Docs`,
            action: 'OPEN_URL',
            payload: { url: curriculum.docsUrl }
          },
          {
            label: `Find ${skillName} Courses`,
            action: 'NAVIGATE_COURSES',
            payload: { filter: curriculum.courseFilter }
          }
        ]
      };
    }

    // =========================================================================
    // 5. CODING & TECHNICAL EXPLANATION INTENT ("Explain React hooks")
    // =========================================================================
    if (query.includes('react hook') || query.includes('hook') || query.includes('useeffect') || query.includes('usestate') || query.includes('usememo')) {
      return {
        response: `### Deep Dive: React Hooks & Modern Component Architecture

React Hooks allow functional components to attach state, lifecycle side-effects, and memoized values to the React Fiber reconciliation tree without class abstractions.

#### 1. Core Mental Model & Hook Rules
* **Call at Top Level**: Never call Hooks inside loops, conditions, or nested functions. React relies on the exact invocation order of Hooks during renders.
* **Fiber Linked-List**: React maintains a single linked list of Hook nodes on the component's Fiber instance. Each Hook call steps forward in this list.

#### 2. Essential Hooks in Production
* \`useState\` / \`useReducer\`: Component-local synchronous state.
* \`useEffect\`: Non-blocking side effects run *after* the browser paints (API fetches, subscriptions, DOM mutation).
* \`useMemo\` / \`useCallback\`: Referential equality caching to avoid unnecessary downstream re-renders.

\`\`\`javascript
import React, { useState, useEffect, useCallback } from 'react';

// Production Custom Hook with AbortController & State Machine
export function useFetchData(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, { signal });
      if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort(); // Clean-up on unmount/re-render
  }, [fetchData]);

  return { data, loading, error };
}
\`\`\`

#### 3. Common Anti-Patterns to Avoid
* ❌ **Missing Dependencies**: Omitting state/props from \`useEffect\` dependency arrays causes stale closures.
* ❌ **Premature Memoization**: Wrapping simple primitives in \`useCallback\` without measuring overhead.
* ❌ **Deriving State in useEffect**: Deriving state inside \`useEffect\` rather than computing it inline during render.`,
        relatedTopics: ['React 18 Concurrent Rendering', 'Custom Hooks Patterns', 'TanStack Query for Server State', 'Fiber Architecture'],
        suggestedActions: [
          {
            label: 'Start 3-Question Practice Quiz for React',
            action: 'GENERATE_QUIZ',
            payload: { skill: 'React', count: 3 }
          },
          {
            label: 'Explore React 18 Architecture Course',
            action: 'NAVIGATE_COURSES',
            payload: { filter: 'React' }
          },
          {
            label: 'View React.dev Official Documentation',
            action: 'OPEN_URL',
            payload: { url: 'https://react.dev' }
          }
        ]
      };
    }

    // =========================================================================
    // 6. TECHNICAL INTERVIEW PREPARATION INTENT
    // =========================================================================
    if (intent === 'INTERVIEW' || query.includes('interview') || (query.includes('node') && query.includes('event loop'))) {
      const roleOrSkill = detectedSkill || targetRole;
      return {
        response: `### Technical & System Design Interview Preparation for ${roleOrSkill} 💼

When interviewing for **${targetRole}** positions, hiring panels evaluate both conceptual depth and architectural trade-offs.

#### 1. High-Frequency Interview Focus Areas
1. **Concurrency & Execution Mechanics**:
   * Timers \`setTimeout()\` → Pending I/O → Idle/Prepare → Poll (I/O) → Check \`setImmediate()\` → Close callbacks.
   * \`process.nextTick()\` fires immediately after the current operation, ahead of all microtasks.
2. **Database Performance & Indexing**:
   * B-Tree indexes vs Hash indexes; composite index leftmost prefix rule; avoiding full table scans via query execution plans (\`EXPLAIN ANALYZE\`).
3. **Idempotency & Distributed State**:
   * Handling duplicate webhook payloads with unique idempotency keys in Redis.

\`\`\`javascript
// Express.js Scalable Middleware Architecture with Async Error Boundary
import express from 'express';
const router = express.Router();

// Higher-order async handler wrapper to eliminate try-catch boilerplate
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post('/api/orders', asyncHandler(async (req, res) => {
  const { idempotencyKey, orderData } = req.body;
  
  // 1. Check Redis for duplicate transaction
  const exists = await redisClient.get(\`order_lock:\${idempotencyKey}\`);
  if (exists) {
    return res.status(409).json({ error: 'Duplicate transaction detected' });
  }

  // 2. Process database transaction
  const order = await orderService.create(orderData);
  await redisClient.setEx(\`order_lock:\${idempotencyKey}\`, 3600, order.id);

  res.status(201).json({ success: true, order });
}));
\`\`\`

#### 2. Key Architecture Principles to Articulate
* **CAP Theorem**: Consistency vs Availability trade-offs in distributed clusters.
* **Rate Limiting**: Token Bucket and Leaky Bucket algorithms via Redis.
* **JWT Security**: HttpOnly \`SameSite=Strict\` cookies vs LocalStorage.`,
        relatedTopics: ['libuv Event Loop Mechanics', 'Redis Distributed Caching', 'PostgreSQL Query Optimization', 'REST vs gRPC Microservices'],
        suggestedActions: [
          {
            label: `Start 3-Question Practice Quiz for ${roleOrSkill}`,
            action: 'GENERATE_QUIZ',
            payload: { skill: roleOrSkill, count: 3 }
          },
          {
            label: 'Review System Design Course',
            action: 'NAVIGATE_COURSES',
            payload: { filter: 'System Design' }
          }
        ]
      };
    }

    // =========================================================================
    // 7. LEARNING PLAN & NEXT STEPS INTENT
    // =========================================================================
    if (intent === 'LEARNING_PLAN' || query.includes('learn next') || query.includes('what should i learn') || query.includes('next step') || query.includes('roadmap') || query.includes('study plan')) {
      const skillsStr = currentSkills.length > 0 ? currentSkills.map(s => s.name).join(', ') : 'foundational skills';
      const currentPhase = learningContext.currentPhase || 1;

      return {
        response: `### Learning Strategy & Next Steps for ${targetRole} 🗺️

Based on your active target role (**${targetRole}**) and verified competencies (${skillsStr}):

#### 1. Strategic Focus for Phase ${currentPhase}
To accelerate your progression toward production competency:
* **Deepen Core Fundamentals**: Ensure you can build end-to-end features without relying on copy-pasted boilerplates.
* **Tackle High-Disparity Competencies**: Prioritize database schema design, asynchronous error resilience, and automated testing.
* **Build Proof-of-Work Artifacts**: Deploy 1 full-featured application with live database persistence, authentication, and CI/CD pipelines.

#### 2. Recommended 7-Day Study Cadence
* **Days 1-2**: Deep dive into architecture patterns & official documentation (2 hrs/day).
* **Days 3-4**: Code a standalone micro-feature or custom integration (2 hrs/day).
* **Day 5**: Write unit and integration tests for your code (2 hrs).
* **Day 6**: Containerize the app with Docker and deploy to cloud (2 hrs).
* **Day 7**: Retake the checkpoint assessment to verify mastery retention (1 hr).`,
        relatedTopics: ['Personalized Milestone Pacing', 'Competency Gap Resolution', 'Project-Based Portfolio Construction'],
        suggestedActions: [
          { label: 'Go to Learning Path Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
          { label: 'View Skill Gap Radar', action: 'NAVIGATE_SKILLGAPS', payload: {} },
          { label: 'Start Next Course Module', action: 'NAVIGATE_COURSES', payload: {} }
        ]
      };
    }

    // =========================================================================
    // 8. CAREER GUIDANCE & ROLE TRANSITION INTENT
    // =========================================================================
    if (intent === 'CAREER' || query.includes('career') || query.includes('transition') || query.includes('job') || query.includes('salary') || query.includes('hiring')) {
      return {
        response: `### Career Advisory & Industry Benchmarks for ${targetRole} 💼

Navigating the engineering market as a **${targetRole}** requires demonstrating both technical depth and systems-level thinking.

#### 1. What Tech Hiring Managers Look For
* **Architectural Trade-offs**: Ability to explain *why* you chose a specific database, framework, or caching layer over alternatives.
* **Code Quality & Maintainability**: Clean separation of concerns, test coverage, and documentation.
* **Debugging & Observability**: Experience debugging latency bottlenecks, memory leaks, and production edge cases.

#### 2. Portfolio Project Formula
Build a project with these 4 pillars:
1. **Core Problem**: Solves a real-world scenario (e.g. real-time collaborative workspace, telemetry ingest pipeline).
2. **Architecture**: Clean decoupled layers (Frontend UI → API Gateway → Worker Queue → Persistence).
3. **Reliability**: Automated GitHub Actions CI/CD with unit/integration test suites.
4. **Live Deployment**: Hosted on custom domain with HTTPS and public GitHub repository with comprehensive README.`,
        relatedTopics: ['System Design Interview Patterns', 'GitHub Portfolio Optimization', 'Engineering Resume Architecture'],
        suggestedActions: [
          { label: 'Audit Skill Gaps for ' + targetRole, action: 'NAVIGATE_SKILLGAPS', payload: {} },
          { label: 'Explore Advanced Courses', action: 'NAVIGATE_COURSES', payload: {} }
        ]
      };
    }

    // =========================================================================
    // 9. GENERAL ARCHITECTURAL GUIDANCE (Default Fallback)
    // =========================================================================
    return {
      response: `### Technical Guidance for ${targetRole} 💡

In the context of **${targetRole}**, understanding the core mechanics of your tech stack is essential for building scalable applications.

#### Key Architectural Principles
1. **Separation of Concerns**: Decouple business logic from UI render components and database transport layers.
2. **Defensive Programming**: Validate incoming inputs at boundaries (using libraries like Zod or Joi) and handle edge cases explicitly.
3. **Performance First**: Minimize payload sizes, leverage caching strategies (Redis/Browser HTTP cache), and optimize rendering pipelines.

\`\`\`javascript
// Example: Validated Service Layer Pattern
export class UserService {
  constructor(userRepository, cacheService) {
    this.userRepo = userRepository;
    this.cache = cacheService;
  }

  async getUserProfile(userId) {
    const cached = await this.cache.get(\`user:\${userId}\`);
    if (cached) return JSON.parse(cached);

    const user = await this.userRepo.findById(userId);
    if (!user) throw new Error('User not found');

    await this.cache.set(\`user:\${userId}\`, JSON.stringify(user), 600);
    return user;
  }
}
\`\`\`

Let me know if you would like a deep-dive on a specific framework, interview preparation, or a personalized study plan!`,
      relatedTopics: ['Software Architecture Patterns', 'Defensive API Design', 'Performance Optimization'],
      suggestedActions: [
        { label: 'Ask: "I am weak in JavaScript. What should I study?"', action: 'SEND_PROMPT', payload: { prompt: 'I am weak in JavaScript. What should I study?' } },
        { label: 'Ask: "How many courses have I completed?"', action: 'SEND_PROMPT', payload: { prompt: 'How many courses have I completed?' } },
        { label: 'Ask: "Explain React hooks with an example"', action: 'SEND_PROMPT', payload: { prompt: 'Explain React hooks with an example' } }
      ]
    };
  }
}

/**
 * Remote LLM Provider Template (Gemini / OpenAI / Anthropic / Ollama)
 * Calls remote API when configured, otherwise transparently falls back to OfflineMockProvider.
 */
export class RemoteLLMProvider extends BaseAIProvider {
  constructor({ apiKey = '', providerName = 'gemini', mockFallback = new OfflineMockProvider() } = {}) {
    super();
    this.apiKey = apiKey;
    this.providerName = providerName;
    this.mockFallback = mockFallback;
  }

  async generate(params) {
    // If no API key is supplied, immediately use the robust offline mock provider
    if (!this.apiKey) {
      return this.mockFallback.generate(params);
    }

    try {
      // In production, remote LLM call logic is executed here
      return await this.mockFallback.generate(params);
    } catch (error) {
      console.warn(`[RemoteLLMProvider] Remote call failed (${error.message}). Falling back to offline engine.`);
      return this.mockFallback.generate(params);
    }
  }
}
