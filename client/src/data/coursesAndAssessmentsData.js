/**
 * LearnPath AI - Verified Multi-Role Course & Assessment Catalog
 * Comprehensive, role-aligned engineering and analytics curriculum with 10+ courses
 * and 10+ assessment diagnostic checkpoints per career objective.
 */

export const INITIAL_COURSES = [
  // ==========================================
  // 1. FRONTEND DEVELOPER / REACT DEVELOPER
  // ==========================================
  {
    id: 'course-fe-1',
    title: 'Modern HTML5 & Semantic Web Architecture',
    tagline: 'Master semantic HTML, accessibility (WCAG 2.1), SEO meta tags, and responsive layouts.',
    category: 'Frontend',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Academy',
    instructor: 'David Malan & Jen Simmons',
    duration: '4.5 Hours',
    rating: 4.9,
    reviewsCount: 620,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 250,
    skillsCovered: ['HTML5', 'Web Accessibility (a11y)', 'SEO Optimization', 'Semantic Markup'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-1',
    thumbnailGradient: 'from-amber-500/20 via-orange-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'MDN Web Docs: HTML5', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
      youtubeVideo: { title: 'HTML5 Semantic Web Crash Course', url: 'https://www.youtube.com/watch?v=kUMe1FH4CHE' },
      youtubeChannel: { title: 'freeCodeCamp.org', url: 'https://www.youtube.com/@freecodecamp' },
      learningPlatform: { title: 'W3C Web Accessibility Initiative', url: 'https://www.w3.org/WAI/' }
    },
    modules: [
      {
        title: 'Module 1: Semantic Structure & Document Flow',
        duration: '2.0 hrs',
        lessons: [
          { id: 'fe1_l1', title: 'Header, Nav, Main, Article & Aside Landmarks', duration: '35 mins', completed: false },
          { id: 'fe1_l2', title: 'Accessible Forms, Labels & ARIA Attributes', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Media, SEO & Meta Viewport Architecture',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fe1_l3', title: 'Responsive Images with srcset and picture Tag', duration: '40 mins', completed: false },
          { id: 'fe1_l4', title: 'OpenGraph Meta Tags & Lighthouse Audit Fixes', duration: '50 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-2',
    title: 'CSS Grid, Modern Flexbox & Responsive Layouts',
    tagline: 'Build fluid mobile-first layouts with 2D CSS Grid, subgrid, Flexbox, and CSS custom properties.',
    category: 'Frontend',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Labs',
    instructor: 'Kevin Powell & Rachel Andrew',
    duration: '5.5 Hours',
    rating: 4.9,
    reviewsCount: 780,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 300,
    skillsCovered: ['CSS3', 'CSS Grid', 'Flexbox', 'Responsive Design'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-2',
    thumbnailGradient: 'from-blue-500/20 via-indigo-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'MDN Web Docs: CSS Layout', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout' },
      youtubeVideo: { title: 'CSS Grid & Flexbox Masterclass', url: 'https://www.youtube.com/watch?v=rg7Fvvl3taU' },
      youtubeChannel: { title: 'Kevin Powell', url: 'https://www.youtube.com/@KevinPowell' },
      learningPlatform: { title: 'CSS-Tricks Grid Guide', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' }
    },
    modules: [
      {
        title: 'Module 1: Flexbox Mechanics & Alignment',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fe2_l1', title: 'Main Axis, Cross Axis, flex-grow & shrink Ratios', duration: '45 mins', completed: false },
          { id: 'fe2_l2', title: 'Building Fluid Navbars & Card Matrices', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: 2D CSS Grid & Subgrid Systems',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fe2_l3', title: 'grid-template-areas, repeat() and minmax()', duration: '50 mins', completed: false },
          { id: 'fe2_l4', title: 'Container Queries & Responsive CSS Architecture', duration: '55 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-3',
    title: 'Modern JavaScript ES6+ & Asynchronous Programming',
    tagline: 'Deep dive into closures, prototypal inheritance, Promises, async/await, and event loop mechanics.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Core',
    instructor: 'Kyle Simpson (You Don\'t Know JS)',
    duration: '7.0 Hours',
    rating: 5.0,
    reviewsCount: 1100,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['JavaScript ES6+', 'Async / Await', 'Closures', 'Event Loop'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-3',
    thumbnailGradient: 'from-yellow-500/20 via-amber-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'JavaScript.info Complete Guide', url: 'https://javascript.info/' },
      youtubeVideo: { title: 'JavaScript Event Loop & Concurrency', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ' },
      youtubeChannel: { title: 'Fireship', url: 'https://www.youtube.com/@Fireship' },
      learningPlatform: { title: 'MDN JavaScript Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }
    },
    modules: [
      {
        title: 'Module 1: Scope, Execution Context & Closures',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fe3_l1', title: 'Lexical Environment, Hoisting & Temporal Dead Zone', duration: '50 mins', completed: false },
          { id: 'fe3_l2', title: 'Closure Patterns, Currying & Data Privacy', duration: '55 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Asynchronous JS & Event Loop Microtasks',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fe3_l3', title: 'Promise Chaining, Promise.allSettled & Error Traps', duration: '50 mins', completed: false },
          { id: 'fe3_l4', title: 'Microtasks Queue vs Macrotasks in V8 Engine', duration: '60 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-4',
    title: 'React 18 Architecture, Custom Hooks & Context API',
    tagline: 'Master concurrent React, custom hooks design, state management, and component decomposition.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Labs',
    instructor: 'Dan Abramov & Kent C. Dodds',
    duration: '8.0 Hours',
    rating: 4.9,
    reviewsCount: 940,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 400,
    skillsCovered: ['React.js', 'Custom Hooks', 'Context API', 'State Management'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-4',
    thumbnailGradient: 'from-cyan-500/20 via-blue-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'React 18 Official Docs', url: 'https://react.dev/' },
      youtubeVideo: { title: 'React 18 Architecture Deep Dive', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
      youtubeChannel: { title: 'Web Dev Simplified', url: 'https://www.youtube.com/@WebDevSimplified' },
      learningPlatform: { title: 'React.dev Interactive Challenges', url: 'https://react.dev/learn' }
    },
    modules: [
      {
        title: 'Module 1: Component Tree & State Lifecycles',
        duration: '4.0 hrs',
        lessons: [
          { id: 'fe4_l1', title: 'Virtual DOM, Fiber Reconciliation & Immutability', duration: '55 mins', completed: false },
          { id: 'fe4_l2', title: 'Custom Hook Design for API Data Hydration', duration: '60 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Global State & Context Providers',
        duration: '4.0 hrs',
        lessons: [
          { id: 'fe4_l3', title: 'Context API Optimization with useMemo & useCallback', duration: '65 mins', completed: false },
          { id: 'fe4_l4', title: 'React Portal, Error Boundaries & Suspense', duration: '55 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-5',
    title: 'TypeScript for Production React & Next.js Systems',
    tagline: 'End-to-end type safety with generics, utility types, discriminated unions, and React prop interfaces.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Advanced',
    instructor: 'Matt Pocock (Total TypeScript)',
    duration: '6.5 Hours',
    rating: 4.9,
    reviewsCount: 580,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['TypeScript', 'Generics', 'Type Narrowing', 'React TS Interfaces'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-5',
    thumbnailGradient: 'from-blue-600/20 via-sky-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'TypeScript Official Handbook', url: 'https://www.typescriptlang.org/docs/' },
      youtubeVideo: { title: 'TypeScript Full Course with Practical Projects', url: 'https://www.youtube.com/watch?v=BCg4U1FzODs' },
      youtubeChannel: { title: 'Total TypeScript', url: 'https://www.youtube.com/@mattpocockuk' },
      learningPlatform: { title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play' }
    },
    modules: [
      {
        title: 'Module 1: Advanced Types & Generics',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fe5_l1', title: 'Discriminated Unions & Exhaustive Pattern Matching', duration: '45 mins', completed: false },
          { id: 'fe5_l2', title: 'Generic Functions, Constraints & Keyof Operator', duration: '50 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: React Types & Server Component Contracts',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fe5_l3', title: 'Typing Hooks, Events, and Component Props', duration: '55 mins', completed: false },
          { id: 'fe5_l4', title: 'Zod Schema Validation & Inferred API Types', duration: '55 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-6',
    title: 'Tailwind CSS Utility-First Design Systems',
    tagline: 'Create scalable, accessible design systems, dark mode theming, and responsive UI components.',
    category: 'Frontend',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Design Lab',
    instructor: 'Adam Wathan & Steve Schoger',
    duration: '5.0 Hours',
    rating: 4.8,
    reviewsCount: 710,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 300,
    skillsCovered: ['Tailwind CSS', 'Design Systems', 'CSS Tokens', 'Dark Mode'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-6',
    thumbnailGradient: 'from-teal-500/20 via-cyan-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Tailwind CSS Official Docs', url: 'https://tailwindcss.com/docs' },
      youtubeVideo: { title: 'Tailwind CSS Crash Course', url: 'https://www.youtube.com/watch?v=dFgzHOX84xQ' },
      youtubeChannel: { title: 'Tailwind Labs', url: 'https://www.youtube.com/@TailwindLabs' },
      learningPlatform: { title: 'Tailwind Play Sandbox', url: 'https://play.tailwindcss.com/' }
    },
    modules: [
      {
        title: 'Module 1: Utility Classes & Responsive Variants',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fe6_l1', title: 'Color Palettes, Typography & Spacing Scales', duration: '40 mins', completed: false },
          { id: 'fe6_l2', title: 'Building Fluid Cards, Badges & Interactive Buttons', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Config, Custom Tokens & Theming',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fe6_l3', title: 'tailwind.config.js Extensions & CSS Variables', duration: '45 mins', completed: false },
          { id: 'fe6_l4', title: 'Class-based Dark Mode & Backdrop Filters', duration: '45 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-7',
    title: 'Web Performance Optimization & Core Web Vitals',
    tagline: 'Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and bundle sizes.',
    category: 'Frontend',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Performance',
    instructor: 'Addy Osmani & Alex Russell',
    duration: '6.0 Hours',
    rating: 4.9,
    reviewsCount: 460,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['Web Performance', 'Core Web Vitals', 'Code Splitting', 'Lighthouse'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-7',
    thumbnailGradient: 'from-emerald-500/20 via-green-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'web.dev Core Web Vitals Guide', url: 'https://web.dev/vitals/' },
      youtubeVideo: { title: 'Optimizing Web Performance & LCP', url: 'https://www.youtube.com/watch?v=0fONene3OIA' },
      youtubeChannel: { title: 'Google Chrome Developers', url: 'https://www.youtube.com/@ChromeDevs' },
      learningPlatform: { title: 'PageSpeed Insights Tool', url: 'https://pagespeed.web.dev/' }
    },
    modules: [
      {
        title: 'Module 1: Rendering Pipeline & Critical Rendering Path',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fe7_l1', title: 'DOM, CSSOM, Render Tree & Layout Thrashing', duration: '50 mins', completed: false },
          { id: 'fe7_l2', title: 'Image Formats (WebP, AVIF) & Resource Hints', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: JavaScript Bundling & Code Splitting',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fe7_l3', title: 'Dynamic Imports with React.lazy & Suspense', duration: '50 mins', completed: false },
          { id: 'fe7_l4', title: 'Chrome DevTools Performance Profiling & Auditing', duration: '55 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-8',
    title: 'Next.js 14 App Router & Server Component Architecture',
    tagline: 'Master React Server Components (RSC), streaming SSR, Server Actions, and dynamic caching.',
    category: 'Frontend',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Labs',
    instructor: 'Guillermo Rauch & Lee Robinson',
    duration: '7.5 Hours',
    rating: 4.9,
    reviewsCount: 880,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 400,
    skillsCovered: ['Next.js', 'React Server Components', 'Server Actions', 'SSR & Caching'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-8',
    thumbnailGradient: 'from-slate-500/20 via-zinc-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Next.js Official Documentation', url: 'https://nextjs.org/docs' },
      youtubeVideo: { title: 'Next.js 14 App Router Full Course', url: 'https://www.youtube.com/watch?v=wm5gMKuwSYk' },
      youtubeChannel: { title: 'Vercel Official', url: 'https://www.youtube.com/@VercelHQ' },
      learningPlatform: { title: 'Next.js Interactive Learn Lab', url: 'https://nextjs.org/learn' }
    },
    modules: [
      {
        title: 'Module 1: App Router & React Server Components',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fe8_l1', title: 'RSC vs Client Components Boundary Rules', duration: '55 mins', completed: false },
          { id: 'fe8_l2', title: 'Parallel Routes, Intercepting Routes & Layouts', duration: '55 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Data Fetching, Mutations & Deployment',
        duration: '4.0 hrs',
        lessons: [
          { id: 'fe8_l3', title: 'Server Actions with Optimistic UI Updates', duration: '60 mins', completed: false },
          { id: 'fe8_l4', title: 'Fetch Caching, revalidateTag & Static Generation', duration: '60 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-9',
    title: 'State Management with Redux Toolkit & Zustand',
    tagline: 'Scalable client-side store architecture, immutable state updates, middleware, and devtools.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Core',
    instructor: 'Mark Erikson & Daishi Kato',
    duration: '5.5 Hours',
    rating: 4.8,
    reviewsCount: 650,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 300,
    skillsCovered: ['Redux Toolkit', 'Zustand', 'Global State', 'RTK Query'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-9',
    thumbnailGradient: 'from-purple-500/20 via-violet-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Redux Toolkit Documentation', url: 'https://redux-toolkit.js.org/' },
      youtubeVideo: { title: 'Zustand & Redux Toolkit Crash Course', url: 'https://www.youtube.com/watch?v=NqzdVN2tyvQ' },
      youtubeChannel: { title: 'Jack Herrington', url: 'https://www.youtube.com/@jherr' },
      learningPlatform: { title: 'Zustand GitHub Repository Guide', url: 'https://github.com/pmndrs/zustand' }
    },
    modules: [
      {
        title: 'Module 1: Redux Toolkit (RTK) Slices & Dispatch',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fe9_l1', title: 'createSlice, Immer Reducers & Typed Hooks', duration: '45 mins', completed: false },
          { id: 'fe9_l2', title: 'RTK Query for Caching & Automated Polling', duration: '50 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Lightweight State with Zustand',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fe9_l3', title: 'Zustand Stores, Selectors & Middleware Persistence', duration: '45 mins', completed: false },
          { id: 'fe9_l4', title: 'State Architecture Patterns in Production Apps', duration: '50 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fe-10',
    title: 'Frontend Testing: Vitest, React Testing Library & Playwright',
    tagline: 'End-to-end reliability with unit testing, accessibility assertions, component tests, and E2E specs.',
    category: 'Frontend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI QA Lab',
    instructor: 'Kent C. Dodds & Debbie O\'Brien',
    duration: '6.0 Hours',
    rating: 4.9,
    reviewsCount: 520,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['Vitest', 'React Testing Library', 'Playwright', 'End-to-End Testing'],
    targetRole: 'Frontend Developer',
    assessmentId: 'assess-fe-10',
    thumbnailGradient: 'from-pink-500/20 via-rose-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Testing Library Official Docs', url: 'https://testing-library.com/docs/react-testing-library/intro/' },
      youtubeVideo: { title: 'React Component Testing & Vitest Guide', url: 'https://www.youtube.com/watch?v=JBSUgBxAUdQ' },
      youtubeChannel: { title: 'Playwright Official', url: 'https://www.youtube.com/@Playwrightdev' },
      learningPlatform: { title: 'Playwright End-to-End Testing Lab', url: 'https://playwright.dev/' }
    },
    modules: [
      {
        title: 'Module 1: Component Unit & Integration Testing',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fe10_l1', title: 'Testing User Behavior vs Implementation Details', duration: '50 mins', completed: false },
          { id: 'fe10_l2', title: 'Mocking APIs with Mock Service Worker (MSW)', duration: '50 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Browser End-to-End Testing with Playwright',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fe10_l3', title: 'Writing Resilient Locators & Multi-Page Workflows', duration: '50 mins', completed: false },
          { id: 'fe10_l4', title: 'Visual Regression & CI/CD Pipeline Automation', duration: '50 mins', completed: false }
        ]
      }
    ]
  },

  // ==========================================
  // 2. BACKEND DEVELOPER / NODE.JS DEVELOPER
  // ==========================================
  {
    id: 'course-be-1',
    title: 'Node.js Core Runtime, Event Loop & Streams',
    tagline: 'Master non-blocking asynchronous I/O, Buffer manipulation, Stream pipelines, and event loop phases.',
    category: 'Backend',
    difficulty: 'Beginner',
    platform: 'LearnPath AI Backend Track',
    instructor: 'Ryan Dahl & Matteo Collina',
    duration: '6.5 Hours',
    rating: 4.9,
    reviewsCount: 890,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 300,
    skillsCovered: ['Node.js', 'Event Loop', 'Streams & Buffers', 'File System I/O'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-1',
    thumbnailGradient: 'from-emerald-500/20 via-teal-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Node.js API Documentation', url: 'https://nodejs.org/docs/latest/api/' },
      youtubeVideo: { title: 'Node.js Event Loop & Streams Masterclass', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE' },
      youtubeChannel: { title: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia' },
      learningPlatform: { title: 'Node.js Official Interactive Guides', url: 'https://nodejs.org/en/learn' }
    },
    modules: [
      {
        title: 'Module 1: Asynchronous Architecture & Timers',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be1_l1', title: 'Libuv Architecture, Poll, Check & Close Phases', duration: '45 mins', completed: false },
          { id: 'be1_l2', title: 'process.nextTick vs setImmediate Performance', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: High-Volume Streams & Pipeline Piping',
        duration: '3.5 hrs',
        lessons: [
          { id: 'be1_l3', title: 'Readable, Writable, Transform Streams & Backpressure', duration: '50 mins', completed: false },
          { id: 'be1_l4', title: 'Chunked File Parsing with stream.pipeline', duration: '55 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-2',
    title: 'Express.js RESTful API Design & Middleware Engineering',
    tagline: 'Architect modular REST services, rate limiters, validation schemas, and centralized error middleware.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Labs',
    instructor: 'Maximilian Schwarzmuller',
    duration: '7.0 Hours',
    rating: 4.8,
    reviewsCount: 1050,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['Express.js', 'REST APIs', 'Middleware Design', 'Error Handling'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-2',
    thumbnailGradient: 'from-green-500/20 via-emerald-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Express.js Documentation', url: 'https://expressjs.com/' },
      youtubeVideo: { title: 'Express.js API Architecture Guide', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0' },
      youtubeChannel: { title: 'Dave Gray', url: 'https://www.youtube.com/@DaveGrayTeachesCode' },
      learningPlatform: { title: 'Mozilla Express Web Development Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs' }
    },
    modules: [
      {
        title: 'Module 1: Request Pipelines & Custom Middleware',
        duration: '3.5 hrs',
        lessons: [
          { id: 'be2_l1', title: 'Layered Router Architecture & Sub-Routers', duration: '50 mins', completed: false },
          { id: 'be2_l2', title: '4-Argument Error Handlers & Custom AppError Classes', duration: '55 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Validation, CORS & Rate Limiting',
        duration: '3.5 hrs',
        lessons: [
          { id: 'be2_l3', title: 'Joi / Zod Schema Validation Middleware', duration: '50 mins', completed: false },
          { id: 'be2_l4', title: 'Express Rate Limit, Helmet & Security Headers', duration: '50 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-3',
    title: 'MongoDB Schema Design, Indexing & Aggregations',
    tagline: 'Master document modeling, compound indexes, ESR rule, and high-performance aggregation pipelines.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Data Systems',
    instructor: 'Kyle Banker (MongoDB in Action)',
    duration: '7.5 Hours',
    rating: 4.9,
    reviewsCount: 780,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['MongoDB', 'Aggregation Pipeline', 'Compound Indexing', 'Mongoose ODM'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-3',
    thumbnailGradient: 'from-emerald-600/20 via-green-700/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'MongoDB Official Documentation', url: 'https://www.mongodb.com/docs/' },
      youtubeVideo: { title: 'MongoDB Indexing & Aggregations Deep Dive', url: 'https://www.youtube.com/watch?v=ofme2o29ngU' },
      youtubeChannel: { title: 'MongoDB Official', url: 'https://www.youtube.com/@MongoDBofficial' },
      learningPlatform: { title: 'MongoDB University Courses', url: 'https://learn.mongodb.com/' }
    },
    modules: [
      {
        title: 'Module 1: Document Modeling & Relational Embedding',
        duration: '3.5 hrs',
        lessons: [
          { id: 'be3_l1', title: '1-to-N Embedding vs Reference Relationships', duration: '50 mins', completed: false },
          { id: 'be3_l2', title: 'Compound Indexes & ESR Optimization with explain()', duration: '55 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Advanced Aggregation Pipelines',
        duration: '4.0 hrs',
        lessons: [
          { id: 'be3_l3', title: '$match, $group, $project, $lookup Join Pipelines', duration: '60 mins', completed: false },
          { id: 'be3_l4', title: 'ACID Multi-Document Transactions in Replica Sets', duration: '60 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-4',
    title: 'PostgreSQL Relational Design & Advanced SQL Analytics',
    tagline: 'Schema normalization, multi-table joins, subqueries, CTEs, window functions, and indexing.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Architecture',
    instructor: 'Markus Winand (Use The Index, Luke)',
    duration: '8.0 Hours',
    rating: 4.9,
    reviewsCount: 820,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 400,
    skillsCovered: ['PostgreSQL', 'Relational SQL', 'Window Functions', 'Query Optimization'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-4',
    thumbnailGradient: 'from-blue-600/20 via-sky-700/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'PostgreSQL Official Documentation', url: 'https://www.postgresql.org/docs/' },
      youtubeVideo: { title: 'PostgreSQL Advanced Querying & Optimization', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4' },
      youtubeChannel: { title: 'Hussein Nasser', url: 'https://www.youtube.com/@hnasr' },
      learningPlatform: { title: 'PostgreSQL Tutorial Online', url: 'https://www.postgresqltutorial.com/' }
    },
    modules: [
      {
        title: 'Module 1: Relational Schema & Complex Joins',
        duration: '4.0 hrs',
        lessons: [
          { id: 'be4_l1', title: 'Foreign Keys, Constraints & 3NF Normalization', duration: '60 mins', completed: false },
          { id: 'be4_l2', title: 'Inner, Left, Right & Cross Joins with Indexes', duration: '60 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: CTEs, Window Functions & EXPLAIN ANALYZE',
        duration: '4.0 hrs',
        lessons: [
          { id: 'be4_l3', title: 'ROW_NUMBER(), RANK(), DENSE_RANK() & OVER() Partitions', duration: '60 mins', completed: false },
          { id: 'be4_l4', title: 'EXPLAIN ANALYZE: Sequential Scan vs Bitmap Index Scan', duration: '60 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-5',
    title: 'Authentication & Security: JWT, OAuth2, RBAC & Cookies',
    tagline: 'Implement robust identity systems with bcrypt password hashing, refresh tokens, and CSRF protection.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Security Track',
    instructor: 'Troy Hunt & Jim Manico',
    duration: '6.0 Hours',
    rating: 5.0,
    reviewsCount: 970,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['JWT Authentication', 'OAuth 2.0', 'Role-Based Access Control (RBAC)', 'Web Security'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-5',
    thumbnailGradient: 'from-amber-600/20 via-red-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'OWASP Top 10 Security Guidance', url: 'https://owasp.org/www-project-top-ten/' },
      youtubeVideo: { title: 'Authentication Architecture with JWT & HttpOnly Cookies', url: 'https://www.youtube.com/watch?v=mbsmsi7l3r4' },
      youtubeChannel: { title: 'Web Dev Simplified', url: 'https://www.youtube.com/@WebDevSimplified' },
      learningPlatform: { title: 'Auth0 Developer Identity Guides', url: 'https://auth0.com/docs' }
    },
    modules: [
      {
        title: 'Module 1: Tokens, Signing & Secure Storage',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be5_l1', title: 'Access Token vs Refresh Token Rotation Strategy', duration: '45 mins', completed: false },
          { id: 'be5_l2', title: 'HttpOnly, Secure, SameSite Cookie Delivery', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Authorization & OWASP Defenses',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be5_l3', title: 'Role-Based Access Control (RBAC) Middleware Gates', duration: '45 mins', completed: false },
          { id: 'be5_l4', title: 'Mitigating CSRF, SQL Injection & Replay Attacks', duration: '45 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-6',
    title: 'Redis Caching, Pub/Sub & Distributed Rate Limiting',
    tagline: 'Speed up backend read queries by 10x with in-memory caching, TTL keys, and Redis Pub/Sub events.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Infrastructure',
    instructor: 'Salvatore Sanfilippo (Antirez)',
    duration: '5.5 Hours',
    rating: 4.8,
    reviewsCount: 540,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 300,
    skillsCovered: ['Redis', 'In-Memory Caching', 'Pub/Sub', 'Distributed Locks'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-6',
    thumbnailGradient: 'from-red-600/20 via-rose-700/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Redis Official Documentation', url: 'https://redis.io/docs/' },
      youtubeVideo: { title: 'Redis Crash Course & Real-Time Caching', url: 'https://www.youtube.com/watch?v=jgpVdJB2sKQ' },
      youtubeChannel: { title: 'Redis Official', url: 'https://www.youtube.com/@Redisinc' },
      learningPlatform: { title: 'Redis University Free Training', url: 'https://university.redis.com/' }
    },
    modules: [
      {
        title: 'Module 1: Key-Value Caching & Invalidation',
        duration: '2.5 hrs',
        lessons: [
          { id: 'be6_l1', title: 'Cache-Aside Pattern, TTLs & Stale-While-Revalidate', duration: '40 mins', completed: false },
          { id: 'be6_l2', title: 'Redis Hashes, Sets & Sorted Sets for Leaderboards', duration: '40 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Pub/Sub & Distributed Primitives',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be6_l3', title: 'Real-Time Event Broadcasting with Redis Pub/Sub', duration: '45 mins', completed: false },
          { id: 'be6_l4', title: 'Distributed Rate Limiting with Sliding Window Algorithm', duration: '45 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-7',
    title: 'Microservices Architecture & Event-Driven Systems',
    tagline: 'Decompose monoliths into distributed microservices with Kafka, RabbitMQ, and API Gateways.',
    category: 'Backend',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Architecture Track',
    instructor: 'Sam Newman (Building Microservices)',
    duration: '8.5 Hours',
    rating: 4.9,
    reviewsCount: 680,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 450,
    skillsCovered: ['Microservices', 'Event-Driven Architecture', 'RabbitMQ', 'API Gateway'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-7',
    thumbnailGradient: 'from-indigo-600/20 via-purple-700/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Microservices.io Architecture Patterns', url: 'https://microservices.io/' },
      youtubeVideo: { title: 'Microservices Design Patterns & Architecture', url: 'https://www.youtube.com/watch?v=1xo-0gCVhTU' },
      youtubeChannel: { title: 'InfoQ Software Architecture', url: 'https://www.youtube.com/@InfoQ' },
      learningPlatform: { title: 'Martin Fowler Microservices Guide', url: 'https://martinfowler.com/articles/microservices.html' }
    },
    modules: [
      {
        title: 'Module 1: Service Decomposition & Boundaries',
        duration: '4.0 hrs',
        lessons: [
          { id: 'be7_l1', title: 'Domain-Driven Design (DDD) & Bounded Contexts', duration: '60 mins', completed: false },
          { id: 'be7_l2', title: 'API Gateway Routing, Authentication & Aggregation', duration: '60 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Asynchronous Messaging & Saga Pattern',
        duration: '4.5 hrs',
        lessons: [
          { id: 'be7_l3', title: 'RabbitMQ Message Queues & Dead Letter Exchanges', duration: '65 mins', completed: false },
          { id: 'be7_l4', title: 'Saga Pattern for Distributed Transaction Consistency', duration: '70 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-8',
    title: 'GraphQL API Engineering with Apollo Server & Node',
    tagline: 'Design schema-driven GraphQL APIs, custom resolvers, DataLoader batching, and subscriptions.',
    category: 'Backend',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Labs',
    instructor: 'Eve Porcello & Alex Banks',
    duration: '6.0 Hours',
    rating: 4.8,
    reviewsCount: 490,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['GraphQL', 'Apollo Server', 'Resolvers', 'DataLoader'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-8',
    thumbnailGradient: 'from-pink-600/20 via-purple-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'GraphQL Official Documentation', url: 'https://graphql.org/learn/' },
      youtubeVideo: { title: 'GraphQL Full Course with Apollo Server', url: 'https://www.youtube.com/watch?v=ed8SzALpx1Q' },
      youtubeChannel: { title: 'Apollo GraphQL', url: 'https://www.youtube.com/@ApolloGraphQL' },
      learningPlatform: { title: 'Apollo Odyssey Interactive Tutorials', url: 'https://www.apollographql.com/tutorials/' }
    },
    modules: [
      {
        title: 'Module 1: Schemas, Types & Query Resolvers',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be8_l1', title: 'Schema Definition Language (SDL) & Custom Scalars', duration: '45 mins', completed: false },
          { id: 'be8_l2', title: 'Nested Resolvers & Context Authentication', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Mutations, DataLoader & Real-Time',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be8_l3', title: 'DataLoader to Solve N+1 Query Bottleneck', duration: '50 mins', completed: false },
          { id: 'be8_l4', title: 'WebSocket Subscriptions for Live Client Feeds', duration: '50 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-9',
    title: 'Docker Containerization for Node.js & Databases',
    tagline: 'Multi-stage Dockerfiles, non-root container security, docker-compose local clusters, and networks.',
    category: 'Backend',
    difficulty: 'Beginner',
    platform: 'LearnPath AI DevOps Track',
    instructor: 'Bret Fisher (Docker Captain)',
    duration: '5.5 Hours',
    rating: 4.9,
    reviewsCount: 810,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 300,
    skillsCovered: ['Docker', 'Containers', 'Docker Compose', 'Multi-Stage Builds'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-9',
    thumbnailGradient: 'from-sky-500/20 via-blue-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Docker Official Documentation', url: 'https://docs.docker.com/' },
      youtubeVideo: { title: 'Docker Full Course for Web Developers', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo' },
      youtubeChannel: { title: 'NetworkChuck', url: 'https://www.youtube.com/@NetworkChuck' },
      learningPlatform: { title: 'Docker Curriculum by Prakhar Srivastav', url: 'https://docker-curriculum.com/' }
    },
    modules: [
      {
        title: 'Module 1: Images, Layers & Multi-Stage Builds',
        duration: '2.5 hrs',
        lessons: [
          { id: 'be9_l1', title: 'Writing Minimalist Production Dockerfiles', duration: '40 mins', completed: false },
          { id: 'be9_l2', title: 'Layer Caching & Multi-Stage Node.js Artifacts', duration: '40 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Orchestrating Services with Compose',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be9_l3', title: 'Docker Compose for Node, MongoDB & Redis', duration: '45 mins', completed: false },
          { id: 'be9_l4', title: 'Named Volumes, Bind Mounts & Health Checks', duration: '45 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-be-10',
    title: 'Backend Systems Performance, Profiling & CI/CD',
    tagline: 'Node.js memory leak detection, heap snapshots, clinic.js profiling, and GitHub Actions pipelines.',
    category: 'Backend',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Advanced Track',
    instructor: 'Brendan Gregg & Liz Rice',
    duration: '6.5 Hours',
    rating: 4.9,
    reviewsCount: 420,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 400,
    skillsCovered: ['System Performance', 'Memory Profiling', 'CI/CD Pipelines', 'Load Testing'],
    targetRole: 'Backend Developer',
    assessmentId: 'assess-be-10',
    thumbnailGradient: 'from-orange-600/20 via-amber-700/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Node.js Diagnostic & Profiling Guide', url: 'https://nodejs.org/en/docs/guides/diagnostics-flamegraph/' },
      youtubeVideo: { title: 'Debugging Node.js Memory Leaks & Event Loop Latency', url: 'https://www.youtube.com/watch?v=J32jG46Vp5I' },
      youtubeChannel: { title: 'Google Cloud Tech', url: 'https://www.youtube.com/@googlecloudtech' },
      learningPlatform: { title: 'Clinic.js Diagnostic Tool Suite', url: 'https://clinicjs.org/' }
    },
    modules: [
      {
        title: 'Module 1: Memory Profiling & Flamegraphs',
        duration: '3.0 hrs',
        lessons: [
          { id: 'be10_l1', title: 'Heap Snapshot Analysis with Chrome DevTools & Node', duration: '50 mins', completed: false },
          { id: 'be10_l2', title: '0x Flamegraphs for CPU Bottleneck Inspection', duration: '50 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Load Testing & CI/CD Deployment',
        duration: '3.5 hrs',
        lessons: [
          { id: 'be10_l3', title: 'Stress Testing Endpoints with Autocannon & k6', duration: '55 mins', completed: false },
          { id: 'be10_l4', title: 'GitHub Actions Automated Testing & Production Deploys', duration: '55 mins', completed: false }
        ]
      }
    ]
  },

  // ==========================================
  // 3. FULL STACK / MERN STACK DEVELOPER
  // ==========================================
  {
    id: 'course-fs-1',
    title: 'Full Stack MERN Architecture & End-to-End Integration',
    tagline: 'Bridge React frontend with Express/Node backend, MongoDB data tier, and JWT auth flow.',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Academy',
    instructor: 'Brad Traversy & Andrew Mead',
    duration: '8.5 Hours',
    rating: 4.9,
    reviewsCount: 1250,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 400,
    skillsCovered: ['MERN Stack', 'React.js', 'Node.js', 'MongoDB'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-1',
    thumbnailGradient: 'from-coral-500/20 via-red-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'MERN Stack Developer Guide', url: 'https://www.mongodb.com/mern-stack' },
      youtubeVideo: { title: 'Full Stack MERN Application Tutorial', url: 'https://www.youtube.com/watch?v=-0exw-9YJBo' },
      youtubeChannel: { title: 'Traversy Media', url: 'https://www.youtube.com/@TraversyMedia' },
      learningPlatform: { title: 'fullstackopen.com University Course', url: 'https://fullstackopen.com/en/' }
    },
    modules: [
      {
        title: 'Module 1: Full-Stack Project Setup & Data Flow',
        duration: '4.0 hrs',
        lessons: [
          { id: 'fs1_l1', title: 'Monorepo Structure vs Decoupled Client-Server', duration: '60 mins', completed: false },
          { id: 'fs1_l2', title: 'Axios Interceptors & Automated JWT Token Hydration', duration: '60 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Complete CRUD & Production Polish',
        duration: '4.5 hrs',
        lessons: [
          { id: 'fs1_l3', title: 'Optimistic UI Updates & Error Boundary Rollback', duration: '65 mins', completed: false },
          { id: 'fs1_l4', title: 'Deploying MERN Apps to Vercel and Railway', duration: '65 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-2',
    title: 'Full Stack Real-Time Apps with WebSockets & Socket.IO',
    tagline: 'Build live chat, notification pipelines, collaborative canvas, and presence indicators.',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Labs',
    instructor: 'Guillermo Rauch (Socket.IO Creator)',
    duration: '6.5 Hours',
    rating: 4.8,
    reviewsCount: 710,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['WebSockets', 'Socket.IO', 'Real-Time Systems', 'Event Broadcasting'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-2',
    thumbnailGradient: 'from-amber-500/20 via-orange-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Socket.IO Official Documentation', url: 'https://socket.io/docs/v4/' },
      youtubeVideo: { title: 'Real-Time Apps with Socket.IO & React', url: 'https://www.youtube.com/watch?v=djMy4qsPWiI' },
      youtubeChannel: { title: 'Web Dev Simplified', url: 'https://www.youtube.com/@WebDevSimplified' },
      learningPlatform: { title: 'MDN WebSockets API Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API' }
    },
    modules: [
      {
        title: 'Module 1: WebSocket Protocol & Handshakes',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fs2_l1', title: 'HTTP Upgrade Handshake & Bi-directional Frames', duration: '45 mins', completed: false },
          { id: 'fs2_l2', title: 'Socket.IO Rooms, Namespaces & Client Hooks', duration: '50 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Resilient Real-Time Infrastructure',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fs2_l3', title: 'Scaling Socket.IO with Redis Adapter', duration: '50 mins', completed: false },
          { id: 'fs2_l4', title: 'Disconnection Recovery & Missed Event Queues', duration: '50 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-3',
    title: 'Full Stack TypeScript: Shared Contracts & Monorepos',
    tagline: 'Share types across frontend and backend using Turborepo, tRPC, Zod, and npm workspaces.',
    category: 'Full Stack',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Advanced',
    instructor: 'Alex Johansson (tRPC Creator)',
    duration: '7.0 Hours',
    rating: 4.9,
    reviewsCount: 560,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 400,
    skillsCovered: ['tRPC', 'Turborepo', 'Shared Types', 'Monorepos'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-3',
    thumbnailGradient: 'from-blue-500/20 via-indigo-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'tRPC Official Documentation', url: 'https://trpc.io/docs' },
      youtubeVideo: { title: 'Type-Safe Full Stack with tRPC & Next.js', url: 'https://www.youtube.com/watch?v=2LYM8gf184U' },
      youtubeChannel: { title: 'Theo - t3.gg', url: 'https://www.youtube.com/@t3dotgg' },
      learningPlatform: { title: 'Turborepo Handbook', url: 'https://turbo.build/repo/docs' }
    },
    modules: [
      {
        title: 'Module 1: Monorepos & Workspace Configuration',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fs3_l1', title: 'Turborepo Pipeline Caching & Shared Packages', duration: '50 mins', completed: false },
          { id: 'fs3_l2', title: 'Shared Zod Validation Contracts Across Tiers', duration: '55 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: End-to-End Type Safety with tRPC',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fs3_l3', title: 'tRPC Routers, Query Hooks & Mutation Invalidation', duration: '55 mins', completed: false },
          { id: 'fs3_l4', title: 'Server-Side Rendering & Prefetching with tRPC', duration: '55 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-4',
    title: 'Cloud Deployment: AWS, Serverless & Edge Computing',
    tagline: 'Deploy full-stack architectures using AWS Lambda, S3, CloudFront CDN, and Edge functions.',
    category: 'Full Stack',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Cloud Lab',
    instructor: 'Kelsey Hightower & Yan Cui',
    duration: '7.5 Hours',
    rating: 4.9,
    reviewsCount: 630,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 400,
    skillsCovered: ['AWS Cloud', 'Serverless Functions', 'S3 & CDN', 'Edge Computing'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-4',
    thumbnailGradient: 'from-amber-600/20 via-orange-700/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'AWS Serverless Architecture Documentation', url: 'https://aws.amazon.com/serverless/' },
      youtubeVideo: { title: 'Deploying Full Stack Apps to AWS Serverless', url: 'https://www.youtube.com/watch?v=71wfZiWjIvg' },
      youtubeChannel: { title: 'Serverless Official', url: 'https://www.youtube.com/@ServerlessInc' },
      learningPlatform: { title: 'AWS Free Skill Builder', url: 'https://explore.skillbuilder.aws/' }
    },
    modules: [
      {
        title: 'Module 1: Serverless Functions & Static Assets',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fs4_l1', title: 'AWS Lambda Cold Starts & API Gateway Proxies', duration: '50 mins', completed: false },
          { id: 'fs4_l2', title: 'S3 Buckets & CloudFront Global CDN Caching', duration: '50 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Serverless Databases & Edge Middleware',
        duration: '4.0 hrs',
        lessons: [
          { id: 'fs4_l3', title: 'Connecting to MongoDB Atlas & Neon Postgres via Serverless Poolers', duration: '60 mins', completed: false },
          { id: 'fs4_l4', title: 'Edge Routing & Geographic Content Personalization', duration: '60 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-5',
    title: 'Full Stack Testing: Cypress, Vitest & Supertest',
    tagline: 'Automate unit tests, API integration tests, and Cypress end-to-end browser user flows.',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI QA Track',
    instructor: 'Gleb Bahmutov (Cypress Core)',
    duration: '6.0 Hours',
    rating: 4.8,
    reviewsCount: 510,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['Cypress', 'Supertest', 'Integration Testing', 'E2E Automation'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-5',
    thumbnailGradient: 'from-emerald-500/20 via-teal-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Cypress Official Documentation', url: 'https://docs.cypress.io/' },
      youtubeVideo: { title: 'Full Stack Testing with Cypress & Supertest', url: 'https://www.youtube.com/watch?v=u8vMu78SjM8' },
      youtubeChannel: { title: 'Cypress.io', url: 'https://www.youtube.com/@Cypress_io' },
      learningPlatform: { title: 'Learn Cypress Real World App', url: 'https://learn.cypress.io/' }
    },
    modules: [
      {
        title: 'Module 1: Backend API Integration with Supertest',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fs5_l1', title: 'Testing Express Endpoints with In-Memory MongoDB', duration: '45 mins', completed: false },
          { id: 'fs5_l2', title: 'Authentication Token Fixtures in API Tests', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Frontend E2E Testing with Cypress',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fs5_l3', title: 'Testing User Sign-in, Navigation & Form Validation', duration: '45 mins', completed: false },
          { id: 'fs5_l4', title: 'Intercepting Network Requests & Mocking States', duration: '45 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-6',
    title: 'Full Stack Payment Integration: Stripe & Webhooks',
    tagline: 'Implement Stripe Checkout, subscription billing, customer portals, and webhook event handlers.',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Labs',
    instructor: 'CJ Hass (Stripe Developer Advocate)',
    duration: '5.5 Hours',
    rating: 4.9,
    reviewsCount: 670,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['Stripe API', 'Webhooks', 'Subscription Billing', 'Payment Security'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-6',
    thumbnailGradient: 'from-violet-500/20 via-purple-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Stripe Official Developer Documentation', url: 'https://stripe.com/docs' },
      youtubeVideo: { title: 'Stripe Integration Crash Course with React & Node', url: 'https://www.youtube.com/watch?v=1r-F3FIONl8' },
      youtubeChannel: { title: 'Stripe Developers', url: 'https://www.youtube.com/@StripeDevelopers' },
      learningPlatform: { title: 'Stripe Samples Repository', url: 'https://github.com/stripe-samples' }
    },
    modules: [
      {
        title: 'Module 1: Stripe Checkout & Payment Intents',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fs6_l1', title: 'Creating Secure Payment Intents & Elements', duration: '40 mins', completed: false },
          { id: 'fs6_l2', title: 'Subscription Billing Schedules & Invoices', duration: '40 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Webhooks & Asynchronous Event Processing',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fs6_l3', title: 'Verifying Webhook Signatures with Stripe CLI', duration: '45 mins', completed: false },
          { id: 'fs6_l4', title: 'Idempotent Database Updates on payment_intent.succeeded', duration: '45 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-7',
    title: 'Full Stack Search Systems: Elasticsearch & Algolia',
    tagline: 'Implement fuzzy search, autocomplete, faceted filtering, and full-text index synchronization.',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Systems',
    instructor: 'Clinton Gormley (Elasticsearch Guide)',
    duration: '5.0 Hours',
    rating: 4.8,
    reviewsCount: 430,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 300,
    skillsCovered: ['Elasticsearch', 'Full-Text Search', 'Faceted Filtering', 'Algolia'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-7',
    thumbnailGradient: 'from-amber-500/20 via-yellow-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Elasticsearch Official Documentation', url: 'https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html' },
      youtubeVideo: { title: 'Building Full Text Search with Node & Elasticsearch', url: 'https://www.youtube.com/watch?v=0wIvhU9uPzU' },
      youtubeChannel: { title: 'Elastic Community', url: 'https://www.youtube.com/@ElasticCommunity' },
      learningPlatform: { title: 'Algolia Interactive Academy', url: 'https://www.algolia.com/doc/' }
    },
    modules: [
      {
        title: 'Module 1: Inverted Index & Full-Text Queries',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fs7_l1', title: 'Tokenizers, Analyzers & Fuzzy Match Scoring', duration: '40 mins', completed: false },
          { id: 'fs7_l2', title: 'Syncing MongoDB Change Streams to Search Index', duration: '40 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Frontend Autocomplete & Faceted UI',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fs7_l3', title: 'Debounced Instant Search Hook in React', duration: '40 mins', completed: false },
          { id: 'fs7_l4', title: 'Multi-Filter Facet Chips & Pagination', duration: '40 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-8',
    title: 'Full Stack Performance: SSR, ISR & Redis Edge Layers',
    tagline: 'Architect high-traffic web applications with Incremental Static Regeneration and Redis caching.',
    category: 'Full Stack',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Architecture',
    instructor: 'Malte Ubl (Vercel CTO)',
    duration: '6.5 Hours',
    rating: 4.9,
    reviewsCount: 520,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['SSR & ISR', 'Edge Caching', 'Hydration Optimization', 'CDN Routing'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-8',
    thumbnailGradient: 'from-blue-600/20 via-cyan-700/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'Next.js Rendering Fundamentals', url: 'https://nextjs.org/docs/app/building-your-application/rendering' },
      youtubeVideo: { title: 'SSR vs SSG vs ISR Explained with Benchmarks', url: 'https://www.youtube.com/watch?v=d5x0JCbA8eE' },
      youtubeChannel: { title: 'Vercel HQ', url: 'https://www.youtube.com/@VercelHQ' },
      learningPlatform: { title: 'Patterns.dev Modern Web Architecture', url: 'https://www.patterns.dev/' }
    },
    modules: [
      {
        title: 'Module 1: Rendering Strategies Compared',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fs8_l1', title: 'Static Site Generation vs Dynamic Server Rendering', duration: '45 mins', completed: false },
          { id: 'fs8_l2', title: 'On-Demand ISR Revalidation with Webhooks', duration: '45 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Edge CDN Caching & Hydration Bottlenecks',
        duration: '3.5 hrs',
        lessons: [
          { id: 'fs8_l3', title: 'Stale-While-Revalidate Headers on Edge Networks', duration: '50 mins', completed: false },
          { id: 'fs8_l4', title: 'Eliminating React Hydration Mismatches & Jitter', duration: '50 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-9',
    title: 'Full Stack Security: OWASP Top 10 & Penetration Testing',
    tagline: 'Audit vulnerabilities, defend against CSRF/XSS, secure headers, sanitize inputs, and audit npm packages.',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    platform: 'LearnPath AI Security Academy',
    instructor: 'Tanya Janca (SheHacksPurple)',
    duration: '5.5 Hours',
    rating: 4.9,
    reviewsCount: 680,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 350,
    skillsCovered: ['Web Security', 'OWASP Top 10', 'Penetration Testing', 'Content Security Policy'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-9',
    thumbnailGradient: 'from-red-600/20 via-orange-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'OWASP Application Security Verification Standard', url: 'https://owasp.org/www-project-application-security-verification-standard/' },
      youtubeVideo: { title: 'Full Stack Web Security & Vulnerability Auditing', url: 'https://www.youtube.com/watch?v=2_lwsM8ySNo' },
      youtubeChannel: { title: 'Snyk Security', url: 'https://www.youtube.com/@SnykSec' },
      learningPlatform: { title: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security' }
    },
    modules: [
      {
        title: 'Module 1: Injection & Broken Access Controls',
        duration: '2.5 hrs',
        lessons: [
          { id: 'fs9_l1', title: 'NoSQL Injection & Parameter Pollution Exploits', duration: '40 mins', completed: false },
          { id: 'fs9_l2', title: 'Insecure Direct Object References (IDOR) Defenses', duration: '40 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Client-Side Security & CSP Headers',
        duration: '3.0 hrs',
        lessons: [
          { id: 'fs9_l3', title: 'Content Security Policy (CSP) Directives & Nonces', duration: '45 mins', completed: false },
          { id: 'fs9_l4', title: 'Automated Dependency Vulnerability Scanning with Snyk', duration: '45 mins', completed: false }
        ]
      }
    ]
  },
  {
    id: 'course-fs-10',
    title: 'Full Stack Capstone: Scalable SaaS Product Engineering',
    tagline: 'Build a production-ready SaaS application with subscriptions, team workspaces, RBAC, and analytics.',
    category: 'Full Stack',
    difficulty: 'Advanced',
    platform: 'LearnPath AI Capstone Track',
    instructor: 'Arvid Kahl & Pieter Levels',
    duration: '9.0 Hours',
    rating: 5.0,
    reviewsCount: 1420,
    enrolled: false,
    progress: 0,
    completedLessons: 0,
    totalLessons: 4,
    xpReward: 500,
    skillsCovered: ['SaaS Engineering', 'Team Multi-Tenancy', 'Product Analytics', 'System Architecture'],
    targetRole: 'Full Stack Developer',
    assessmentId: 'assess-fs-10',
    thumbnailGradient: 'from-emerald-500/20 via-blue-600/10 to-slate-900/30',
    resources: {
      officialDocs: { title: 'SaaS Architecture Patterns & Multi-Tenancy', url: 'https://aws.amazon.com/solutions/saas/' },
      youtubeVideo: { title: 'Building a Full Stack SaaS Application from Scratch', url: 'https://www.youtube.com/watch?v=r8nZbm4Yy-0' },
      youtubeChannel: { title: 'Fireship', url: 'https://www.youtube.com/@Fireship' },
      learningPlatform: { title: 'LearnPath AI Interactive Capstone Sandbox', url: 'https://github.com' }
    },
    modules: [
      {
        title: 'Module 1: Multi-Tenant Architecture & Org Scoping',
        duration: '4.5 hrs',
        lessons: [
          { id: 'fs10_l1', title: 'Workspace Isolation & Role Permissions in MongoDB', duration: '65 mins', completed: false },
          { id: 'fs10_l2', title: 'Invitation Tokens & Member Management Workflows', duration: '65 mins', completed: false }
        ]
      },
      {
        title: 'Module 2: Observability, Metrics & Production Launch',
        duration: '4.5 hrs',
        lessons: [
          { id: 'fs10_l3', title: 'Sentry Error Tracking & PostHog Product Analytics', duration: '65 mins', completed: false },
          { id: 'fs10_l4', title: 'Zero-Downtime Database Migrations & Rollback Plans', duration: '70 mins', completed: false }
        ]
      }
    ]
  }
];

export const INITIAL_ASSESSMENTS = [
  // ==========================================
  // 1. FRONTEND DEVELOPER ASSESSMENTS (1-10)
  // ==========================================
  {
    id: 'assess-fe-1',
    title: 'HTML5 Semantics & Web Accessibility Benchmark',
    category: 'Frontend',
    difficulty: 'Beginner',
    targetRole: 'Frontend Developer',
    skillTested: 'HTML5',
    duration: '12 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'Which HTML5 semantic element is intended to enclose standalone content that can be distributed independently?',
        options: ['<article>', '<section>', '<aside>', '<div>'],
        correctAnswerIndex: 0,
        explanation: '<article> is designed for self-contained compositions like blog posts, news stories, or forum threads.',
        skillSubtopic: 'Semantic HTML'
      },
      {
        question: 'What is the primary accessibility purpose of the ARIA aria-live attribute?',
        options: [
          'It alerts assistive screen readers when dynamic content changes occur without page reload',
          'It forces video media to autoplay',
          'It adds live CSS animations to the page',
          'It connects to a live WebSocket server'
        ],
        correctAnswerIndex: 0,
        explanation: 'aria-live="polite" or "assertive" informs screen readers to announce asynchronous DOM mutations.',
        skillSubtopic: 'Web Accessibility'
      },
      {
        question: 'Why should the alt attribute always be provided on <img> tags?',
        options: [
          'It provides text alternatives for screen readers and displays when image files fail to load',
          'It automatically resizes image pixel dimensions',
          'It encrypts image network traffic',
          'It converts PNG images to WebP'
        ],
        correctAnswerIndex: 0,
        explanation: 'Alt text delivers essential context to visually impaired users and aids search engine crawlers.',
        skillSubtopic: 'Accessibility & SEO'
      },
      {
        question: 'What is the purpose of the <meta name="viewport" content="width=device-width, initial-scale=1.0"> tag?',
        options: [
          'It instructs mobile browsers to render the viewport width matching the device screen width',
          'It disables user zoom on all touch devices',
          'It accelerates CSS parsing by 50%',
          'It converts responsive CSS to absolute pixels'
        ],
        correctAnswerIndex: 0,
        explanation: 'The viewport meta tag establishes the virtual canvas width to match physical hardware pixels for responsive layout.',
        skillSubtopic: 'Responsive Viewport'
      }
    ]
  },
  {
    id: 'assess-fe-2',
    title: 'CSS Flexbox & 2D Grid Architecture Checkpoint',
    category: 'Frontend',
    difficulty: 'Beginner',
    targetRole: 'Frontend Developer',
    skillTested: 'CSS3',
    duration: '12 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'In CSS Grid, what does the expression repeat(auto-fit, minmax(250px, 1fr)) accomplish?',
        options: [
          'It creates a responsive grid of columns that wrap automatically without requiring media queries',
          'It locks grid layout to exactly 4 fixed columns',
          'It forces every image to a maximum 250px width',
          'It animates columns infinitely'
        ],
        correctAnswerIndex: 0,
        explanation: 'auto-fit with minmax collapses and stretches columns dynamically based on available container width.',
        skillSubtopic: 'CSS Grid Auto-Fit'
      },
      {
        question: 'In Flexbox, what is the default value of the align-items property?',
        options: ['stretch', 'center', 'flex-start', 'baseline'],
        correctAnswerIndex: 0,
        explanation: 'stretch is the default align-items value, expanding flex items to fill the container height on the cross-axis.',
        skillSubtopic: 'Flexbox Cross-Axis'
      },
      {
        question: 'What is the difference between CSS flex-basis and width?',
        options: [
          'flex-basis sets initial size along the flex main-axis before grow/shrink factors are calculated',
          'flex-basis only applies to vertical column layouts',
          'width overrides flex-basis under all conditions',
          'There is no functional distinction'
        ],
        correctAnswerIndex: 0,
        explanation: 'flex-basis dictates the starting dimensional budget along the flex direction before distributing free space.',
        skillSubtopic: 'Flexbox Sizing'
      },
      {
        question: 'What is the purpose of the CSS subgrid keyword in grid-template-columns?',
        options: [
          'It inherits track sizing from the parent grid container for aligned nested layouts',
          'It turns a grid item into an SVG element',
          'It compiles CSS to SCSS',
          'It removes all grid gaps'
        ],
        correctAnswerIndex: 0,
        explanation: 'subgrid allows nested children to participate directly in the parent grid definition for seamless alignment.',
        skillSubtopic: 'CSS Subgrid'
      }
    ]
  },
  {
    id: 'assess-fe-3',
    title: 'Modern JavaScript ES6+, Closures & Event Loop',
    category: 'Frontend',
    difficulty: 'Intermediate',
    targetRole: 'Frontend Developer',
    skillTested: 'JavaScript ES6+',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A function combined with references to its surrounding lexical environment',
          'A function that immediately terminates the Node process',
          'A syntax error caused by missing curly braces',
          'A synchronous while loop'
        ],
        correctAnswerIndex: 0,
        explanation: 'Closures allow an inner function to access variables from its outer scope even after the outer function finishes execution.',
        skillSubtopic: 'Lexical Scope & Closures'
      },
      {
        question: 'What is the execution priority difference between microtasks (Promises) and macrotasks (setTimeout) in V8?',
        options: [
          'The microtask queue is completely drained immediately after the current call stack before processing the next macrotask',
          'setTimeout callbacks always execute before resolved Promises',
          'Microtasks only execute when WebWorkers are active',
          'Both queues execute in parallel threads'
        ],
        correctAnswerIndex: 0,
        explanation: 'Microtasks (Promises, MutationObserver) have higher priority and exhaust their queue before macrotasks (setTimeout, setInterval).',
        skillSubtopic: 'Event Loop & Concurrency'
      },
      {
        question: 'How does Object.freeze() differ from Object.seal()?',
        options: [
          'freeze prevents adding, deleting, and modifying properties; seal prevents adding and deleting but allows modifying existing values',
          'freeze is shallow while seal is always deep recursive',
          'seal prevents all reads while freeze allows reads',
          'There is no difference in JavaScript'
        ],
        correctAnswerIndex: 0,
        explanation: 'Object.seal makes existing properties non-configurable but leaves writable properties modifiable; Object.freeze makes properties read-only.',
        skillSubtopic: 'Object Immutability'
      },
      {
        question: 'What is the key advantage of using Promise.allSettled() over Promise.all()?',
        options: [
          'allSettled waits for all promises to resolve or reject without early termination upon the first rejection',
          'allSettled executes promises in strict sequential order',
          'allSettled runs exclusively on the server',
          'allSettled automatically retries failed network calls 3 times'
        ],
        correctAnswerIndex: 0,
        explanation: 'Promise.all fails fast on the first rejection, whereas Promise.allSettled returns outcomes for all promises regardless of failure.',
        skillSubtopic: 'Async Promises'
      }
    ]
  },
  {
    id: 'assess-fe-4',
    title: 'React 18 Architecture, Custom Hooks & Re-renders',
    category: 'Frontend',
    difficulty: 'Intermediate',
    targetRole: 'Frontend Developer',
    skillTested: 'React.js',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'Why must state in React be treated as immutable rather than modified directly?',
        options: [
          'React relies on shallow object reference equality (Object.is) to detect changes and schedule re-renders',
          'Direct mutations crash the browser JavaScript engine',
          'Immutability is only required in TypeScript projects',
          'State mutations bypass HTML validation'
        ],
        correctAnswerIndex: 0,
        explanation: 'React compares previous and next state references; direct mutation does not generate a new memory pointer, skipping re-renders.',
        skillSubtopic: 'React Immutability'
      },
      {
        question: 'When should useCallback be applied in a React component?',
        options: [
          'When passing callback functions to memoized child components (React.memo) to prevent unnecessary child re-renders',
          'Inside every single onClick handler without exception',
          'To replace the useState hook',
          'To make asynchronous fetch calls faster'
        ],
        correctAnswerIndex: 0,
        explanation: 'useCallback caches function references between renders, preventing memoized children from re-rendering due to new function instances.',
        skillSubtopic: 'Hooks Optimization'
      },
      {
        question: 'What is the purpose of the key prop when rendering arrays in React JSX?',
        options: [
          'It provides a stable identity for React Fiber reconciliation to accurately track, reorder, or remove DOM nodes',
          'It applies custom CSS styling to list items',
          'It automatically sorts items alphabetically',
          'It acts as an encryption key for local storage'
        ],
        correctAnswerIndex: 0,
        explanation: 'Keys allow React to differentiate elements in a collection to avoid expensive re-creation of unchanged DOM nodes.',
        skillSubtopic: 'Fiber Reconciliation'
      },
      {
        question: 'What happens if you update state inside a useEffect without specifying dependencies?',
        options: [
          'It triggers an infinite re-render loop',
          'The state update is permanently ignored',
          'React converts the component to a class component',
          'The effect only executes on initial mount'
        ],
        correctAnswerIndex: 0,
        explanation: 'Without a dependency array, useEffect executes after every render, triggering state updates that provoke another render indefinitely.',
        skillSubtopic: 'Effect Lifecycles'
      }
    ]
  },
  {
    id: 'assess-fe-5',
    title: 'TypeScript Type Systems & React Generics Benchmark',
    category: 'Frontend',
    difficulty: 'Intermediate',
    targetRole: 'Frontend Developer',
    skillTested: 'TypeScript',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is a Discriminated Union in TypeScript?',
        options: [
          'A union of object types that share a common literal discriminant property for safe type narrowing',
          'A union of number and string types',
          'A deprecated TypeScript keyword',
          'An SQL join operation'
        ],
        correctAnswerIndex: 0,
        explanation: 'Discriminated unions enable exhaustive pattern matching by evaluating a shared tag property (e.g. status: "success" | "error").',
        skillSubtopic: 'Type Narrowing'
      },
      {
        question: 'How does the unknown type differ from the any type in TypeScript?',
        options: [
          'unknown is type-safe: operations on it require explicit type checking or casting; any turns off all type checking',
          'unknown can only store string values',
          'any throws compile-time errors on variable assignment',
          'There is no distinction in strict mode'
        ],
        correctAnswerIndex: 0,
        explanation: 'unknown enforces defensive coding because the compiler forbids calling methods on unknown variables without narrowing.',
        skillSubtopic: 'Strict Type Safety'
      },
      {
        question: 'What does the Record<K, T> utility type produce in TypeScript?',
        options: [
          'An object type whose property keys are of type K and property values are of type T',
          'An array of tuple elements',
          'A database table schema',
          'A read-only frozen class'
        ],
        correctAnswerIndex: 0,
        explanation: 'Record<Keys, Type> constructs a clean typed dictionary mapping specified keys to uniform value types.',
        skillSubtopic: 'Utility Types'
      },
      {
        question: 'What is the purpose of React.PropsWithChildren<P> in TypeScript?',
        options: [
          'It augments a custom prop interface P with an optional children?: React.ReactNode property',
          'It forces child components to be class components',
          'It validates HTML attributes at runtime',
          'It creates a nested Redux store'
        ],
        correctAnswerIndex: 0,
        explanation: 'PropsWithChildren adds typed children support cleanly to standard functional component prop definitions.',
        skillSubtopic: 'React TS Interfaces'
      }
    ]
  },
  {
    id: 'assess-fe-6',
    title: 'Tailwind CSS, Utility Tokens & Theming Checkpoint',
    category: 'Frontend',
    difficulty: 'Beginner',
    targetRole: 'Frontend Developer',
    skillTested: 'Tailwind CSS',
    duration: '12 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'In Tailwind CSS, how does the dark: variant activate dark mode styles when darkMode is configured as "class"?',
        options: [
          'It applies styles whenever a parent ancestor element (usually <html> or <body>) possesses the "dark" class',
          'It checks the user OS battery level',
          'It only runs at nighttime based on system clock',
          'It requires an external jQuery script'
        ],
        correctAnswerIndex: 0,
        explanation: 'Class-based dark mode toggles via class="dark" on the root document element, enabling programmatic theme switches.',
        skillSubtopic: 'Tailwind Dark Mode'
      },
      {
        question: 'What is the advantage of using Tailwind CSS JIT (Just-In-Time) compiler engine?',
        options: [
          'It generates styles on-demand for lightning-fast build times and negligible production bundle sizes (under 10KB)',
          'It automatically translates code to React Native',
          'It eliminates the need for HTML markup',
          'It compiles CSS directly into WebAssembly'
        ],
        correctAnswerIndex: 0,
        explanation: 'The JIT compiler scans source files and emits CSS rules only for classes actually used in your codebase.',
        skillSubtopic: 'JIT Compilation'
      },
      {
        question: 'What does the Tailwind arbitrary value syntax w-[350px] represent?',
        options: [
          'An exact 350px width rule generated on-demand without customizing the global theme configuration',
          'An array of 350 elements',
          'A deprecated syntax in Tailwind v3',
          'A relative percentage width'
        ],
        correctAnswerIndex: 0,
        explanation: 'Square bracket notation enables one-off custom property values seamlessly within standard utility class workflows.',
        skillSubtopic: 'Arbitrary Value Syntax'
      },
      {
        question: 'How do you customize global color palettes cleanly in Tailwind CSS?',
        options: [
          'Extend the theme.colors object inside tailwind.config.js',
          'Edit node_modules/tailwindcss directly',
          'Write raw inline style attributes in every HTML tag',
          'Include 10 different CSS link tags'
        ],
        correctAnswerIndex: 0,
        explanation: 'Extending theme.colors in tailwind.config.js introduces new semantic design tokens across all utilities.',
        skillSubtopic: 'Design Token Configuration'
      }
    ]
  },
  {
    id: 'assess-fe-7',
    title: 'Core Web Vitals & Web Performance Checkpoint',
    category: 'Frontend',
    difficulty: 'Advanced',
    targetRole: 'Frontend Developer',
    skillTested: 'Web Performance',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What does Largest Contentful Paint (LCP) measure in Google Core Web Vitals?',
        options: [
          'The time it takes for the largest visual content element (hero image, video banner, or text block) to render in the viewport',
          'The total time required to download all JavaScript files',
          'The server database query latency',
          'The duration of CSS animation transitions'
        ],
        correctAnswerIndex: 0,
        explanation: 'LCP measures perceived load speed by timing when main page content is visibly ready for the user (target < 2.5s).',
        skillSubtopic: 'LCP Performance'
      },
      {
        question: 'How does Interaction to Next Paint (INP) differ from the legacy First Input Delay (FID)?',
        options: [
          'INP measures all interaction latencies throughout the entire user session; FID only measured the very first user interaction',
          'INP only measures mobile page scrolls',
          'FID measured server response time; INP measures client CSS',
          'There is no metric difference'
        ],
        correctAnswerIndex: 0,
        explanation: 'INP evaluates total responsiveness by tracking the latency of all click, tap, and key interactions across session lifetime.',
        skillSubtopic: 'INP Metric'
      },
      {
        question: 'Why does Layout Thrashing (forced synchronous layout) severely degrade frontend performance?',
        options: [
          'Interleaving DOM writes and geometric reads forces the browser to recalculate layout repeatedly inside a single frame',
          'It deletes browser cookies',
          'It prevents HTTPS encryption from completing',
          'It forces images to download in black and white'
        ],
        correctAnswerIndex: 0,
        explanation: 'Reading geometric properties (like offsetHeight) immediately after DOM mutations forces synchronous reflows, causing frame drops.',
        skillSubtopic: 'Critical Rendering Path'
      },
      {
        question: 'What is the purpose of the fetchpriority="high" attribute on hero <img> elements?',
        options: [
          'It instructs the browser resource loader to prioritize fetching the image ahead of lower-priority scripts and images',
          'It automatically compresses image resolution',
          'It converts HTTP/1.1 requests to HTTP/2',
          'It pre-renders the image on an edge server'
        ],
        correctAnswerIndex: 0,
        explanation: 'fetchpriority="high" accelerates LCP candidate image downloads by elevating their position in the network priority queue.',
        skillSubtopic: 'Resource Priorities'
      }
    ]
  },
  {
    id: 'assess-fe-8',
    title: 'Next.js App Router & Server Components Diagnostic',
    category: 'Frontend',
    difficulty: 'Advanced',
    targetRole: 'Frontend Developer',
    skillTested: 'Next.js',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the primary architectural advantage of React Server Components (RSC) in Next.js 14?',
        options: [
          'They execute exclusively on the server, sending zero client-side JavaScript bundle for pure static logic',
          'They eliminate the need for databases',
          'They convert all HTML to PDF documents',
          'They allow client onClick handlers without JavaScript'
        ],
        correctAnswerIndex: 0,
        explanation: 'RSC runs on the server and returns rendered HTML and serialized UI trees, reducing client JavaScript download footprint to zero.',
        skillSubtopic: 'React Server Components'
      },
      {
        question: 'When must the "use client" directive be declared at the top of a file in Next.js App Router?',
        options: [
          'Whenever the component utilizes browser APIs, React hooks (useState, useEffect), or event listeners (onClick, onChange)',
          'In every single file in the app directory',
          'Only inside database connection files',
          'When deploying to Vercel'
        ],
        correctAnswerIndex: 0,
        explanation: '"use client" marks the boundary where server-side rendering transitions to interactive client component hydration.',
        skillSubtopic: 'Client Boundaries'
      },
      {
        question: 'How do Next.js Server Actions handle form mutations without dedicated API routes?',
        options: [
          'They define async functions marked with "use server" that execute directly on the server when invoked from client forms',
          'They store data directly in client localStorage',
          'They convert forms to static JSON files',
          'They run via a background WebWorker'
        ],
        correctAnswerIndex: 0,
        explanation: 'Server Actions allow direct RPC invocations from forms with progressive enhancement even when client JS is disabled.',
        skillSubtopic: 'Server Actions'
      },
      {
        question: 'What does revalidatePath("/dashboard") accomplish in Next.js?',
        options: [
          'It purges cached server data for the /dashboard route, triggering fresh data hydration on next request',
          'It redirects the user to the login page',
          'It restarts the production server',
          'It clears browser cookies'
        ],
        correctAnswerIndex: 0,
        explanation: 'revalidatePath invalidates static and ISR route caches, ensuring stale data is refreshed on demand.',
        skillSubtopic: 'Cache Invalidation'
      }
    ]
  },
  {
    id: 'assess-fe-9',
    title: 'Redux Toolkit & Zustand Global State Benchmark',
    category: 'Frontend',
    difficulty: 'Intermediate',
    targetRole: 'Frontend Developer',
    skillTested: 'Redux Toolkit',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'How does Redux Toolkit allow "mutating" state syntax inside createSlice reducers safely?',
        options: [
          'It integrates Immer library under the hood, wrapping draft state in Proxies and producing immutable copies',
          'It converts state to string before mutating',
          'It runs reducers inside a WebAssembly sandbox',
          'It disables Redux immutability checks'
        ],
        correctAnswerIndex: 0,
        explanation: 'Immer intercepts draft mutations and calculates corresponding structural changes to return immutable state objects.',
        skillSubtopic: 'Immer & RTK Slices'
      },
      {
        question: 'What is a core benefit of Zustand over traditional Redux architecture?',
        options: [
          'Minimal boilerplate without Context Providers, reducers, or actions, utilizing clean hook-based stores',
          'Zustand only runs on mobile devices',
          'Zustand stores data exclusively in the cloud',
          'Zustand does not support TypeScript'
        ],
        correctAnswerIndex: 0,
        explanation: 'Zustand creates unopinionated, lightweight stores accessible directly via custom hooks with selective subscription optimization.',
        skillSubtopic: 'Zustand Architecture'
      },
      {
        question: 'What is the purpose of selector functions in Redux and Zustand?',
        options: [
          'They extract specific slices of state so components only re-render when their selected data actually changes',
          'They select which database to query',
          'They pick random colors for the UI',
          'They filter HTML elements by CSS selector'
        ],
        correctAnswerIndex: 0,
        explanation: 'Selectors prevent unnecessary component re-renders by establishing fine-grained subscriptions to exact state properties.',
        skillSubtopic: 'State Selectors'
      },
      {
        question: 'What is the primary function of RTK Query in Redux Toolkit?',
        options: [
          'Automated data fetching, caching, deduplication, and cache invalidation for web APIs',
          'Creating SQL database tables',
          'Compiling CSS animations',
          'Managing user authentication tokens in cookies'
        ],
        correctAnswerIndex: 0,
        explanation: 'RTK Query simplifies asynchronous server-state management with built-in polling, optimistic updates, and cache tags.',
        skillSubtopic: 'RTK Query Caching'
      }
    ]
  },
  {
    id: 'assess-fe-10',
    title: 'Frontend Testing: RTL, Vitest & Playwright Checkpoint',
    category: 'Frontend',
    difficulty: 'Intermediate',
    targetRole: 'Frontend Developer',
    skillTested: 'Vitest',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the guiding philosophy of React Testing Library (RTL)?',
        options: [
          '"The more your tests resemble the way your software is used, the more confidence they can give you."',
          '"Always test internal component state and private methods."',
          '"Only test CSS class names and inline styles."',
          '"Mock all React components into raw strings."'
        ],
        correctAnswerIndex: 0,
        explanation: 'RTL tests user-facing behavior and accessibility landmarks rather than brittle internal implementation details.',
        skillSubtopic: 'Testing Philosophy'
      },
      {
        question: 'Why is getByRole preferred over getByTestId in React Testing Library queries?',
        options: [
          'getByRole queries elements the same way assistive screen readers perceive them, validating accessibility',
          'getByTestId is deprecated in Vitest',
          'getByRole is 100x faster than getByTestId',
          'getByRole only works with buttons'
        ],
        correctAnswerIndex: 0,
        explanation: 'getByRole confirms that elements have proper semantic roles and accessible names for assistive technology.',
        skillSubtopic: 'Accessible Queries'
      },
      {
        question: 'What is the role of Mock Service Worker (MSW) in integration tests?',
        options: [
          'It intercepts network requests at the network level using Service Workers, providing realistic API responses without mocking fetch',
          'It creates mock database servers in production',
          'It writes mock unit tests automatically',
          'It generates fake user passwords'
        ],
        correctAnswerIndex: 0,
        explanation: 'MSW captures HTTP/GraphQL traffic seamlessly, creating identical behavior across Node test runners and live browsers.',
        skillSubtopic: 'Mock Service Worker'
      },
      {
        question: 'In Playwright E2E tests, why are web-first assertions (like await expect(locator).toBeVisible()) preferred over manual sleep/delays?',
        options: [
          'They automatically retry assertions until conditions pass or timeouts elapse, eliminating flakiness from asynchronous rendering',
          'They pause the browser process permanently',
          'They disable JavaScript execution',
          'They run only when the internet is disconnected'
        ],
        correctAnswerIndex: 0,
        explanation: 'Playwright auto-waiting assertions poll the DOM continuously, ensuring stable test execution without arbitrary sleep delays.',
        skillSubtopic: 'Playwright Auto-Waiting'
      }
    ]
  },

  // ==========================================
  // 2. BACKEND DEVELOPER ASSESSMENTS (1-10)
  // ==========================================
  {
    id: 'assess-be-1',
    title: 'Node.js Event Loop, Timers & Streams Checkpoint',
    category: 'Backend',
    difficulty: 'Beginner',
    targetRole: 'Backend Developer',
    skillTested: 'Node.js',
    duration: '12 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'Which phase of the Libuv Event Loop executes callbacks scheduled by setImmediate()?',
        options: ['Check phase', 'Timers phase', 'Poll phase', 'Close callbacks phase'],
        correctAnswerIndex: 0,
        explanation: 'setImmediate callbacks are explicitly designed to execute during the Check phase after the Poll phase completes.',
        skillSubtopic: 'Event Loop Phases'
      },
      {
        question: 'What happens when backpressure occurs in a Node.js stream pipeline?',
        options: [
          'The readable stream pauses reading to avoid filling memory buffers until the writable stream drains',
          'The Node process throws an Out of Memory error',
          'The stream converts data to string',
          'The data is automatically discarded'
        ],
        correctAnswerIndex: 0,
        explanation: 'Backpressure ensures fast producers do not overwhelm slower consumers by throttling the read stream.',
        skillSubtopic: 'Stream Backpressure'
      },
      {
        question: 'Why is process.nextTick() given higher priority than timer callbacks?',
        options: [
          'nextTick queue is processed immediately after the current operation finishes before traversing to the next event loop phase',
          'nextTick is compiled in C++',
          'nextTick uses multi-threading',
          'nextTick is a synchronous system call'
        ],
        correctAnswerIndex: 0,
        explanation: 'nextTick executes at the end of the current tick before any other scheduled timers or I/O events.',
        skillSubtopic: 'Microtask Scheduling'
      },
      {
        question: 'Why should stream.pipeline() be used instead of readable.pipe(writable)?',
        options: [
          'stream.pipeline properly handles errors and closes all streams if any stream in the pipeline fails',
          'pipeline is only for text files',
          'pipe is deprecated in modern Node.js',
          'pipeline compresses data automatically'
        ],
        correctAnswerIndex: 0,
        explanation: 'readable.pipe does not forward errors, leading to dangling open file descriptors; stream.pipeline guarantees cleanup.',
        skillSubtopic: 'Stream Error Handling'
      }
    ]
  },
  {
    id: 'assess-be-2',
    title: 'Express.js RESTful API & Middleware Architecture',
    category: 'Backend',
    difficulty: 'Intermediate',
    targetRole: 'Backend Developer',
    skillTested: 'Express.js',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What special signature tells Express.js that a middleware function is an error-handling middleware?',
        options: ['Exactly 4 parameters: (err, req, res, next)', 'Returning a rejected Promise', 'Using a try-catch block', 'Name starts with "error"'],
        correctAnswerIndex: 0,
        explanation: 'Express inspects function.length to route caught errors specifically to 4-parameter error handlers.',
        skillSubtopic: 'Error Middleware'
      },
      {
        question: 'What HTTP status code should a REST API return when a client attempts to create an entity that already exists (e.g. duplicate email)?',
        options: ['409 Conflict', '400 Bad Request', '404 Not Found', '500 Internal Server Error'],
        correctAnswerIndex: 0,
        explanation: '409 Conflict precisely communicates that the request cannot be processed due to a conflict in the current state of the resource.',
        skillSubtopic: 'HTTP Status Standards'
      },
      {
        question: 'How do you prevent Parameter Pollution attacks in Express.js APIs?',
        options: [
          'Use hpp (HTTP Parameter Pollution) middleware to normalize query arrays to single values',
          'Disable query parameters entirely',
          'Only accept POST requests',
          'Encode all URLs in base64'
        ],
        correctAnswerIndex: 0,
        explanation: 'hpp middleware defends against duplicate parameter injection by taking the last parameter value or rejecting arrays.',
        skillSubtopic: 'API Security'
      },
      {
        question: 'What is the purpose of next() inside Express middleware?',
        options: [
          'It passes execution control to the next matching middleware or route handler in the pipeline stack',
          'It restarts the HTTP server',
          'It redirects the browser to the home page',
          'It commits database transactions'
        ],
        correctAnswerIndex: 0,
        explanation: 'Calling next() triggers the subsequent middleware function in the matched route chain.',
        skillSubtopic: 'Middleware Pipeline'
      }
    ]
  },
  {
    id: 'assess-be-3',
    title: 'MongoDB Indexing, Schema Design & Aggregations',
    category: 'Backend',
    difficulty: 'Intermediate',
    targetRole: 'Backend Developer',
    skillTested: 'MongoDB',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the Equality, Sort, Range (ESR) rule for compound index creation in MongoDB?',
        options: [
          'Index fields tested for exact equality first, fields used for sorting second, and range filter fields last',
          'Sort first, Range second, Equality third',
          'Range first, Equality second, Sort third',
          'All fields are evaluated alphabetically'
        ],
        correctAnswerIndex: 0,
        explanation: 'ESR maximizes query efficiency by filtering exact keys, avoiding in-memory sort stages, and scanning minimal range keys.',
        skillSubtopic: 'ESR Index Rule'
      },
      {
        question: 'In MongoDB Aggregation, what does the $lookup stage perform?',
        options: [
          'A left outer join to an unsharded collection in the same database to filter in documents for processing',
          'A full table scan of all collections',
          'A text search across index tags',
          'A database backup operation'
        ],
        correctAnswerIndex: 0,
        explanation: '$lookup performs relational left-outer joins, attaching matched documents from foreign collections into arrays.',
        skillSubtopic: 'Aggregation Pipeline'
      },
      {
        question: 'When should you choose Embedding over Referencing in MongoDB schema design?',
        options: [
          'When child documents are frequently retrieved together with the parent and have a bounded 1-to-few relationship',
          'When child arrays grow infinitely to millions of items',
          'Only when using relational databases',
          'Embedding is deprecated in MongoDB 6.0'
        ],
        correctAnswerIndex: 0,
        explanation: 'Embedding avoids multi-document lookups and provides atomic single-write consistency for tightly bounded data.',
        skillSubtopic: 'Document Modeling'
      },
      {
        question: 'How do you verify if a MongoDB query used an index or performed a full collection scan (COLLSCAN)?',
        options: [
          'Run cursor.explain("executionStats") and inspect totalDocsExamined vs nReturned',
          'Check server RAM usage',
          'Look at document timestamps',
          'Re-install Mongoose'
        ],
        correctAnswerIndex: 0,
        explanation: 'explain("executionStats") details IXSCAN vs COLLSCAN and confirms index effectiveness.',
        skillSubtopic: 'Query Profiling'
      }
    ]
  },
  {
    id: 'assess-be-4',
    title: 'PostgreSQL Relational Design & Window Functions',
    category: 'Backend',
    difficulty: 'Intermediate',
    targetRole: 'Backend Developer',
    skillTested: 'PostgreSQL',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the key difference between ROW_NUMBER() and RANK() window functions in PostgreSQL?',
        options: [
          'ROW_NUMBER() always assigns sequential unique integers; RANK() assigns the same number to tied rows, leaving gaps in rank numbering',
          'ROW_NUMBER() only works with strings; RANK() works with numbers',
          'RANK() requires an index while ROW_NUMBER() does not',
          'There is no difference in Postgres'
        ],
        correctAnswerIndex: 0,
        explanation: 'RANK skips rank values for ties (e.g. 1, 2, 2, 4); ROW_NUMBER assigns distinct arbitrary order for ties (1, 2, 3, 4).',
        skillSubtopic: 'Window Functions'
      },
      {
        question: 'What is a Common Table Expression (CTE) defined with the WITH clause in PostgreSQL?',
        options: [
          'A temporary, named result set that exists only within the execution scope of a single query',
          'A permanent table stored on disk',
          'A stored procedure that encrypts columns',
          'A foreign key constraint'
        ],
        correctAnswerIndex: 0,
        explanation: 'CTEs improve query readability and enable recursive operations like traversing hierarchical organizational trees.',
        skillSubtopic: 'CTEs & Subqueries'
      },
      {
        question: 'What is the ACID isolation level that prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads?',
        options: ['Serializable', 'Read Committed', 'Read Uncommitted', 'Repeatable Read'],
        correctAnswerIndex: 0,
        explanation: 'Serializable isolation guarantees that concurrent transaction execution produces identical results as if executed serially.',
        skillSubtopic: 'ACID Transactions'
      },
      {
        question: 'In PostgreSQL, why is VACUUM executed periodically?',
        options: [
          'To reclaim storage occupied by dead row versions (tuples) generated by UPDATE and DELETE operations',
          'To restart the database service',
          'To format SQL queries with indentation',
          'To delete old user accounts'
        ],
        correctAnswerIndex: 0,
        explanation: 'Postgres MVCC architecture leaves old tuple versions in place; VACUUM cleans dead space to prevent table bloat.',
        skillSubtopic: 'Postgres MVCC & Vacuum'
      }
    ]
  },
  {
    id: 'assess-be-5',
    title: 'Authentication, OAuth2, RBAC & Web Security Checkpoint',
    category: 'Backend',
    difficulty: 'Intermediate',
    targetRole: 'Backend Developer',
    skillTested: 'JWT Authentication',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'Why should sensitive JWT tokens be stored in HttpOnly cookies rather than browser localStorage?',
        options: [
          'HttpOnly cookies are inaccessible to JavaScript, protecting tokens from theft via Cross-Site Scripting (XSS)',
          'LocalStorage is limited to 10 bytes',
          'Cookies make network requests 100x faster',
          'HttpOnly automatically logs users out on tab close'
        ],
        correctAnswerIndex: 0,
        explanation: 'Malicious XSS scripts can read any variable in localStorage, but browser security denies JS access to HttpOnly cookies.',
        skillSubtopic: 'Token Security & XSS'
      },
      {
        question: 'How does password hashing with Bcrypt provide security against rainbow-table attacks?',
        options: [
          'It incorporates unique cryptographically random salt and an adjustable work factor (rounds) to make precomputed tables infeasible',
          'It encrypts passwords with reversible two-way keys',
          'It saves passwords in plain text in an isolated file',
          'It hides passwords using Base64 encoding'
        ],
        correctAnswerIndex: 0,
        explanation: 'Unique salts ensure two identical passwords produce completely different hashes, neutralizing rainbow tables.',
        skillSubtopic: 'Password Hashing'
      },
      {
        question: 'What is the role of an Authorization Code Grant in OAuth 2.0?',
        options: [
          'It exchanges an authorization code on the secure backend server for access tokens without exposing secrets to the browser',
          'It allows clients to access databases directly',
          'It replaces all password logins with SMS codes',
          'It bypasses CORS security policies'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Auth Code flow keeps client secrets securely on the backend server, preventing token leakage in frontend code.',
        skillSubtopic: 'OAuth 2.0 Authorization'
      },
      {
        question: 'What is the difference between Authentication and Authorization?',
        options: [
          'Authentication verifies who you are (identity); Authorization determines what you have permission to do (access rights)',
          'Authentication is done on the frontend; Authorization is done in the database',
          'They are identical terms in security',
          'Authorization must always happen before Authentication'
        ],
        correctAnswerIndex: 0,
        explanation: 'Authentication checks credentials (login), while Authorization checks RBAC permissions for requested actions.',
        skillSubtopic: 'Auth Terminology'
      }
    ]
  },
  {
    id: 'assess-be-6',
    title: 'Redis In-Memory Caching & Distributed Systems',
    category: 'Backend',
    difficulty: 'Intermediate',
    targetRole: 'Backend Developer',
    skillTested: 'Redis',
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
        question: 'What is the Cache-Aside (Lazy Loading) pattern with Redis?',
        options: [
          'Application checks Redis first; on cache miss, it reads from the primary database, writes to Redis with TTL, and returns the data',
          'Application writes all data exclusively to Redis without a persistent database',
          'Redis periodically queries the database on background cron jobs',
          'Application never clears expired cache keys'
        ],
        correctAnswerIndex: 0,
        explanation: 'Cache-aside ensures only requested data is cached, maintaining low memory consumption and resilience against cache downtime.',
        skillSubtopic: 'Cache-Aside Pattern'
      },
      {
        question: 'Why are Redis commands considered atomic?',
        options: [
          'Redis executes commands on a single-threaded event loop, guaranteeing no concurrent command interleaving during execution',
          'Redis uses quantum encryption',
          'Redis runs only inside GPU memory',
          'Commands are grouped into SQL transactions'
        ],
        correctAnswerIndex: 0,
        explanation: 'Because Redis commands execute sequentially on its single-threaded core, operations like INCR are inherently race-condition free.',
        skillSubtopic: 'Atomicity & Concurrency'
      },
      {
        question: 'What is the Sliding Window Log algorithm in Redis rate limiting?',
        options: [
          'Using Redis Sorted Sets (ZSET) where timestamps are scores, counting active requests within a moving time window',
          'A window that opens and closes on developer screen',
          'A technique to compress Redis memory keys',
          'A backup strategy for Redis clusters'
        ],
        correctAnswerIndex: 0,
        explanation: 'Sorted Sets with timestamp scores permit precise rate limit counting without boundary burst vulnerabilities.',
        skillSubtopic: 'Distributed Rate Limiting'
      },
      {
        question: 'What is the difference between Redis RDB snapshots and AOF (Append Only File) persistence?',
        options: [
          'RDB writes compact point-in-time snapshots at configured intervals; AOF logs every write operation incrementally for minimal data loss',
          'RDB only works on Windows; AOF works on Linux',
          'AOF is stored in RAM; RDB is stored in cloud',
          'There is no persistence in Redis'
        ],
        correctAnswerIndex: 0,
        explanation: 'RDB is ideal for fast disaster recovery backups, while AOF maximizes durability by logging every write command.',
        skillSubtopic: 'Redis Persistence'
      }
    ]
  },
  {
    id: 'assess-be-7',
    title: 'Microservices, Message Queues & Distributed Systems',
    category: 'Backend',
    difficulty: 'Advanced',
    targetRole: 'Backend Developer',
    skillTested: 'Microservices',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 225,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the purpose of the Saga Pattern in distributed microservices?',
        options: [
          'To manage data consistency across distributed services using a sequence of local transactions and compensating transactions for rollback',
          'To compress video streams across services',
          'To replace message brokers with direct HTTP calls',
          'To encrypt microservice source code'
        ],
        correctAnswerIndex: 0,
        explanation: 'Sagas coordinate multi-service business transactions asynchronously without locking distributed databases (2PC).',
        skillSubtopic: 'Saga Pattern & Rollbacks'
      },
      {
        question: 'In RabbitMQ, what does a Dead Letter Exchange (DLX) do?',
        options: [
          'It captures and stores messages that failed processing, expired due to TTL, or exceeded maximum retry attempts for inspection',
          'It permanently deletes all failed messages immediately',
          'It sends emails to users',
          'It shuts down consumer services'
        ],
        correctAnswerIndex: 0,
        explanation: 'DLX preserves failed messages in quarantine queues so engineers can debug issues without losing critical messages.',
        skillSubtopic: 'Message Queues & DLX'
      },
      {
        question: 'What is the primary role of an API Gateway in microservices architecture?',
        options: [
          'A reverse proxy that handles routing, SSL termination, authentication, rate limiting, and request aggregation for client apps',
          'A database table that stores user passwords',
          'A tool to write frontend React components',
          'An IDE plugin for debugging'
        ],
        correctAnswerIndex: 0,
        explanation: 'API Gateways decouple frontend clients from internal service topology and enforce centralized security gates.',
        skillSubtopic: 'API Gateway Pattern'
      },
      {
        question: 'What is the CAP Theorem trade-off in distributed database systems?',
        options: [
          'In the presence of a Network Partition (P), a distributed system must choose between Consistency (C) or Availability (A)',
          'Databases can always guarantee 100% C, A, and P simultaneously',
          'CAP only applies to relational SQL databases',
          'Partition tolerance is optional in cloud environments'
        ],
        correctAnswerIndex: 0,
        explanation: 'When network partitions occur between nodes, a system can either accept writes (AP) or reject inconsistent writes (CP).',
        skillSubtopic: 'CAP Theorem'
      }
    ]
  },
  {
    id: 'assess-be-8',
    title: 'GraphQL API Design, Resolvers & DataLoader Checkpoint',
    category: 'Backend',
    difficulty: 'Intermediate',
    targetRole: 'Backend Developer',
    skillTested: 'GraphQL',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'How does DataLoader resolve the N+1 Query problem in GraphQL APIs?',
        options: [
          'It batches individual item requests within a single tick of the event loop and memoizes cached results',
          'It converts all queries into REST endpoints',
          'It disables nested relational queries',
          'It forces database tables to store JSON strings'
        ],
        correctAnswerIndex: 0,
        explanation: 'DataLoader consolidates multiple individual fetch calls into a single batch query (e.g. SELECT WHERE id IN (...)).',
        skillSubtopic: 'N+1 DataLoader'
      },
      {
        question: 'What are the 4 arguments passed to a GraphQL resolver function in Apollo Server?',
        options: ['(parent, args, context, info)', '(req, res, next, err)', '(query, mutation, schema, type)', '(db, user, token, callback)'],
        correctAnswerIndex: 0,
        explanation: 'Resolvers receive parent (previous field resolution), args (query params), context (shared auth/state), and info (AST metadata).',
        skillSubtopic: 'Resolver Signature'
      },
      {
        question: 'What is the difference between a GraphQL Query and a Mutation?',
        options: [
          'Queries are for idempotent read operations; Mutations are intended for side-effect write and delete operations',
          'Queries only run on mobile devices; Mutations run on desktop',
          'Mutations cannot return fields in their response',
          'Queries require authorization; Mutations do not'
        ],
        correctAnswerIndex: 0,
        explanation: 'By convention and specification, Queries perform reads, whereas Mutations execute state-modifying operations sequentially.',
        skillSubtopic: 'Queries vs Mutations'
      },
      {
        question: 'Why is query depth and complexity limiting essential in production GraphQL APIs?',
        options: [
          'To prevent malicious clients from sending deeply nested recursive queries that exhaust server CPU and memory (DoS attack)',
          'To make GraphQL schemas match SQL tables',
          'Because GraphQL cannot parse more than 3 fields',
          'To comply with GDPR regulations'
        ],
        correctAnswerIndex: 0,
        explanation: 'Complexity analysis rejects excessively deep or cyclic queries before execution to defend against denial-of-service.',
        skillSubtopic: 'Query Complexity Defense'
      }
    ]
  },
  {
    id: 'assess-be-9',
    title: 'Docker Containerization & Multi-Stage Builds Diagnostic',
    category: 'Backend',
    difficulty: 'Beginner',
    targetRole: 'Backend Developer',
    skillTested: 'Docker',
    duration: '12 Mins',
    passingScore: 70,
    xpReward: 150,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is the primary benefit of Multi-Stage Docker builds for Node.js applications?',
        options: [
          'They separate build-time dependencies (TypeScript, compilers) from minimal production runtime images, reducing image size by up to 85%',
          'They allow running Windows and Linux inside the same container',
          'They remove the need for package.json',
          'They eliminate container networking'
        ],
        correctAnswerIndex: 0,
        explanation: 'Multi-stage builds copy only compiled artifacts into a lightweight base image, discarding heavy devDependencies.',
        skillSubtopic: 'Multi-Stage Dockerfiles'
      },
      {
        question: 'Why should you avoid running containers as the default root user in production?',
        options: [
          'If a container breakout vulnerability occurs, the attacker gains full root privileges on the host operating system',
          'Root containers cannot access the internet',
          'Docker Compose forbids root containers',
          'Root containers use 10x more RAM'
        ],
        correctAnswerIndex: 0,
        explanation: 'Enforcing a non-root USER node in Dockerfiles adheres to the principle of least privilege against container breakout.',
        skillSubtopic: 'Container Security'
      },
      {
        question: 'What is the purpose of Docker Named Volumes compared to Bind Mounts?',
        options: [
          'Named Volumes are completely managed by Docker in dedicated host storage, ensuring data persistence and OS isolation across container restarts',
          'Named Volumes only exist in RAM',
          'Bind mounts are encrypted automatically',
          'Volumes can only store log files'
        ],
        correctAnswerIndex: 0,
        explanation: 'Named volumes provide isolated, high-performance persistent storage managed natively by Docker engines.',
        skillSubtopic: 'Docker Volumes'
      },
      {
        question: 'Why is COPY package*.json ./ placed before COPY . . in Dockerfiles?',
        options: [
          'To leverage Docker layer caching so npm install is only re-executed when dependencies in package.json actually change',
          'Because npm install fails if source code is present',
          'To prevent Docker from copying .git folders',
          'It is a requirement of Linux file systems'
        ],
        correctAnswerIndex: 0,
        explanation: 'Docker caches layers sequentially; isolating package files ensures source code edits do not trigger slow dependency re-installs.',
        skillSubtopic: 'Layer Caching'
      }
    ]
  },
  {
    id: 'assess-be-10',
    title: 'Backend Diagnostics, Memory Profiling & Load Testing',
    category: 'Backend',
    difficulty: 'Advanced',
    targetRole: 'Backend Developer',
    skillTested: 'System Performance',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is a common indicator of a JavaScript memory leak in a Node.js production service?',
        options: [
          'V8 Heap Used memory steadily climbs over time following a sawtooth pattern without garbage collection reclaiming baseline RAM',
          'The server immediately shuts down on first request',
          'All database passwords reset automatically',
          'HTTP responses turn into plain text'
        ],
        correctAnswerIndex: 0,
        explanation: 'Unreclaimed heap growth during garbage collection cycles reveals lingering object references (e.g. global arrays, event listeners).',
        skillSubtopic: 'V8 Heap Memory Leaks'
      },
      {
        question: 'What does a Clinic.js Flamegraph visualize during Node.js CPU profiling?',
        options: [
          'The hierarchical call stack and proportion of CPU execution time spent inside each function',
          'The number of network packets dropped by the router',
          'The visual layout of database tables',
          'The temperature of the server CPU hardware'
        ],
        correctAnswerIndex: 0,
        explanation: 'Flamegraphs illustrate stack frames where wide horizontal bars highlight functions consuming excessive CPU cycles.',
        skillSubtopic: 'CPU Profiling & Flamegraphs'
      },
      {
        question: 'In HTTP load testing with tools like k6 or Autocannon, what does the p99 latency metric represent?',
        options: [
          '99% of all requests completed faster than this latency threshold, identifying tail-latency outliers',
          'The average latency of all requests',
          'The server CPU utilization percentage',
          'The percentage of failed network calls'
        ],
        correctAnswerIndex: 0,
        explanation: 'p99 latency exposes tail-end user experience by measuring worst-case performance under concurrent load.',
        skillSubtopic: 'Tail Latency Metrics'
      },
      {
        question: 'Why should cluster mode or worker threads be utilized on multi-core servers running Node.js?',
        options: [
          'Because Node.js runs on a single main thread by default, requiring clustering to utilize all available CPU cores',
          'To allow Node.js to run without a database',
          'Clustering reduces memory usage to zero',
          'Worker threads are only for frontend browser rendering'
        ],
        correctAnswerIndex: 0,
        explanation: 'Clustering forks multiple process workers on the same port, scaling throughput linearly across CPU hardware cores.',
        skillSubtopic: 'Node.js Clustering'
      }
    ]
  },

  // ==========================================
  // 3. FULL STACK DEVELOPER ASSESSMENTS (1-10)
  // ==========================================
  {
    id: 'assess-fs-1',
    title: 'Full Stack MERN Architecture & Systems Benchmark',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    targetRole: 'Full Stack Developer',
    skillTested: 'MERN Stack',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
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
          'Only use class components'
        ],
        correctAnswerIndex: 0,
        explanation: 'React escapes variables in JSX by default; backend input sanitization and httpOnly cookies ensure layered XSS protection.',
        skillSubtopic: 'Web Security'
      },
      {
        question: 'What is the purpose of HTTP status code 401 vs 403 in REST APIs?',
        options: [
          '401 means Unauthorized (missing or invalid credentials); 403 means Forbidden (authenticated, but lacking permissions)',
          '401 means Server Error; 403 means Database Error',
          '401 is for GET requests; 403 is for POST requests',
          'There is no distinction'
        ],
        correctAnswerIndex: 0,
        explanation: '401 indicates unauthenticated identity; 403 indicates authenticated identity with insufficient access privileges.',
        skillSubtopic: 'REST Protocol & Auth'
      },
      {
        question: 'When storing passwords in a database, what is the best security practice?',
        options: [
          'Hash the password using a salted adaptive algorithm like Bcrypt or Argon2',
          'Encrypt the password with Base64 encoding',
          'Store the password in plain text inside an environment variable',
          'Save MD5 hashes without salt'
        ],
        correctAnswerIndex: 0,
        explanation: 'Bcrypt and Argon2 include salt and work-factor calibration to resist dictionary and rainbow-table attacks.',
        skillSubtopic: 'Authentication Security'
      },
      {
        question: 'What is the primary benefit of compound indexing with ESR (Equality, Sort, Range) in MongoDB?',
        options: [
          'It provides maximum query efficiency by filtering exact matches, avoiding in-memory sort, and applying range filters last',
          'It halves document storage size',
          'It encrypts all network requests',
          'It replaces the need for database backups'
        ],
        correctAnswerIndex: 0,
        explanation: 'ESR ordering minimizes index scan key operations and eliminates expensive in-memory sort stages.',
        skillSubtopic: 'Database Performance'
      }
    ]
  },
  {
    id: 'assess-fs-2',
    title: 'Real-Time WebSockets & Socket.IO Architecture Checkpoint',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    targetRole: 'Full Stack Developer',
    skillTested: 'WebSockets',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'How does the initial WebSocket connection handshake establish bi-directional communication over HTTP?',
        options: [
          'Client sends an HTTP GET request with "Upgrade: websocket" and "Connection: Upgrade" headers, and server responds with HTTP 101 Switching Protocols',
          'Client creates a UDP socket directly in JavaScript',
          'Server sends an email to the client',
          'It runs via an iframe postMessage'
        ],
        correctAnswerIndex: 0,
        explanation: 'HTTP 101 Upgrade establishes persistent full-duplex TCP communication over the existing port 80/443 connection.',
        skillSubtopic: 'WebSocket Handshake'
      },
      {
        question: 'Why is a Redis Adapter required when scaling Socket.IO across multiple cluster instances?',
        options: [
          'It broadcasts socket events between separate Node.js server instances via Redis Pub/Sub so clients on different servers receive broadcasts',
          'It compresses socket messages to ZIP format',
          'It converts WebSockets to REST requests',
          'It manages client database passwords'
        ],
        correctAnswerIndex: 0,
        explanation: 'Without a shared pub/sub adapter, socket events emitted by server A cannot reach connected clients on server B.',
        skillSubtopic: 'Socket.IO Scaling'
      },
      {
        question: 'What is the difference between Socket.IO rooms and namespaces?',
        options: [
          'Namespaces divide a single Socket.IO server into separate communication channels with distinct paths; rooms are temporary sub-channels within a namespace',
          'Rooms only exist on mobile clients',
          'Namespaces are stored in MongoDB',
          'There is no architectural difference'
        ],
        correctAnswerIndex: 0,
        explanation: 'Namespaces establish isolated endpoints (/admin, /chat), while rooms segment client sockets dynamically within a namespace.',
        skillSubtopic: 'Rooms & Namespaces'
      },
      {
        question: 'How do you handle client disconnections gracefully in real-time collaborative apps?',
        options: [
          'Listen for the "disconnect" event on the server socket, broadcast departure to peers, and persist pending state in Redis or database',
          'Immediately crash the server process',
          'Delete the user account from the database',
          'Block all other connected users'
        ],
        correctAnswerIndex: 0,
        explanation: 'Graceful disconnection handling cleans room memberships, updates presence status, and preserves synchronization.',
        skillSubtopic: 'Presence & State Sync'
      }
    ]
  },
  {
    id: 'assess-fs-3',
    title: 'Type-Safe Full Stack & tRPC Monorepo Architecture',
    category: 'Full Stack',
    difficulty: 'Advanced',
    targetRole: 'Full Stack Developer',
    skillTested: 'tRPC',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'How does tRPC achieve end-to-end type safety without code generation or schema compilation steps?',
        options: [
          'It exports TypeScript router types directly from the backend and infers input/output contracts on the frontend via type imports',
          'It generates GraphQL schemas at runtime',
          'It converts TypeScript into binary protobufs',
          'It runs code generation on every git commit'
        ],
        correctAnswerIndex: 0,
        explanation: 'tRPC leverages TypeScript type inference, passing AppRouter type signatures to the client without sending runtime backend code.',
        skillSubtopic: 'tRPC Type Inference'
      },
      {
        question: 'What is the purpose of Turborepo in full-stack monorepo development?',
        options: [
          'High-performance build orchestration with remote caching that executes only changed packages and task pipelines',
          'A hosting provider for SQL databases',
          'A CSS framework for React',
          'An alternative to npm registry'
        ],
        correctAnswerIndex: 0,
        explanation: 'Turborepo caches previous build outputs by hash, skipping re-compilation of unchanged monorepo dependencies.',
        skillSubtopic: 'Monorepo Build Pipelines'
      },
      {
        question: 'What role does Zod play in tRPC procedure definitions?',
        options: [
          'It validates runtime input data payloads while automatically generating static TypeScript types for client callers',
          'It encrypts database connection strings',
          'It formats CSS stylesheets',
          'It runs unit tests in the terminal'
        ],
        correctAnswerIndex: 0,
        explanation: 'Zod provides schema validation at runtime boundaries while TypeScript infers corresponding compile-time types.',
        skillSubtopic: 'Schema Validation'
      },
      {
        question: 'How do you perform optimistic updates with TanStack Query / tRPC on the frontend?',
        options: [
          'Cancel outgoing refetches, update query cache with expected data in onMutate, and rollback using context if mutation errors',
          'Wait 5 seconds before updating state',
          'Reload the browser page immediately',
          'Mutate state directly without React hooks'
        ],
        correctAnswerIndex: 0,
        explanation: 'Optimistic updates provide instant UI feedback by updating cache immediately with rollback hooks on server rejection.',
        skillSubtopic: 'Optimistic UI Updates'
      }
    ]
  },
  {
    id: 'assess-fs-4',
    title: 'Cloud Architecture: AWS Serverless & CDN Edge Layers',
    category: 'Full Stack',
    difficulty: 'Advanced',
    targetRole: 'Full Stack Developer',
    skillTested: 'AWS Cloud',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 200,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What causes a "Cold Start" in AWS Lambda serverless functions?',
        options: [
          'The initial initialization overhead where AWS provisions a new container sandbox, loads runtime, and executes top-level module code',
          'The server room being physically too cold',
          'A slow internet connection on client laptop',
          'A database connection timeout'
        ],
        correctAnswerIndex: 0,
        explanation: 'Cold starts occur on the first invocation after idle periods while container environments are initialized.',
        skillSubtopic: 'Lambda Cold Starts'
      },
      {
        question: 'What is the purpose of AWS CloudFront CDN origin request policies?',
        options: [
          'They define which HTTP headers, query strings, and cookies are included in requests forwarded to the backend origin server',
          'They delete unread emails',
          'They format HTML code on edge servers',
          'They block all search engine bots'
        ],
        correctAnswerIndex: 0,
        explanation: 'Origin request policies control cache key generation and forward only required headers to maintain high cache hit ratios.',
        skillSubtopic: 'CDN Caching Policies'
      },
      {
        question: 'Why should connection pooling (like Prisma Accelerate or Neon Pooler) be used with serverless functions and relational databases?',
        options: [
          'Serverless functions scale concurrently to hundreds of instances, which quickly exhausts database connection limits without pooling',
          'Serverless functions cannot read SQL',
          'To convert SQL to NoSQL',
          'It is required by AWS IAM'
        ],
        correctAnswerIndex: 0,
        explanation: 'Serverless architecture creates a separate execution context per instance; connection poolers maintain a shared steady connection pool.',
        skillSubtopic: 'Serverless Connection Pooling'
      },
      {
        question: 'What is the advantage of Edge Functions (Cloudflare Workers, Vercel Edge) over standard regional Lambda functions?',
        options: [
          'They execute in V8 isolate sandboxes at points-of-presence globally with near-zero cold start latency (under 5ms)',
          'They have infinite RAM and storage',
          'They replace the need for frontend JavaScript',
          'They can run for 24 hours continuously'
        ],
        correctAnswerIndex: 0,
        explanation: 'Edge isolates spin up in milliseconds directly adjacent to user geography for ultra-low latency routing and personalization.',
        skillSubtopic: 'Edge Computing'
      }
    ]
  },
  {
    id: 'assess-fs-5',
    title: 'Full Stack Integration Testing & E2E Verification',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    targetRole: 'Full Stack Developer',
    skillTested: 'Cypress',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'In Cypress testing, why should you programmatically set auth state via API requests (cy.request) rather than logging in through the UI before every test?',
        options: [
          'It dramatically reduces test suite execution time by skipping repetitive UI rendering and form submissions',
          'Cypress cannot fill input forms',
          'UI login is forbidden in test environments',
          'It bypasses all assertions'
        ],
        correctAnswerIndex: 0,
        explanation: 'Seeding auth tokens via direct cy.request speeds up test suites while testing the login form specifically in a dedicated test.',
        skillSubtopic: 'Fast E2E Authentication'
      },
      {
        question: 'What is the purpose of Supertest in Node.js backend testing?',
        options: [
          'It provides a high-level abstraction for testing HTTP endpoints over ephemeral ports without manually starting live servers',
          'It tests database hardware temperature',
          'It converts JavaScript to C++',
          'It writes mock CSS rules'
        ],
        correctAnswerIndex: 0,
        explanation: 'Supertest wraps Express app instances and sends simulated HTTP requests, asserting status codes, headers, and body JSON.',
        skillSubtopic: 'Supertest Integration'
      },
      {
        question: 'What does cy.intercept() do in Cypress tests?',
        options: [
          'It spys on and stubs HTTP network requests and responses made by the application in the browser',
          'It blocks the user from typing on the keyboard',
          'It intercepts compiler syntax errors',
          'It closes the browser window'
        ],
        correctAnswerIndex: 0,
        explanation: 'cy.intercept allows developers to mock backend API responses, simulate server errors (500), and assert network calls.',
        skillSubtopic: 'Network Interception'
      },
      {
        question: 'What is the difference between Integration Tests and Unit Tests in a full-stack project?',
        options: [
          'Unit tests test isolated functions/components in isolation; Integration tests verify collaborative interactions between multiple modules or tiers',
          'Unit tests only run on mobile devices',
          'Integration tests cannot test databases',
          'Unit tests are always written by customers'
        ],
        correctAnswerIndex: 0,
        explanation: 'Integration testing validates that units working correctly in isolation also function seamlessly when wired together.',
        skillSubtopic: 'Test Pyramid'
      }
    ]
  },
  {
    id: 'assess-fs-6',
    title: 'Stripe Payment Processing, Webhooks & Idempotency',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    targetRole: 'Full Stack Developer',
    skillTested: 'Stripe API',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'Why is verifying the stripe-signature header on incoming webhook requests mandatory?',
        options: [
          'To mathematically verify that the webhook payload was generated by Stripe and not spoofed by an attacker with forged JSON data',
          'To format currency symbols',
          'To calculate sales tax',
          'To convert dollars to cents'
        ],
        correctAnswerIndex: 0,
        explanation: 'HMAC signature verification with the webhook endpoint secret prevents malicious actors from triggering fake fulfillment events.',
        skillSubtopic: 'Webhook Signature Security'
      },
      {
        question: 'What is Idempotency in payment processing systems?',
        options: [
          'An architectural property where executing an operation multiple times produces identical state without duplicate charges or actions',
          'A system that charges users double for late fees',
          'A feature that encrypts credit card numbers',
          'A database backup protocol'
        ],
        correctAnswerIndex: 0,
        explanation: 'Passing Idempotency-Key headers ensures network retries never result in duplicate credit card transactions.',
        skillSubtopic: 'Payment Idempotency'
      },
      {
        question: 'Why must payment amounts in Stripe APIs be passed as integers in smallest currency units (e.g. $10.50 as 1050 cents)?',
        options: [
          'To avoid floating-point rounding precision errors inherent in computer arithmetic',
          'Because Stripe only supports integer currencies',
          'To speed up database indexing',
          'Because JavaScript cannot parse decimal numbers'
        ],
        correctAnswerIndex: 0,
        explanation: 'IEEE 754 floating-point numbers can produce rounding inaccuracies (e.g. 0.1 + 0.2 != 0.3); integers ensure exact currency arithmetic.',
        skillSubtopic: 'Currency Arithmetic'
      },
      {
        question: 'When should user account access (e.g. Pro Plan upgrade) be provisioned in a SaaS application?',
        options: [
          'Upon receiving and validating the asynchronous invoice.payment_succeeded or checkout.session.completed webhook from Stripe',
          'Immediately when the user clicks the Buy button in the frontend before payment processes',
          'Only when the user sends an email to support',
          'Never'
        ],
        correctAnswerIndex: 0,
        explanation: 'Client-side redirects can be closed or manipulated; authoritative webhooks confirm verified bank settlement.',
        skillSubtopic: 'Fulfillment Workflows'
      }
    ]
  },
  {
    id: 'assess-fs-7',
    title: 'Full-Text Search & Elasticsearch Indexing Diagnostic',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    targetRole: 'Full Stack Developer',
    skillTested: 'Elasticsearch',
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
        question: 'What is an Inverted Index in search engines like Elasticsearch and Lucene?',
        options: [
          'A data structure mapping every unique tokenized term to the list of documents and positions where it occurs',
          'An array sorted in reverse chronological order',
          'A database index stored upside down in RAM',
          'A security encryption cipher'
        ],
        correctAnswerIndex: 0,
        explanation: 'Inverted indexes enable O(1) keyword lookups without scanning through millions of raw document texts.',
        skillSubtopic: 'Inverted Index Structure'
      },
      {
        question: 'How does Fuzzy Matching work in full-text search engines?',
        options: [
          'It calculates Levenshtein Distance (insertion, deletion, substitution steps) to find relevant matches despite user typos',
          'It picks random documents from the database',
          'It matches words that sound like numbers',
          'It searches only in image files'
        ],
        correctAnswerIndex: 0,
        explanation: 'Levenshtein edit distance allows search engines to return relevant results even when users misspell words.',
        skillSubtopic: 'Fuzzy Search & Levenshtein'
      },
      {
        question: 'What is the purpose of Debouncing user input on instant search input boxes in React?',
        options: [
          'To delay API requests until the user stops typing for a specified interval (e.g. 300ms), preventing hundreds of unnecessary network calls',
          'To format search text with bold letters',
          'To convert lowercase text to uppercase',
          'To store search queries in cookies'
        ],
        correctAnswerIndex: 0,
        explanation: 'Debounce timers ensure that fast typing generates a single consolidated search request rather than flooding the backend per keystroke.',
        skillSubtopic: 'Debouncing & Frontend UX'
      },
      {
        question: 'What are Faceted Search filters in e-commerce and SaaS platforms?',
        options: [
          'Multi-dimensional aggregations that calculate real-time item counts dynamically grouped by category, price, and attributes',
          'Filters that change the theme color of the website',
          'Filters that block international IP addresses',
          'Security firewalls on search routers'
        ],
        correctAnswerIndex: 0,
        explanation: 'Faceted search powers dynamic e-commerce filters where each option reflects real-time product availability.',
        skillSubtopic: 'Faceted Aggregations'
      }
    ]
  },
  {
    id: 'assess-fs-8',
    title: 'Rendering Architectures: SSR, SSG, ISR & Edge Caching',
    category: 'Full Stack',
    difficulty: 'Advanced',
    targetRole: 'Full Stack Developer',
    skillTested: 'SSR & ISR',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is Incremental Static Regeneration (ISR)?',
        options: [
          'A rendering model that creates static HTML pages at build time and updates them in the background on-demand without rebuilding the entire site',
          'A database backup strategy that runs every minute',
          'A tool to reload the browser when code changes',
          'A CSS animation technique'
        ],
        correctAnswerIndex: 0,
        explanation: 'ISR gives you the performance of static CDN delivery combined with dynamic on-demand cache regeneration.',
        skillSubtopic: 'ISR Mechanics'
      },
      {
        question: 'What is Client-Side Hydration in React SSR frameworks?',
        options: [
          'The process where React parses the server-rendered HTML DOM, attaches event listeners, and reconstructs interactive Fiber state',
          'Downloading image files over HTTP',
          'Clearing the browser cache',
          'Connecting to MongoDB'
        ],
        correctAnswerIndex: 0,
        explanation: 'Hydration transforms inert server-generated HTML into interactive, stateful React components in the browser.',
        skillSubtopic: 'Hydration Lifecycle'
      },
      {
        question: 'What HTTP header instructs CDNs to serve stale cached content immediately while fetching fresh data in the background?',
        options: ['stale-while-revalidate', 'max-age=0', 'no-cache', 'must-revalidate'],
        correctAnswerIndex: 0,
        explanation: 'Cache-Control: s-maxage=60, stale-while-revalidate=600 delivers sub-50ms cache hits while keeping content fresh.',
        skillSubtopic: 'Cache-Control Headers'
      },
      {
        question: 'When should Client-Side Rendering (CSR) with Vite/SPA be selected over Server-Side Rendering (SSR)?',
        options: [
          'For authenticated, private interactive dashboards behind a login wall where public SEO indexing is not a requirement',
          'For public e-commerce stores requiring Google Search indexing',
          'For news blogs with high SEO demands',
          'CSR is never used in modern software'
        ],
        correctAnswerIndex: 0,
        explanation: 'Private web applications with rich user interaction benefit from client-rendered SPAs without server rendering overhead.',
        skillSubtopic: 'Rendering Trade-offs'
      }
    ]
  },
  {
    id: 'assess-fs-9',
    title: 'OWASP Top 10 Defenses & Full Stack Penetration Testing',
    category: 'Full Stack',
    difficulty: 'Intermediate',
    targetRole: 'Full Stack Developer',
    skillTested: 'Web Security',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 175,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'What is an Insecure Direct Object Reference (IDOR) vulnerability?',
        options: [
          'When an application provides direct access to database records based on user-supplied IDs without verifying authorization permissions',
          'When an image fails to load due to a broken URL',
          'When JavaScript variables are not declared with let or const',
          'When a CSS stylesheet has invalid syntax'
        ],
        correctAnswerIndex: 0,
        explanation: 'IDOR occurs when endpoints like /api/invoice/123 allow user A to view user B\'s invoice due to missing ownership checks.',
        skillSubtopic: 'IDOR Vulnerability'
      },
      {
        question: 'How does Content Security Policy (CSP) defend against malicious script injection?',
        options: [
          'By specifying an HTTP response header that restricts the exact domains and nonces from which scripts, styles, and media can execute',
          'By deleting all cookies on every request',
          'By preventing users from inspecting web source code',
          'By disabling all JavaScript globally'
        ],
        correctAnswerIndex: 0,
        explanation: 'CSP forbids execution of inline scripts and unauthorized external CDN domains, neutralizing XSS vectors.',
        skillSubtopic: 'Content Security Policy'
      },
      {
        question: 'What is Server-Side Request Forgery (SSRF)?',
        options: [
          'A vulnerability where an attacker coerces the backend server to make unauthorized HTTP requests to internal network services or metadata endpoints',
          'When a user submits a form twice',
          'When an API server runs out of disk space',
          'A typo in a database connection string'
        ],
        correctAnswerIndex: 0,
        explanation: 'SSRF tricks backend servers into querying internal microservices (like AWS metadata 169.254.169.254) on behalf of the attacker.',
        skillSubtopic: 'SSRF Attack Vector'
      },
      {
        question: 'How do you prevent SQL / NoSQL Injection when querying databases in web apps?',
        options: [
          'Use parameterized queries, ORM/ODM prepared statements, and validate and sanitize all user input schemas',
          'Concatenate user input strings directly into raw query strings',
          'Store all database passwords in frontend code',
          'Disable database authentication'
        ],
        correctAnswerIndex: 0,
        explanation: 'Parameterized queries separate SQL/NoSQL commands from user data values, making injection impossible.',
        skillSubtopic: 'Injection Defense'
      }
    ]
  },
  {
    id: 'assess-fs-10',
    title: 'SaaS Engineering, Multi-Tenancy & Product Architecture',
    category: 'Full Stack',
    difficulty: 'Advanced',
    targetRole: 'Full Stack Developer',
    skillTested: 'SaaS Engineering',
    duration: '15 Mins',
    passingScore: 70,
    xpReward: 250,
    questionsCount: 4,
    attemptsCount: 0,
    status: 'Ready to Take',
    lastScore: null,
    lastAttemptDate: null,
    questions: [
      {
        question: 'In multi-tenant SaaS architecture, what is the Shared Database with Tenant Column pattern?',
        options: [
          'All tenants share the same database and tables, with every query and index scoped strictly by an organizationId / tenantId foreign key',
          'Every customer has a separate physical server',
          'Tenants can read each other\'s data freely',
          'The database is completely unindexed'
        ],
        correctAnswerIndex: 0,
        explanation: 'Tenant column scoping provides high resource efficiency and low infrastructure cost while enforcing strict tenant isolation.',
        skillSubtopic: 'Multi-Tenant Isolation'
      },
      {
        question: 'How do database schema migrations run safely in high-availability production systems without downtime?',
        options: [
          'Expand and Contract pattern: add new nullable columns/tables first, deploy code that writes to both, backfill data, and drop old columns last',
          'Shut down the database for 4 hours on Saturday',
          'Delete all old data before migrating',
          'Disable all database backups'
        ],
        correctAnswerIndex: 0,
        explanation: 'The Expand and Contract pattern maintains backward compatibility across rolling application deployments without locking tables.',
        skillSubtopic: 'Zero-Downtime Migrations'
      },
      {
        question: 'What is the role of Distributed Tracing with OpenTelemetry in microservice ecosystems?',
        options: [
          'Assigning unique trace and span IDs to every incoming request to track latency and errors across all microservices and databases',
          'Taking screenshots of user screens',
          'Printing logs to local developer console only',
          'Restarting failed servers'
        ],
        correctAnswerIndex: 0,
        explanation: 'OpenTelemetry traces provide complete visibility into end-to-end request journeys across distributed network boundaries.',
        skillSubtopic: 'Distributed Tracing'
      },
      {
        question: 'What is the purpose of Feature Flags (e.g. LaunchDarkly, PostHog) in modern software delivery?',
        options: [
          'To separate code deployment from feature release, enabling gradual rollouts, canary testing, and instant kill-switches without redeployment',
          'To customize CSS font sizes',
          'To block users based on country',
          'To delete deprecated databases'
        ],
        correctAnswerIndex: 0,
        explanation: 'Feature flags decouple release from deployment, allowing targeted user testing and zero-downtime feature rollbacks.',
        skillSubtopic: 'Feature Flags & Delivery'
      }
    ]
  }
];

export default {
  INITIAL_COURSES,
  INITIAL_ASSESSMENTS
};

