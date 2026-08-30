const LearningPath = require('../../models/LearningPath');
const User = require('../../models/User');
const LearnerProfile = require('../../models/LearnerProfile');
const Resource = require('../../models/Resource');
const prerequisiteEngine = require('../recommendation/prerequisiteEngine');

const ROLE_PHASE_TEMPLATES = {
  'data scientist': [
    {
      phaseNumber: 1,
      title: 'Python for Data Science, Pandas & Data Wrangling',
      description: 'Master Python syntax, NumPy array vectorization, Pandas DataFrame manipulation, and data cleaning pipelines.',
      estimatedWeeks: 2,
      skills: ['Python Programming', 'Pandas & Data Wrangling'],
      milestone: {
        title: 'Exploratory Data Analysis (EDA) Pipeline',
        description: 'Build an automated cleaning and statistical summary pipeline for multi-gigabyte datasets.',
        deliverables: ['Modular Pandas pipeline', 'Automated missing-value imputation script'],
      },
      quiz: {
        title: 'Python & Pandas Data Science Checkpoint',
        skill: 'Python Programming',
        minPassingScore: 70,
      },
      status: 'in-progress',
      completionPercentage: 0,
    },
    {
      phaseNumber: 2,
      title: 'Applied Statistics, Probability & Hypothesis Testing',
      description: 'Probability distributions, central limit theorem, A/B testing frameworks, and confidence intervals.',
      estimatedWeeks: 2,
      skills: ['Applied Statistics & Probability'],
      milestone: {
        title: 'Statistical Hypothesis & A/B Experiment Engine',
        description: 'Run parametric and non-parametric hypothesis tests on real conversion telemetry.',
        deliverables: ['Statistical significance notebook', 'A/B test decision report'],
      },
      quiz: {
        title: 'Statistical Inference Assessment',
        skill: 'Applied Statistics & Probability',
        minPassingScore: 70,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 3,
      title: 'Classical Machine Learning Algorithms & Scikit-Learn',
      description: 'Supervised regression, classification, decision trees, ensemble methods (XGBoost/RandomForest), and cross-validation.',
      estimatedWeeks: 3,
      skills: ['Machine Learning Algorithms'],
      milestone: {
        title: 'Predictive Churn & Classification Model',
        description: 'Train, evaluate, and tune an ensemble model achieving >88% ROC-AUC with feature importance analysis.',
        deliverables: ['Trained model pipeline (.joblib)', 'Hyperparameter search log'],
      },
      quiz: {
        title: 'Machine Learning Algorithms Checkpoint',
        skill: 'Machine Learning Algorithms',
        minPassingScore: 75,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 4,
      title: 'Deep Learning, Neural Networks & PyTorch',
      description: 'Backpropagation, PyTorch tensors, convolutional networks (CNNs), sequence models, and transfer learning.',
      estimatedWeeks: 3,
      skills: ['Deep Learning & Neural Networks'],
      milestone: {
        title: 'Computer Vision / Deep Learning Classifier',
        description: 'Architect and fine-tune a deep neural network with learning rate scheduling and early stopping.',
        deliverables: ['PyTorch model training script', 'Validation loss curve dashboard'],
      },
      quiz: {
        title: 'Deep Learning & Neural Networks Assessment',
        skill: 'Deep Learning & Neural Networks',
        minPassingScore: 75,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 5,
      title: 'Production MLOps, Model Serving & FastAPI Microservices',
      description: 'Model serialization, ONNX runtime, FastAPI inference endpoints, Docker containerization, and drift monitoring.',
      estimatedWeeks: 2,
      skills: ['FastAPI & Microservices', 'Docker & Deployment'],
      milestone: {
        title: 'Production ML Inference REST Service',
        description: 'Deploy a containerized real-time inference microservice with Swagger documentation and latency profiling.',
        deliverables: ['Dockerized FastAPI service', 'Load-tested endpoint benchmark'],
      },
      quiz: {
        title: 'MLOps & Model Serving Checkpoint',
        skill: 'FastAPI & Microservices',
        minPassingScore: 70,
      },
      status: 'locked',
      completionPercentage: 0,
    },
  ],

  'cloud engineer': [
    {
      phaseNumber: 1,
      title: 'Linux Administration, Bash Scripting & Networking Fundamentals',
      description: 'POSIX permissions, systemd services, SSH tunneling, DNS/TCP routing, and automated bash maintenance scripts.',
      estimatedWeeks: 2,
      skills: ['Linux & Bash Scripting'],
      milestone: {
        title: 'Automated Server Provisioning & Hardening Script',
        description: 'Script a zero-touch Linux server bootstrap configuring firewall (UFW), SSH keys, and system monitors.',
        deliverables: ['Idempotent Bash setup script', 'Security audit report'],
      },
      quiz: {
        title: 'Linux & Networking Assessment',
        skill: 'Linux & Bash Scripting',
        minPassingScore: 70,
      },
      status: 'in-progress',
      completionPercentage: 0,
    },
    {
      phaseNumber: 2,
      title: 'Docker Containerization & Image Optimization',
      description: 'Multi-stage Dockerfiles, non-root container users, volume mounts, bridge networks, and Docker Compose stacks.',
      estimatedWeeks: 2,
      skills: ['Docker & Containerization'],
      milestone: {
        title: 'Multi-Tier Containerized Application Stack',
        description: 'Containerize frontend, backend, and redis cache with health checks and minimal alpine base images.',
        deliverables: ['Multi-stage Dockerfile (<50MB)', 'Production docker-compose.yml'],
      },
      quiz: {
        title: 'Docker Architecture Checkpoint',
        skill: 'Docker & Containerization',
        minPassingScore: 75,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 3,
      title: 'Kubernetes Cluster Orchestration & Deployment',
      description: 'Pods, Deployments, Services, Ingress controllers, ConfigMaps, Secrets, and Horizontal Pod Autoscaling (HPA).',
      estimatedWeeks: 3,
      skills: ['Kubernetes & Orchestration'],
      milestone: {
        title: 'Zero-Downtime Rolling Kubernetes Deployment',
        description: 'Deploy a high-availability microservice cluster with self-healing readiness/liveness probes and autoscaling.',
        deliverables: ['K8s manifests YAML suite', 'Helm chart package'],
      },
      quiz: {
        title: 'Kubernetes Cluster Engineering Assessment',
        skill: 'Kubernetes & Orchestration',
        minPassingScore: 75,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 4,
      title: 'AWS Cloud Fundamentals, IAM & Infrastructure',
      description: 'EC2, VPC subnets, Internet Gateways, S3 bucket policies, IAM least-privilege roles, and Application Load Balancers.',
      estimatedWeeks: 2.5,
      skills: ['AWS Cloud Fundamentals'],
      milestone: {
        title: 'Secure Multi-AZ Cloud Architecture Blueprint',
        description: 'Architect a high-availability VPC with public/private subnets and NAT gateways on AWS.',
        deliverables: ['VPC topology architecture diagram', 'IAM policy verification log'],
      },
      quiz: {
        title: 'AWS Cloud Architecture Checkpoint',
        skill: 'AWS Cloud Fundamentals',
        minPassingScore: 75,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 5,
      title: 'Terraform Infrastructure as Code (IaC) & CI/CD Pipelines',
      description: 'Declarative HCL syntax, state management, remote backends (S3/DynamoDB), modules, and GitHub Actions automation.',
      estimatedWeeks: 2,
      skills: ['Terraform & IaC', 'CI/CD & GitHub Actions'],
      milestone: {
        title: 'Automated GitOps Infrastructure Pipeline',
        description: 'Provision complete cloud infrastructure automatically through GitHub Actions on merge request.',
        deliverables: ['Modular Terraform codebase', 'Automated CI/CD pipeline workflow'],
      },
      quiz: {
        title: 'Terraform & CI/CD Engineering Assessment',
        skill: 'Terraform & IaC',
        minPassingScore: 80,
      },
      status: 'locked',
      completionPercentage: 0,
    },
  ],

  'full stack developer': [
    {
      phaseNumber: 1,
      title: 'Modern JavaScript & Asynchronous Foundations',
      description: 'Master ES6+ syntax, scope, closures, array pipelines, Promises, and the Event Loop.',
      estimatedWeeks: 2,
      skills: ['JavaScript', 'HTML & CSS'],
      milestone: {
        title: 'Interactive Asynchronous Dashboard Widget',
        description: 'Build a vanilla JS client consuming public REST APIs with debounce and caching.',
        deliverables: ['Clean modular ES6 code', 'Async fetch handler with error boundaries'],
      },
      quiz: {
        title: 'JavaScript Core & Async Mastery Checkpoint',
        skill: 'JavaScript',
        minPassingScore: 70,
      },
      status: 'in-progress',
      completionPercentage: 0,
    },
    {
      phaseNumber: 2,
      title: 'React.js Component Architecture & State Management',
      description: 'Component lifecycles, custom hooks (useEffect, useMemo, useCallback), Context API, and state immutability.',
      estimatedWeeks: 2,
      skills: ['React.js', 'Tailwind CSS'],
      milestone: {
        title: 'Dynamic Portfolio Project Showcase',
        description: 'Architect a multi-view responsive React SPA with Tailwind and Context API.',
        deliverables: ['Custom hook for data synchronization', 'Accessible glassmorphic UI'],
      },
      quiz: {
        title: 'React.js Component Architecture Assessment',
        skill: 'React.js',
        minPassingScore: 70,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 3,
      title: 'Node.js Runtime, Event Loop & Express Middleware',
      description: 'Server architecture, non-blocking I/O, Express routing, middleware stacks, and error handling.',
      estimatedWeeks: 2,
      skills: ['Node.js', 'Express.js'],
      milestone: {
        title: 'RESTful Micro-Service Boilerplate',
        description: 'Construct a modular Express REST API with centralized error handling and logging.',
        deliverables: ['Modular routes and controllers', 'Comprehensive input validation'],
      },
      quiz: {
        title: 'Node.js & Express RESTful Backend Checkpoint',
        skill: 'Node.js',
        minPassingScore: 70,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 4,
      title: 'MongoDB Schema Modeling & Aggregation Pipelines',
      description: 'NoSQL document design, Mongoose schemas, indexes, compound lookups, and aggregation frameworks.',
      estimatedWeeks: 2,
      skills: ['MongoDB'],
      milestone: {
        title: 'E-Commerce Relational Document Model',
        description: 'Design normalized and embedded Mongoose schemas with multi-stage $facet aggregations.',
        deliverables: ['Optimized compound index queries', 'Seeded aggregation scripts'],
      },
      quiz: {
        title: 'MongoDB & Schema Design Assessment',
        skill: 'MongoDB',
        minPassingScore: 70,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 5,
      title: 'RESTful API Engineering & Authentication Security',
      description: 'JWT token lifecycles, HTTP-only cookies, bcrypt salt hashing, CORS policies, and RBAC authorization.',
      estimatedWeeks: 1.5,
      skills: ['REST APIs', 'Authentication & Security'],
      milestone: {
        title: 'Production-Grade Auth & Security Gateway',
        description: 'Implement refresh-token rotation with protected middleware guards.',
        deliverables: ['JWT refresh token endpoint', 'Rate limiting and helmet protection'],
      },
      quiz: {
        title: 'REST APIs & Architecture Checkpoint',
        skill: 'REST APIs',
        minPassingScore: 70,
      },
      status: 'locked',
      completionPercentage: 0,
    },
    {
      phaseNumber: 6,
      title: 'Full Stack MERN Capstone Platform Integration',
      description: 'End-to-end integration connecting React SPA with authenticated Express API and MongoDB.',
      estimatedWeeks: 2.5,
      skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
      milestone: {
        title: 'AI SaaS Platform Capstone',
        description: 'Ship a full-stack SaaS application with payment gateway and AI recommendations.',
        deliverables: ['Live deployed demo', 'Modular GitHub repository with documentation'],
      },
      quiz: {
        title: 'Full Stack MERN Architecture Assessment',
        skill: 'Full Stack Integration',
        minPassingScore: 75,
      },
      status: 'locked',
      completionPercentage: 0,
    },
  ],
};

class AdaptivePathService {
  getTemplateForRole(careerGoal = '') {
    const goalLower = (careerGoal || '').toLowerCase();
    if (goalLower.includes('data scientist') || goalLower.includes('data science') || goalLower.includes('data analyst')) {
      return { title: 'Data Scientist Master Roadmap', phases: ROLE_PHASE_TEMPLATES['data scientist'] };
    }
    if (goalLower.includes('cloud') || goalLower.includes('devops') || goalLower.includes('aws') || goalLower.includes('kubernetes')) {
      return { title: 'Cloud DevOps & Infrastructure Roadmap', phases: ROLE_PHASE_TEMPLATES['cloud engineer'] };
    }
    return { title: 'Full Stack MERN Developer Master Roadmap', phases: ROLE_PHASE_TEMPLATES['full stack developer'] };
  }

  async generateLearningPath(userId, targetRole = null) {
    const user = await User.findById(userId);
    const goal = targetRole || user?.targetRole || user?.careerGoal || 'Full Stack MERN Developer';

    const { title, phases: rawPhases } = this.getTemplateForRole(goal);

    const resources = await Resource.find({});

    const phases = rawPhases.map((p) => {
      const matchedResources = resources
        .filter(r => r.skills && r.skills.some(sk => p.skills.includes(sk)))
        .slice(0, 3)
        .map(r => ({
          resource: r._id,
          title: r.title,
          type: r.type,
          url: r.url,
          duration: r.duration,
          difficulty: r.difficulty,
          completed: p.status === 'completed',
        }));

      return {
        ...p,
        resources: matchedResources,
      };
    });

    await LearningPath.deleteMany({ user: userId });
    const learningPath = await LearningPath.create({
      user: userId,
      title,
      goal,
      targetRole: goal,
      totalEstimatedWeeks: phases.reduce((acc, p) => acc + (p.estimatedWeeks || 2), 0),
      currentPhase: 1,
      overallProgress: 0,
      phases,
      active: true,
    });

    user.currentLearningPath = learningPath._id;
    if (targetRole) {
      user.careerGoal = targetRole;
      user.targetRole = targetRole;
    }
    await user.save();

    await LearnerProfile.findOneAndUpdate(
      { user: userId },
      { $set: { careerGoal: goal, targetRole: goal } },
      { upsert: true }
    );

    return learningPath;
  }

  async adaptLearningPath(userId, options = {}) {
    const user = await User.findById(userId);
    const newGoal = options.goal || options.targetRole || user?.targetRole || user?.careerGoal || 'Full Stack MERN Developer';

    if (newGoal && newGoal !== user.careerGoal) {
      user.careerGoal = newGoal;
      user.targetRole = newGoal;
      await user.save();
    }

    const learningPath = await this.generateLearningPath(userId, newGoal);

    learningPath.adaptationHistory = [
      {
        actionTaken: `Calibrated roadmap for ${newGoal}`,
        reason: options.reason || 'AI Roadmap re-calibration',
        timestamp: new Date(),
      },
      ...(learningPath.adaptationHistory || []),
    ];
    await learningPath.save();

    return learningPath;
  }
}

const adaptivePathService = new AdaptivePathService();
module.exports = adaptivePathService;
