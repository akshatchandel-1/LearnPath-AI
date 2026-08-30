const LearningPath = require('../../models/LearningPath');
const Resource = require('../../models/Resource');
const User = require('../../models/User');

const ROLE_TEMPLATES = {
  'frontend': {
    title: 'Frontend Developer Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'HTML5 Semantics, Modern CSS3 & Responsive Architecture',
        description: 'Semantic tags, Flexbox, CSS Grid, mobile-first design, and CSS custom properties.',
        estimatedWeeks: 3,
        milestone: { title: 'Responsive Design System', description: 'Build an accessible, responsive component library.' },
        requiredSkillNames: ['HTML & CSS', 'Responsive Web Design'],
      },
      {
        phaseNumber: 2,
        title: 'Modern JavaScript (ES6+), Asynchronous Control Flow & DOM',
        description: 'Closures, Event Loop, Promises, Fetch API, and DOM reconciliation patterns.',
        estimatedWeeks: 3,
        milestone: { title: 'Async API Explorer Application', description: 'Create an interactive single-page app consuming REST APIs.' },
        requiredSkillNames: ['JavaScript', 'DOM Manipulation'],
      },
      {
        phaseNumber: 3,
        title: 'React.js Component Architecture, Custom Hooks & Tailwind CSS',
        description: 'JSX, component tree decomposition, useState, useEffect, custom hooks, and Tailwind CSS.',
        estimatedWeeks: 4,
        milestone: { title: 'Full Interactive React Dashboard', description: 'Deliver a production React client with optimized state management.' },
        requiredSkillNames: ['React.js', 'Tailwind CSS'],
      },
      {
        phaseNumber: 4,
        title: 'Global State Management (Zustand/Redux) & TypeScript',
        description: 'Type-safe interfaces, generics, global stores, selectors, and immutable state updates.',
        estimatedWeeks: 3,
        milestone: { title: 'Type-Safe Enterprise Client', description: 'Architect a TypeScript React app with global store hydration.' },
        requiredSkillNames: ['TypeScript', 'State Management'],
      },
      {
        phaseNumber: 5,
        title: 'Web Performance, Accessibility (a11y) & Testing',
        description: 'Core Web Vitals, code-splitting, lazy loading, ARIA roles, and Vitest/Playwright test suites.',
        estimatedWeeks: 3,
        milestone: { title: 'Audit & Test Suite Capstone', description: 'Achieve 95+ Lighthouse score and 90% unit/E2E test coverage.' },
        requiredSkillNames: ['Testing', 'Web Performance'],
      },
    ],
  },

  'backend': {
    title: 'Backend Developer Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Node.js Runtime Architecture, Event Loop & Streams',
        description: 'Libuv event loop, non-blocking asynchronous I/O, Buffer manipulation, and Stream pipelines.',
        estimatedWeeks: 3,
        milestone: { title: 'High-Throughput Stream Processor', description: 'Build an asynchronous streaming file and data pipeline.' },
        requiredSkillNames: ['Node.js', 'Asynchronous Programming'],
      },
      {
        phaseNumber: 2,
        title: 'Express.js RESTful API Design, Middleware & Routing',
        description: 'HTTP protocol standards, error-handling middleware, request validation, and routing.',
        estimatedWeeks: 3,
        milestone: { title: 'Modular REST API Server', description: 'Deploy a clean REST API with comprehensive schema validation.' },
        requiredSkillNames: ['Express.js', 'RESTful APIs'],
      },
      {
        phaseNumber: 3,
        title: 'Database Modeling with MongoDB & PostgreSQL',
        description: 'Schema normalization, compound indexing, aggregation pipelines, and transaction isolation.',
        estimatedWeeks: 4,
        milestone: { title: 'Dual-Engine Persistence Layer', description: 'Implement an indexed, multi-tenant database persistence layer.' },
        requiredSkillNames: ['MongoDB', 'SQL & Relational Databases'],
      },
      {
        phaseNumber: 4,
        title: 'Authentication, JWT Lifecycles, RBAC & API Security',
        description: 'Bcrypt hashing, refresh token rotation, role-based authorization, rate limiting, and CORS.',
        estimatedWeeks: 3,
        milestone: { title: 'Hardened Auth Microservice', description: 'Build a secure authentication and authorization microservice.' },
        requiredSkillNames: ['Web Security & Auth', 'JWT & OAuth'],
      },
      {
        phaseNumber: 5,
        title: 'Redis In-Memory Caching & Message Queues',
        description: 'Key-value caching, Pub/Sub patterns, session stores, and asynchronous job processing with BullMQ.',
        estimatedWeeks: 3,
        milestone: { title: 'Distributed Cache & Job Worker', description: 'Implement a Redis caching layer with asynchronous background worker queues.' },
        requiredSkillNames: ['Redis', 'Distributed Systems'],
      },
    ],
  },

  'datascientist': {
    title: 'Data Scientist Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Python for Data Science, Pandas & Data Wrangling',
        description: 'NumPy vectorization, Pandas DataFrame manipulation, missing data imputation, and EDA.',
        estimatedWeeks: 3,
        milestone: { title: 'Exploratory Data Analysis Report', description: 'Analyze, clean, and visualize multi-variable structured datasets.' },
        requiredSkillNames: ['Python', 'Pandas & NumPy'],
      },
      {
        phaseNumber: 2,
        title: 'Applied Statistics, Probability & Hypothesis Testing',
        description: 'Descriptive metrics, normal distributions, p-values, A/B testing, and regression analysis.',
        estimatedWeeks: 3,
        milestone: { title: 'A/B Experimentation Framework', description: 'Design and validate hypothesis test pipelines with confidence intervals.' },
        requiredSkillNames: ['Applied Statistics', 'Probability'],
      },
      {
        phaseNumber: 3,
        title: 'Classical Machine Learning Algorithms & Scikit-Learn',
        description: 'Linear/logistic regression, decision trees, random forests, gradient boosting, and cross-validation.',
        estimatedWeeks: 4,
        milestone: { title: 'Predictive Modeling Pipeline', description: 'Train and tune ML models with hyperparameter search and ROC-AUC evaluation.' },
        requiredSkillNames: ['Machine Learning', 'Scikit-Learn'],
      },
      {
        phaseNumber: 4,
        title: 'Deep Learning Foundations, PyTorch & Neural Networks',
        description: 'Backpropagation, feedforward networks, convolutional networks (CNNs), and PyTorch tensors.',
        estimatedWeeks: 4,
        milestone: { title: 'Deep Vision / NLP Classifier', description: 'Train a convolutional or recurrent neural network in PyTorch.' },
        requiredSkillNames: ['Deep Learning', 'PyTorch'],
      },
      {
        phaseNumber: 5,
        title: 'Production MLOps, Model Serving & FastAPI Microservices',
        description: 'FastAPI inference endpoints, MLflow experiment tracking, Docker containerization, and data drift monitoring.',
        estimatedWeeks: 3,
        milestone: { title: 'Deployed ML Inference API', description: 'Deploy an automated model inference service on cloud infrastructure.' },
        requiredSkillNames: ['MLOps', 'FastAPI'],
      },
    ],
  },

  'aiengineer': {
    title: 'AI & Machine Learning Engineer Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Advanced Python, Vectorized Math & Matrix Computation',
        description: 'High-performance NumPy operations, linear algebra, multithreading, and algorithmic complexity.',
        estimatedWeeks: 3,
        milestone: { title: 'Vector Math & Tensor Engine', description: 'Implement foundational matrix multiplication and tensor routines.' },
        requiredSkillNames: ['Python', 'NumPy'],
      },
      {
        phaseNumber: 2,
        title: 'Deep Neural Networks, Transformers & Attention Mechanisms',
        description: 'Self-attention, multi-head attention, positional encoding, and transformer architectures.',
        estimatedWeeks: 4,
        milestone: { title: 'Transformer Sequence Encoder', description: 'Build and train a multi-head self-attention module in PyTorch.' },
        requiredSkillNames: ['PyTorch', 'Transformers'],
      },
      {
        phaseNumber: 3,
        title: 'Large Language Models (LLMs), Prompt Engineering & Fine-Tuning',
        description: 'OpenAI/Gemini API integration, tokenization, PEFT/LoRA fine-tuning, and model evaluation.',
        estimatedWeeks: 4,
        milestone: { title: 'Domain-Adapted LLM Service', description: 'Fine-tune an open-source model using parameter-efficient fine-tuning (LoRA).' },
        requiredSkillNames: ['LLM Engineering', 'Prompt Engineering'],
      },
      {
        phaseNumber: 4,
        title: 'Retrieval-Augmented Generation (RAG) & Vector Databases',
        description: 'Embeddings generation, chunking strategies, vector search with ChromaDB/Pinecone, and reranking.',
        estimatedWeeks: 4,
        milestone: { title: 'Production Enterprise RAG System', description: 'Deploy a full hybrid-search RAG pipeline over private knowledge bases.' },
        requiredSkillNames: ['RAG Architecture', 'Vector Databases'],
      },
      {
        phaseNumber: 5,
        title: 'AI Agent Workflows & Production Microservice Serving',
        description: 'Tool calling, multi-agent orchestration, LangChain/LlamaIndex, and high-throughput vLLM serving.',
        estimatedWeeks: 3,
        milestone: { title: 'Autonomous Multi-Agent Copilot', description: 'Deploy an autonomous AI agent capable of multi-step tool execution.' },
        requiredSkillNames: ['AI Agents', 'Model Deployment'],
      },
    ],
  },

  'cloud': {
    title: 'Cloud & Infrastructure Engineer Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Linux Systems Administration & Networking Protocols',
        description: 'TCP/IP, DNS, OSI layer analysis, systemd services, process management, and SSH hardening.',
        estimatedWeeks: 3,
        milestone: { title: 'Hardened Linux Gateway', description: 'Configure an automated, secured Linux gateway with firewall rules.' },
        requiredSkillNames: ['Linux', 'Computer Networking'],
      },
      {
        phaseNumber: 2,
        title: 'Docker Containerization & Microservice Architecture',
        description: 'Multi-stage Dockerfiles, image optimization, volume persistence, and docker-compose orchestration.',
        estimatedWeeks: 3,
        milestone: { title: 'Optimized Container Fleet', description: 'Containerize multi-tier applications with minimal attack surface images.' },
        requiredSkillNames: ['Docker', 'Microservices'],
      },
      {
        phaseNumber: 3,
        title: 'AWS Cloud Architecture, VPCs & IAM Governance',
        description: 'Amazon EC2, S3, RDS, VPC peering, subnets, routing tables, and least-privilege IAM policies.',
        estimatedWeeks: 4,
        milestone: { title: 'High-Availability Cloud VPC', description: 'Architect a fault-tolerant, multi-AZ cloud infrastructure.' },
        requiredSkillNames: ['AWS Cloud', 'IAM Security'],
      },
      {
        phaseNumber: 4,
        title: 'Infrastructure as Code (IaC) with Terraform',
        description: 'HCL syntax, provider configuration, state locking with S3/DynamoDB, and reusable modules.',
        estimatedWeeks: 4,
        milestone: { title: 'Automated Terraform Infrastructure', description: 'Provision complete multi-environment cloud resources via Terraform.' },
        requiredSkillNames: ['Terraform', 'Infrastructure as Code'],
      },
      {
        phaseNumber: 5,
        title: 'Kubernetes Cluster Administration & Service Mesh',
        description: 'Pods, Deployments, Services, Ingress controllers, Helm charts, and Istio service mesh.',
        estimatedWeeks: 4,
        milestone: { title: 'Production Kubernetes Cluster', description: 'Deploy an auto-scaling Kubernetes cluster with ingress routing.' },
        requiredSkillNames: ['Kubernetes', 'Cloud Operations'],
      },
    ],
  },

  'devops': {
    title: 'DevOps & Site Reliability Engineer (SRE) Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Linux Internals, Git Workflow & Shell Automation',
        description: 'Advanced Git branching, rebasing, Bash automation scripts, and cron task orchestration.',
        estimatedWeeks: 3,
        milestone: { title: 'Automated Server Setup Scripts', description: 'Write idempotent bash automation for complete server provisioning.' },
        requiredSkillNames: ['Linux', 'Git & Version Control'],
      },
      {
        phaseNumber: 2,
        title: 'Continuous Integration & Delivery (CI/CD) with GitHub Actions',
        description: 'Pipeline syntax, build matrices, artifact caching, security secret scanning, and automated testing.',
        estimatedWeeks: 3,
        milestone: { title: 'Zero-Downtime Deployment Pipeline', description: 'Implement an automated build, test, and release workflow.' },
        requiredSkillNames: ['CI/CD Pipelines', 'GitHub Actions'],
      },
      {
        phaseNumber: 3,
        title: 'Docker & Production Kubernetes Cluster Orchestration',
        description: 'Container security, Kubernetes manifest management, ConfigMaps, Secrets, and HPA autoscaling.',
        estimatedWeeks: 4,
        milestone: { title: 'GitOps Continuous Deployment', description: 'Deploy microservices automatically using ArgoCD and Kubernetes.' },
        requiredSkillNames: ['Docker', 'Kubernetes'],
      },
      {
        phaseNumber: 4,
        title: 'Infrastructure as Code with Terraform & Ansible',
        description: 'Declarative cloud provisioning, configuration management, and automated cluster bootstrapping.',
        estimatedWeeks: 4,
        milestone: { title: 'Multi-Cloud Automated IaC Fleet', description: 'Provision and configure cloud instances automatically with Terraform and Ansible.' },
        requiredSkillNames: ['Terraform', 'Ansible'],
      },
      {
        phaseNumber: 5,
        title: 'Prometheus Observability, Grafana Telemetry & SRE Alerting',
        description: 'Metrics scraping, custom Prometheus exporters, Grafana dashboards, and PagerDuty alert routing.',
        estimatedWeeks: 3,
        milestone: { title: 'Full-Stack Observability Dashboard', description: 'Build real-time monitoring with alerting on latency, errors, and saturation.' },
        requiredSkillNames: ['Prometheus & Grafana', 'Site Reliability Engineering'],
      },
    ],
  },

  'dataanalyst': {
    title: 'Data Analyst Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Advanced SQL Querying, Joins & Aggregations',
        description: 'Complex inner/outer joins, CTEs, subqueries, group by rollups, and window functions.',
        estimatedWeeks: 3,
        milestone: { title: 'Relational Analytics Portfolio', description: 'Write complex analytical queries on multi-table business databases.' },
        requiredSkillNames: ['SQL', 'Relational Databases'],
      },
      {
        phaseNumber: 2,
        title: 'Data Wrangling, Cleaning & Python with Pandas',
        description: 'Handling missing values, data type casting, string parsing, and pivot tables in Pandas.',
        estimatedWeeks: 3,
        milestone: { title: 'Automated Data Cleansing Pipeline', description: 'Build reusable Python scripts to transform messy business data.' },
        requiredSkillNames: ['Python', 'Pandas'],
      },
      {
        phaseNumber: 3,
        title: 'Business Intelligence & Interactive Dashboarding (PowerBI/Tableau)',
        description: 'Data modeling, DAX measures, calculated columns, interactive drill-downs, and dashboard UX.',
        estimatedWeeks: 4,
        milestone: { title: 'Executive BI Dashboard', description: 'Publish an interactive executive KPI dashboard with real-time filters.' },
        requiredSkillNames: ['PowerBI / Tableau', 'Data Visualization'],
      },
      {
        phaseNumber: 4,
        title: 'Statistical Analysis, Correlation & Business Metrics',
        description: 'Statistical significance, hypothesis testing, cohort analysis, customer churn modeling, and KPIs.',
        estimatedWeeks: 3,
        milestone: { title: 'Business Insights & Churn Analysis', description: 'Deliver statistical findings and revenue recommendations.' },
        requiredSkillNames: ['Statistics', 'Business Analytics'],
      },
    ],
  },

  'cybersecurity': {
    title: 'Cybersecurity & Application Security Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Computer Networking, Protocol Analysis & Wireshark',
        description: 'TCP/IP, UDP, ICMP, DNS, packet capture analysis, subnetting, and network topology mapping.',
        estimatedWeeks: 3,
        milestone: { title: 'Network Traffic Analysis Report', description: 'Analyze packet captures and identify anomalous network communications.' },
        requiredSkillNames: ['Networking', 'Wireshark'],
      },
      {
        phaseNumber: 2,
        title: 'Linux Security, Hardening & Identity Controls',
        description: 'User permission models, sudoers security, PAM authentication, iptables firewalls, and auditd.',
        estimatedWeeks: 3,
        milestone: { title: 'Hardened Operating System Image', description: 'Harden a Linux server against CIS benchmark standards.' },
        requiredSkillNames: ['Linux Hardening', 'Access Controls'],
      },
      {
        phaseNumber: 3,
        title: 'Web Application Security & OWASP Top 10 Vulnerabilities',
        description: 'SQL Injection, XSS, CSRF, SSRF, Broken Object Level Auth (BOLA), and security headers.',
        estimatedWeeks: 4,
        milestone: { title: 'Web App Penetration Test & Report', description: 'Conduct a simulated penetration audit and write remediation guidelines.' },
        requiredSkillNames: ['OWASP Security', 'Penetration Testing'],
      },
      {
        phaseNumber: 4,
        title: 'Cryptography, PKI, SSL/TLS & Secure Protocols',
        description: 'Symmetric/asymmetric encryption, hashing algorithms, digital certificates, and TLS handshakes.',
        estimatedWeeks: 3,
        milestone: { title: 'Secure Cryptographic Service', description: 'Implement an end-to-end encrypted messaging or token verification service.' },
        requiredSkillNames: ['Cryptography', 'PKI'],
      },
      {
        phaseNumber: 5,
        title: 'SIEM Log Monitoring, Threat Hunting & Incident Response',
        description: 'ELK Stack / Splunk log aggregation, rule correlation, intrusion detection (Snort), and IR playbooks.',
        estimatedWeeks: 3,
        milestone: { title: 'Incident Response Playbook & SIEM', description: 'Configure an alert pipeline that detects and mitigates simulated brute-force attacks.' },
        requiredSkillNames: ['SIEM', 'Incident Response'],
      },
    ],
  },

  'softwareengineer': {
    title: 'Software Engineer & Systems Architect Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Data Structures, Algorithms & Time-Space Complexity',
        description: 'Arrays, linked lists, trees, graphs, heaps, dynamic programming, and Big-O notation.',
        estimatedWeeks: 4,
        milestone: { title: 'Algorithm Suite & Complexity Analysis', description: 'Implement and benchmark core graph and dynamic programming algorithms.' },
        requiredSkillNames: ['Data Structures', 'Algorithms'],
      },
      {
        phaseNumber: 2,
        title: 'Object-Oriented Design, Design Patterns & Clean Code',
        description: 'SOLID principles, Factory, Singleton, Observer, Strategy patterns, and modular refactoring.',
        estimatedWeeks: 3,
        milestone: { title: 'Clean Architecture Domain Model', description: 'Architect an extensible, loosely coupled domain model using design patterns.' },
        requiredSkillNames: ['Software Design', 'Design Patterns'],
      },
      {
        phaseNumber: 3,
        title: 'Concurrency, Multithreading & Database Systems',
        description: 'Locks, semaphores, race conditions, ACID transactions, and query optimization.',
        estimatedWeeks: 4,
        milestone: { title: 'Concurrent Data Engine', description: 'Build a thread-safe in-memory key-value store with transaction locking.' },
        requiredSkillNames: ['Concurrency', 'Database Systems'],
      },
      {
        phaseNumber: 4,
        title: 'Distributed Systems Design & Scalable Architecture',
        description: 'CAP theorem, load balancing, horizontal partitioning (sharding), message brokers, and fault tolerance.',
        estimatedWeeks: 4,
        milestone: { title: 'Distributed Systems Architecture Spec', description: 'Draft a production system architecture supporting 100k requests/second.' },
        requiredSkillNames: ['Distributed Systems', 'System Design'],
      },
    ],
  },

  'fullstack': {
    title: 'Full Stack MERN Developer Master Roadmap',
    phases: [
      {
        phaseNumber: 1,
        title: 'Modern JavaScript & Asynchronous Foundations',
        description: 'ES6+ modules, lexical scope, event loop, Promises, Fetch API, and modern data structures.',
        estimatedWeeks: 3,
        milestone: { title: 'Async JavaScript Utility Library', description: 'Build an asynchronous utility engine with comprehensive unit tests.' },
        requiredSkillNames: ['JavaScript', 'HTML & CSS'],
      },
      {
        phaseNumber: 2,
        title: 'React.js Component Architecture & State Management',
        description: 'Virtual DOM, component lifecycles, custom hooks, context API, and modular CSS architecture.',
        estimatedWeeks: 4,
        milestone: { title: 'Interactive Single Page Application', description: 'Develop a responsive frontend application consuming REST APIs.' },
        requiredSkillNames: ['React.js', 'Responsive Web Design'],
      },
      {
        phaseNumber: 3,
        title: 'Node.js Runtime & Express.js REST APIs',
        description: 'Asynchronous event loop, stream processing, middleware pipelines, and RESTful routing standards.',
        estimatedWeeks: 3,
        milestone: { title: 'Scalable REST API Backend', description: 'Deploy a modular Node.js/Express service with request validation.' },
        requiredSkillNames: ['Node.js', 'Express.js'],
      },
      {
        phaseNumber: 4,
        title: 'MongoDB Schema Design & Aggregation Framework',
        description: 'Document data modeling, compound indexes, aggregation pipelines, and transaction semantics.',
        estimatedWeeks: 3,
        milestone: { title: 'Indexed Database Layer', description: 'Design an indexed MongoDB database layer with aggregation analytics.' },
        requiredSkillNames: ['MongoDB', 'Database Design'],
      },
      {
        phaseNumber: 5,
        title: 'Authentication Security & API Hardening',
        description: 'JWT token lifecycles, bcrypt password hashing, CORS, rate limiting, and RBAC authorization.',
        estimatedWeeks: 3,
        milestone: { title: 'Hardened Authentication Service', description: 'Implement a secure authentication microservice with refresh token rotation.' },
        requiredSkillNames: ['Web Security', 'JWT Auth'],
      },
      {
        phaseNumber: 6,
        title: 'Full Stack Platform Deployment & CI/CD',
        description: 'Connecting React client with Express backend, MongoDB Atlas, Docker containerization, and cloud deployment.',
        estimatedWeeks: 3,
        milestone: { title: 'Production Full Stack Deployment', description: 'Deploy a complete production MERN web application with automated CI/CD.' },
        requiredSkillNames: ['Full Stack Integration', 'Cloud Deployment'],
      },
    ],
  },
};

