/**
 * LearnPath AI — Centralized Skill Benchmark Taxonomy
 * Defines role competencies, target proficiency thresholds, importance weights,
 * category classifications, and actionable improvement suggestions for CS careers.
 */

const SKILL_BENCHMARKS = {
  'MERN Stack Developer': {
    role: 'MERN Stack Developer',
    category: 'Web Development',
    aliases: [
      'mern stack developer', 'mern developer', 'mern stack', 'mern',
      'full stack mern', 'mern engineer'
    ],
    description: 'Builds full-stack JavaScript applications leveraging MongoDB, Express.js, React, and Node.js.',
    skills: [
      {
        name: 'JavaScript',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'Programming',
        suggestion: 'Strengthen asynchronous control flow (Promises, async/await), event loop mechanics, ES6+ modules, and closure patterns.'
      },
      {
        name: 'React.js',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'Frontend',
        suggestion: 'Master custom hooks, Context API, state reconciliation, memoization (useMemo/useCallback), and component tree performance.'
      },
      {
        name: 'Node.js',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'Backend',
        suggestion: 'Deep dive into event-driven architecture, non-blocking I/O, streams, process clustering, and middleware composition.'
      },
      {
        name: 'Express.js',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Backend',
        suggestion: 'Construct robust RESTful routing, centralized error handlers, input validation layers, and security middleware.'
      },
      {
        name: 'MongoDB',
        targetLevel: 75,
        weight: 1.0,
        isCore: true,
        category: 'Database',
        suggestion: 'Design document schemas, implement compound indexes, build aggregation pipelines, and optimize Mongoose query execution.'
      },
      {
        name: 'REST APIs',
        targetLevel: 80,
        weight: 0.9,
        isCore: true,
        category: 'API Design',
        suggestion: 'Design stateless RESTful endpoints, standard HTTP status codes, idempotency controls, and JSON contract validation.'
      },
      {
        name: 'Authentication & Security',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Security',
        suggestion: 'Implement JWT auth tokens, refresh token rotation, bcrypt password hashing, CORS configuration, and sanitize against injection.'
      },
      {
        name: 'HTML & CSS',
        targetLevel: 80,
        weight: 0.8,
        isCore: false,
        category: 'Frontend',
        suggestion: 'Strengthen semantic HTML5, Flexbox, CSS Grid layouts, and responsive media query techniques.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Master git feature branching, interactive rebasing, merge conflict resolution, and collaborative pull request reviews.'
      },
      {
        name: 'Docker & Containerization',
        targetLevel: 65,
        weight: 0.7,
        isCore: false,
        category: 'DevOps',
        suggestion: 'Containerize multi-container MERN web applications using multi-stage Dockerfiles and Docker Compose.'
      }
    ]
  },

  'Frontend Developer': {
    role: 'Frontend Developer',
    category: 'Web Development',
    aliases: [
      'frontend developer', 'frontend engineer', 'front-end developer', 'front end developer',
      'ui engineer', 'react developer', 'web frontend'
    ],
    description: 'Designs and builds responsive, accessible, and high-performance client-side user interfaces.',
    skills: [
      {
        name: 'HTML & CSS',
        targetLevel: 95,
        weight: 1.2,
        isCore: true,
        category: 'Frontend',
        suggestion: 'Master semantic markup, CSS Grid, Flexbox, media queries, CSS variables, and accessibility (a11y/WCAG) compliance.'
      },
      {
        name: 'JavaScript',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Programming',
        suggestion: 'Deep dive into DOM manipulation, modern ES Next features, browser APIs, event bubbling, and asynchronous programming.'
      },
      {
        name: 'React.js',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Frontend',
        suggestion: 'Master component lifecycles, custom hooks, context, memoization, error boundaries, and client state management.'
      },
      {
        name: 'TypeScript',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Programming',
        suggestion: 'Adopt static typing for React props, component state interfaces, generics, utility types, and API response models.'
      },
      {
        name: 'Tailwind CSS',
        targetLevel: 85,
        weight: 0.9,
        isCore: false,
        category: 'Frontend',
        suggestion: 'Build scalable design systems using Tailwind utility classes, custom theme extensions, and dark mode theming.'
      },
      {
        name: 'Next.js',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Frontend',
        suggestion: 'Master Server-Side Rendering (SSR), Static Site Generation (SSG), dynamic routing, and Next.js App Router.'
      },
      {
        name: 'REST APIs',
        targetLevel: 80,
        weight: 0.9,
        isCore: false,
        category: 'API Integration',
        suggestion: 'Master async HTTP requests using Fetch/Axios, caching with TanStack Query, optimistic UI updates, and error handling.'
      },
      {
        name: 'Web Performance & CWV',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'Optimization',
        suggestion: 'Optimize Core Web Vitals (LCP, INP, CLS), code-splitting, lazy loading, image optimization, and bundle analysis.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Utilize feature branch workflows, git rebase, code review etiquette, and semantic commit hygiene.'
      }
    ]
  },

  'Backend Developer': {
    role: 'Backend Developer',
    category: 'Web Development',
    aliases: [
      'backend developer', 'backend engineer', 'back-end developer', 'back end developer',
      'server side developer', 'api engineer', 'node backend developer'
    ],
    description: 'Architects robust server systems, RESTful & GraphQL APIs, microservices, and databases.',
    skills: [
      {
        name: 'Node.js',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Backend',
        suggestion: 'Master process management, clustering, libuv event loop, streams, memory profiling, and non-blocking I/O.'
      },
      {
        name: 'Express.js',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Backend',
        suggestion: 'Build modular controllers, validation middleware, rate-limiting, CORS policies, and centralized error pipelines.'
      },
      {
        name: 'SQL & Relational Databases',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Database',
        suggestion: 'Design normalized schemas, manage foreign key indexes, transaction ACID isolation, and optimize complex JOIN queries.'
      },
      {
        name: 'PostgreSQL',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Database',
        suggestion: 'Master PostgreSQL advanced data types (JSONB), window functions, CTEs, connection pooling, and indexing strategies.'
      },
      {
        name: 'REST & GraphQL APIs',
        targetLevel: 85,
        weight: 1.0,
        isCore: true,
        category: 'API Design',
        suggestion: 'Create scalable API endpoints following REST constraints, GraphQL schemas/resolvers, pagination, and caching.'
      },
      {
        name: 'Authentication & Security',
        targetLevel: 85,
        weight: 1.0,
        isCore: true,
        category: 'Security',
        suggestion: 'Secure APIs with JWT, refresh token rotation, OAuth2/OIDC, bcrypt hashing, rate limiting, and helmet headers.'
      },
      {
        name: 'MongoDB & NoSQL',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Database',
        suggestion: 'Design document schemas, aggregation pipelines, replica sets, and query optimization for unstructured data.'
      },
      {
        name: 'Redis & Caching',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Infrastructure',
        suggestion: 'Implement caching layers, session stores, rate limiters, pub/sub messaging, and cache invalidation strategies.'
      },
      {
        name: 'Docker & Containerization',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'DevOps',
        suggestion: 'Build lightweight Docker images for backend microservices and configure multi-service Docker Compose networks.'
      },
      {
        name: 'System Design & Scalability',
        targetLevel: 75,
        weight: 0.9,
        isCore: true,
        category: 'Architecture',
        suggestion: 'Study horizontal scaling, load balancing, message queues (RabbitMQ/Kafka), caching, and database sharding.'
      }
    ]
  },

  'Full Stack Developer': {
    role: 'Full Stack Developer',
    category: 'Web Development',
    aliases: [
      'full stack developer', 'fullstack developer', 'full stack engineer', 'fullstack engineer',
      'full stack', 'fullstack', 'web developer'
    ],
    description: 'Coordinates end-to-end development of web platforms across frontend, backend, and persistence tiers.',
    skills: [
      {
        name: 'JavaScript',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'Programming',
        suggestion: 'Master client and server execution contexts, modern ES Next syntax, asynchronous async/await, and design patterns.'
      },
      {
        name: 'React.js',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Frontend',
        suggestion: 'Build component hierarchies, custom hooks, global state management, and efficient data-fetching pipelines.'
      },
      {
        name: 'Node.js',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'Backend',
        suggestion: 'Develop backend APIs, manage server asynchronous flows, handle file streaming, and integrate third-party services.'
      },
      {
        name: 'Express.js',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Backend',
        suggestion: 'Implement structured REST API routing, schema validation, middleware chaining, and error handling.'
      },
      {
        name: 'SQL & Relational Databases',
        targetLevel: 75,
        weight: 1.0,
        isCore: true,
        category: 'Database',
        suggestion: 'Design relational database schemas, foreign keys, transaction handling, and perform query profiling.'
      },
      {
        name: 'MongoDB',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Database',
        suggestion: 'Model document collections and create aggregation queries with MongoDB and Mongoose.'
      },
      {
        name: 'HTML & CSS',
        targetLevel: 80,
        weight: 0.9,
        isCore: false,
        category: 'Frontend',
        suggestion: 'Ensure responsive design foundations, accessible DOM structure, Flexbox, and CSS Grid layouts.'
      },
      {
        name: 'REST APIs',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'API Integration',
        suggestion: 'Bridge frontend and backend services with standardized REST API contracts and clear HTTP status semantics.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Manage full-stack repositories, branch protection rules, interactive rebases, and pull request reviews.'
      },
      {
        name: 'Docker & Containerization',
        targetLevel: 70,
        weight: 0.8,
        isCore: false,
        category: 'DevOps',
        suggestion: 'Package full-stack web applications and databases into deployable multi-container setups.'
      }
    ]
  },

  'Software Engineer': {
    role: 'Software Engineer',
    category: 'Core Software Engineering',
    aliases: [
      'software engineer', 'software developer', 'swe', 'software development engineer', 'sde'
    ],
    description: 'Designs reliable algorithms, writes clean maintainable code, and builds robust software architectures.',
    skills: [
      {
        name: 'Data Structures & Algorithms',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Computer Science',
        suggestion: 'Solve algorithmic challenges with trees, graphs, heaps, dynamic programming, and Big-O computational analysis.'
      },
      {
        name: 'System Design & Architecture',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'Architecture',
        suggestion: 'Study distributed system patterns, caching, database indexing, load balancing, and CAP theorem trade-offs.'
      },
      {
        name: 'Python Programming',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Programming',
        suggestion: 'Write clean modular code, unit tests, object-oriented design patterns, and efficient data processing scripts.'
      },
      {
        name: 'JavaScript',
        targetLevel: 80,
        weight: 1.0,
        isCore: false,
        category: 'Programming',
        suggestion: 'Master core object-oriented and functional programming paradigms in JavaScript.'
      },
      {
        name: 'SQL & Relational Databases',
        targetLevel: 75,
        weight: 0.9,
        isCore: true,
        category: 'Database',
        suggestion: 'Design database schemas, foreign key constraints, indexes, and optimize query plans.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 80,
        weight: 0.8,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Utilize trunk-based branching, interactive rebasing, and clean git commit history.'
      },
      {
        name: 'Docker & Containerization',
        targetLevel: 70,
        weight: 0.8,
        isCore: false,
        category: 'DevOps',
        suggestion: 'Package applications for reproducible local development and production environments.'
      },
      {
        name: 'Software Testing & QA',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Quality Assurance',
        suggestion: 'Write automated unit, integration, and mock tests with Jest/PyTest to ensure code resilience.'
      }
    ]
  },

  'Data Scientist': {
    role: 'Data Scientist',
    category: 'Data Science & AI',
    aliases: [
      'data scientist', 'data science', 'ds', 'applied scientist'
    ],
    description: 'Extracts statistical insights, builds predictive ML models, and communicates data-driven business intelligence.',
    skills: [
      {
        name: 'Python Programming',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'Programming',
        suggestion: 'Master advanced Python scripting, OOP abstractions, list/dict comprehensions, and vectorized data operations.'
      },
      {
        name: 'Machine Learning Algorithms',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'Machine Learning',
        suggestion: 'Focus on supervised learning, model evaluation, feature engineering, cross-validation, and practical ML projects.'
      },
      {
        name: 'Pandas & Data Wrangling',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Data Engineering',
        suggestion: 'Perform robust dataset transformation, categorical encoding, handling missing data, and complex aggregations.'
      },
      {
        name: 'Applied Statistics & Probability',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'Mathematics',
        suggestion: 'Master hypothesis testing (p-values, t-tests, ANOVA), probability distributions, and A/B test analysis.'
      },
      {
        name: 'SQL & Relational Databases',
        targetLevel: 75,
        weight: 1.0,
        isCore: true,
        category: 'Database',
        suggestion: 'Write advanced analytical SQL queries with CTEs, window functions, and multi-table aggregations.'
      },
      {
        name: 'Data Visualization & BI',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Analytics',
        suggestion: 'Create informative statistical plots using Matplotlib/Seaborn and interactive business dashboards.'
      },
      {
        name: 'Deep Learning & Neural Networks',
        targetLevel: 70,
        weight: 0.9,
        isCore: false,
        category: 'Machine Learning',
        suggestion: 'Understand multi-layer perceptrons, backpropagation, activation functions, and basic PyTorch model training.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 70,
        weight: 0.8,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Track analytical code, Jupyter notebooks, and experiment scripts with Git.'
      }
    ]
  },

  'Data Analyst': {
    role: 'Data Analyst',
    category: 'Data Science & AI',
    aliases: [
      'data analyst', 'bi analyst', 'business intelligence analyst', 'data analytics'
    ],
    description: 'Analyzes business data trends, crafts executive dashboards, and delivers actionable BI reporting.',
    skills: [
      {
        name: 'SQL & Relational Databases',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Database',
        suggestion: 'Master advanced SQL queries, window functions, CTEs, rollups, and complex aggregation pipelines.'
      },
      {
        name: 'Data Visualization & BI',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Analytics',
        suggestion: 'Build executive dashboards, storytelling visuals, and metric KPI monitoring with PowerBI / Tableau.'
      },
      {
        name: 'Pandas & Data Wrangling',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'Data Engineering',
        suggestion: 'Manipulate tabular data, cleanse duplicates, impute null values, and calculate business aggregations.'
      },
      {
        name: 'Applied Statistics & Probability',
        targetLevel: 75,
        weight: 1.0,
        isCore: true,
        category: 'Mathematics',
        suggestion: 'Conduct A/B testing, cohort analysis, variance estimation, and trend forecasting.'
      },
      {
        name: 'Python Programming',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Programming',
        suggestion: 'Automate data extraction, cleaning scripts, and basic statistical reporting with Python.'
      },
      {
        name: 'Excel & Spreadsheets',
        targetLevel: 80,
        weight: 0.8,
        isCore: false,
        category: 'Analytics',
        suggestion: 'Master pivot tables, VLOOKUP/XLOOKUP, index-match formulas, and macro automation in Excel.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 65,
        weight: 0.7,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Track analysis scripts and query definitions in Git repositories.'
      }
    ]
  },

  'Machine Learning Engineer': {
    role: 'Machine Learning Engineer',
    category: 'Data Science & AI',
    aliases: [
      'machine learning engineer', 'ml engineer', 'mle', 'ml engineer / researcher'
    ],
    description: 'Designs, trains, and deploys production machine learning pipelines and deep learning models.',
    skills: [
      {
        name: 'Python Programming',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Programming',
        suggestion: 'Master advanced Python, performance optimization, multithreading, and OOP model abstractions.'
      },
      {
        name: 'Machine Learning Algorithms',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Machine Learning',
        suggestion: 'Build robust training pipelines, feature engineering, hyperparameter tuning, and model validation.'
      },
      {
        name: 'Deep Learning & Neural Networks',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'Machine Learning',
        suggestion: 'Master backpropagation, CNNs, Transformers, attention mechanisms, and custom loss functions.'
      },
      {
        name: 'PyTorch / TensorFlow',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Frameworks',
        suggestion: 'Implement models in PyTorch, handle GPU data loaders, distributed training, and model export (ONNX).'
      },
      {
        name: 'Pandas & NumPy',
        targetLevel: 85,
        weight: 1.0,
        isCore: true,
        category: 'Data Engineering',
        suggestion: 'Optimize matrix calculations, vector operations, and custom numerical routines.'
      },
      {
        name: 'MLOps & Model Deployment',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Deploy ML inference APIs using FastAPI, Docker, model registry (MLflow), and monitor drift.'
      },
      {
        name: 'Docker & Containerization',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'DevOps',
        suggestion: 'Package ML inference services into containerized microservices for reproducible scaling.'
      },
      {
        name: 'SQL & Data Ingestion Pipelines',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Database',
        suggestion: 'Construct automated data ingestion queries and feature stores for model training.'
      }
    ]
  },

  'AI Engineer': {
    role: 'AI Engineer',
    category: 'Data Science & AI',
    aliases: [
      'ai engineer', 'generative ai engineer', 'genai engineer', 'artificial intelligence engineer', 'llm engineer'
    ],
    description: 'Builds intelligent applications powered by Large Language Models, RAG systems, and AI APIs.',
    skills: [
      {
        name: 'Python Programming',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Programming',
        suggestion: 'Develop asynchronous Python services, API client integrations, and prompt orchestration.'
      },
      {
        name: 'LLM Engineering & Prompting',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'GenAI',
        suggestion: 'Master few-shot prompting, structured JSON schema outputs, function calling, and token optimization.'
      },
      {
        name: 'RAG & Vector Databases',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'GenAI',
        suggestion: 'Build retrieval pipelines with semantic chunking, dense vector embeddings, reranking, and vector DBs (Pinecone/Chroma).'
      },
      {
        name: 'LangChain / LlamaIndex',
        targetLevel: 85,
        weight: 1.0,
        isCore: true,
        category: 'GenAI',
        suggestion: 'Construct multi-step agent chains, tool integrations, memory mechanisms, and evaluation evaluators.'
      },
      {
        name: 'Machine Learning Algorithms',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Machine Learning',
        suggestion: 'Understand classification, cosine similarity, embeddings geometry, and evaluation metrics.'
      },
      {
        name: 'REST APIs',
        targetLevel: 85,
        weight: 1.0,
        isCore: true,
        category: 'API Design',
        suggestion: 'Expose AI agent endpoints via FastAPI / Express microservices with streaming SSE responses.'
      },
      {
        name: 'Docker & Containerization',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'DevOps',
        suggestion: 'Containerize AI agents and local vector stores for scalable deployment.'
      },
      {
        name: 'Data Structures & Algorithms',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'Computer Science',
        suggestion: 'Optimize graph traversal, priority queues, and indexing for retrieval agents.'
      }
    ]
  },

  'Cloud Engineer': {
    role: 'Cloud Engineer',
    category: 'Cloud & Infrastructure',
    aliases: [
      'cloud engineer', 'cloud architect', 'aws engineer', 'azure engineer', 'cloud infrastructure engineer'
    ],
    description: 'Architects and maintains reliable, secure, and scalable cloud infrastructure and serverless solutions.',
    skills: [
      {
        name: 'AWS Cloud Fundamentals',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Cloud Infrastructure',
        suggestion: 'Master VPC subnet architecture, IAM least privilege, EC2, S3, RDS, and Lambda serverless.'
      },
      {
        name: 'Linux & Shell Scripting',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Systems',
        suggestion: 'Write robust bash scripts, manage systemd services, SSH keys, cron jobs, and network diagnostics.'
      },
      {
        name: 'Docker & Containerization',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Design multi-stage container builds, security vulnerability scanning, and Docker Compose.'
      },
      {
        name: 'Kubernetes & Orchestration',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Manage cluster deployments, services, ingress routing, ConfigMaps, and horizontal pod autoscaling.'
      },
      {
        name: 'Terraform & IaC',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Define reproducible cloud infrastructure using declarative Terraform state and modular configurations.'
      },
      {
        name: 'Cloud Networking & VPCs',
        targetLevel: 75,
        weight: 1.0,
        isCore: true,
        category: 'Networking',
        suggestion: 'Configure routing tables, CIDR blocks, NAT gateways, VPN peering, and DNS resolution.'
      },
      {
        name: 'CI/CD Pipelines & Automation',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'DevOps',
        suggestion: 'Implement Infrastructure-as-Code pipelines with GitHub Actions and automated compliance checks.'
      },
      {
        name: 'Cloud Security & IAM',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'Security',
        suggestion: 'Enforce principle of least privilege, IAM role assumption, KMS encryption at rest, and security auditing.'
      }
    ]
  },

  'DevOps Engineer': {
    role: 'DevOps Engineer',
    category: 'Cloud & Infrastructure',
    aliases: [
      'devops engineer', 'devops', 'platform engineer', 'release engineer', 'sre / devops', 'sre'
    ],
    description: 'Automates deployment lifecycles, builds robust CI/CD pipelines, and manages container orchestration.',
    skills: [
      {
        name: 'Docker & Containerization',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Optimize minimal Docker image sizes, multi-stage caching, and rootless container security.'
      },
      {
        name: 'Kubernetes & Orchestration',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Configure Helm charts, stateful sets, network policies, cluster ingress, and telemetry.'
      },
      {
        name: 'CI/CD Pipelines & Automation',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Construct automated build, lint, unit test, and blue-green deployment pipelines.'
      },
      {
        name: 'Linux & Shell Scripting',
        targetLevel: 90,
        weight: 1.1,
        isCore: true,
        category: 'Systems',
        suggestion: 'Master Linux kernel fundamentals, file permissions, cron automation, and system diagnostics.'
      },
      {
        name: 'Terraform & IaC',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'DevOps',
        suggestion: 'Manage cloud infrastructure provisioning with declarative Terraform configurations.'
      },
      {
        name: 'AWS Cloud Fundamentals',
        targetLevel: 80,
        weight: 1.1,
        isCore: true,
        category: 'Cloud Infrastructure',
        suggestion: 'Manage cloud compute resources, security groups, CloudWatch logging, and IAM roles.'
      },
      {
        name: 'Monitoring & Telemetry',
        targetLevel: 75,
        weight: 1.0,
        isCore: true,
        category: 'Observability',
        suggestion: 'Set up Prometheus metric scraping, Grafana alert dashboards, and distributed tracing.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 80,
        weight: 0.8,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Implement trunk-based development, semantic tag releases, and automated changelogs.'
      }
    ]
  },

  'Cybersecurity Engineer': {
    role: 'Cybersecurity Engineer',
    category: 'Security',
    aliases: [
      'cybersecurity engineer', 'security engineer', 'information security', 'infosec', 'cyber security'
    ],
    description: 'Protects systems, networks, and data by identifying vulnerabilities, threat modeling, and defense.',
    skills: [
      {
        name: 'Network & System Security',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Security',
        suggestion: 'Analyze network packets with Wireshark, configure firewalls, VPNs, and detect intrusion anomalies.'
      },
      {
        name: 'Authentication & Security',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Security',
        suggestion: 'Master cryptographic primitives, PKI infrastructure, OAuth2/OIDC, and zero-trust authentication.'
      },
      {
        name: 'Linux & Shell Scripting',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Systems',
        suggestion: 'Perform Linux log auditing, rootkit analysis, and write security automation scripts.'
      },
      {
        name: 'Application Security (OWASP Top 10)',
        targetLevel: 85,
        weight: 1.2,
        isCore: true,
        category: 'Application Security',
        suggestion: 'Audit web applications for SQLi, XSS, CSRF, SSRF, broken access control, and implement defenses.'
      },
      {
        name: 'Vulnerability Assessment & PenTesting',
        targetLevel: 75,
        weight: 1.1,
        isCore: true,
        category: 'Security Auditing',
        suggestion: 'Conduct penetration testing, port scanning with Nmap, and automated vulnerability scanning.'
      },
      {
        name: 'Python Programming',
        targetLevel: 80,
        weight: 0.9,
        isCore: false,
        category: 'Programming',
        suggestion: 'Write penetration testing scripts, port scanners, and API vulnerability fuzzers with Python.'
      },
      {
        name: 'AWS Cloud Fundamentals',
        targetLevel: 75,
        weight: 0.9,
        isCore: false,
        category: 'Cloud Infrastructure',
        suggestion: 'Audit cloud IAM permissions, KMS encryption at rest, and VPC security groups.'
      }
    ]
  },

  'Mobile Developer': {
    role: 'Mobile Developer',
    category: 'Mobile Development',
    aliases: [
      'mobile developer', 'mobile engineer', 'react native developer', 'ios developer', 'android developer', 'app developer'
    ],
    description: 'Builds responsive cross-platform and native mobile applications for iOS and Android devices.',
    skills: [
      {
        name: 'React Native',
        targetLevel: 90,
        weight: 1.2,
        isCore: true,
        category: 'Mobile',
        suggestion: 'Master React Native core components, gesture responders, native bridge modules, and animations.'
      },
      {
        name: 'JavaScript',
        targetLevel: 85,
        weight: 1.1,
        isCore: true,
        category: 'Programming',
        suggestion: 'Strengthen asynchronous JS, event handlers, memory management, and data transformation.'
      },
      {
        name: 'TypeScript',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Programming',
        suggestion: 'Type component props, React Navigation route parameters, and API response payloads.'
      },
      {
        name: 'React.js',
        targetLevel: 80,
        weight: 1.0,
        isCore: true,
        category: 'Frontend',
        suggestion: 'Master component state patterns, custom hooks, and memoized rendering for smooth 60fps mobile UI.'
      },
      {
        name: 'REST APIs',
        targetLevel: 80,
        weight: 0.9,
        isCore: false,
        category: 'API Integration',
        suggestion: 'Connect mobile clients with backend REST APIs, offline data sync, and resilient error recovery.'
      },
      {
        name: 'Git & Version Control',
        targetLevel: 75,
        weight: 0.8,
        isCore: false,
        category: 'Tooling',
        suggestion: 'Manage mobile repositories, fastlane release automations, and git tags.'
      }
    ]
  }
};

