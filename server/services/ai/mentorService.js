const llmService = require('./llmService');
const Conversation = require('../../models/Conversation');
const LearningPath = require('../../models/LearningPath');
const User = require('../../models/User');
const skillGapEngine = require('../recommendation/skillGapEngine');
const statisticsService = require('../statisticsService');

class MentorService {
  extractSkillFromText(text = '') {
    const t = text.toLowerCase();
    if (t.includes('node')) return 'Node.js';
    if (t.includes('express')) return 'Express.js';
    if (t.includes('mongo')) return 'MongoDB';
    if (t.includes('react')) return 'React.js';
    if (t.includes('vue')) return 'Vue.js';
    if (t.includes('angular')) return 'Angular';
    if (t.includes('typescript') || t.includes(' ts')) return 'TypeScript';
    if (t.includes('python') || t.includes('pandas') || t.includes('numpy')) return 'Python';
    if (t.includes('java') && !t.includes('javascript')) return 'Java';
    if (t.includes('javascript') || t.includes('es6') || t.includes(' js') || t.endsWith('js')) return 'JavaScript';
    if (t.includes('docker')) return 'Docker';
    if (t.includes('kubernetes') || t.includes('k8s')) return 'Kubernetes';
    if (t.includes('rest') || t.includes('api')) return 'RESTful APIs';
    if (t.includes('deep learning') || t.includes('neural')) return 'Deep Learning';
    if (t.includes('machine learning') || t.includes(' ml')) return 'Machine Learning';
    if (t.includes('sql') || t.includes('postgres') || t.includes('mysql')) return 'SQL';
    if (t.includes('cloud') || t.includes('aws') || t.includes('azure')) return 'AWS Cloud';
    if (t.includes('devops') || t.includes('ci/cd')) return 'CI/CD Pipelines';
    if (t.includes('security') || t.includes('cyber') || t.includes('owasp')) return 'Cybersecurity';
    if (t.includes('business analysis') || t.includes('excel') || t.includes('brd')) return 'Business Analysis';
    if (t.includes('data structure') || t.includes('dsa') || t.includes('algorithm')) return 'Data Structures & Algorithms';
    return 'Software Engineering';
  }

  detectRoleFromText(text = '', fallback = 'Full Stack Developer') {
    const t = text.toLowerCase();
    if (t.includes('data scientist')) return 'Data Scientist';
    if (t.includes('data analyst')) return 'Data Analyst';
    if (t.includes('ai engineer') || t.includes('machine learning engineer')) return 'AI Engineer';
    if (t.includes('cloud engineer')) return 'Cloud Engineer';
    if (t.includes('devops')) return 'DevOps Engineer';
    if (t.includes('frontend')) return 'Frontend Developer';
    if (t.includes('backend')) return 'Backend Developer';
    if (t.includes('business analyst')) return 'Business Analyst';
    if (t.includes('research engineer')) return 'Research Engineer';
    if (t.includes('cybersecurity') || t.includes('security')) return 'Cybersecurity Engineer';
    if (t.includes('software engineer')) return 'Software Engineer';
    return fallback;
  }