class AdaptivePathService {
  matchTemplateForGoal(goal = '') {
    const g = (goal || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (g.includes('frontend') || g.includes('react') || g.includes('vue') || g.includes('angular') || g.includes('ui')) {
      return ROLE_TEMPLATES.frontend;
    }
    if (g.includes('backend') || g.includes('nodejs') || g.includes('express') || g.includes('api') || g.includes('microservice')) {
      return ROLE_TEMPLATES.backend;
    }
    if (g.includes('datascientist') || g.includes('datascience')) {
      return ROLE_TEMPLATES.datascientist;
    }
    if (g.includes('ai') || g.includes('machinelearning') || g.includes('ml') || g.includes('deeplearning') || g.includes('nlp')) {
      return ROLE_TEMPLATES.aiengineer;
    }
    if (g.includes('cloud') || g.includes('aws') || g.includes('azure') || g.includes('gcp') || g.includes('architect')) {
      return ROLE_TEMPLATES.cloud;
    }
    if (g.includes('devops') || g.includes('sre') || g.includes('reliability') || g.includes('cicd')) {
      return ROLE_TEMPLATES.devops;
    }
    if (g.includes('dataanalyst') || g.includes('dataanalytics') || g.includes('bi') || g.includes('tableau') || g.includes('powerbi')) {
      return ROLE_TEMPLATES.dataanalyst;
    }
    if (g.includes('cyber') || g.includes('security') || g.includes('ethical') || g.includes('infosec')) {
      return ROLE_TEMPLATES.cybersecurity;
    }
    if (g.includes('softwareengineer') || g.includes('algorithms') || g.includes('systemdesign')) {
      return ROLE_TEMPLATES.softwareengineer;
    }
    return ROLE_TEMPLATES.fullstack;
  }

  async generateLearningPath(userId, targetRole) {
    const user = await User.findById(userId);
    const effectiveGoal = targetRole || user?.careerGoal || 'Full Stack MERN Developer';
    const template = this.matchTemplateForGoal(effectiveGoal);

    // Fetch catalog courses from MongoDB to bind real resource IDs
    const allCourses = await Resource.find({}).lean();

    const phases = template.phases.map((tmplPhase, idx) => {
      // Find matching courses for this phase based on skills/keywords
      const matchedCourses = allCourses.filter(c => {
        const titleLower = c.title.toLowerCase();
        const catLower = (c.category || '').toLowerCase();
        return tmplPhase.requiredSkillNames.some(sk => 
          titleLower.includes(sk.toLowerCase()) || catLower.includes(sk.toLowerCase())
        );
      });

      const resources = matchedCourses.length > 0
        ? matchedCourses.slice(0, 3).map(c => ({
            course: c._id,
            title: c.title,
            completed: false,
            estimatedHours: c.durationHours || 4,
          }))
        : tmplPhase.requiredSkillNames.map(sk => ({
            title: `Mastery Module: ${sk}`,
            completed: false,
            estimatedHours: 4,
          }));

      return {
        phaseNumber: tmplPhase.phaseNumber,
        title: tmplPhase.title,
        description: tmplPhase.description,
        status: idx === 0 ? 'in-progress' : 'locked',
        completionPercentage: 0,
        estimatedWeeks: tmplPhase.estimatedWeeks,
        resources,
        milestone: {
          title: tmplPhase.milestone.title,
          description: tmplPhase.milestone.description,
          completed: false,
          requiredResourcesCompleted: 0,
          totalResourcesRequired: resources.length,
        },
      };
    });

    // Deactivate previous paths
    await LearningPath.updateMany({ user: userId }, { active: false });

    // Create new zero-baseline learning path
    const learningPath = await LearningPath.create({
      user: userId,
      goal: effectiveGoal,
      title: `${effectiveGoal} Master Roadmap`,
      phases,
      currentPhase: 1,
      overallProgress: 0,
      active: true,
      adaptationHistory: [
        {
          timestamp: new Date(),
          reason: `Personalized curriculum calibrated for ${effectiveGoal}`,
          changesMade: `Generated ${phases.length} structured phases starting from Phase 1`,
        },
      ],
    });

    return learningPath;
  }

  async adaptLearningPath(userId, reason) {
    const user = await User.findById(userId);
    const incomingGoal = typeof reason === 'object' ? (reason?.goal || reason?.targetRole) : null;
    const targetGoal = incomingGoal || user?.targetRole || user?.careerGoal || 'Full Stack MERN Developer';

    if (incomingGoal && user) {
      user.careerGoal = incomingGoal;
      user.targetRole = incomingGoal;
      await user.save();
    }

    return await this.generateLearningPath(userId, targetGoal);
  }
}

const adaptivePathService = new AdaptivePathService();
module.exports = adaptivePathService;