/**
 * Normalizes alias strings and abbreviations to canonical skill names.
 * @param {string} name
 * @returns {string} Normalized canonical skill name
 */
function normalizeSkillName(name = '') {
  if (!name || typeof name !== 'string') return '';
  const clean = name.trim().toLowerCase();

  const ALIAS_MAP = {
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'es6': 'JavaScript',
    'vanilla js': 'JavaScript',
    'ts': 'TypeScript',
    'typescript': 'TypeScript',
    'react': 'React.js',
    'react.js': 'React.js',
    'reactjs': 'React.js',
    'react native': 'React Native',
    'node': 'Node.js',
    'node.js': 'Node.js',
    'nodejs': 'Node.js',
    'express': 'Express.js',
    'express.js': 'Express.js',
    'mongo': 'MongoDB',
    'mongodb': 'MongoDB',
    'nosql': 'MongoDB & NoSQL',
    'mongodb & nosql': 'MongoDB & NoSQL',
    'sql': 'SQL & Relational Databases',
    'sql & relational databases': 'SQL & Relational Databases',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'mysql': 'SQL & Relational Databases',
    'py': 'Python Programming',
    'python': 'Python Programming',
    'python programming': 'Python Programming',
    'html': 'HTML & CSS',
    'html & css': 'HTML & CSS',
    'css': 'HTML & CSS',
    'tailwind': 'Tailwind CSS',
    'tailwind css': 'Tailwind CSS',
    'responsive design & tailwind': 'Tailwind CSS',
    'docker': 'Docker & Containerization',
    'docker & containerization': 'Docker & Containerization',
    'k8s': 'Kubernetes & Orchestration',
    'kubernetes': 'Kubernetes & Orchestration',
    'kubernetes & orchestration': 'Kubernetes & Orchestration',
    'kubernetes cluster management': 'Kubernetes & Orchestration',
    'aws': 'AWS Cloud Fundamentals',
    'aws cloud fundamentals': 'AWS Cloud Fundamentals',
    'aws (or azure/gcp)': 'AWS Cloud Fundamentals',
    'git': 'Git & Version Control',
    'git & version control': 'Git & Version Control',
    'redis': 'Redis & Caching',
    'redis & caching': 'Redis & Caching',
    'graphql': 'REST & GraphQL APIs',
    'rest': 'REST APIs',
    'rest apis': 'REST APIs',
    'rest & graphql apis': 'REST & GraphQL APIs',
    'pytorch': 'PyTorch / TensorFlow',
    'tensorflow': 'PyTorch / TensorFlow',
    'pytorch / tensorflow': 'PyTorch / TensorFlow',
    'ml': 'Machine Learning Algorithms',
    'machine learning': 'Machine Learning Algorithms',
    'machine learning algorithms': 'Machine Learning Algorithms',
    'machine learning (scikit-learn)': 'Machine Learning Algorithms',
    'deep learning': 'Deep Learning & Neural Networks',
    'deep learning & neural networks': 'Deep Learning & Neural Networks',
    'pandas': 'Pandas & Data Wrangling',
    'pandas & data wrangling': 'Pandas & Data Wrangling',
    'numpy': 'Pandas & NumPy',
    'pandas & numpy': 'Pandas & NumPy',
    'applied statistics': 'Applied Statistics & Probability',
    'applied statistics & probability': 'Applied Statistics & Probability',
    'statistics': 'Applied Statistics & Probability',
    'data visualization': 'Data Visualization & BI',
    'data visualization & bi': 'Data Visualization & BI',
    'power bi': 'Data Visualization & BI',
    'tableau': 'Data Visualization & BI',
    'dsa': 'Data Structures & Algorithms',
    'data structures': 'Data Structures & Algorithms',
    'data structures & algorithms': 'Data Structures & Algorithms',
    'system design': 'System Design & Architecture',
    'system design & architecture': 'System Design & Architecture',
    'system design & scalability': 'System Design & Scalability',
    'linux': 'Linux & Shell Scripting',
    'linux & shell scripting': 'Linux & Shell Scripting',
    'linux system administration': 'Linux & Shell Scripting',
    'bash': 'Linux & Shell Scripting',
    'ci/cd': 'CI/CD Pipelines & Automation',
    'ci/cd pipelines & automation': 'CI/CD Pipelines & Automation',
    'ci/cd automation (github actions)': 'CI/CD Pipelines & Automation',
    'terraform': 'Terraform & IaC',
    'terraform & iac': 'Terraform & IaC',
    'terraform & infrastructure-as-code': 'Terraform & IaC',
    'iac': 'Terraform & IaC',
    'security': 'Network & System Security',
    'network & system security': 'Network & System Security',
    'auth': 'Authentication & Security',
    'authentication & security': 'Authentication & Security',
    'owasp': 'Application Security (OWASP Top 10)',
    'application security (owasp top 10)': 'Application Security (OWASP Top 10)',
    'llm': 'LLM Engineering & Prompting',
    'llm engineering & prompting': 'LLM Engineering & Prompting',
    'rag': 'RAG & Vector Databases',
    'rag & vector databases': 'RAG & Vector Databases',
    'langchain': 'LangChain / LlamaIndex',
    'langchain / llamaindex': 'LangChain / LlamaIndex',
    'nextjs': 'Next.js',
    'next.js': 'Next.js'
  };

  return ALIAS_MAP[clean] || name.trim();
}

