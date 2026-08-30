/**
 * Autonomous Dynamic Roadmap Generator for LearnPath AI
 */

const getPhasesForRole = (role = '') => {
  const r = role.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (r.includes('frontend') || r.includes('react') || r.includes('vue') || r.includes('ui')) {
    return [
      {
        phaseNumber: 1,
        title: 'Phase 1: HTML5 Semantics, Modern CSS3 & Responsive Design',
        description: 'Semantic elements, CSS Grid, Flexbox, responsive layouts, and Tailwind CSS.',
        status: 'in-progress',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Responsive Design System', description: 'Build an accessible, responsive component library.' },
        resources: [
          { title: 'HTML5 Semantic Layouts & ARIA Roles', completed: false },
          { title: 'Modern CSS Grid & Flexbox Systems', completed: false },
          { title: 'Tailwind CSS Utility Architecture', completed: false },
        ],
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Modern JavaScript (ES6+), Asynchronous Flow & DOM',
        description: 'Closures, Event Loop, Promises, Fetch API, and DOM reconciliation patterns.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Async API Explorer Application', description: 'Create an interactive single-page app consuming REST APIs.' },
        resources: [
          { title: 'JavaScript Engine Internals & Event Loop', completed: false },
          { title: 'Promises, Async/Await & Error Boundaries', completed: false },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: React.js Component Architecture & Custom Hooks',
        description: 'JSX, component tree decomposition, useState, useEffect, custom hooks, and Tailwind CSS.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Full Interactive React Dashboard', description: 'Deliver a production React client with state management.' },
        resources: [
          { title: 'React 18 Component Lifecycles & State Management', completed: false },
          { title: 'Building Reusable Custom React Hooks', completed: false },
        ],
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Global State Management (Zustand/Redux) & TypeScript',
        description: 'Type-safe interfaces, generics, global stores, selectors, and immutable state updates.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Type-Safe Enterprise Client', description: 'Architect a TypeScript React app with global store hydration.' },
        resources: [
          { title: 'TypeScript Foundations & Generic Types', completed: false },
          { title: 'State Management with Zustand & Redux Toolkit', completed: false },
        ],
      },
      {
        phaseNumber: 5,
        title: 'Phase 5: Web Performance, Accessibility (a11y) & Testing',
        description: 'Core Web Vitals, code-splitting, lazy loading, ARIA roles, and Vitest/Playwright test suites.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Audit & Test Suite Capstone', description: 'Achieve 95+ Lighthouse score and 90% unit/E2E test coverage.' },
        resources: [
          { title: 'Core Web Vitals & Bundle Optimization', completed: false },
          { title: 'Unit Testing with Vitest & React Testing Library', completed: false },
        ],
      },
    ];
  }

  if (r.includes('backend') || r.includes('nodejs') || r.includes('api') || r.includes('microservice')) {
    return [
      {
        phaseNumber: 1,
        title: 'Phase 1: Node.js Runtime Architecture, Event Loop & Streams',
        description: 'Libuv event loop, non-blocking asynchronous I/O, Buffer manipulation, and Stream pipelines.',
        status: 'in-progress',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'High-Throughput Stream Processor', description: 'Build an asynchronous streaming file and data pipeline.' },
        resources: [
          { title: 'Node.js Internals & Asynchronous Libuv Engine', completed: false },
          { title: 'Stream Pipelines, Buffers & Backpressure Handling', completed: false },
        ],
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Express.js RESTful API Design, Middleware & Routing',
        description: 'HTTP protocol standards, error-handling middleware, request validation, and routing.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Modular REST API Server', description: 'Deploy a clean REST API with comprehensive schema validation.' },
        resources: [
          { title: 'RESTful Architecture & HTTP Protocol Standards', completed: false },
          { title: 'Express Routing, Controllers & Middleware Architecture', completed: false },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Database Modeling with MongoDB & PostgreSQL',
        description: 'Schema normalization, compound indexing, aggregation pipelines, and transaction isolation.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Dual-Engine Persistence Layer', description: 'Implement an indexed, multi-tenant database persistence layer.' },
        resources: [
          { title: 'MongoDB Aggregation Framework & Index Optimization', completed: false },
          { title: 'PostgreSQL Relational Schema Design & ACID Transactions', completed: false },
        ],
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Authentication, JWT Lifecycles, RBAC & API Security',
        description: 'Bcrypt hashing, refresh token rotation, role-based authorization, rate limiting, and CORS.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Hardened Auth Microservice', description: 'Build a secure authentication and authorization microservice.' },
        resources: [
          { title: 'JWT Token Lifecycles & Security Best Practices', completed: false },
          { title: 'API Rate Limiting, CORS & OWASP Defense', completed: false },
        ],
      },
      {
        phaseNumber: 5,
        title: 'Phase 5: Redis In-Memory Caching & Message Queues',
        description: 'Key-value caching, Pub/Sub patterns, session stores, and asynchronous job processing with BullMQ.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Distributed Cache & Job Worker', description: 'Implement a Redis caching layer with background worker queues.' },
        resources: [
          { title: 'Redis In-Memory Caching & Cache Invalidation Strategies', completed: false },
          { title: 'Asynchronous Background Jobs with BullMQ', completed: false },
        ],
      },
    ];
  }

  if (r.includes('datascientist') || r.includes('datascience')) {
    return [
      {
        phaseNumber: 1,
        title: 'Phase 1: Python for Data Science, Pandas & Data Wrangling',
        description: 'NumPy vectorization, Pandas DataFrame manipulation, missing data imputation, and EDA.',
        status: 'in-progress',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Exploratory Data Analysis Report', description: 'Analyze, clean, and visualize multi-variable structured datasets.' },
        resources: [
          { title: 'Python for Data Analysis & Pandas Vectorization', completed: false },
          { title: 'Statistical Inference & Hypothesis Testing', completed: false },
          { title: 'Data Visualization with Seaborn & Matplotlib', completed: false },
        ],
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Applied Statistics, Probability & Hypothesis Testing',
        description: 'Descriptive metrics, normal distributions, p-values, A/B testing, and regression analysis.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'A/B Experimentation Framework', description: 'Design and validate hypothesis test pipelines with confidence intervals.' },
        resources: [
          { title: 'Hypothesis Testing, Z-Tests & ANOVA', completed: false },
          { title: 'A/B Testing Methodology & Sample Sizing', completed: false },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Classical Machine Learning Algorithms & Scikit-Learn',
        description: 'Linear/logistic regression, decision trees, random forests, gradient boosting, and cross-validation.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Predictive Modeling Pipeline', description: 'Train and tune ML models with hyperparameter search and ROC-AUC evaluation.' },
        resources: [
          { title: 'Supervised Learning & Ensemble Methods (Random Forest, XGBoost)', completed: false },
          { title: 'Feature Selection & Dimensionality Reduction (PCA)', completed: false },
        ],
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Deep Learning Foundations, PyTorch & Neural Networks',
        description: 'Backpropagation, feedforward networks, convolutional networks (CNNs), and PyTorch tensors.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Deep Vision / NLP Classifier', description: 'Train a convolutional or recurrent neural network in PyTorch.' },
        resources: [
          { title: 'PyTorch Deep Learning Foundations', completed: false },
          { title: 'Neural Network Architectures & Optimization', completed: false },
        ],
      },
      {
        phaseNumber: 5,
        title: 'Phase 5: Production MLOps, Model Serving & FastAPI Microservices',
        description: 'FastAPI inference endpoints, MLflow experiment tracking, Docker containerization, and data drift monitoring.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Deployed ML Inference API', description: 'Deploy an automated model inference service on cloud infrastructure.' },
        resources: [
          { title: 'FastAPI High-Performance Inference Endpoints', completed: false },
          { title: 'MLflow & Experiment Tracking', completed: false },
        ],
      },
    ];
  }

  if (r.includes('ai') || r.includes('machinelearning') || r.includes('ml') || r.includes('deeplearning')) {
    return [
      {
        phaseNumber: 1,
        title: 'Phase 1: Advanced Python, Vectorized Math & Matrix Computation',
        description: 'High-performance NumPy operations, linear algebra, multithreading, and algorithmic complexity.',
        status: 'in-progress',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Vector Math & Tensor Engine', description: 'Implement foundational matrix multiplication and tensor routines.' },
        resources: [
          { title: 'Linear Algebra for Machine Learning & Vector Math', completed: false },
          { title: 'High-Performance NumPy Computation', completed: false },
        ],
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Deep Neural Networks, Transformers & Attention Mechanisms',
        description: 'Self-attention, multi-head attention, positional encoding, and transformer architectures.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Transformer Sequence Encoder', description: 'Build and train a multi-head self-attention module in PyTorch.' },
        resources: [
          { title: 'Transformer Architecture & Self-Attention Mechanisms', completed: false },
          { title: 'PyTorch Multi-Head Attention Implementations', completed: false },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Large Language Models (LLMs), Prompt Engineering & Fine-Tuning',
        description: 'OpenAI/Gemini API integration, tokenization, PEFT/LoRA fine-tuning, and model evaluation.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Domain-Adapted LLM Service', description: 'Fine-tune an open-source model using parameter-efficient fine-tuning (LoRA).' },
        resources: [
          { title: 'LLM Prompt Engineering & Structured Outputs', completed: false },
          { title: 'Fine-Tuning Open Source LLMs with LoRA/QLoRA', completed: false },
        ],
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Retrieval-Augmented Generation (RAG) & Vector Databases',
        description: 'Embeddings generation, chunking strategies, vector search with ChromaDB/Pinecone, and reranking.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Production Enterprise RAG System', description: 'Deploy a full hybrid-search RAG pipeline over private knowledge bases.' },
        resources: [
          { title: 'Vector Embeddings, ChromaDB & Similarity Search', completed: false },
          { title: 'Advanced Hybrid Search RAG Architecture', completed: false },
        ],
      },
      {
        phaseNumber: 5,
        title: 'Phase 5: AI Agent Workflows & Production Microservice Serving',
        description: 'Tool calling, multi-agent orchestration, LangChain/LlamaIndex, and high-throughput vLLM serving.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Autonomous Multi-Agent Copilot', description: 'Deploy an autonomous AI agent capable of multi-step tool execution.' },
        resources: [
          { title: 'Autonomous AI Agents & Tool Calling', completed: false },
          { title: 'Deploying High-Throughput Inference Engines (vLLM)', completed: false },
        ],
      },
    ];
  }

  if (r.includes('cloud') || r.includes('aws') || r.includes('azure') || r.includes('gcp')) {
    return [
      {
        phaseNumber: 1,
        title: 'Phase 1: Linux Systems Administration & Networking Protocols',
        description: 'TCP/IP, DNS, OSI layer analysis, systemd services, process management, and SSH hardening.',
        status: 'in-progress',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Hardened Linux Gateway', description: 'Configure an automated, secured Linux gateway with firewall rules.' },
        resources: [
          { title: 'Linux System Administration & Networking Protocols', completed: false },
          { title: 'Bash Automation & Cron Orchestration', completed: false },
        ],
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Docker Containerization & Microservice Architecture',
        description: 'Multi-stage Dockerfiles, image optimization, volume persistence, and docker-compose orchestration.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Optimized Container Fleet', description: 'Containerize multi-tier applications with minimal attack surface images.' },
        resources: [
          { title: 'Docker Container Optimization & Security Scanning', completed: false },
          { title: 'Multi-Container Services with Docker Compose', completed: false },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: AWS Cloud Architecture, VPCs & IAM Governance',
        description: 'Amazon EC2, S3, RDS, VPC peering, subnets, routing tables, and least-privilege IAM policies.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'High-Availability Cloud VPC', description: 'Architect a fault-tolerant, multi-AZ cloud infrastructure.' },
        resources: [
          { title: 'AWS Cloud Architecture & Security Groups', completed: false },
          { title: 'IAM Roles, Policies & Least-Privilege Access', completed: false },
        ],
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Infrastructure as Code (IaC) with Terraform',
        description: 'HCL syntax, provider configuration, state locking with S3/DynamoDB, and reusable modules.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Automated Terraform Infrastructure', description: 'Provision complete multi-environment cloud resources via Terraform.' },
        resources: [
          { title: 'Terraform Modules & Remote State Management', completed: false },
          { title: 'Infrastructure Lifecycle Automation', completed: false },
        ],
      },
      {
        phaseNumber: 5,
        title: 'Phase 5: Kubernetes Cluster Administration & Service Mesh',
        description: 'Pods, Deployments, Services, Ingress controllers, Helm charts, and Istio service mesh.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Production Kubernetes Cluster', description: 'Deploy an auto-scaling Kubernetes cluster with ingress routing.' },
        resources: [
          { title: 'Kubernetes Core Objects & Ingress Controllers', completed: false },
          { title: 'Helm Package Management & ConfigMaps', completed: false },
        ],
      },
    ];
  }

  if (r.includes('devops') || r.includes('sre') || r.includes('cicd')) {
    return [
      {
        phaseNumber: 1,
        title: 'Phase 1: Linux Internals, Git Workflow & Shell Automation',
        description: 'Advanced Git branching, rebasing, Bash automation scripts, and cron task orchestration.',
        status: 'in-progress',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Automated Server Setup Scripts', description: 'Write idempotent bash automation for complete server provisioning.' },
        resources: [
          { title: 'Advanced Git Workflows & Branching Strategies', completed: false },
          { title: 'Shell Scripting & Server Automation', completed: false },
        ],
      },
      {
        phaseNumber: 2,
        title: 'Phase 2: Continuous Integration & Delivery (CI/CD) with GitHub Actions',
        description: 'Pipeline syntax, build matrices, artifact caching, security secret scanning, and automated testing.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Zero-Downtime Deployment Pipeline', description: 'Implement an automated build, test, and release workflow.' },
        resources: [
          { title: 'GitHub Actions CI/CD Pipeline Engineering', completed: false },
          { title: 'Automated Test Runners & Security Scans', completed: false },
        ],
      },
      {
        phaseNumber: 3,
        title: 'Phase 3: Docker & Production Kubernetes Cluster Orchestration',
        description: 'Container security, Kubernetes manifest management, ConfigMaps, Secrets, and HPA autoscaling.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'GitOps Continuous Deployment', description: 'Deploy microservices automatically using ArgoCD and Kubernetes.' },
        resources: [
          { title: 'Kubernetes Manifests & Production Deployment Patterns', completed: false },
          { title: 'GitOps Continuous Delivery with ArgoCD', completed: false },
        ],
      },
      {
        phaseNumber: 4,
        title: 'Phase 4: Infrastructure as Code with Terraform & Ansible',
        description: 'Declarative cloud provisioning, configuration management, and automated cluster bootstrapping.',
        status: 'locked',
        estimatedWeeks: 4,
        completionPercentage: 0,
        milestone: { title: 'Multi-Cloud Automated IaC Fleet', description: 'Provision and configure cloud instances automatically with Terraform and Ansible.' },
        resources: [
          { title: 'Terraform Cloud Provisioning & Module Design', completed: false },
          { title: 'Ansible Configuration Playbooks', completed: false },
        ],
      },
      {
        phaseNumber: 5,
        title: 'Phase 5: Prometheus Observability, Grafana Telemetry & SRE Alerting',
        description: 'Metrics scraping, custom Prometheus exporters, Grafana dashboards, and PagerDuty alert routing.',
        status: 'locked',
        estimatedWeeks: 3,
        completionPercentage: 0,
        milestone: { title: 'Full-Stack Observability Dashboard', description: 'Build real-time monitoring with alerting on latency, errors, and saturation.' },
        resources: [
          { title: 'Prometheus Metrics Scraping & Exporters', completed: false },
          { title: 'Grafana Telemetry Dashboards & SRE Alerting', completed: false },
        ],
      },
    ];
  }

  // Default Full Stack MERN Developer
  return [
    {
      phaseNumber: 1,
      title: 'Phase 1: Modern JavaScript & Asynchronous Foundations',
      description: 'ES6+ modules, lexical scope, event loop, Promises, Fetch API, and modern data structures.',
      status: 'in-progress',
      estimatedWeeks: 3,
      completionPercentage: 0,
      milestone: { title: 'Async JavaScript Utility Library', description: 'Build an asynchronous utility engine with comprehensive unit tests.' },
      resources: [
        { title: 'ES6+ Syntax, Lexical Scope & Closures', completed: false },
        { title: 'Asynchronous JavaScript & Event Loop', completed: false },
      ],
    },
    {
      phaseNumber: 2,
      title: 'Phase 2: React.js Component Architecture & State Management',
      description: 'Virtual DOM, component lifecycles, custom hooks, context API, and modular CSS architecture.',
      status: 'locked',
      estimatedWeeks: 4,
      completionPercentage: 0,
      milestone: { title: 'Interactive Single Page Application', description: 'Develop a responsive frontend application consuming REST APIs.' },
      resources: [
        { title: 'React Component Hierarchy & Props/State Flow', completed: false },
        { title: 'Custom React Hooks & Context API', completed: false },
      ],
    },
    {
      phaseNumber: 3,
      title: 'Phase 3: Node.js Runtime & Express.js REST APIs',
      description: 'Asynchronous event loop, stream processing, middleware pipelines, and RESTful routing standards.',
      status: 'locked',
      estimatedWeeks: 3,
      completionPercentage: 0,
      milestone: { title: 'Scalable REST API Backend', description: 'Deploy a modular Node.js/Express service with request validation.' },
      resources: [
        { title: 'Node.js Runtime & Asynchronous Non-Blocking I/O', completed: false },
        { title: 'Express Routing, Middleware & Error Handlers', completed: false },
      ],
    },
    {
      phaseNumber: 4,
      title: 'Phase 4: MongoDB Schema Design & Aggregation Framework',
      description: 'Document data modeling, compound indexes, aggregation pipelines, and transaction semantics.',
      status: 'locked',
      estimatedWeeks: 3,
      completionPercentage: 0,
      milestone: { title: 'Indexed Database Layer', description: 'Design an indexed MongoDB database layer with aggregation analytics.' },
      resources: [
        { title: 'Mongoose Schemas & Relational Referencing Patterns', completed: false },
        { title: 'MongoDB Aggregation Framework Pipeline Stages', completed: false },
      ],
    },
    {
      phaseNumber: 5,
      title: 'Phase 5: Authentication Security & API Hardening',
      description: 'JWT token lifecycles, bcrypt password hashing, CORS, rate limiting, and RBAC authorization.',
      status: 'locked',
      estimatedWeeks: 3,
      completionPercentage: 0,
      milestone: { title: 'Hardened Authentication Service', description: 'Implement a secure authentication microservice with refresh token rotation.' },
      resources: [
        { title: 'JWT Token Management & Refresh Tokens', completed: false },
        { title: 'Security Headers & Rate Limiting Defense', completed: false },
      ],
    },
    {
      phaseNumber: 6,
      title: 'Phase 6: Full Stack Platform Deployment & CI/CD',
      description: 'Connecting React client with Express backend, MongoDB Atlas, Docker containerization, and cloud deployment.',
      status: 'locked',
      estimatedWeeks: 3,
      completionPercentage: 0,
      milestone: { title: 'Production Full Stack Deployment', description: 'Deploy a complete production MERN web application with automated CI/CD.' },
      resources: [
        { title: 'Full Stack Client-Server Integration', completed: false },
        { title: 'Docker Containerization & Cloud Deployment', completed: false },
      ],
    },
  ];
};

export const generatePathForRole = (role = 'Full Stack Developer') => {
  const phases = getPhasesForRole(role);
  return {
    goal: role,
    title: `${role} Master Roadmap`,
    totalEstimatedWeeks: phases.reduce((acc, p) => acc + p.estimatedWeeks, 0),
    overallProgress: 0,
    currentPhase: 1,
    phases,
    adaptationHistory: [
      { actionTaken: `Calibrated syllabus for ${role}`, reason: 'User profile initialization', timestamp: new Date().toISOString() },
    ],
  };
};

export default generatePathForRole;

export const defaultSkillGapReport = {
  overallReadiness: 0,
  targetRole: 'Full Stack Developer',
  totalRequiredSkills: 6,
  matchedSkillsCount: 0,
  criticalGapsCount: 0,
  skills: [],
};

export const defaultRecommendations = [];

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
