/**
 * LearnPath AI — Autonomous Dynamic Roadmap & Skill Gap Generator
 * Synthesizes adaptive roadmaps and competency breakdown matrices for any of the 48 career objectives.
 */

export const generatePathForRole = (role = 'Full Stack Developer') => {
  const r = role.toLowerCase();
  
  if (r.includes('data scientist') || r.includes('data analyst') || r.includes('ai') || r.includes('machine learning')) {
    return {
      goal: role,
      title: `${role} Competency & Analytics Roadmap`,
      totalEstimatedWeeks: 12,
      overallProgress: 60,
      currentPhase: 2,
      phases: [
        {
          phaseNumber: 1,
          title: 'Phase 1: Python, NumPy & Exploratory Data Analysis',
          description: 'Data wrangling with Pandas, statistical distributions, and high-dimensional visualization.',
          status: 'completed',
          estimatedWeeks: 3,
          completionPercentage: 100,
          milestone: { title: 'Exploratory Analysis Report', description: 'Clean and visualize multi-variable datasets.' },
          resources: [
            { title: 'Python for Data Analysis & Pandas Vectorization', completed: true },
            { title: 'Statistical Inference & Hypothesis Testing', completed: true },
            { title: 'Data Visualization with Seaborn & Matplotlib', completed: true }
          ]
        },
        {
          phaseNumber: 2,
          title: 'Phase 2: Applied Machine Learning & Scikit-Learn',
          description: 'Supervised regression/classification, feature engineering, and cross-validation pipelines.',
          status: 'in-progress',
          estimatedWeeks: 4,
          completionPercentage: 65,
          milestone: { title: 'Predictive Modeling Pipeline', description: 'Deploy hyperparameter-tuned ML models.' },
          resources: [
            { title: 'Supervised Learning & Ensemble Methods', completed: true },
            { title: 'Feature Selection & Dimensionality Reduction (PCA)', completed: true },
            { title: 'Model Evaluation, ROC-AUC & Confusion Matrix', completed: false }
          ]
        },
        {
          phaseNumber: 3,
          title: 'Phase 3: SQL Warehouses & Big Data Pipelines',
          description: 'Advanced SQL window functions, Snowflake/BigQuery, and PySpark distributed processing.',
          status: 'available',
          estimatedWeeks: 3,
          completionPercentage: 0,
          milestone: { title: 'ETL Pipeline with Spark', description: 'Build automated batch data transformation workflows.' },
          resources: [
            { title: 'Advanced SQL Aggregations & Query Tuning', completed: false },
            { title: 'Distributed Computing with Apache Spark', completed: false }
          ]
        },
        {
          phaseNumber: 4,
          title: 'Phase 4: Deep Learning & Production Model Serving',
          description: 'PyTorch neural architectures, FastAPI model serving, and drift monitoring.',
          status: 'available',
          estimatedWeeks: 2,
          completionPercentage: 0,
          milestone: { title: 'Model Serving Microservice', description: 'Containerize and deploy PyTorch inference endpoints.' },
          resources: [
            { title: 'PyTorch Deep Learning Foundations', completed: false },
            { title: 'MLflow & Experiment Tracking', completed: false }
          ]
        }
      ],
      adaptationHistory: [
        { actionTaken: `Calibrated syllabus for ${role}`, reason: 'User profile initialization', timestamp: new Date().toISOString() }
      ]
    };
  }

  if (r.includes('cloud') || r.includes('devops') || r.includes('reliability') || r.includes('security') || r.includes('cyber')) {
    return {
      goal: role,
      title: `${role} Cloud Architecture & CI/CD Roadmap`,
      totalEstimatedWeeks: 12,
      overallProgress: 62,
      currentPhase: 2,
      phases: [
        {
          phaseNumber: 1,
          title: 'Phase 1: Linux Internals, Networking & Shell Scripting',
          description: 'TCP/IP networking, kernel tuning, bash automation, and SSH hardening.',
          status: 'completed',
          estimatedWeeks: 3,
          completionPercentage: 100,
          milestone: { title: 'Automated Infrastructure Setup', description: 'Script automated server provisioning.' },
          resources: [
            { title: 'Linux System Administration & Networking Protocols', completed: true },
            { title: 'Bash Automation & Cron Orchestration', completed: true }
          ]
        },
        {
          phaseNumber: 2,
          title: 'Phase 2: Docker Containers & Kubernetes Orchestration',
          description: 'Multi-stage Dockerfiles, K8s Pods, Deployments, Services, and Helm charts.',
          status: 'in-progress',
          estimatedWeeks: 4,
          completionPercentage: 70,
          milestone: { title: 'Kubernetes Multi-Service Cluster', description: 'Deploy high-availability containerized microservices.' },
          resources: [
            { title: 'Docker Container Optimization & Security Scanning', completed: true },
            { title: 'Kubernetes Core Objects & Ingress Controllers', completed: true },
            { title: 'Helm Package Management & ConfigMaps', completed: false }
          ]
        },
        {
          phaseNumber: 3,
          title: 'Phase 3: Infrastructure as Code (Terraform & AWS/GCP)',
          description: 'Terraform state management, VPC peering, IAM policies, and cloud networking.',
          status: 'available',
          estimatedWeeks: 3,
          completionPercentage: 0,
          milestone: { title: 'Terraform Multi-Tier Cloud VPC', description: 'Provision reproducible cloud infrastructure.' },
          resources: [
            { title: 'Terraform Modules & State Management', completed: false },
            { title: 'AWS Cloud Architecture & Security Groups', completed: false }
          ]
        },
        {
          phaseNumber: 4,
          title: 'Phase 4: CI/CD Pipelines & Prometheus Observability',
          description: 'GitHub Actions, ArgoCD GitOps, Prometheus metrics, and Grafana telemetry dashboards.',
          status: 'available',
          estimatedWeeks: 2,
          completionPercentage: 0,
          milestone: { title: 'GitOps Continuous Delivery Pipeline', description: 'Automate zero-downtime deployment pipelines.' },
          resources: [
            { title: 'GitOps with ArgoCD & GitHub Actions', completed: false },
            { title: 'Prometheus & Grafana Observability', completed: false }
          ]
        }
      ],
      adaptationHistory: [
        { actionTaken: `Calibrated syllabus for ${role}`, reason: 'User profile initialization', timestamp: new Date().toISOString() }
      ]
    };
  }

  // Default Full Stack / MERN / Software Developer
  return {
    goal: role,
    title: `${role} Curriculum & Engineering Architecture Roadmap`,
    totalEstimatedWeeks: 12,
    overallProgress: 65,
    currentPhase: 2,
    phases: [
      {
        phaseNumber: 1,
        title: 'Phase 1: Core Fundamentals & Modern JavaScript',
        description: 'ES6+ modules, asynchronous event loop, DOM architecture, and data structures.',
        status: 'completed',
        estimatedWeeks: 3,
        completionPercentage: 100,
        milestone: {
          title: 'Interactive Frontend Application',
          description: 'Deploy a dynamic web application utilizing ES6 modules and REST API consumption.'
        },
        resources: [
          { title: 'JavaScript Engine & Execution Context', completed: true },
          { title: 'Asynchronous JavaScript & Promises', completed: true },
          { title: 'DOM Events & State Patterns', completed: true }
        ]
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: React 18, Custom Hooks & State Architecture',
        description: 'Concurrent rendering, atomic state management, memoization, and performance profiling.',
        status: 'in-progress',
        estimatedWeeks: 4,
        completionPercentage: 68,
        milestone: {
          title: 'Full-Stack Dashboard with Real-Time Analytics',
          description: 'Construct a multi-page enterprise dashboard with live data feeds and optimistic UI updates.'
        },
        resources: [
          { title: 'React 18 Fiber & Concurrent Rendering', completed: true },
          { title: 'Custom Hook Design & Memoization', completed: true },
          { title: 'Atomic State Management (Zustand/Redux)', completed: false },
          { title: 'Performance Profiling & Bundle Optimization', completed: false }
        ]
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Backend APIs, Node.js & Database Optimization',
        description: 'Scalable RESTful microservices, JWT authentication, MongoDB indexing, and caching.',
        status: 'available',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: {
          title: 'High-Throughput RESTful Microservice',
          description: 'Architect a containerized backend service with rate limiting, database indexing, and automated tests.'
        },
        resources: [
          { title: 'Node.js Event Loop & Cluster Architecture', completed: false },
          { title: 'MongoDB Aggregations & Query Optimization', completed: false },
          { title: 'Redis Caching & Distributed Session Management', completed: false }
        ]
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Cloud Deployment, DevOps & AI Integration',
        description: 'Docker containers, CI/CD automation, API security, and intelligent AI features.',
        status: 'available',
        estimatedWeeks: 2,
        completionPercentage: 0,
        milestone: {
          title: 'Production SaaS Deployment',
          description: 'Deploy full-stack cloud architecture with automated pipelines and telemetry.'
        },
        resources: [
          { title: 'Docker Containerization & Microservice Networking', completed: false },
          { title: 'CI/CD Pipelines & Automated Testing', completed: false },
          { title: 'AI API Integration & Vector Retrieval', completed: false }
        ]
      }
    ],
    adaptationHistory: [
      {
        actionTaken: `Calibrated syllabus for ${role}`,
        reason: 'User profile initialization',
        timestamp: new Date().toISOString()
      }
    ]
  };
};

