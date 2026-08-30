export const defaultRecommendations = [];

export const defaultSkillGapReport = {
  overallReadiness: 0,
  targetRole: 'Full Stack Developer',
  totalRequiredSkills: 6,
  matchedSkillsCount: 0,
  criticalGapsCount: 0,
  skills: [],
};

export const generateSkillGapsForRole = (role = 'Full Stack Developer') => {
  return {
    overallReadiness: 0,
    targetRole: role,
    totalRequiredSkills: 6,
    matchedSkillsCount: 0,
    criticalGapsCount: 0,
    skills: [],
  };
};

export const generatePathForRole = (role = 'Full Stack Developer') => {
  const r = (role || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  if (r.includes('businessanalyst') || r.includes('businessanalytics')) {
    return {
      title: 'Business Analyst Master Roadmap',
      goal: 'Business Analyst',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Business Analysis Fundamentals & SDLC Frameworks',
          description: 'Requirements engineering, user stories, BPMN process mapping, stakeholder management, and Agile ceremonies.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'Business Requirements Specification (BRD)', completed: false },
          resources: [
            { title: 'Mastery Module: Business Analysis Fundamentals', completed: false, estimatedHours: 4 },
            { title: 'Mastery Module: Agile & Scrum Frameworks', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Relational SQL Querying & Business Database Analysis',
          description: 'Multi-table joins, subqueries, aggregations, window functions, and data extraction for reporting.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Financial & Operations Query Suite', completed: false },
          resources: [
            { title: 'Mastery Module: Relational SQL', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 3,
          title: 'Advanced Excel Modeling & Spreadsheet Analytics',
          description: 'VLOOKUP/XLOOKUP, INDEX-MATCH, Pivot Tables, What-If Analysis, and financial forecasting formulas.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Dynamic Financial Model', completed: false },
          resources: [
            { title: 'Mastery Module: Advanced Excel Modeling', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 4,
          title: 'Business Intelligence & Executive Dashboards (PowerBI/Tableau)',
          description: 'Data modeling, DAX measures, interactive KPI cards, drill-downs, and executive dashboard design.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Executive Operations Dashboard', completed: false },
          resources: [
            { title: 'Mastery Module: PowerBI & Tableau Dashboards', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  if (r.includes('researchengineer') || r.includes('airesearch') || r.includes('researcher')) {
    return {
      title: 'AI Research Engineer Master Roadmap',
      goal: 'AI Research Engineer',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Scientific Python & High-Performance Numerical Computing',
          description: 'NumPy SIMD vectorization, memory-efficient array operations, C-extensions, and algorithmic complexity.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'Custom Tensor Computation Engine', completed: false },
          resources: [
            { title: 'Mastery Module: High-Performance Python', completed: false, estimatedHours: 4 },
            { title: 'Mastery Module: Vectorized NumPy Computation', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Mathematical Foundations: Linear Algebra, Calculus & Statistics',
          description: 'Matrix decompositions (SVD), multivariate calculus, optimization (SGD/Adam), and probability.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Gradient Optimization Benchmark', completed: false },
          resources: [
            { title: 'Mastery Module: Linear Algebra & Optimization', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 3,
          title: 'Deep Learning Architectures, Transformers & Attention',
          description: 'Self-attention, cross-attention, state-space models, diffusion models, and PyTorch architecture design.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Novel Attention Architecture', completed: false },
          resources: [
            { title: 'Mastery Module: PyTorch Deep Architectures', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  if (r.includes('frontend') || r.includes('react') || r.includes('vue') || r.includes('angular') || r.includes('ui')) {
    return {
      title: 'Frontend Developer Master Roadmap',
      goal: 'Frontend Developer',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'HTML5 Semantics, Modern CSS3 & Responsive Architecture',
          description: 'Semantic tags, Flexbox, CSS Grid, mobile-first design, and CSS custom properties.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'Responsive Design System', completed: false },
          resources: [
            { title: 'Mastery Module: HTML5 & Modern CSS3', completed: false, estimatedHours: 4 },
            { title: 'Mastery Module: Responsive Web Architecture', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Modern JavaScript (ES6+), Asynchronous Control Flow & DOM',
          description: 'Closures, Event Loop, Promises, Fetch API, and DOM reconciliation patterns.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Async API Explorer Application', completed: false },
          resources: [
            { title: 'Mastery Module: Modern JavaScript ES6+', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 3,
          title: 'React.js Component Architecture, Custom Hooks & Tailwind CSS',
          description: 'JSX, component tree decomposition, useState, useEffect, custom hooks, and Tailwind CSS.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Full Interactive React Dashboard', completed: false },
          resources: [
            { title: 'Mastery Module: React Component Architecture', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  if (r.includes('backend') || r.includes('nodejs') || r.includes('express') || r.includes('api')) {
    return {
      title: 'Backend Developer Master Roadmap',
      goal: 'Backend Developer',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Node.js Runtime Architecture, Event Loop & Streams',
          description: 'Libuv event loop, non-blocking asynchronous I/O, Buffer manipulation, and Stream pipelines.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'High-Throughput Stream Processor', completed: false },
          resources: [
            { title: 'Mastery Module: Node.js Runtime & Streams', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Express.js RESTful API Design, Middleware & Routing',
          description: 'HTTP protocol standards, error-handling middleware, request validation, and routing.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Modular REST API Server', completed: false },
          resources: [
            { title: 'Mastery Module: Express RESTful APIs', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 3,
          title: 'Database Modeling with MongoDB & PostgreSQL',
          description: 'Schema normalization, compound indexing, aggregation pipelines, and transaction isolation.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Dual-Engine Persistence Layer', completed: false },
          resources: [
            { title: 'Mastery Module: Database Architecture', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  if (r.includes('datascientist') || r.includes('datascience')) {
    return {
      title: 'Data Scientist Master Roadmap',
      goal: 'Data Scientist',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Python for Data Science, Pandas & Data Wrangling',
          description: 'NumPy vectorization, Pandas DataFrame manipulation, missing data imputation, and EDA.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'Exploratory Data Analysis Report', completed: false },
          resources: [
            { title: 'Mastery Module: Python Data Science', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Applied Statistics, Probability & Hypothesis Testing',
          description: 'Descriptive metrics, normal distributions, p-values, A/B testing, and regression analysis.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'A/B Experimentation Framework', completed: false },
          resources: [
            { title: 'Mastery Module: Applied Statistics', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  if (r.includes('devops') || r.includes('sre') || r.includes('cicd')) {
    return {
      title: 'DevOps Engineer Master Roadmap',
      goal: 'DevOps Engineer',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Linux Internals, Git Workflow & Shell Automation',
          description: 'Advanced Git branching, rebasing, Bash automation scripts, and cron task orchestration.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'Automated Server Setup Scripts', completed: false },
          resources: [
            { title: 'Mastery Module: Linux & Shell Automation', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Continuous Integration & Delivery (CI/CD) with GitHub Actions',
          description: 'Pipeline syntax, build matrices, artifact caching, security secret scanning, and automated testing.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Zero-Downtime Deployment Pipeline', completed: false },
          resources: [
            { title: 'Mastery Module: CI/CD Pipelines', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  return {
    title: 'Full Stack MERN Developer Master Roadmap',
    goal: role || 'Full Stack MERN Developer',
    overallProgress: 0,
    phases: [
      {
        phaseNumber: 1,
        title: 'Modern JavaScript & Asynchronous Foundations',
        description: 'ES6+ modules, lexical scope, event loop, Promises, Fetch API, and modern data structures.',
        status: 'in-progress',
        completionPercentage: 0,
        milestone: { title: 'Async JavaScript Utility Library', completed: false },
        resources: [
          { title: 'Mastery Module: Modern JavaScript', completed: false, estimatedHours: 4 },
        ],
      },
      {
        phaseNumber: 2,
        title: 'React.js Component Architecture & State Management',
        description: 'Virtual DOM, component lifecycles, custom hooks, context API, and modular CSS architecture.',
        status: 'locked',
        completionPercentage: 0,
        milestone: { title: 'Interactive Single Page Application', completed: false },
        resources: [
          { title: 'Mastery Module: React Architecture', completed: false, estimatedHours: 4 },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Node.js Runtime & Express.js REST APIs',
        description: 'Asynchronous event loop, stream processing, middleware pipelines, and RESTful routing standards.',
        status: 'locked',
        completionPercentage: 0,
        milestone: { title: 'Scalable REST API Backend', completed: false },
        resources: [
          { title: 'Mastery Module: Node & Express APIs', completed: false, estimatedHours: 4 },
        ],
      },
    ],
  };
};
