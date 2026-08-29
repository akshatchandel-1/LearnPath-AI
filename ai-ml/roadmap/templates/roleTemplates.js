/**
 * LearnPath AI — Role Blueprints & Master Curriculum Templates
 * Provides curated phase and module blueprints for major career tracks.
 */

export const ROLE_TEMPLATES = {
  'mern': {
    targetRole: 'MERN Stack Developer',
    description: 'Master MongoDB, Express.js, React, and Node.js for modern full-stack web applications.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Modern JavaScript & Frontend Essentials',
        skills: ['HTML', 'CSS', 'JavaScript', 'Tailwind', 'Git'],
        modules: [
          { title: 'HTML5 Semantic Layouts & CSS Flexbox/Grid', estimatedHours: 8 },
          { title: 'Modern JavaScript (ES6+), Async/Await & Event Loop', estimatedHours: 14 },
          { title: 'Responsive UI Design with Tailwind CSS', estimatedHours: 6 },
          { title: 'Git Workflows & Version Control Best Practices', estimatedHours: 4 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: React 18, State Architecture & Custom Hooks',
        skills: ['React', 'TypeScript', 'Redux', 'Zustand'],
        modules: [
          { title: 'React 18 Component Hierarchy & Lifecycle', estimatedHours: 12 },
          { title: 'Custom Hooks Design & State Encapsulation', estimatedHours: 10 },
          { title: 'TypeScript Integration with React', estimatedHours: 10 },
          { title: 'Client State Management (Zustand & Context)', estimatedHours: 8 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: Backend API Architecture with Node.js & Express',
        skills: ['Node.js', 'Express', 'REST API', 'WebSockets'],
        modules: [
          { title: 'Node.js Runtime, Event Loop & Streams', estimatedHours: 10 },
          { title: 'RESTful API Engineering with Express & Middleware', estimatedHours: 12 },
          { title: 'JWT Authentication & Security Best Practices (Helmet, CORS)', estimatedHours: 8 },
          { title: 'Real-Time Communication with WebSockets (Socket.io)', estimatedHours: 6 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: MongoDB Database Mastery & Full-Stack Integration',
        skills: ['MongoDB', 'Redis', 'Docker', 'System Design'],
        modules: [
          { title: 'MongoDB Schema Design, Indexing & Aggregation Pipelines', estimatedHours: 14 },
          { title: 'High-Performance In-Memory Caching with Redis', estimatedHours: 8 },
          { title: 'Full-Stack Containerization with Docker Compose', estimatedHours: 8 },
          { title: 'Production Deployment, CI/CD & Monitoring', estimatedHours: 6 }
        ]
      }
    ]
  },

  'frontend': {
    targetRole: 'Frontend Developer',
    description: 'Specialized in UI/UX architecture, performance optimization, and modern web frameworks.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Web Standards & Core JavaScript Foundations',
        skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
        modules: [
          { title: 'Semantic Web, Accessibility (a11y) & Core Web Vitals', estimatedHours: 10 },
          { title: 'Deep JavaScript: Closures, Prototypes, Event Loop', estimatedHours: 15 },
          { title: 'Modern CSS, Animations & Tailwind CSS', estimatedHours: 8 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: React Ecosystem & TypeScript Mastery',
        skills: ['React', 'TypeScript', 'Next.js'],
        modules: [
          { title: 'React 18 Concurrent Rendering & Server Components', estimatedHours: 14 },
          { title: 'TypeScript 5.x for Component Design & Type Safety', estimatedHours: 12 },
          { title: 'Next.js App Router, SSR, SSG & Hybrid Caching', estimatedHours: 14 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: State Management, Data Fetching & Testing',
        skills: ['Redux', 'Zustand', 'React Query', 'Jest'],
        modules: [
          { title: 'Server State Management with TanStack Query', estimatedHours: 8 },
          { title: 'Client State Architecture (Zustand / Redux Toolkit)', estimatedHours: 8 },
          { title: 'Unit & Integration Testing with Vitest & Testing Library', estimatedHours: 10 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: Frontend Performance Profiling & Micro-Frontends',
        skills: ['Performance', 'Webpack', 'Vite', 'CI/CD'],
        modules: [
          { title: 'Bundle Optimization, Tree-Shaking & Code Splitting', estimatedHours: 8 },
          { title: 'Web Workers, WebSockets & Real-time UIs', estimatedHours: 8 },
          { title: 'Frontend System Design & Design System Deployment', estimatedHours: 10 }
        ]
      }
    ]
  },

  'backend': {
    targetRole: 'Backend Developer',
    description: 'Architecting scalable server-side systems, robust microservices, and high-throughput databases.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Server Runtime, Language Mastery & APIs',
        skills: ['Node.js', 'TypeScript', 'REST API', 'Git'],
        modules: [
          { title: 'Server Runtime Architecture & Async I/O', estimatedHours: 12 },
          { title: 'RESTful API Engineering & API Versioning', estimatedHours: 10 },
          { title: 'Authentication, OAuth2 & JWT Security Handshakes', estimatedHours: 8 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: Relational & Distributed Databases',
        skills: ['PostgreSQL', 'SQL', 'MongoDB', 'Redis'],
        modules: [
          { title: 'Advanced SQL, Query Execution Plans & Index Tuning', estimatedHours: 14 },
          { title: 'NoSQL Architectures & Partitioning Strategies', estimatedHours: 10 },
          { title: 'Distributed In-Memory Caching with Redis', estimatedHours: 8 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: Microservices & Message Brokers',
        skills: ['Kafka', 'RabbitMQ', 'gRPC', 'Docker'],
        modules: [
          { title: 'Event-Driven Architecture with Apache Kafka / RabbitMQ', estimatedHours: 14 },
          { title: 'High-Performance RPC Services with gRPC & Protocol Buffers', estimatedHours: 10 },
          { title: 'Containerization & Microservices Networking with Docker', estimatedHours: 8 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: High-Scale System Design & Cloud Deployment',
        skills: ['System Design', 'Kubernetes', 'AWS', 'Observability'],
        modules: [
          { title: 'Distributed Systems: CAP Theorem, Sharding, Consensus', estimatedHours: 16 },
          { title: 'Kubernetes Container Orchestration & Ingress', estimatedHours: 12 },
          { title: 'Logging, Distributed Tracing & Prometheus Monitoring', estimatedHours: 8 }
        ]
      }
    ]
  },

  'data science': {
    targetRole: 'Data Scientist',
    description: 'Transforming complex datasets into predictive machine learning models and actionable insights.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Python Programming, Math & Exploratory Data Analysis',
        skills: ['Python', 'NumPy', 'Pandas', 'Statistics'],
        modules: [
          { title: 'Python for Data Science & Vectorized Computing', estimatedHours: 12 },
          { title: 'Probability, Statistical Inference & Hypothesis Testing', estimatedHours: 14 },
          { title: 'Data Cleaning, Manipulation & Wrangling with Pandas', estimatedHours: 14 },
          { title: 'Exploratory Data Analysis & Visualization (Seaborn/Plotly)', estimatedHours: 8 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: Applied Machine Learning & Predictive Modeling',
        skills: ['Scikit-Learn', 'Regression', 'Classification', 'Feature Engineering'],
        modules: [
          { title: 'Supervised Learning: Linear/Logistic, Trees & Ensembles', estimatedHours: 16 },
          { title: 'Unsupervised Learning: Clustering & Dimensionality Reduction (PCA)', estimatedHours: 10 },
          { title: 'Advanced Feature Engineering & Imbalanced Datasets', estimatedHours: 10 },
          { title: 'Cross-Validation & Model Evaluation Metrics (ROC/AUC, F1)', estimatedHours: 8 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: SQL Warehouses & Big Data Processing',
        skills: ['SQL', 'PostgreSQL', 'PySpark', 'Data Warehouses'],
        modules: [
          { title: 'Advanced SQL Aggregations, Window Functions & CTEs', estimatedHours: 12 },
          { title: 'Distributed Big Data Processing with PySpark', estimatedHours: 14 },
          { title: 'Data Pipeline Design & Feature Stores', estimatedHours: 8 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: Deep Learning Foundations & MLOps Deployment',
        skills: ['PyTorch', 'MLflow', 'FastAPI', 'Docker'],
        modules: [
          { title: 'Deep Neural Networks & Backpropagation with PyTorch', estimatedHours: 16 },
          { title: 'Model Serving via FastAPI Endpoints', estimatedHours: 8 },
          { title: 'MLOps: Experiment Tracking with MLflow & Containerized Deployment', estimatedHours: 10 }
        ]
      }
    ]
  },

  'machine learning': {
    targetRole: 'Machine Learning Engineer',
    description: 'Engineering scalable ML pipelines, model training architectures, and production inference.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Math Foundations, Python & Data Pipeline Core',
        skills: ['Python', 'Linear Algebra', 'Calculus', 'NumPy'],
        modules: [
          { title: 'Linear Algebra & Multivariable Calculus for ML', estimatedHours: 14 },
          { title: 'Advanced Python, NumPy Arrays & Vectorized Matrix Operations', estimatedHours: 12 },
          { title: 'ETL Pipeline Engineering & Data Validation', estimatedHours: 10 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: Deep Learning Architectures with PyTorch',
        skills: ['PyTorch', 'CNN', 'RNN', 'Transformers'],
        modules: [
          { title: 'PyTorch Autograd & Custom Training Loops', estimatedHours: 14 },
          { title: 'Computer Vision Architectures (CNNs, ResNet, Vision Transformers)', estimatedHours: 12 },
          { title: 'Natural Language Processing & Self-Attention Transformers', estimatedHours: 16 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: Generative AI, LLMs & Vector Retrieval',
        skills: ['LLMs', 'RAG', 'Vector Databases', 'LangChain'],
        modules: [
          { title: 'Large Language Model Fine-Tuning (LoRA, QLoRA)', estimatedHours: 14 },
          { title: 'Retrieval-Augmented Generation (RAG) Architectures', estimatedHours: 12 },
          { title: 'Vector Indexing (Pinecone, ChromaDB, HNSW Graphs)', estimatedHours: 8 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: Production MLOps, Model Quantization & Serving',
        skills: ['Docker', 'Kubernetes', 'Triton', 'ONNX', 'MLOps'],
        modules: [
          { title: 'Model Optimization: Quantization, Pruning & ONNX Runtime', estimatedHours: 12 },
          { title: 'High-Throughput Inference Serving with Triton / vLLM', estimatedHours: 12 },
          { title: 'Kubernetes Inference Endpoints, Model Monitoring & Drift Detection', estimatedHours: 12 }
        ]
      }
    ]
  },

  'cloud': {
    targetRole: 'Cloud Engineer',
    description: 'Designing resilient cloud infrastructure, multi-region architectures, and automated provisioning.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Linux Internals, Networking Protocols & Shell Scripting',
        skills: ['Linux', 'Networking', 'Bash', 'Git'],
        modules: [
          { title: 'Linux Administration, Kernel Parameters & Performance Tuning', estimatedHours: 12 },
          { title: 'Computer Networking: OSI Model, TCP/IP, DNS, TLS/SSL, BGP', estimatedHours: 14 },
          { title: 'Bash Automation & System Task Scheduling', estimatedHours: 8 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: Containerization & Cloud Core Services',
        skills: ['Docker', 'AWS', 'GCP', 'IAM'],
        modules: [
          { title: 'Docker Containers: Multi-Stage Builds & Security Sandboxing', estimatedHours: 10 },
          { title: 'AWS Core Services: VPC, EC2, S3, IAM Security Polices', estimatedHours: 16 },
          { title: 'Cloud Networking: Subnets, Route Tables, NAT Gateways & VPN', estimatedHours: 10 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: Infrastructure as Code & Container Orchestration',
        skills: ['Terraform', 'Kubernetes', 'Helm'],
        modules: [
          { title: 'Terraform Modules, Remote State Management & Cloud Workspaces', estimatedHours: 14 },
          { title: 'Kubernetes Architecture: Control Plane, Nodes, Pods, Deployments', estimatedHours: 16 },
          { title: 'Helm Charts Packaging & Ingress Routing', estimatedHours: 8 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: Cloud Security, CI/CD & Multi-Region Resiliency',
        skills: ['CI/CD', 'Security', 'Prometheus', 'Grafana'],
        modules: [
          { title: 'Automated CI/CD Pipelines (GitHub Actions / GitLab CI)', estimatedHours: 10 },
          { title: 'Observability Stack: Prometheus, Grafana & CloudWatch Metrics', estimatedHours: 10 },
          { title: 'Disaster Recovery, Auto-Scaling & Multi-Region Failover', estimatedHours: 12 }
        ]
      }
    ]
  },

  'devops': {
    targetRole: 'DevOps Engineer',
    description: 'Automating release pipelines, infrastructure as code, container orchestration, and reliability.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Systems Foundation, Shell Scripting & Version Control',
        skills: ['Linux', 'Bash', 'Git', 'Networking'],
        modules: [
          { title: 'Linux Systems Administration & Systemd Management', estimatedHours: 12 },
          { title: 'Advanced Bash Scripting & Tooling Automation', estimatedHours: 10 },
          { title: 'Git Branching Strategies, Hooks & Merge Mechanics', estimatedHours: 6 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: Containerization & CI/CD Pipeline Automation',
        skills: ['Docker', 'CI/CD', 'GitHub Actions', 'Jenkins'],
        modules: [
          { title: 'Docker Optimization, Image Security & Rootless Containers', estimatedHours: 10 },
          { title: 'Continuous Integration Pipelines & Automated Test Runners', estimatedHours: 12 },
          { title: 'Continuous Deployment Strategies (Blue-Green, Canary)', estimatedHours: 10 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: Kubernetes Orchestration & Infrastructure as Code',
        skills: ['Kubernetes', 'Terraform', 'Ansible', 'Helm'],
        modules: [
          { title: 'Production Kubernetes Cluster Management & RBAC', estimatedHours: 16 },
          { title: 'Infrastructure as Code with Terraform & Modular State', estimatedHours: 14 },
          { title: 'GitOps Continuous Delivery with ArgoCD & Flux', estimatedHours: 10 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: Site Reliability Engineering (SRE) & Observability',
        skills: ['Prometheus', 'Grafana', 'Security', 'SLOs/SLAs'],
        modules: [
          { title: 'Metrics, Logging & Distributed Tracing (Prometheus, OpenTelemetry)', estimatedHours: 12 },
          { title: 'SRE Principles: Error Budgets, SLOs, SLIs & Incident Automation', estimatedHours: 10 },
          { title: 'DevSecOps: Static Analysis, Container Scanning & Secrets Management', estimatedHours: 10 }
        ]
      }
    ]
  },

  'cybersecurity': {
    targetRole: 'Cybersecurity Engineer',
    description: 'Hardening enterprise systems, vulnerability auditing, incident response, and network defense.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Computer Networking, OS Internals & Cryptography',
        skills: ['Networking', 'Linux', 'Cryptography', 'Python'],
        modules: [
          { title: 'TCP/IP Packet Inspection, Firewalls & Network Protocols', estimatedHours: 14 },
          { title: 'Linux & Windows Security Architecture and File Permissions', estimatedHours: 12 },
          { title: 'Applied Cryptography: Symmetric/Asymmetric Ciphers & PKI', estimatedHours: 10 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: Application Security & Vulnerability Assessment',
        skills: ['AppSec', 'OWASP Top 10', 'Penetration Testing', 'Burp Suite'],
        modules: [
          { title: 'OWASP Top 10 Vulnerabilities Deep Dive & Remediation', estimatedHours: 14 },
          { title: 'Web Application Penetration Testing & Burp Suite Mastery', estimatedHours: 14 },
          { title: 'Secure Code Auditing & Static Analysis (SAST/DAST)', estimatedHours: 10 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: Cloud Security & Identity Governance',
        skills: ['Cloud Security', 'IAM', 'Zero Trust', 'Container Security'],
        modules: [
          { title: 'Cloud Infrastructure Security, IAM Hardening & GuardDuty', estimatedHours: 14 },
          { title: 'Zero Trust Architecture, Network Segmentation & Micro-Perimeters', estimatedHours: 10 },
          { title: 'Container Security, K8s Admission Controllers & Secrets Vault', estimatedHours: 10 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: Threat Intelligence, SIEM & Incident Response',
        skills: ['SIEM', 'SOC', 'Incident Response', 'Threat Hunting'],
        modules: [
          { title: 'SIEM Operations, Splunk / ELK Telemetry & Rule Crafting', estimatedHours: 14 },
          { title: 'Incident Response Lifecycle, Forensics & Memory Analysis', estimatedHours: 12 },
          { title: 'Threat Modeling (STRIDE/DREAD) & Compliance Standards (SOC2, ISO)', estimatedHours: 8 }
        ]
      }
    ]
  },

  'full stack': {
    targetRole: 'Full Stack Developer',
    description: 'Comprehensive software engineering bridging responsive frontends, robust backends, and cloud deployment.',
    phases: [
      {
        phase: 1,
        title: 'Phase 1: Web Foundations & Core Programming Mechanics',
        skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
        modules: [
          { title: 'Semantic Web Architecture, CSS Grid/Flexbox & DOM API', estimatedHours: 10 },
          { title: 'Advanced JavaScript (ES6+), Event Loop & Design Patterns', estimatedHours: 14 },
          { title: 'Git Collaboration, Branching & Code Reviews', estimatedHours: 4 }
        ]
      },
      {
        phase: 2,
        title: 'Phase 2: Modern Frontend Architecture & TypeScript',
        skills: ['React', 'TypeScript', 'Next.js', 'State Management'],
        modules: [
          { title: 'React 18 Component Patterns, Hooks & Render Optimization', estimatedHours: 14 },
          { title: 'TypeScript 5.x Type System for Enterprise Codebases', estimatedHours: 12 },
          { title: 'Full-Stack React Frameworks (Next.js App Router & SSR)', estimatedHours: 12 }
        ]
      },
      {
        phase: 3,
        title: 'Phase 3: Backend APIs, Relational & Document Databases',
        skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
        modules: [
          { title: 'REST & GraphQL API Design with Node.js/Express', estimatedHours: 12 },
          { title: 'Relational Database Schema Design & Query Optimization (PostgreSQL)', estimatedHours: 12 },
          { title: 'Document Data Stores & Caching (MongoDB, Redis)', estimatedHours: 10 }
        ]
      },
      {
        phase: 4,
        title: 'Phase 4: Cloud Infrastructure, CI/CD & System Design',
        skills: ['Docker', 'AWS', 'CI/CD', 'System Design'],
        modules: [
          { title: 'Docker Containerization & Multi-Service Orchestration', estimatedHours: 10 },
          { title: 'Automated CI/CD Pipelines & Cloud Deployment (AWS)', estimatedHours: 10 },
          { title: 'High-Scale System Architecture, Caching & Load Balancing', estimatedHours: 14 }
        ]
      }
    ]
  }
};

/**
 * Dynamically synthesizes a complete 4-phase role blueprint for any arbitrary custom role.
 */
export const createGenericBlueprint = (roleName) => {
  const cleanTitle = roleName ? roleName.trim() : 'Software Engineering Specialist';
  return {
    targetRole: cleanTitle,
    description: `Comprehensive competency curriculum designed for ${cleanTitle}.`,
    phases: [
      {
        phase: 1,
        title: `Phase 1: Foundations & Core Principles for ${cleanTitle}`,
        skills: [`${cleanTitle} Fundamentals`, 'Syntax & Tooling', 'Core Standards', 'Git'],
        modules: [
          { title: `Core Syntax, Environmental Setup & Tooling for ${cleanTitle}`, estimatedHours: 10 },
          { title: `Foundational Architecture & Problem Solving`, estimatedHours: 12 },
          { title: `Version Control & Code Quality Standards`, estimatedHours: 6 }
        ]
      },
      {
        phase: 2,
        title: `Phase 2: Applied Engineering & Core Frameworks`,
        skills: [`${cleanTitle} Frameworks`, 'Design Patterns', 'Data Modeling', 'Testing'],
        modules: [
          { title: `Primary Frameworks & Design Patterns in ${cleanTitle}`, estimatedHours: 14 },
          { title: `Data Modeling, State Management & API Integration`, estimatedHours: 12 },
          { title: `Unit Testing & Integration Verification`, estimatedHours: 8 }
        ]
      },
      {
        phase: 3,
        title: `Phase 3: Advanced Architecture & Production Scaling`,
        skills: ['Advanced Patterns', 'Performance Optimization', 'Security', 'APIs'],
        modules: [
          { title: `Advanced Optimization & Performance Profiling for ${cleanTitle}`, estimatedHours: 14 },
          { title: `Security Hardening & Production Error Resilience`, estimatedHours: 10 },
          { title: `High-Throughput Architectural Integrations`, estimatedHours: 10 }
        ]
      },
      {
        phase: 4,
        title: `Phase 4: Production Deployment & Capstone Milestone`,
        skills: ['Cloud Deployment', 'CI/CD', 'Observability', 'Capstone Project'],
        modules: [
          { title: `Containerization & Automated Cloud Deployment`, estimatedHours: 10 },
          { title: `Telemetry, Monitoring & Production Operations`, estimatedHours: 8 },
          { title: `End-to-End Enterprise Capstone Project for ${cleanTitle}`, estimatedHours: 16 }
        ]
      }
    ]
  };
};

/**
 * Resolves the matching role blueprint or synthesizes a generic blueprint.
 */
export const getRoleTemplate = (roleName = '') => {
  if (!roleName || typeof roleName !== 'string') {
    return ROLE_TEMPLATES['mern'];
  }

  const query = roleName.toLowerCase();
  
  for (const [key, template] of Object.entries(ROLE_TEMPLATES)) {
    if (query.includes(key) || template.targetRole.toLowerCase().includes(query)) {
      return template;
    }
  }

  // Common aliases
  if (query.includes('fullstack') || query.includes('full stack') || query.includes('web developer')) {
    return ROLE_TEMPLATES['full stack'];
  }
  if (query.includes('react') || query.includes('ui') || query.includes('javascript developer')) {
    return ROLE_TEMPLATES['frontend'];
  }
  if (query.includes('node') || query.includes('api') || query.includes('express') || query.includes('java') || query.includes('golang')) {
    return ROLE_TEMPLATES['backend'];
  }
  if (query.includes('ai') || query.includes('deep learning') || query.includes('nlp') || query.includes('llm')) {
    return ROLE_TEMPLATES['machine learning'];
  }
  if (query.includes('security') || query.includes('infosec') || query.includes('soc') || query.includes('pentest')) {
    return ROLE_TEMPLATES['cybersecurity'];
  }
  if (query.includes('sre') || query.includes('kubernetes') || query.includes('docker') || query.includes('infrastructure')) {
    return ROLE_TEMPLATES['devops'];
  }
  if (query.includes('aws') || query.includes('azure') || query.includes('gcp') || query.includes('cloud')) {
    return ROLE_TEMPLATES['cloud'];
  }

  return createGenericBlueprint(roleName);
};