export const generateSkillGapsForRole = (role = 'Full Stack Developer') => {
  const r = role.toLowerCase();

  if (r.includes('data scientist') || r.includes('data analyst') || r.includes('ai') || r.includes('machine learning')) {
    return {
      targetRole: role,
      readinessScore: 64,
      requiredSkillsCount: 10,
      masteredSkillsCount: 6,
      criticalGapsCount: 2,
      criticalGaps: ['Deep Learning & PyTorch', 'Feature Selection & PCA'],
      gaps: [
        { skill: 'Python & NumPy Wrangling', category: 'Data Analysis', currentLevel: 85, targetLevel: 90, priority: 'Low', gapScore: 5, gapDisparity: '5%' },
        { skill: 'Applied Scikit-Learn ML', category: 'Machine Learning', currentLevel: 70, targetLevel: 85, priority: 'Medium', gapScore: 15, gapDisparity: '15%' },
        { skill: 'SQL & Data Warehousing', category: 'Database', currentLevel: 65, targetLevel: 80, priority: 'Medium', gapScore: 15, gapDisparity: '15%' },
        { skill: 'Deep Learning & PyTorch', category: 'Deep Learning', currentLevel: 45, targetLevel: 85, priority: 'High', gapScore: 40, gapDisparity: '40%' },
        { skill: 'Feature Selection & PCA', category: 'Statistics', currentLevel: 50, targetLevel: 80, priority: 'High', gapScore: 30, gapDisparity: '30%' },
        { skill: 'Model Deployment & MLOps', category: 'DevOps', currentLevel: 40, targetLevel: 75, priority: 'High', gapScore: 35, gapDisparity: '35%' },
      ]
    };
  }

  if (r.includes('cloud') || r.includes('devops') || r.includes('reliability') || r.includes('security') || r.includes('cyber')) {
    return {
      targetRole: role,
      readinessScore: 66,
      requiredSkillsCount: 10,
      masteredSkillsCount: 6,
      criticalGapsCount: 2,
      criticalGaps: ['Kubernetes Cluster Management', 'Terraform Infrastructure as Code'],
      gaps: [
        { skill: 'Linux & Bash Automation', category: 'Operating Systems', currentLevel: 85, targetLevel: 90, priority: 'Low', gapScore: 5, gapDisparity: '5%' },
        { skill: 'Docker Containerization', category: 'DevOps', currentLevel: 80, targetLevel: 85, priority: 'Low', gapScore: 5, gapDisparity: '5%' },
        { skill: 'Kubernetes Cluster Management', category: 'Cloud & DevOps', currentLevel: 50, targetLevel: 85, priority: 'High', gapScore: 35, gapDisparity: '35%' },
        { skill: 'Terraform Infrastructure as Code', category: 'Cloud', currentLevel: 45, targetLevel: 80, priority: 'High', gapScore: 35, gapDisparity: '35%' },
        { skill: 'CI/CD & GitHub Actions', category: 'DevOps', currentLevel: 65, targetLevel: 80, priority: 'Medium', gapScore: 15, gapDisparity: '15%' },
        { skill: 'Prometheus Telemetry', category: 'Observability', currentLevel: 55, targetLevel: 75, priority: 'Medium', gapScore: 20, gapDisparity: '20%' },
      ]
    };
  }

  return {
    targetRole: role,
    readinessScore: 68,
    requiredSkillsCount: 12,
    masteredSkillsCount: 7,
    criticalGapsCount: 2,
    criticalGaps: ['System Architecture & Scalability', 'Advanced Database Optimization'],
    gaps: [
      { skill: 'Frontend Frameworks & State', category: 'Frontend', currentLevel: 85, targetLevel: 90, priority: 'Low', gapScore: 5, gapDisparity: '5%' },
      { skill: 'Backend API Architecture', category: 'Backend', currentLevel: 75, targetLevel: 85, priority: 'Medium', gapScore: 10, gapDisparity: '10%' },
      { skill: 'Database Indexing & Queries', category: 'Database', currentLevel: 55, targetLevel: 80, priority: 'High', gapScore: 25, gapDisparity: '25%' },
      { skill: 'System Architecture & Scalability', category: 'Architecture', currentLevel: 45, targetLevel: 85, priority: 'High', gapScore: 40, gapDisparity: '40%' },
      { skill: 'TypeScript & Type Safety', category: 'Languages', currentLevel: 65, targetLevel: 85, priority: 'Medium', gapScore: 20, gapDisparity: '20%' },
      { skill: 'DevOps & Containerization', category: 'DevOps', currentLevel: 50, targetLevel: 75, priority: 'Medium', gapScore: 25, gapDisparity: '25%' },
    ]
  };
};

