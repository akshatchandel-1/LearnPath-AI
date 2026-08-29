/**
 * LearnPath AI — Role Skill Benchmarks Taxonomy
 * Authoritative baseline target levels, domain categories, and prerequisite relationships
 * across major software engineering and AI specializations.
 */

export const SKILL_BENCHMARKS = {
  'MERN Stack Developer': {
    role: 'MERN Stack Developer',
    description: 'Full-stack web application development using MongoDB, Express.js, React, and Node.js.',
    skills: [
      { name: 'JavaScript', targetLevel: 85, category: 'Programming', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'React', targetLevel: 80, category: 'Frontend', weight: 1.2, isCore: true, prerequisites: ['JavaScript'] },
      { name: 'Node.js', targetLevel: 80, category: 'Backend', weight: 1.1, isCore: true, prerequisites: ['JavaScript'] },
      { name: 'Express.js', targetLevel: 75, category: 'Backend', weight: 1.0, isCore: true, prerequisites: ['Node.js'] },
      { name: 'MongoDB', targetLevel: 75, category: 'Database', weight: 1.0, isCore: true, prerequisites: [] },
      { name: 'HTML & CSS', targetLevel: 85, category: 'Frontend', weight: 0.9, isCore: false, prerequisites: [] },
      { name: 'REST APIs', targetLevel: 80, category: 'Architecture', weight: 1.0, isCore: true, prerequisites: ['Node.js', 'Express.js'] },
      { name: 'Git & Version Control', targetLevel: 75, category: 'DevOps', weight: 0.8, isCore: false, prerequisites: [] }
    ]
  },

  'Frontend Developer': {
    role: 'Frontend Developer',
    description: 'Modern client-side engineering, component architectures, UI performance, and responsive web design.',
    skills: [
      { name: 'HTML & CSS', targetLevel: 90, category: 'Frontend', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'JavaScript', targetLevel: 85, category: 'Programming', weight: 1.2, isCore: true, prerequisites: ['HTML & CSS'] },
      { name: 'React', targetLevel: 85, category: 'Frontend', weight: 1.2, isCore: true, prerequisites: ['JavaScript'] },
      { name: 'TypeScript', targetLevel: 75, category: 'Programming', weight: 1.0, isCore: true, prerequisites: ['JavaScript'] },
      { name: 'Responsive Design & Tailwind', targetLevel: 85, category: 'Frontend', weight: 0.9, isCore: false, prerequisites: ['HTML & CSS'] },
      { name: 'Web Performance & CWV', targetLevel: 75, category: 'Optimization', weight: 0.9, isCore: false, prerequisites: ['JavaScript', 'React'] },
      { name: 'State Management', targetLevel: 80, category: 'Frontend', weight: 1.0, isCore: true, prerequisites: ['React'] },
      { name: 'Git & Version Control', targetLevel: 75, category: 'DevOps', weight: 0.8, isCore: false, prerequisites: [] }
    ]
  },

  'Backend Developer': {
    role: 'Backend Developer',
    description: 'Server-side systems, high-throughput APIs, database optimization, and distributed microservices.',
    skills: [
      { name: 'Node.js', targetLevel: 85, category: 'Backend', weight: 1.2, isCore: true, prerequisites: ['JavaScript'] },
      { name: 'Express.js', targetLevel: 80, category: 'Backend', weight: 1.0, isCore: true, prerequisites: ['Node.js'] },
      { name: 'SQL & Relational Databases', targetLevel: 80, category: 'Database', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'MongoDB & NoSQL', targetLevel: 75, category: 'Database', weight: 1.0, isCore: true, prerequisites: [] },
      { name: 'REST & GraphQL APIs', targetLevel: 85, category: 'Architecture', weight: 1.1, isCore: true, prerequisites: ['Node.js'] },
      { name: 'System Design & Scalability', targetLevel: 75, category: 'Architecture', weight: 1.2, isCore: true, prerequisites: ['Node.js', 'SQL & Relational Databases'] },
      { name: 'Redis & Caching', targetLevel: 70, category: 'Database', weight: 0.9, isCore: false, prerequisites: ['Node.js'] },
      { name: 'Docker & Containerization', targetLevel: 70, category: 'DevOps', weight: 0.9, isCore: false, prerequisites: [] }
    ]
  },

  'Full Stack Developer': {
    role: 'Full Stack Developer',
    description: 'Comprehensive end-to-end engineering across client interfaces, backend servers, databases, and CI/CD pipelines.',
    skills: [
      { name: 'JavaScript', targetLevel: 85, category: 'Programming', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'React', targetLevel: 80, category: 'Frontend', weight: 1.1, isCore: true, prerequisites: ['JavaScript'] },
      { name: 'Node.js', targetLevel: 80, category: 'Backend', weight: 1.1, isCore: true, prerequisites: ['JavaScript'] },
      { name: 'TypeScript', targetLevel: 75, category: 'Programming', weight: 1.0, isCore: false, prerequisites: ['JavaScript'] },
      { name: 'SQL & Relational Databases', targetLevel: 75, category: 'Database', weight: 1.0, isCore: true, prerequisites: [] },
      { name: 'MongoDB', targetLevel: 75, category: 'Database', weight: 0.9, isCore: false, prerequisites: [] },
      { name: 'REST APIs & WebSockets', targetLevel: 80, category: 'Architecture', weight: 1.0, isCore: true, prerequisites: ['Node.js'] },
      { name: 'Docker & Cloud Deployment', targetLevel: 70, category: 'DevOps', weight: 0.9, isCore: false, prerequisites: [] }
    ]
  },

  'Data Scientist': {
    role: 'Data Scientist',
    description: 'Statistical modeling, machine learning, exploratory data analysis, and predictive algorithmic insights.',
    skills: [
      { name: 'Python', targetLevel: 85, category: 'Programming', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'Pandas & NumPy', targetLevel: 85, category: 'Data Analysis', weight: 1.2, isCore: true, prerequisites: ['Python'] },
      { name: 'SQL & Data Warehousing', targetLevel: 80, category: 'Database', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'Machine Learning (Scikit-Learn)', targetLevel: 80, category: 'Machine Learning', weight: 1.2, isCore: true, prerequisites: ['Python', 'Pandas & NumPy'] },
      { name: 'Statistical Analysis & Probability', targetLevel: 75, category: 'Mathematics', weight: 1.0, isCore: true, prerequisites: [] },
      { name: 'Data Visualization (Matplotlib/Seaborn)', targetLevel: 75, category: 'Data Analysis', weight: 0.9, isCore: false, prerequisites: ['Python'] },
      { name: 'Deep Learning (PyTorch/TensorFlow)', targetLevel: 70, category: 'Deep Learning', weight: 0.9, isCore: false, prerequisites: ['Machine Learning (Scikit-Learn)'] },
      { name: 'Big Data (Spark)', targetLevel: 65, category: 'Data Engineering', weight: 0.8, isCore: false, prerequisites: ['Python', 'SQL & Data Warehousing'] }
    ]
  },

  'Machine Learning Engineer': {
    role: 'Machine Learning Engineer',
    description: 'End-to-end machine learning pipelines, deep neural architectures, distributed training, and MLOps deployment.',
    skills: [
      { name: 'Python', targetLevel: 85, category: 'Programming', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'PyTorch / TensorFlow', targetLevel: 85, category: 'Deep Learning', weight: 1.2, isCore: true, prerequisites: ['Python'] },
      { name: 'Scikit-Learn & Feature Engineering', targetLevel: 80, category: 'Machine Learning', weight: 1.1, isCore: true, prerequisites: ['Python'] },
      { name: 'MLOps & Model Serving (FastAPI, ONNX)', targetLevel: 80, category: 'Deployment', weight: 1.1, isCore: true, prerequisites: ['Python', 'PyTorch / TensorFlow'] },
      { name: 'Docker & Kubernetes for ML', targetLevel: 75, category: 'DevOps', weight: 1.0, isCore: true, prerequisites: [] },
      { name: 'Vector Databases & Embeddings', targetLevel: 75, category: 'AI Architecture', weight: 1.0, isCore: false, prerequisites: ['Python'] },
      { name: 'SQL & Data Ingestion Pipelines', targetLevel: 75, category: 'Data Engineering', weight: 0.9, isCore: false, prerequisites: [] },
      { name: 'Mathematics & Linear Algebra', targetLevel: 80, category: 'Mathematics', weight: 1.0, isCore: true, prerequisites: [] }
    ]
  },

  'Cloud Engineer': {
    role: 'Cloud Engineer',
    description: 'Multi-cloud architecture, infrastructure-as-code, high availability, networking, and cloud security.',
    skills: [
      { name: 'AWS (or Azure/GCP)', targetLevel: 85, category: 'Cloud Infrastructure', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'Linux System Administration', targetLevel: 80, category: 'Systems', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'Terraform & Infrastructure-as-Code', targetLevel: 80, category: 'DevOps', weight: 1.1, isCore: true, prerequisites: ['AWS (or Azure/GCP)'] },
      { name: 'Docker & Containerization', targetLevel: 80, category: 'DevOps', weight: 1.0, isCore: true, prerequisites: ['Linux System Administration'] },
      { name: 'Kubernetes Cluster Management', targetLevel: 75, category: 'DevOps', weight: 1.0, isCore: true, prerequisites: ['Docker & Containerization'] },
      { name: 'Cloud Networking & VPCs', targetLevel: 75, category: 'Networking', weight: 1.0, isCore: true, prerequisites: ['AWS (or Azure/GCP)'] },
      { name: 'CI/CD Automation (GitHub Actions)', targetLevel: 75, category: 'DevOps', weight: 0.9, isCore: false, prerequisites: [] },
      { name: 'Cloud Security & IAM', targetLevel: 80, category: 'Security', weight: 1.1, isCore: true, prerequisites: ['AWS (or Azure/GCP)'] }
    ]
  },

  'DevOps Engineer': {
    role: 'DevOps Engineer',
    description: 'Continuous integration and deployment pipelines, container orchestration, telemetry, and SRE resilience.',
    skills: [
      { name: 'Linux System Administration', targetLevel: 85, category: 'Systems', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'CI/CD Pipelines (GitHub Actions/GitLab)', targetLevel: 85, category: 'DevOps', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'Docker & Containerization', targetLevel: 85, category: 'DevOps', weight: 1.2, isCore: true, prerequisites: ['Linux System Administration'] },
      { name: 'Kubernetes Orchestration', targetLevel: 80, category: 'DevOps', weight: 1.2, isCore: true, prerequisites: ['Docker & Containerization'] },
      { name: 'Terraform & IaC', targetLevel: 80, category: 'DevOps', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'Cloud Platforms (AWS/GCP)', targetLevel: 80, category: 'Cloud Infrastructure', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'Monitoring & Telemetry (Prometheus/Grafana)', targetLevel: 75, category: 'Observability', weight: 1.0, isCore: true, prerequisites: ['Kubernetes Orchestration'] },
      { name: 'Bash & Python Scripting', targetLevel: 75, category: 'Programming', weight: 0.9, isCore: false, prerequisites: [] }
    ]
  },

  'Cybersecurity Engineer': {
    role: 'Cybersecurity Engineer',
    description: 'Threat modeling, network perimeter security, vulnerability auditing, cryptography, and penetration testing.',
    skills: [
      { name: 'Network Security & Protocols', targetLevel: 85, category: 'Networking', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'Linux & Operating System Security', targetLevel: 85, category: 'Systems', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'Cryptography & PKI Infrastructure', targetLevel: 80, category: 'Security', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'Application Security (OWASP Top 10)', targetLevel: 85, category: 'Application Security', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'Vulnerability Assessment & PenTesting', targetLevel: 75, category: 'Security Auditing', weight: 1.1, isCore: true, prerequisites: ['Network Security & Protocols'] },
      { name: 'SIEM & Threat Monitoring', targetLevel: 75, category: 'Security Operations', weight: 1.0, isCore: false, prerequisites: [] },
      { name: 'Python/Bash for Security Scripting', targetLevel: 75, category: 'Programming', weight: 0.9, isCore: false, prerequisites: [] },
      { name: 'Cloud Security Compliance & IAM', targetLevel: 75, category: 'Cloud Security', weight: 1.0, isCore: false, prerequisites: [] }
    ]
  }
};

