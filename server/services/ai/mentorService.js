const llmService = require('./llmService');
const Conversation = require('../../models/Conversation');
const LearningPath = require('../../models/LearningPath');
const User = require('../../models/User');
const skillGapEngine = require('../recommendation/skillGapEngine');
const statisticsService = require('../statisticsService');

const CONCEPT_KNOWLEDGE = {
  java: {
    title: 'Java Architecture & Core Concepts',
    content: '### Java Overview & Architecture ☕\n\n**Java** is a high-level, class-based, object-oriented programming language designed around the principle of *"Write Once, Run Anywhere"* (WORA).\n\n#### Key Architectural Pillars:\n1. **JVM (Java Virtual Machine)**: Compiles Java source into bytecode (`.class`) executed across OS platforms.\n2. **Garbage Collection (GC)**: Automatic memory lifecycle management reclaiming unreachable heap memory.\n3. **Strong Typing & Object-Oriented Principles**: Encapsulation, inheritance, polymorphism, and abstraction.\n4. **Enterprise Ecosystem**: Spring Boot for high-scale microservices, Hibernate for ORM, and Kafka for streaming.',
    skill: 'Java',
  },
  react: {
    title: 'React.js Component Architecture',
    content: '### React.js Overview & Core Principles ⚛️\n\n**React** is a declarative, component-driven JavaScript library created by Meta for building dynamic user interfaces.\n\n#### Core Concepts to Master:\n1. **Virtual DOM & Reconciliation**: React diffs virtual trees and applies minimal real DOM mutations using the Fiber reconciler.\n2. **Hooks System**: `useState`, `useEffect`, `useCallback`, and `useMemo` for encapsulating stateful logic and side-effects.\n3. **Unidirectional Data Flow**: State passes down via props and events bubble up via callbacks.\n4. **Component Composition**: Building complex UI architectures from small, reusable components.',
    skill: 'React.js',
  },
  mongodb: {
    title: 'MongoDB Document Database Architecture',
    content: '### MongoDB Overview & NoSQL Paradigm 🍃\n\n**MongoDB** is a source-available, cross-platform document-oriented database designed for high availability, flexible JSON schemas, and horizontal scaling.\n\n#### Core Architectural Concepts:\n1. **BSON Documents & Dynamic Schemas**: Polymorphic document structures without rigid ALTER TABLE migrations.\n2. **Aggregation Pipeline**: Multi-stage data processing (`$match`, `$group`, `$project`, `$unwind`, `$lookup`).\n3. **Indexing Strategies**: Single-field, compound (ESR rule), and TTL indexes for high-throughput queries.\n4. **Replica Sets & Sharding**: Automatic failover and distributed horizontal partitioning across clusters.',
    skill: 'MongoDB',
  },
  nodejs: {
    title: 'Node.js Runtime & Libuv Architecture',
    content: '### Node.js Overview & Asynchronous Runtime 🟢\n\n**Node.js** is an open-source, cross-platform JavaScript runtime built on Chrome\'s V8 engine and the Libuv event-driven library.\n\n#### Key Architectural Pillars:\n1. **Single-Threaded Event Loop**: Asynchronous non-blocking I/O delegates system calls to the OS kernel or Libuv worker pool.\n2. **Event Loop Phases**: Timers, Pending I/O, Poll, Check (`setImmediate`), and Close callbacks.\n3. **Stream Pipelines**: Consumes data in chunks with automatic backpressure management to prevent RAM exhaustion.\n4. **Module Systems**: CommonJS (`require`) and ES Modules (`import/export`).',
    skill: 'Node.js',
  },
  restapi: {
    title: 'REST API Design & Standards',
    content: '### REST API Architecture & Standards 🌐\n\n**REST** (Representational State Transfer) is an architectural style for distributed hypermedia systems communicating over HTTP.\n\n#### Foundational Constraints:\n1. **Stateless Communication**: Every client request contains complete context; no session state stored on server.\n2. **Uniform Resource Identifiers (URIs)**: Nouns identify resources (e.g. `/api/users/123/courses`).\n3. **Standard HTTP Verbs**: `GET` (idempotent read), `POST` (create), `PUT` (full replace), `PATCH` (partial update), `DELETE` (remove).\n4. **Status Codes**: 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error).',
    skill: 'RESTful APIs',
  },
  machinelearning: {
    title: 'Machine Learning Fundamentals',
    content: '### Machine Learning Overview & Modeling 🧠\n\n**Machine Learning (ML)** is a subfield of artificial intelligence focusing on algorithms that learn statistical patterns from data to make predictions without explicit rules.\n\n#### Primary Paradigms:\n1. **Supervised Learning**: Training on labeled data (Regression for continuous values, Classification for categories).\n2. **Unsupervised Learning**: Discovering latent patterns in unlabeled data (K-Means Clustering, PCA Dimensionality Reduction).\n3. **Model Evaluation Metrics**: Precision, Recall, F1-Score, ROC-AUC, Mean Squared Error (MSE).\n4. **Bias-Variance Tradeoff**: Preventing overfitting through cross-validation and L1/L2 regularization.',
    skill: 'Machine Learning',
  },
  docker: {
    title: 'Docker Containerization Fundamentals',
    content: '### Docker & Containerization 🐳\n\n**Docker** packages application code, runtime, system tools, and libraries into lightweight, standalone immutable container images.\n\n#### Core Concepts:\n1. **Linux Namespaces & Cgroups**: Process isolation (PID, Network, Mount) and strict CPU/RAM resource limits.\n2. **Layered UnionFS**: Efficient caching where image layers are stacked and reused.\n3. **Multi-Stage Builds**: Drastically minimizes production image sizes by separating compile tools from runtime.\n4. **Docker Compose**: Multi-container local orchestration and networking.',
    skill: 'Docker',
  },
  kubernetes: {
    title: 'Kubernetes Container Orchestration',
    content: '### Kubernetes (K8s) Overview ☸️\n\n**Kubernetes** is an open-source container orchestration system for automating application deployment, scaling, and operations.\n\n#### Fundamental Objects:\n1. **Pods & Deployments**: Smallest deployable compute unit managing one or more containers with rolling updates.\n2. **Services & Ingress**: Stable internal networking, DNS discovery, and reverse proxy layer-7 routing.\n3. **ConfigMaps & Secrets**: Externalized configuration decoupled from container image builds.\n4. **Self-Healing & HPA**: Automatic pod restarts, health checks (liveness/readiness probes), and horizontal autoscaling.',
    skill: 'Kubernetes',
  },
  javascript: {
    title: 'Modern JavaScript (ES6+)',
    content: '### Modern JavaScript Core Concepts 💛\n\n**JavaScript** is a multi-paradigm, dynamic language with prototype-based inheritance and first-class functions.\n\n#### Key Pillars:\n1. **Execution Context & Scope**: Lexical scoping, variable hoisting (`let`/`const`), and closures.\n2. **Asynchronous Architecture**: Promises, `async/await`, microtask queue priority over macrotasks (`setTimeout`).\n3. **Functional Utilities**: `map`, `filter`, `reduce`, destructuring, and spread/rest operators.\n4. **Prototypal Inheritance**: Object delegation chains via `__proto__` and prototype objects.',
    skill: 'JavaScript',
  },
  python: {
    title: 'Python Programming & Data Ecosystem',
    content: '### Python Overview & Core Features 🐍\n\n**Python** is an interpreted, high-level, general-purpose programming language celebrated for readability and extensive libraries.\n\n#### Essential Features:\n1. **Data Structures**: Lists, Tuples (immutable), Dictionaries (hash maps), and Sets.\n2. **Generators & Iterators**: Memory-efficient lazy evaluation using the `yield` statement.\n3. **Decorators**: Higher-order function wrappers using `@` syntax for cross-cutting logic.\n4. **Data Ecosystem**: NumPy, Pandas, Scikit-Learn, PyTorch, and FastAPI.',
    skill: 'Python',
  },
};