  generateDetailedTechnicalExplanation(skill, userMessage, currentRole, currentPhase) {
    const s = skill.toLowerCase();
    const q = userMessage.toLowerCase();

    if (s.includes('java') && !s.includes('script')) {
      return `### Java: Architecture & Core Principles ☕\n\n**Java** is a high-level, class-based, object-oriented programming language designed around the philosophy of *"Write Once, Run Anywhere"* (WORA).\n\n#### Key Architectural Pillars:\n1. **JVM (Java Virtual Machine)**: Compiles Java source code into bytecode (\`.class\`), which executes on any platform with a compatible JVM.\n2. **Memory Management**: Automatic Garbage Collection (G1, ZGC) managing heap and stack allocations.\n3. **Concurrency**: Robust multi-threading primitives, ExecutorService, and Virtual Threads (Project Loom).\n4. **Enterprise Ecosystem**: Spring Boot, Hibernate ORM, and robust distributed backend systems.\n\n\`\`\`java\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, " + args[0]);\n    }\n}\n\`\`\`\n\nFor your **${currentRole}** track, Java is essential for high-throughput distributed microservices and enterprise backends.`;
    }

    if (s.includes('react')) {
      return `### React.js: Declarative UI Architecture ⚛️\n\n**React** is a declarative, component-driven JavaScript library for building interactive user interfaces based on state reconciliation.\n\n#### Core Concepts:\n1. **Virtual DOM & Fiber Engine**: Efficiently reconciles UI tree differences (diffing algorithm) before committing minimal changes to the actual DOM.\n2. **Component Lifecycle & Hooks**:\n   - \`useState\`: Local component state.\n   - \`useEffect\`: Side-effects, data fetching, and subscriptions.\n   - \`useMemo\` / \`useCallback\`: Performance memoization.\n3. **Unidirectional Data Flow**: State flows down via props; changes trigger upward actions through callbacks.\n\n\`\`\`jsx\nimport React, { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(c => c + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}\n\`\`\``;
    }

    if (s.includes('node') || s.includes('express')) {
      return `### Node.js & Express: Asynchronous Server Architecture 🟢\n\n**Node.js** is a JavaScript runtime built on Chrome's V8 JavaScript engine that uses an event-driven, non-blocking I/O model.\n\n#### Key Mechanism:\n- **Event Loop & Libuv**: Offloads file system, DNS, and network I/O to a background thread pool, keeping the main execution thread unblocked.\n- **Express Middleware Chain**: Processes HTTP requests linearly through composable functions: \`(req, res, next) => { ... }\`.\n\n\`\`\`javascript\nconst express = require('express');\nconst app = express();\n\napp.use(express.json());\n\napp.get('/api/health', (req, res) => {\n  res.json({ status: 'healthy', timestamp: Date.now() });\n});\n\napp.listen(5000);\n\`\`\``;
    }

    if (s.includes('mongo')) {
      return `### MongoDB: Document-Oriented NoSQL Database 🍃\n\n**MongoDB** is a distributed, schema-flexible document database storing data in binary JSON format (BSON).\n\n#### Core Strengths:\n1. **Document Model**: Natural mapping to application objects with nested arrays and sub-documents.\n2. **Horizontal Scaling**: Native sharding and replica sets with automated failover.\n3. **Aggregation Pipeline**: Multi-stage data transformation framework for complex filtering, grouping, and analytics.\n\n\`\`\`javascript\n// Aggregation Example\nconst results = await User.aggregate([\n  { $match: { points: { $gt: 100 } } },\n  { $group: { _id: '$careerGoal', totalUsers: { $sum: 1 } } }\n]);\n\`\`\``;
    }

    if (s.includes('python') || s.includes('data science') || s.includes('machine learning')) {
      return `### Python & Machine Learning Foundations 🐍\n\n**Python** is the primary ecosystem for Data Science and AI due to its high readability and powerful scientific computing libraries.\n\n#### Core ML Stack:\n1. **NumPy & Pandas**: Vectorized matrix operations, data frames, and missing value manipulation.\n2. **Scikit-Learn**: Classical ML models (Linear/Logistic Regression, Random Forests, SVMs, PCA).\n3. **PyTorch / TensorFlow**: Deep neural networks, tensor computation, autograd, and GPU acceleration.\n4. **Evaluation Metrics**: ROC-AUC, Precision/Recall, F1-Score, and Cross-Validation.\n\n\`\`\`python\nimport pandas as pd\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Load & train model\ndf = pd.read_csv('data.csv')\nX, y = df.drop('target', axis=1), df['target']\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X, y)\n\`\`\``;
    }

    if (s.includes('docker') || s.includes('kubernetes') || s.includes('devops')) {
      return `### Docker & Containerization Architecture 🐳\n\n**Docker** standardizes application environments by packaging code, runtime, system tools, and libraries into immutable containers.\n\n#### Core Advantages:\n1. **Environment Parity**: Eliminates the "it works on my machine" problem across dev, staging, and production.\n2. **Linux Isolation**: Utilizes kernel cgroups (resource limits) and namespaces (process/network isolation).\n3. **Multi-Stage Builds**: Compiles artifacts in build containers and deploys minimal production images.\n\n\`\`\`dockerfile\n# Multi-stage production build\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]\n\`\`\``;
    }

    if (s.includes('rest') || s.includes('api')) {
      return `### REST API Architecture & Standards 🌐\n\n**Representational State Transfer (REST)** is an architectural style for designing networked web services over HTTP.\n\n#### Guiding Constraints:\n1. **Stateless**: Every client request contains all context needed to process it.\n2. **Standard HTTP Verbs**: \`GET\` (Read), \`POST\` (Create), \`PUT\`/\`PATCH\` (Update), \`DELETE\` (Remove).\n3. **Proper HTTP Status Codes**: \`200 OK\`, \`201 Created\`, \`400 Bad Request\`, \`401 Unauthorized\`, \`404 Not Found\`, \`500 Server Error\`.\n4. **Uniform Resource URIs**: Use plural nouns like \`/api/courses\` and \`/api/courses/:id\`.`;
    }

    return `### Technical Guidance on ${skill} 💡\n\nRegarding your question on **${userMessage}**:\n\nFor your target role as a **${currentRole}**, understanding **${skill}** is a critical milestone in your active phase (**${currentPhase?.title || 'Foundations'}**).\n\n#### Key Focus Areas:\n1. **Core Fundamentals**: Master the runtime architecture and syntax patterns.\n2. **Production Best Practices**: Implement structured error handling, clean interfaces, and testing.\n3. **Practical Integration**: Build a working module demonstrating end-to-end functionality.\n\nWould you like to take a 3-question diagnostic quiz or explore roadmap modules for ${skill}?`;
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

    const systemPrompt = `You are LearnPath AI Mentor, an expert senior AI technical career coach and educational assistant.
Learner Live Profile & Curriculum Telemetry:
- Learner Name: ${user?.name || 'Learner'}
- Active Career Target Role: ${currentRole}
- Active Roadmap Phase: ${currentPhase ? `Phase ${currentPhase.phaseNumber}: ${currentPhase.title}` : 'Phase 1: Foundations'}
- Current Milestone: ${currentPhase?.milestone?.title || 'Core Milestone'}
- Total Verified XP: +${stats.xp} XP | Study Streak: ${stats.streak} days
- Verified User Skills: ${userSkills.length > 0 ? userSkills.map(s => `${s.name} (${s.level || 0}%)`).join(', ') : 'None yet (Unassessed)'}
- Critical Skill Gaps: ${skillGapAnalysis.criticalGaps.length > 0 ? skillGapAnalysis.criticalGaps.join(', ') : 'Foundational skills in progress'}

Instructions:
1. Provide accurate, clear, pedagogical explanations with concise code examples and bullet points.
2. Directly address the learner's question with educational depth.
3. Tailor recommendations to their target role (${currentRole}) and current roadmap.`;

    const prompt = `${systemPrompt}\n\nLearner Question: "${userMessage}"\n\nMentor Response:`;

    // 1. Attempt LLM invocation
    let replyContent = await llmService.generateContent(prompt);
    let relatedTopics = [];
    let suggestedActions = [];

    const msgLower = (userMessage || '').toLowerCase();
    const detectedSkill = this.extractSkillFromText(userMessage);

    if (replyContent && replyContent.trim().length > 20) {
      relatedTopics = [`${detectedSkill} Concepts`, `${currentRole} Strategy`, 'Roadmap Milestones'];

      if (msgLower.includes('quiz') || msgLower.includes('test') || msgLower.includes('question')) {
        const countMatch = userMessage.match(/\b(\d+)\b/);
        const count = countMatch ? parseInt(countMatch[1], 10) : 3;
        suggestedActions.push({
          label: `Start ${count}-Question ${detectedSkill} Quiz`,
          action: 'GENERATE_QUIZ',
          payload: { skill: detectedSkill, count },
        });
      } else {
        suggestedActions.push({
          label: `Start 3-Question Quiz for ${detectedSkill}`,
          action: 'GENERATE_QUIZ',
          payload: { skill: detectedSkill, count: 3 },
        });
      }

      suggestedActions.push({
        label: 'View Active Roadmap',
        action: 'NAVIGATE_ROADMAP',
        payload: {},
      });
    } else {
      // 2. Intelligent Context-Aware Reasoning Engine

      if (msgLower.includes('progress') || msgLower.includes('status') || msgLower.includes('how am i doing')) {
        replyContent = `### Your Live Learning Telemetry & Progress 📊\n\nHere is your real-time performance summary for **${currentRole}**:\n\n- ⚡ **Total XP Earned**: **+${stats.xp} XP**\n- 🔥 **Current Study Streak**: **${stats.streak} days active**\n- 🗺️ **Active Curriculum Phase**: **Phase ${currentPhase?.phaseNumber || 1}: ${currentPhase?.title || 'Foundations'}**\n- 🎯 **Readiness Score**: **${skillGapAnalysis.overallReadiness}%** towards role benchmark\n- 🏆 **Completed Milestones**: **${stats.completedMilestones || 0} completed**\n\nKeep up your daily study cadence to maintain milestone pacing!`;
        relatedTopics = ['Telemetry Summary', 'Milestone Tracking', 'XP Analytics'];
        suggestedActions = [
          { label: 'View Detailed Progress & Analytics', action: 'NAVIGATE_PROGRESS', payload: {} },
          { label: 'Continue Current Roadmap Phase', action: 'NAVIGATE_ROADMAP', payload: {} },
        ];
      } else if (msgLower.includes('missing') || msgLower.includes('gap') || msgLower.includes('what skills')) {
        const targetForGaps = this.detectRoleFromText(userMessage, currentRole);
        const gaps = skillGapEngine.calculateSkillGap(userSkills, targetForGaps);
        replyContent = `### Skill Gap Matrix for ${targetForGaps} 🎯\n\nBased on your profile benchmark against industry standards for **${targetForGaps}**:\n\n- **Target Readiness**: ${gaps.overallReadiness}%\n- **Identified Critical Gaps**: ${gaps.criticalGaps.length > 0 ? gaps.criticalGaps.map(g => `\`${g}\``).join(', ') : '`Foundational Curriculum Prerequisites`'}\n- **Recommended Next Step**: Complete Phase 1 modules in your active roadmap.`;
        relatedTopics = [`${targetForGaps} Taxonomy`, 'Gap Matrix', 'Benchmark Comparison'];
        suggestedActions = [
          { label: 'View Full Skill Gap Analysis', action: 'NAVIGATE_SKILL_GAPS', payload: {} },
          { label: 'Recalibrate Learning Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
        ];
      } else if (msgLower.includes('quiz') || msgLower.includes('questions') || msgLower.includes('test me')) {
        const countMatch = userMessage.match(/\b(\d+)\b/);
        const requestedCount = countMatch ? parseInt(countMatch[1], 10) : 3;
        replyContent = `### ${requestedCount}-Question Adaptive Quiz Ready for ${detectedSkill} ⚡\n\nI have generated a **${requestedCount}-question technical checkpoint** on **${detectedSkill}** tailored to your current progress.\n\nClick the button below to launch the assessment!`;
        relatedTopics = [`${detectedSkill} Assessment`, 'XP Rewards', 'Skill Benchmarking'];
        suggestedActions = [
          { label: `Start ${requestedCount}-Question ${detectedSkill} Quiz`, action: 'GENERATE_QUIZ', payload: { skill: detectedSkill, count: requestedCount } },
          { label: 'View Active Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
        ];
      } else if (msgLower.includes('weak in') || (msgLower.includes('study') && (msgLower.includes('weak') || msgLower.includes('improve')))) {
        replyContent = `### Targeted Study Strategy for ${detectedSkill} 🚀\n\nTo bridge your gap in **${detectedSkill}** for your **${currentRole}** track, here is your prioritized remediation roadmap:\n\n1. **Core Fundamentals**: Focus on memory lifecycles, execution context, and error boundaries.\n2. **Subtopics to Master**:\n   - Asynchronous control flow and Promises\n   - Clean modular architecture and testing\n   - Domain modeling patterns\n3. **Practical Project**:\n   - Implement a functional micro-module demonstrating verified proficiency.\n\nTake the 3-question diagnostic checkpoint below to benchmark your progress!`;
        relatedTopics = [`${detectedSkill} Fundamentals`, 'Skill Gap Resolution', 'Curriculum Pacing'];
        suggestedActions = [
          { label: `Start 3-Question Quiz for ${detectedSkill}`, action: 'GENERATE_QUIZ', payload: { skill: detectedSkill, count: 3 } },
          { label: `Explore ${detectedSkill} Courses`, action: 'NAVIGATE_COURSES', payload: { filter: detectedSkill } },
          { label: 'View Skill Gap Analysis', action: 'NAVIGATE_SKILL_GAPS', payload: {} },
        ];
      } else {
        // Detailed technical explanation with code snippets
        replyContent = this.generateDetailedTechnicalExplanation(detectedSkill, userMessage, currentRole, currentPhase);
        relatedTopics = [`${detectedSkill} Concepts`, `${currentRole} Strategy`, 'Roadmap Checkpoints'];
        suggestedActions = [
          { label: `Start 3-Question Quiz for ${detectedSkill}`, action: 'GENERATE_QUIZ', payload: { skill: detectedSkill, count: 3 } },
          { label: `Explore ${detectedSkill} Courses`, action: 'NAVIGATE_COURSES', payload: { filter: detectedSkill } },
          { label: 'View Active Roadmap', action: 'NAVIGATE_ROADMAP', payload: {} },
        ];
      }
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

  async getHistory(userId) {
    return await this.getConversation(userId);
  }
}

const mentorService = new MentorService();
module.exports = mentorService;