/**
 * Normalizes alias strings to canonical skill names.
 */
export function normalizeSkillName(name = '') {
  if (!name || typeof name !== 'string') return '';
  const clean = name.trim().toLowerCase();

  const ALIAS_MAP = {
    'js': 'JavaScript',
    'javascript': 'JavaScript',
    'es6': 'JavaScript',
    'vanilla js': 'JavaScript',
    'ts': 'TypeScript',
    'typescript': 'TypeScript',
    'react': 'React',
    'react.js': 'React',
    'reactjs': 'React',
    'node': 'Node.js',
    'node.js': 'Node.js',
    'nodejs': 'Node.js',
    'express': 'Express.js',
    'express.js': 'Express.js',
    'mongo': 'MongoDB',
    'mongodb': 'MongoDB',
    'nosql': 'MongoDB & NoSQL',
    'sql': 'SQL & Relational Databases',
    'postgresql': 'SQL & Relational Databases',
    'postgres': 'SQL & Relational Databases',
    'mysql': 'SQL & Relational Databases',
    'py': 'Python',
    'python': 'Python',
    'html': 'HTML & CSS',
    'html & css': 'HTML & CSS',
    'css': 'HTML & CSS',
    'tailwind': 'Responsive Design & Tailwind',
    'docker': 'Docker & Containerization',
    'k8s': 'Kubernetes Cluster Management',
    'kubernetes': 'Kubernetes Cluster Management',
    'aws': 'AWS (or Azure/GCP)',
    'git': 'Git & Version Control',
    'redis': 'Redis & Caching',
    'graphql': 'REST & GraphQL APIs',
    'pytorch': 'PyTorch / TensorFlow',
    'tensorflow': 'PyTorch / TensorFlow',
    'scikit': 'Machine Learning (Scikit-Learn)',
    'scikit-learn': 'Machine Learning (Scikit-Learn)'
  };

  return ALIAS_MAP[clean] || name.trim();
}