class MentorService {
  extractSkillFromText(text = '') {
    const t = text.toLowerCase();
    if (t.includes('javascript') || t.includes('js') || t.includes('es6')) return 'JavaScript';
    if (t.includes('react')) return 'React.js';
    if (t.includes('node')) return 'Node.js';
    if (t.includes('express')) return 'Express.js';
    if (t.includes('mongo')) return 'MongoDB';
    if (t.includes('python')) return 'Python';
    if (t.includes('java') && !t.includes('javascript')) return 'Java';
    if (t.includes('docker')) return 'Docker';
    if (t.includes('kubernetes') || t.includes('k8s')) return 'Kubernetes';
    if (t.includes('rest') || t.includes('api')) return 'RESTful APIs';
    if (t.includes('machine learning') || t.includes('ml')) return 'Machine Learning';
    if (t.includes('sql') || t.includes('postgres')) return 'SQL';
    if (t.includes('cloud') || t.includes('aws')) return 'AWS Cloud';
    return 'JavaScript';
  }

  detectConcept(text = '') {
    const t = text.toLowerCase();
    if (t.includes('what is java ') || t.includes('what is java?') || (t.includes('java') && !t.includes('javascript') && (t.includes('explain') || t.includes('what')))) return CONCEPT_KNOWLEDGE.java;
    if (t.includes('what is react') || t.includes('explain react')) return CONCEPT_KNOWLEDGE.react;
    if (t.includes('what is mongodb') || t.includes('explain mongodb') || t.includes('what is mongo')) return CONCEPT_KNOWLEDGE.mongodb;
    if (t.includes('what is node') || t.includes('explain node')) return CONCEPT_KNOWLEDGE.nodejs;
    if (t.includes('rest api') || t.includes('restful') || t.includes('what is rest')) return CONCEPT_KNOWLEDGE.restapi;
    if (t.includes('machine learning') || (t.includes('what is ml') || t.includes('explain ml'))) return CONCEPT_KNOWLEDGE.machinelearning;
    if (t.includes('what is docker') || t.includes('explain docker')) return CONCEPT_KNOWLEDGE.docker;
    if (t.includes('what is kubernetes') || t.includes('what is k8s') || t.includes('explain kubernetes')) return CONCEPT_KNOWLEDGE.kubernetes;
    if (t.includes('what is javascript') || t.includes('explain javascript')) return CONCEPT_KNOWLEDGE.javascript;
    if (t.includes('what is python') || t.includes('explain python')) return CONCEPT_KNOWLEDGE.python;
    return null;
  }