/**
 * Retrieves benchmark taxonomy for a target role, performing case-insensitive
 * and alias resolution across the CS career catalog.
 *
 * @param {string} roleName
 * @returns {object|null} Matching role benchmark object or null if unknown
 */
function findRoleBenchmark(roleName) {
  if (!roleName || typeof roleName !== 'string') return null;
  const cleaned = roleName.trim().toLowerCase();
  if (!cleaned) return null;

  // 1. Exact key match
  for (const [key, benchmark] of Object.entries(SKILL_BENCHMARKS)) {
    if (key.toLowerCase() === cleaned) {
      return benchmark;
    }
  }

  // 2. Alias match
  for (const benchmark of Object.values(SKILL_BENCHMARKS)) {
    if (Array.isArray(benchmark.aliases) && benchmark.aliases.some(alias => alias.toLowerCase() === cleaned)) {
      return benchmark;
    }
  }

  // 3. Substring inclusion match
  for (const benchmark of Object.values(SKILL_BENCHMARKS)) {
    if (Array.isArray(benchmark.aliases) && benchmark.aliases.some(alias => {
      const aLower = alias.toLowerCase();
      return cleaned.includes(aLower) || aLower.includes(cleaned);
    })) {
      return benchmark;
    }
  }

  return null;
}

/**
 * Backward-compatible helper to get role benchmarks.
 * @param {string} roleName
 * @returns {object|null}
 */
function getRoleBenchmarks(roleName) {
  return findRoleBenchmark(roleName);
}

/**
 * Returns list of all supported role display names.
 * @returns {string[]} Array of role display names
 */
function getSupportedRoles() {
  return Object.values(SKILL_BENCHMARKS).map(r => r.role);
}

module.exports = {
  SKILL_BENCHMARKS,
  normalizeSkillName,
  findRoleBenchmark,
  getRoleBenchmarks,
  getSupportedRoles
};
