export const defaultRecommendations = [];

const ROLE_SKILL_BENCHMARKS = {
  'frontend': [
    { name: 'HTML5 & Semantic Structure', category: 'Frontend', targetLevel: 90, priority: 'High' },
    { name: 'CSS3 & Responsive Layouts', category: 'Frontend', targetLevel: 85, priority: 'High' },
    { name: 'JavaScript ES6+', category: 'Frontend', targetLevel: 90, priority: 'High' },
    { name: 'React.js Architecture', category: 'Frontend', targetLevel: 85, priority: 'High' },
    { name: 'TypeScript', category: 'Frontend', targetLevel: 80, priority: 'Medium' },
    { name: 'Tailwind CSS', category: 'Frontend', targetLevel: 85, priority: 'Medium' },
    { name: 'Web Performance (Core Web Vitals)', category: 'Frontend', targetLevel: 80, priority: 'Medium' },
    { name: 'Next.js App Router', category: 'Frontend', targetLevel: 75, priority: 'Medium' },
  ],
  'backend': [
    { name: 'Node.js Core & Streams', category: 'Backend', targetLevel: 85, priority: 'High' },
    { name: 'Express.js REST APIs', category: 'Backend', targetLevel: 85, priority: 'High' },
    { name: 'MongoDB Document Modeling', category: 'Backend', targetLevel: 80, priority: 'High' },
    { name: 'PostgreSQL & SQL Analytics', category: 'Backend', targetLevel: 85, priority: 'High' },
    { name: 'JWT & OAuth Authentication', category: 'Backend', targetLevel: 90, priority: 'High' },
    { name: 'Redis Caching & Pub/Sub', category: 'Backend', targetLevel: 80, priority: 'Medium' },
    { name: 'Docker Containerization', category: 'Backend', targetLevel: 80, priority: 'Medium' },
    { name: 'Microservices & Message Queues', category: 'Backend', targetLevel: 75, priority: 'Medium' },
  ],
  'fullstack': [
    { name: 'React.js & State Management', category: 'Frontend', targetLevel: 85, priority: 'High' },
    { name: 'Node.js & Express.js', category: 'Backend', targetLevel: 85, priority: 'High' },
    { name: 'MongoDB & Database Modeling', category: 'Database', targetLevel: 80, priority: 'High' },
    { name: 'JavaScript & TypeScript', category: 'Languages', targetLevel: 90, priority: 'High' },
    { name: 'REST APIs & WebSockets', category: 'Backend', targetLevel: 85, priority: 'High' },
    { name: 'JWT Security & OWASP Defenses', category: 'Security', targetLevel: 85, priority: 'High' },
    { name: 'Docker & CI/CD Deployment', category: 'DevOps', targetLevel: 80, priority: 'Medium' },
    { name: 'AWS Cloud & Serverless', category: 'Cloud', targetLevel: 75, priority: 'Medium' },
  ],
  'datascience': [
    { name: 'Python for Data Science', category: 'Data Science', targetLevel: 90, priority: 'High' },
    { name: 'Pandas & NumPy Analytics', category: 'Data Science', targetLevel: 85, priority: 'High' },
    { name: 'Statistical Modeling & Probability', category: 'Mathematics', targetLevel: 85, priority: 'High' },
    { name: 'Machine Learning (Scikit-Learn)', category: 'Machine Learning', targetLevel: 85, priority: 'High' },
    { name: 'Deep Learning (PyTorch/TensorFlow)', category: 'AI', targetLevel: 80, priority: 'High' },
    { name: 'SQL & Data Extraction', category: 'Database', targetLevel: 85, priority: 'Medium' },
    { name: 'Data Visualization & Storytelling', category: 'Analytics', targetLevel: 80, priority: 'Medium' },
    { name: 'Model Deployment & MLOps', category: 'MLOps', targetLevel: 75, priority: 'Medium' },
  ],
  'dataanalyst': [
    { name: 'Relational SQL Querying', category: 'Database', targetLevel: 90, priority: 'High' },
    { name: 'Power BI & Tableau Dashboards', category: 'BI', targetLevel: 85, priority: 'High' },
    { name: 'Advanced Excel & Financial Modeling', category: 'Analytics', targetLevel: 85, priority: 'High' },
    { name: 'Python (Pandas & Matplotlib)', category: 'Analytics', targetLevel: 80, priority: 'High' },
    { name: 'Exploratory Data Analysis', category: 'Data', targetLevel: 85, priority: 'Medium' },
    { name: 'Statistical Hypothesis Testing', category: 'Mathematics', targetLevel: 75, priority: 'Medium' },
  ],
  'devops': [
    { name: 'Docker Containerization', category: 'Containers', targetLevel: 85, priority: 'High' },
    { name: 'Kubernetes Orchestration', category: 'Orchestration', targetLevel: 80, priority: 'High' },
    { name: 'CI/CD Pipeline Automation', category: 'DevOps', targetLevel: 85, priority: 'High' },
    { name: 'AWS Cloud Infrastructure', category: 'Cloud', targetLevel: 85, priority: 'High' },
    { name: 'Linux System Administration', category: 'Systems', targetLevel: 85, priority: 'High' },
    { name: 'Terraform Infrastructure as Code', category: 'IaC', targetLevel: 80, priority: 'Medium' },
    { name: 'Prometheus & Grafana Observability', category: 'Monitoring', targetLevel: 75, priority: 'Medium' },
  ],
  'businessanalyst': [
    { name: 'Requirements Engineering & BRDs', category: 'Requirements', targetLevel: 90, priority: 'High' },
    { name: 'BPMN Process Modeling', category: 'Business Process', targetLevel: 85, priority: 'High' },
    { name: 'Relational SQL & Business Metrics', category: 'Database', targetLevel: 80, priority: 'High' },
    { name: 'Agile, Scrum & User Stories', category: 'Agile', targetLevel: 85, priority: 'High' },
    { name: 'Executive KPI Dashboards', category: 'BI', targetLevel: 80, priority: 'Medium' },
    { name: 'Stakeholder Communication', category: 'Strategy', targetLevel: 85, priority: 'Medium' },
  ]
};