  async processMessage(userId, userMessage) {
    const user = await User.findById(userId);
    const learningPath = await LearningPath.findOne({ user: userId, active: true });
    const stats = await statisticsService.calculateUserStatistics(userId);

    let conversation = await Conversation.findOne({ user: userId });
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        title: 'LearnPath AI Mentorship',
        messages: [],
      });
    }

    const currentRole = user?.targetRole || user?.careerGoal || 'Full Stack Developer';
    const currentPhase = learningPath?.phases?.find(p => p.status === 'in-progress') || learningPath?.phases?.[0];
    const userSkills = user?.skills || [];
    const skillGapAnalysis = skillGapEngine.calculateSkillGap(userSkills, currentRole);

    const systemPrompt = `You are LearnPath AI Mentor, an expert senior AI career and technical mentor.
Learner Context:
- Name: ${user?.name || 'Learner'}
- Goal: ${currentRole}
- Active Phase: ${currentPhase ? `Phase ${currentPhase.phaseNumber}: ${currentPhase.title}` : 'Phase 1: Foundations'}
- Verified XP: ${stats.xp} | Streak: ${stats.streak} days
- Critical Gaps: ${skillGapAnalysis.criticalGaps.join(', ') || 'None'}

Provide concise, structured, encouraging technical guidance with markdown.`;

    const prompt = `${systemPrompt}\n\nUser Question: "${userMessage}"\n\nMentor:`;
    let replyContent = await llmService.generateContent(prompt);
    let relatedTopics = [];
    let suggestedActions = [];

    const msgLower = (userMessage || '').toLowerCase();

    // 1. Check if user is asking a programming concept query ("What is Java?", "What is React?", etc.)
    const matchedConcept = this.detectConcept(userMessage);

    if (matchedConcept) {
      replyContent = `${matchedConcept.content}\n\nWould you like to take a 3-question checkpoint quiz on **${matchedConcept.skill}** to verify your knowledge?`;
      relatedTopics = [`${matchedConcept.skill} Architecture`, `${matchedConcept.skill} Best Practices`, `${currentRole} Curriculum`];
      suggestedActions = [
        { label: `Start 3-Question Quiz for ${matchedConcept.skill}`, action: 'GENERATE_QUIZ', payload: { skill: matchedConcept.skill, count: 3 } },
        { label: `Explore ${matchedConcept.skill} Courses`, action: 'NAVIGATE_COURSES', payload: { filter: matchedConcept.skill } },
        { label: 'View Active Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
      ];
    } else if (msgLower.includes('weak in') || (msgLower.includes('study') && (msgLower.includes('weak') || msgLower.includes('improve')))) {
      const detectedSkill = this.extractSkillFromText(userMessage);
      replyContent = `### Targeted Study Strategy for ${detectedSkill} 🎯\n\nTo bridge your gap in **${detectedSkill}** for your **${currentRole}** track, here is your prioritized remediation roadmap:\n\n1. **Core Fundamentals**: Focus on memory lifecycles, lexical scoping, and error handling.\n2. **Subtopics to Master**:\n   - Asynchronous execution and Promises\n   - Execution context and modular design\n   - Clean error boundaries and unit testing\n3. **Practical Challenge**:\n   - Build a lightweight asynchronous client with timeout handling.\n\nTake the 3-question diagnostic checkpoint below to benchmark your progress!`;
      relatedTopics = [`${detectedSkill} Fundamentals`, 'Skill Gap Resolution', 'Curriculum Pacing'];
      suggestedActions = [
        { label: `Start 3-Question Quiz for ${detectedSkill}`, action: 'GENERATE_QUIZ', payload: { skill: detectedSkill, count: 3 } },
        { label: `Explore ${detectedSkill} Courses`, action: 'NAVIGATE_COURSES', payload: { filter: detectedSkill } },
        { label: 'View Skill Gap Analysis', action: 'NAVIGATE_SKILL_GAPS', payload: {} },
      ];
    } else if (msgLower.includes('quiz') || msgLower.includes('questions') || msgLower.includes('test me')) {
      const detectedSkill = this.extractSkillFromText(userMessage);
      const countMatch = userMessage.match(/\b(\d+)\b/);
      const requestedCount = countMatch ? parseInt(countMatch[1], 10) : 3;
      replyContent = `### 3-Question Adaptive Quiz Ready for ${detectedSkill} ⚡\n\nI have generated a **${requestedCount}-question technical checkpoint** on **${detectedSkill}** tailored to your current progress.\n\nClick the button below to launch the assessment!`;
      relatedTopics = [`${detectedSkill} Assessment`, 'XP Rewards', 'Skill Benchmarking'];
      suggestedActions = [
        { label: `Start ${requestedCount}-Question ${detectedSkill} Quiz`, action: 'GENERATE_QUIZ', payload: { skill: detectedSkill, count: requestedCount } },
        { label: 'View Active Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
      ];
    } else if (msgLower.includes('missing') || msgLower.includes('gap') || msgLower.includes('data scientist')) {
      replyContent = `### Skill Gap Matrix for ${currentRole} 📊\n\nBased on your profile benchmark against industry standards for **${currentRole}**:\n\n- **Target Readiness**: ${skillGapAnalysis.overallReadiness}%\n- **Identified Critical Gaps**: ${skillGapAnalysis.criticalGaps.length > 0 ? skillGapAnalysis.criticalGaps.map(g => `\`${g}\``).join(', ') : '`Python Programming`, `Machine Learning Algorithms`, `Pandas & NumPy`'}\n- **Recommended Next Step**: Complete Phase 1 foundational modules to bridge missing prerequisites.`;
      relatedTopics = [`${currentRole} Taxonomy`, 'Gap Matrix', 'Benchmark Comparison'];
      suggestedActions = [
        { label: 'View Full Skill Gap Analysis', action: 'NAVIGATE_SKILL_GAPS', payload: {} },
        { label: 'Recalibrate Learning Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
      ];
    } else if (msgLower.includes('progress') || msgLower.includes('status') || msgLower.includes('how am i doing')) {
      replyContent = `### Your Live Learning Telemetry & Progress 📈\n\nHere is your real-time performance summary for **${currentRole}**:\n\n- ⚡ **Total XP Earned**: **+${stats.xp} XP**\n- 🔥 **Current Study Streak**: **${stats.streak} days active**\n- 🗺️ **Active Curriculum Phase**: **Phase ${currentPhase?.phaseNumber || 1}: ${currentPhase?.title || 'Foundations'}**\n- 🎯 **Readiness Score**: **${skillGapAnalysis.overallReadiness}%** towards role benchmark\n- 🏆 **Completed Milestones**: **${stats.completedMilestones || 0} completed**\n\nKeep up your daily study cadence to maintain milestone pacing!`;
      relatedTopics = ['Telemetry Summary', 'Milestone Tracking', 'XP Analytics'];
      suggestedActions = [
        { label: 'View Detailed Progress & Analytics', action: 'NAVIGATE_PROGRESS', payload: {} },
        { label: 'Continue Current Roadmap Phase', action: 'NAVIGATE_ROADMAP', payload: {} },
      ];
    } else if (!replyContent || replyContent.trim().length < 20) {
      const detectedSkill = this.extractSkillFromText(userMessage);
      replyContent = `### Personalized Mentorship Guidance 💡\n\nRegarding your question on **${userMessage}**:\n\nIn modern software engineering for **${currentRole}**, focusing on clean architecture, consistent daily deliberate practice, and foundational principles yields the fastest mastery.\n\nHere are targeted next steps tailored to your roadmap:\n1. Review your current phase milestones in **${currentPhase?.title || 'Core Foundations'}**.\n2. Complete a short 3-question diagnostic checkpoint.\n3. Build hands-on project portfolio artifacts for your target role.`;
      relatedTopics = [`${detectedSkill} Foundations`, `${currentRole} Strategy`, 'Curriculum Pacing'];
      suggestedActions = [
        { label: `Start 3-Question Quiz for ${detectedSkill}`, action: 'GENERATE_QUIZ', payload: { skill: detectedSkill, count: 3 } },
        { label: 'Explore Course Catalog', action: 'NAVIGATE_COURSES', payload: {} },
        { label: 'View Active Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
      ];
    }

    const assistantMsg = {
      role: 'assistant',
      content: replyContent,
      timestamp: new Date(),
    };

    conversation.messages.push({ role: 'user', content: userMessage, timestamp: new Date() });
    conversation.messages.push(assistantMsg);
    await conversation.save();

    return {
      success: true,
      message: assistantMsg,
      relatedTopics,
      suggestedActions,
    };
  }

  async getConversation(userId) {
    let conversation = await Conversation.findOne({ user: userId });
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        title: 'LearnPath AI Mentorship',
        messages: [
          {
            role: 'assistant',
            content: `Hello! 👋 I am your **LearnPath AI Mentor**.\n\nI'm connected to your live roadmap, skill gaps, and learning telemetry. How can I accelerate your learning today?`,
            timestamp: new Date(),
          },
        ],
      });
    }
    return conversation;
  }
}

const mentorService = new MentorService();
module.exports = mentorService;