export const defaultSkillGapReport = generateSkillGapsForRole('Full Stack Developer');

export const defaultRecommendations = [
  {
    _id: 'rec_1',
    title: 'Advanced React 18 Design Patterns & Performance',
    category: 'Frontend',
    difficulty: 'Advanced',
    duration: '6.5 Hours',
    rating: 4.9,
    xpReward: 350,
    skillsCovered: ['React.js', 'Custom Hooks', 'Concurrent Mode', 'State Management'],
    matchScore: 96,
    reason: 'Directly addresses state management and concurrent rendering requirements.'
  },
  {
    _id: 'rec_2',
    title: 'Production-Ready Express.js, MongoDB & REST APIs',
    category: 'Backend',
    difficulty: 'Intermediate',
    duration: '8.0 Hours',
    rating: 4.8,
    xpReward: 400,
    skillsCovered: ['Node.js', 'MongoDB', 'Indexing', 'REST APIs'],
    matchScore: 92,
    reason: 'Recommended to close high-priority gap in database indexing and asynchronous API design.'
  },
  {
    _id: 'rec_3',
    title: 'High-Scale System Design & Distributed Architecture',
    category: 'Architecture',
    difficulty: 'Advanced',
    duration: '9.0 Hours',
    rating: 5.0,
    xpReward: 500,
    skillsCovered: ['System Design', 'Kafka', 'Redis Caching', 'Database Sharding'],
    matchScore: 98,
    reason: 'Critical recommendation for your engineering architecture goals.'
  }
];