export const defaultSkillGapReport = {
  overallReadiness: 0,
  targetRole: 'Full Stack Developer',
  totalRequiredSkills: 8,
  matchedSkillsCount: 0,
  criticalGapsCount: 0,
  criticalGaps: [],
  skills: [],
};

export const generateSkillGapsForRole = (role = 'Full Stack Developer', userSkills = null) => {
  const r = (role || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  
  let key = 'fullstack';
  if (r.includes('frontend') || r.includes('react') || r.includes('ui')) key = 'frontend';
  else if (r.includes('backend') || r.includes('nodejs') || r.includes('api')) key = 'backend';
  else if (r.includes('datascien') || r.includes('machinelearning') || r.includes('ml') || r.includes('ai')) key = 'datascience';
  else if (r.includes('dataanaly') || r.includes('bi') || r.includes('tableau') || r.includes('powerbi')) key = 'dataanalyst';
  else if (r.includes('devops') || r.includes('cloud') || r.includes('sre') || r.includes('aws')) key = 'devops';
  else if (r.includes('business') || r.includes('analyst')) key = 'businessanalyst';

  const benchmarks = ROLE_SKILL_BENCHMARKS[key] || ROLE_SKILL_BENCHMARKS['fullstack'];

  // Read saved user skills if not passed
  let knownSkills = userSkills;
  if (!knownSkills) {
    try {
      const savedUser = localStorage.getItem('learnpath_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (Array.isArray(parsed?.skills)) {
          knownSkills = parsed.skills;
        }
      }
    } catch (e) {}
  }

  const skillMap = new Map();
  if (Array.isArray(knownSkills)) {
    knownSkills.forEach(s => {
      const name = (s.name || s.skill || '').toLowerCase().trim();
      const level = Math.max(0, Math.min(100, Number(s.level ?? s.progress ?? s.score ?? 0)));
      if (name) skillMap.set(name, level);
    });
  }

  let totalTarget = 0;
  let totalAchieved = 0;
  let matchedCount = 0;
  let criticalCount = 0;

  const evaluatedSkills = benchmarks.map(bm => {
    const bmNameLower = bm.name.toLowerCase();
    
    // Find closest matched skill in user skills
    let currentLvl = 0;
    for (const [sName, sLvl] of skillMap.entries()) {
      if (bmNameLower.includes(sName) || sName.includes(bmNameLower) || bmNameLower.split(' ')[0] === sName.split(' ')[0]) {
        currentLvl = Math.max(currentLvl, sLvl);
      }
    }

    const gap = Math.max(0, bm.targetLevel - currentLvl);
    totalTarget += bm.targetLevel;
    totalAchieved += Math.min(currentLvl, bm.targetLevel);

    if (currentLvl >= 70) matchedCount++;
    if (gap >= 40) criticalCount++;

    return {
      name: bm.name,
      skill: bm.name,
      category: bm.category,
      targetLevel: bm.targetLevel,
      currentLevel: currentLvl,
      gap,
      priority: bm.priority,
      status: currentLvl >= bm.targetLevel ? 'Mastered' : currentLvl >= 50 ? 'Developing' : 'Needs Focus'
    };
  });

  const readiness = totalTarget > 0 ? Math.round((totalAchieved / totalTarget) * 100) : 0;
  const criticalGaps = evaluatedSkills.filter(s => s.priority === 'High' && s.gap > 20);

  return {
    overallReadiness: readiness,
    targetRole: role,
    totalRequiredSkills: evaluatedSkills.length,
    matchedSkillsCount: matchedCount,
    criticalGapsCount: criticalCount,
    criticalGaps,
    skills: evaluatedSkills,
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
          title: 'Phase 1: Business Analysis Fundamentals & SDLC Frameworks',
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
          title: 'Phase 2: Relational SQL Querying & Business Database Analysis',
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
          title: 'Phase 3: Advanced Excel Modeling & Spreadsheet Analytics',
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
          title: 'Phase 4: Business Intelligence & Executive Dashboards (PowerBI/Tableau)',
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

  if (r.includes('frontend') || r.includes('react') || r.includes('ui')) {
    return {
      title: 'Frontend Engineering Master Roadmap',
      goal: 'Frontend Developer',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Phase 1: Semantic HTML5, Modern CSS3 & Responsive Architecture',
          description: 'Semantic tags, Flexbox, CSS Grid, mobile-first layouts, and WCAG accessibility standards.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'Responsive Design System & Accessibility', completed: false },
          resources: [
            { title: 'Mastery Module: HTML5 & Modern CSS3', completed: false, estimatedHours: 4 },
            { title: 'Mastery Module: Responsive Web Architecture', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Phase 2: Modern JavaScript (ES6+), Asynchronous Control Flow & DOM',
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
          title: 'Phase 3: React 18 Architecture, Custom Hooks & Tailwind CSS',
          description: 'Component tree decomposition, useState, useEffect, custom hooks, and Tailwind CSS design systems.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Full Interactive React Dashboard', completed: false },
          resources: [
            { title: 'Mastery Module: React Component Architecture', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 4,
          title: 'Phase 4: Next.js App Router, Performance & Production Testing',
          description: 'React Server Components, Core Web Vitals optimization, Vitest unit tests, and Playwright E2E testing.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Enterprise Web Application Capstone', completed: false },
          resources: [
            { title: 'Mastery Module: Next.js & Performance Profiling', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  if (r.includes('backend') || r.includes('nodejs') || r.includes('api')) {
    return {
      title: 'Backend Systems Architecture Roadmap',
      goal: 'Backend Developer',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Phase 1: Node.js Runtime Architecture, Event Loop & Streams',
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
          title: 'Phase 2: Express.js RESTful API Design & Error Middleware',
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
          title: 'Phase 3: Database Architecture: MongoDB & PostgreSQL Scaling',
          description: 'Schema normalization, compound indexing, aggregation pipelines, and transaction isolation.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'High-Performance Scaled Database Tier', completed: false },
          resources: [
            { title: 'Mastery Module: Database Architecture', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 4,
          title: 'Phase 4: Microservices, Redis Caching & Docker Containerization',
          description: 'Distributed services, Redis caching, RabbitMQ pub/sub, Docker containers, and CI/CD pipelines.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Distributed Microservices Cluster', completed: false },
          resources: [
            { title: 'Mastery Module: Microservices & Containers', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  if (r.includes('datascien') || r.includes('machinelearning') || r.includes('ai')) {
    return {
      title: 'Data Science & Machine Learning Master Roadmap',
      goal: 'Data Scientist',
      overallProgress: 0,
      phases: [
        {
          phaseNumber: 1,
          title: 'Phase 1: Python for Data Science, NumPy & Vectorized Computing',
          description: 'Python data structures, NumPy SIMD vectorization, Pandas wrangling, and exploratory analysis.',
          status: 'in-progress',
          completionPercentage: 0,
          milestone: { title: 'Exploratory Data Analysis Report', completed: false },
          resources: [
            { title: 'Mastery Module: Python & Numerical Computing', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 2,
          title: 'Phase 2: Statistical Modeling, Probability & Relational SQL',
          description: 'Hypothesis testing, probability distributions, regression modeling, and multi-table SQL queries.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Statistical Prediction Engine', completed: false },
          resources: [
            { title: 'Mastery Module: Statistics & SQL Analytics', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 3,
          title: 'Phase 3: Machine Learning Algorithms & Scikit-Learn Pipelines',
          description: 'Classification, regression, cross-validation, regularization, decision trees, and ensemble methods.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Production Machine Learning Pipeline', completed: false },
          resources: [
            { title: 'Mastery Module: Scikit-Learn Pipelines', completed: false, estimatedHours: 4 },
          ],
        },
        {
          phaseNumber: 4,
          title: 'Phase 4: Deep Learning with PyTorch & Model Deployment',
          description: 'Neural networks, backpropagation, CNNs/Transformers, model quantization, and FastAPI deployment.',
          status: 'locked',
          completionPercentage: 0,
          milestone: { title: 'Deployed Deep Learning Classifier', completed: false },
          resources: [
            { title: 'Mastery Module: PyTorch & MLOps Serving', completed: false, estimatedHours: 4 },
          ],
        },
      ],
    };
  }

  // Default: Full Stack MERN Engineering
  return {
    title: 'Full Stack MERN Developer Master Roadmap',
    goal: role || 'Full Stack Developer',
    overallProgress: 0,
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Modern Web Foundations & Asynchronous JavaScript',
        description: 'Semantic HTML5, CSS Grid, Flexbox, JavaScript ES6+, asynchronous control flow, and DOM APIs.',
        status: 'in-progress',
        completionPercentage: 0,
        milestone: { title: 'Dynamic Interactive Web Application', completed: false },
        resources: [
          { title: 'Mastery Module: Web Foundations & ES6+', completed: false, estimatedHours: 4 },
          { title: 'Mastery Module: Modern CSS & Responsive Architecture', completed: false, estimatedHours: 4 },
        ],
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: React.js Component Architecture & State Management',
        description: 'Custom hooks, Context API, Tailwind CSS design systems, and client-side routing.',
        status: 'locked',
        completionPercentage: 0,
        milestone: { title: 'Interactive Single Page Application', completed: false },
        resources: [
          { title: 'Mastery Module: React Component Architecture', completed: false, estimatedHours: 4 },
          { title: 'Mastery Module: State Management & Hooks', completed: false, estimatedHours: 4 },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Node.js, Express & MongoDB Data Tier',
        description: 'REST API engineering, JWT authentication, MongoDB schema design, indexing, and error handling.',
        status: 'locked',
        completionPercentage: 0,
        milestone: { title: 'Authenticated RESTful Data Tier', completed: false },
        resources: [
          { title: 'Mastery Module: Node.js & Express Architecture', completed: false, estimatedHours: 4 },
          { title: 'Mastery Module: MongoDB Indexing & Mongoose ODM', completed: false, estimatedHours: 4 },
        ],
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Full Stack Integration, Testing & Cloud Deployment',
        description: 'End-to-end integration, Cypress & Supertest automation, Docker containerization, and AWS/Vercel deployment.',
        status: 'locked',
        completionPercentage: 0,
        milestone: { title: 'Production Full Stack SaaS Application', completed: false },
        resources: [
          { title: 'Mastery Module: Full Stack Testing & Security', completed: false, estimatedHours: 4 },
          { title: 'Mastery Module: Cloud Deployment & CI/CD', completed: false, estimatedHours: 4 },
        ],
      },
    ],
  };
};

export default {
  defaultRecommendations,
  defaultSkillGapReport,
  generateSkillGapsForRole,
  generatePathForRole,
};