/**
 * Retrieves benchmark taxonomy for a target role or generates a structured custom blueprint.
 */
export function getRoleBenchmarks(role = 'Full Stack Developer') {
  if (!role || typeof role !== 'string') {
    return SKILL_BENCHMARKS['Full Stack Developer'];
  }

  const trimmed = role.trim();

  // Exact match check
  if (SKILL_BENCHMARKS[trimmed]) {
    return SKILL_BENCHMARKS[trimmed];
  }

  // Case-insensitive substring lookup
  const foundKey = Object.keys(SKILL_BENCHMARKS).find(
    k => k.toLowerCase() === trimmed.toLowerCase() ||
         k.toLowerCase().includes(trimmed.toLowerCase()) ||
         trimmed.toLowerCase().includes(k.toLowerCase())
  );

  if (foundKey) {
    return SKILL_BENCHMARKS[foundKey];
  }

  // Dynamic synthesis for custom/unlisted roles
  return {
    role: trimmed,
    description: `Specialized engineering track for ${trimmed}.`,
    skills: [
      { name: `${trimmed} Core Fundamentals`, targetLevel: 85, category: 'Core Specialization', weight: 1.2, isCore: true, prerequisites: [] },
      { name: 'System Architecture & Design Patterns', targetLevel: 80, category: 'Architecture', weight: 1.1, isCore: true, prerequisites: [] },
      { name: 'Data Structures & Algorithms', targetLevel: 75, category: 'Computer Science', weight: 1.0, isCore: true, prerequisites: [] },
      { name: 'API Design & Component Integration', targetLevel: 75, category: 'Integration', weight: 1.0, isCore: false, prerequisites: [] },
      { name: 'Automated Testing & QA', targetLevel: 75, category: 'Quality Assurance', weight: 0.9, isCore: false, prerequisites: [] },
      { name: 'Performance Optimization & Profiling', targetLevel: 70, category: 'Optimization', weight: 0.9, isCore: false, prerequisites: [] },
      { name: 'DevOps & CI/CD Deployment', targetLevel: 70, category: 'DevOps', weight: 0.8, isCore: false, prerequisites: [] },
      { name: 'Security Best Practices & Auditing', targetLevel: 70, category: 'Security', weight: 0.8, isCore: false, prerequisites: [] }
    ]
  };
}
