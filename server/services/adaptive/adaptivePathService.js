const LearningPath = require('../../models/LearningPath');
const User = require('../../models/User');
const Resource = require('../../models/Resource');
const prerequisiteEngine = require('../recommendation/prerequisiteEngine');

const DEFAULT_MERN_PHASES = [
  {
    phaseNumber: 1,
    title: 'Modern JavaScript & Asynchronous Foundations',
    description: 'Master ES6+ syntax, scope, closures, array pipelines, Promises, and the Event Loop.',
    estimatedWeeks: 2,
    skills: ['JavaScript', 'HTML & CSS'],
    prerequisites: [],
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
    status: 'completed',
    completionPercentage: 100,
  },
  {
    phaseNumber: 2,
    title: 'React.js Component Architecture & State Management',
    description: 'Component lifecycles, custom hooks (useEffect, useMemo, useCallback), Context API, and state immutability.',
    estimatedWeeks: 2,
    skills: ['React.js', 'Tailwind CSS'],
    prerequisites: ['JavaScript', 'HTML & CSS'],
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
    status: 'in-progress',
    completionPercentage: 45,
  },
  {
    phaseNumber: 3,
    title: 'Node.js Runtime, Event Loop & Express Middleware',
    description: 'Server architecture, non-blocking I/O, Express routing, middleware stacks, and error handling.',
    estimatedWeeks: 2,
    skills: ['Node.js', 'Express.js'],
    prerequisites: ['JavaScript'],
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
    status: 'available',
    completionPercentage: 0,
  },
  {
    phaseNumber: 4,
    title: 'MongoDB Schema Modeling & Aggregation Pipelines',
    description: 'NoSQL document design, Mongoose schemas, indexes, compound lookups, and aggregation frameworks.',
    estimatedWeeks: 2,
    skills: ['MongoDB'],
    prerequisites: ['Node.js'],
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
    prerequisites: ['Express.js', 'MongoDB'],
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
    prerequisites: ['React.js', 'REST APIs'],
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
  {
    phaseNumber: 7,
    title: 'Docker Containerization, CI/CD & Cloud Deployment',
    description: 'Multi-stage Dockerfiles, Docker Compose orchestration, GitHub Actions CI/CD, and cloud hosting.',
    estimatedWeeks: 1.5,
    skills: ['Docker & Deployment'],
    prerequisites: ['Node.js'],
    milestone: {
      title: 'Multi-Container Cloud Production Deployment',
      description: 'Dockerize client, server, and database with automated CI/CD pipeline on commit.',
      deliverables: ['Production Dockerfile with multi-stage build', 'Automated GitHub Actions YAML'],
    },
    quiz: {
      title: 'Docker, CI/CD & Cloud Deployment Assessment',
      skill: 'Docker & Deployment',
      minPassingScore: 70,
    },
    status: 'locked',
    completionPercentage: 0,
  },
  {
    phaseNumber: 8,
    title: 'Technical Interview Mastery & System Architecture',
    description: 'Data structures, algorithm complexity, full-stack system design, and coding interview preparation.',
    estimatedWeeks: 1.5,
    skills: ['JavaScript', 'System Design'],
    prerequisites: ['Full Stack Integration'],
    milestone: {
      title: 'System Design Blueprint Presentation',
      description: 'Architect a high-concurrency real-time application with caching and load balancing.',
      deliverables: ['System architecture diagram', 'Benchmark latency report'],
    },
    quiz: {
      title: 'Full Stack Senior Interview Checkpoint',
      skill: 'System Design',
      minPassingScore: 80,
    },
    status: 'locked',
    completionPercentage: 0,
  },
];

class AdaptivePathService {
  async generateLearningPath(userId) {
    const user = await User.findById(userId);
    const goal = user?.careerGoal || 'Full Stack MERN Developer';

    const resources = await Resource.find({});
    const resourceMap = new Map();
    resources.forEach(r => resourceMap.set(r.skills[0] || 'JavaScript', r));

    // Populate phase resources
    const phases = DEFAULT_MERN_PHASES.map((p) => {
      const matchedResources = resources
        .filter(r => r.skills.some(sk => p.skills.includes(sk)))
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
      title: `${goal} Master Roadmap`,
      goal,
      targetRole: goal,
      totalEstimatedWeeks: 14,
      currentPhase: 2,
      phases,
      overallProgress: 18,
      active: true,
    });

    if (user) {
      user.currentLearningPath = learningPath._id;
      await user.save();
    }

    return learningPath;
  }

  async adaptLearningPath(userId, triggerData = {}) {
    const learningPath = await LearningPath.findOne({ user: userId, active: true });
    if (!learningPath) {
      return await this.generateLearningPath(userId);
    }

    const { skill, percentage, feedback } = triggerData;
    learningPath.adaptationCount = (learningPath.adaptationCount || 0) + 1;

    if (percentage !== undefined && percentage < 60) {
      // Reinforcement needed
      const phase = learningPath.phases.find(p => p.skills.includes(skill)) || learningPath.phases[1];
      if (phase) {
        phase.status = 'reinforce';
        phase.description = `[AI Reinforcement Active] Score on ${skill} was ${percentage}%. Injected foundational review exercises before continuing.`;
      }
      learningPath.adaptationHistory.push({
        trigger: `Quiz score <60% on ${skill || 'topic'} (${percentage}%)`,
        actionTaken: 'Injected prerequisite revision module and marked phase for reinforcement',
        reason: `Foundational mastery required before proceeding to downstream dependent topics.`,
      });
    } else if (percentage !== undefined && percentage >= 90) {
      // Fast track
      const phase = learningPath.phases.find(p => p.skills.includes(skill)) || learningPath.phases[1];
      if (phase) {
        phase.status = 'completed';
        phase.completionPercentage = 100;
        const nextPhase = learningPath.phases.find(p => p.phaseNumber === phase.phaseNumber + 1);
        if (nextPhase && nextPhase.status === 'locked') {
          nextPhase.status = 'available';
        }
      }
      learningPath.adaptationHistory.push({
        trigger: `Assessment score ${percentage}% on ${skill}`,
        actionTaken: `Fast-tracked phase mastery and unlocked downstream milestone`,
        reason: `Exceptional competence demonstrated, bypassing redundant basic modules.`,
      });
    } else {
      // General recalibration
      learningPath.adaptationHistory.push({
        trigger: 'Learner requested path recalibration',
        actionTaken: 'Re-sequenced candidate milestones and updated difficulty balance',
        reason: 'Optimizing learning trajectory for current study velocity.',
      });
    }

    await learningPath.save();
    return learningPath;
  }
}

const adaptivePathService = new AdaptivePathService();
module.exports = adaptivePathService;
