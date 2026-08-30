const llmService = require('./llmService');
const Conversation = require('../../models/Conversation');
const LearningPath = require('../../models/LearningPath');
const User = require('../../models/User');
const skillGapEngine = require('../recommendation/skillGapEngine');
const statisticsService = require('../statisticsService');

class MentorService {
  /**
   * Helper to detect technical skill in user prompt
   */
  extractSkillFromText(text = '') {
    const t = text.toLowerCase();
    if (t.includes('javascript') || t.includes('js') || t.includes('es6')) return 'JavaScript';
    if (t.includes('react')) return 'React.js';
    if (t.includes('node')) return 'Node.js';
    if (t.includes('express')) return 'Express.js';
    if (t.includes('mongo')) return 'MongoDB';
    if (t.includes('python')) return 'Python';
    if (t.includes('typescript') || t.includes('ts')) return 'TypeScript';
    if (t.includes('docker')) return 'Docker';
    if (t.includes('kubernetes') || t.includes('k8s')) return 'Kubernetes';
    if (t.includes('aws') || t.includes('cloud')) return 'AWS Cloud';
    if (t.includes('sql') || t.includes('postgres')) return 'SQL';
    if (t.includes('html') || t.includes('css')) return 'HTML & CSS';
    if (t.includes('machine learning') || t.includes('ml')) return 'Machine Learning';
    if (t.includes('system design')) return 'System Design';
    return 'JavaScript';
  }

  /**
   * Helper to detect career target role in user prompt
   */
  extractRoleFromText(text = '', defaultRole = 'Full Stack Developer') {
    const t = text.toLowerCase();
    if (t.includes('data scientist')) return 'Data Scientist';
    if (t.includes('data analyst')) return 'Data Analyst';
    if (t.includes('ai engineer') || t.includes('machine learning engineer')) return 'AI Engineer';
    if (t.includes('cloud engineer') || t.includes('cloud architect')) return 'Cloud Engineer';
    if (t.includes('devops')) return 'DevOps Engineer';
    if (t.includes('frontend')) return 'Frontend Developer';
    if (t.includes('backend') || t.includes('node')) return 'Backend Developer';
    if (t.includes('mern')) return 'MERN Stack Developer';
    if (t.includes('full stack') || t.includes('fullstack')) return 'Full Stack Developer';
    return defaultRole;
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
    const weakSkills = userSkills.filter(s => (s.level || 0) < 50).map(s => s.name);
    
    // Dynamic Skill Gap Analysis for user's active target role
    const skillGapAnalysis = skillGapEngine.calculateSkillGap(userSkills, currentRole);

    const systemPrompt = "You are LearnPath AI Mentor, an expert, senior full-stack AI career architect.\n" +
      "Learner Real-Time Context:\n" +
      "- Name: " + (user?.name || 'Learner') + "\n" +
      "- Goal / Target Role: " + currentRole + "\n" +
      "- Active Roadmap Phase: " + (currentPhase ? ("Phase " + currentPhase.phaseNumber + ": " + currentPhase.title) : 'Phase 1: Foundations') + "\n" +
      "- Current Milestone: " + (currentPhase?.milestone?.title || 'Core Milestone') + "\n" +
      "- Verified XP: " + stats.xp + " | Study Streak: " + stats.streak + " days\n" +
      "- Identified Skill Gaps: " + (skillGapAnalysis.criticalGaps.join(', ') || 'None') + "\n\n" +
      "Provide concise, highly motivating, structured markdown guidance. Use bullet points and code examples where appropriate.";

    const prompt = systemPrompt + "\n\nLearner asks: \"" + userMessage + "\"\n\nMentor response:";

    let replyContent = await llmService.generateContent(prompt);
    let relatedTopics = [];
    let suggestedActions = [];

    const msgLower = (userMessage || '').toLowerCase();

    // If LLM returned text, construct contextual actions and topics
    if (replyContent && replyContent.trim().length > 20) {
      const detectedSkill = this.extractSkillFromText(userMessage);
      relatedTopics = [detectedSkill + " Fundamentals", currentRole + " Strategy", "Curriculum Pacing"];
      suggestedActions = [
        { label: "Start 3-Question Quiz for " + detectedSkill, action: "GENERATE_QUIZ", payload: { skill: detectedSkill, count: 3 } },
        { label: "Explore " + detectedSkill + " Courses", action: "NAVIGATE_COURSES", payload: { filter: detectedSkill } },
        { label: "View Active Roadmap", action: "NAVIGATE_ROADMAP", payload: {} }
      ];
    } else {
      // High-Fidelity Intelligent Offline Reasoning Engine

      // 1. Specific Intent: "I am weak in [Skill]. What should I study?"
      if (msgLower.includes('weak in') || (msgLower.includes('study') && (msgLower.includes('weak') || msgLower.includes('improve')))) {
        const detectedSkill = this.extractSkillFromText(userMessage);

        replyContent = "### Targeted Study Strategy for " + detectedSkill + " 🎯\n\n" +
          "To bridge your gap in **" + detectedSkill + "** for your **" + currentRole + "** track, here is your prioritized remediation roadmap:\n\n" +
          "1. **Foundational Core**: Focus on asynchronous control flow, lexical scope, and memory lifecycles.\n" +
          "2. **Key Subtopics to Master**:\n" +
          "   - Asynchronous execution, Promises and async/await error boundaries\n" +
          "   - Execution context, closures, and referential integrity\n" +
          "   - Modern ES6+ syntax patterns and modular architecture\n" +
          "3. **Hands-on Practice Exercise**:\n" +
          "   - Build a lightweight HTTP client with exponential backoff and timeout handling using AbortController.\n\n" +
          "Start by taking the 3-question diagnostic checkpoint below to calibrate your baseline proficiency!";

        relatedTopics = [detectedSkill + " Fundamentals", "Asynchronous Control Flow", "Skill Gap Resolution", "Curriculum Pacing"];
        suggestedActions = [
          { label: "Start 3-Question Quiz for " + detectedSkill, action: "GENERATE_QUIZ", payload: { skill: detectedSkill, count: 3 } },
          { label: "Explore " + detectedSkill + " Courses", action: "NAVIGATE_COURSES", payload: { filter: detectedSkill } },
          { label: "View Skill Gap Analysis", action: "NAVIGATE_SKILL_GAPS", payload: {} }
        ];
      }
      // 2. Specific Intent: "Create a 3-question quiz for [Skill]"
      else if (msgLower.includes('quiz') || msgLower.includes('test') || msgLower.includes('assessment')) {
        const detectedSkill = this.extractSkillFromText(userMessage);

        replyContent = "### 3-Question Diagnostic Quiz: " + detectedSkill + " Checkpoint ⚡\n\n" +
          "I've prepared a 3-question technical assessment calibrated for **" + detectedSkill + "**:\n" +
          "- **Question 1**: Core Architecture & Concurrency Model\n" +
          "- **Question 2**: Error Boundaries & Exception Handling\n" +
          "- **Question 3**: Production Optimization & Best Practices\n\n" +
          "Click below to begin the 3-question interactive quiz and calibrate your skill level!";

        relatedTopics = [detectedSkill + " Checkpoint", "Competency Benchmarking", "XP Rewards"];
        suggestedActions = [
          { label: "Start 3-Question Quiz for " + detectedSkill, action: "GENERATE_QUIZ", payload: { skill: detectedSkill, count: 3 } },
          { label: "Review Active Roadmap", action: "NAVIGATE_ROADMAP", payload: {} }
        ];
      }
      // 3. Specific Intent: "How can I improve my React skills?" / "I want to improve React."
      else if (msgLower.includes('react') && (msgLower.includes('improve') || msgLower.includes('skill') || msgLower.includes('master') || msgLower.includes('learn'))) {
        replyContent = "### Mastering React.js & Modern Component Architecture ⚛️\n\n" +
          "React is essential for modern frontend and full-stack progression. Here is your step-by-step mastery plan:\n\n" +
          "1. **Component Hierarchy & Rendering Lifecycle**: Master pure render functions, reconciliation, and eliminate unnecessary re-renders.\n" +
          "2. **Custom Hooks & Memoization**: Use `useMemo` and `useCallback` with strict dependency arrays to optimize high-frequency updates.\n" +
          "3. **State Architecture**: Transition complex component state to lightweight atomic stores (Context API or Zustand).\n" +
          "4. **Milestone Project**: Build an interactive real-time dashboard connecting custom hooks to WebSocket/REST endpoints.\n\n" +
          "Ready to validate your current React proficiency?";

        relatedTopics = ["React.js Hooks", "Component Optimization", "Concurrent Mode", "State Management"];
        suggestedActions = [
          { label: "Start 3-Question Quiz for React.js", action: "GENERATE_QUIZ", payload: { skill: "React.js", count: 3 } },
          { label: "Explore React Courses", action: "NAVIGATE_COURSES", payload: { filter: "React" } },
          { label: "View Active Roadmap", action: "NAVIGATE_ROADMAP", payload: {} }
        ];
      }
      // 4. Specific Intent: "What skills am I missing for a [Role] role?"
      else if (msgLower.includes('missing') || (msgLower.includes('role') && (msgLower.includes('skill') || msgLower.includes('gap') || msgLower.includes('data scientist') || msgLower.includes('cloud') || msgLower.includes('engineer')))) {
        const detectedRole = this.extractRoleFromText(userMessage, currentRole);
        const roleGap = skillGapEngine.calculateSkillGap(userSkills, detectedRole);

        const gapTable = roleGap.gaps.slice(0, 5).map(g => "| " + g.skill + " | " + g.currentLevel + "% | " + g.targetLevel + "% | **" + g.priority + "** |").join("\n");

        replyContent = "### Skill Gap Breakdown for " + detectedRole + " 📊\n\n" +
          "Based on industry benchmarks and your verified competencies:\n\n" +
          "| Skill | Current Level | Required Benchmark | Gap Priority |\n" +
          "| :--- | :--- | :--- | :--- |\n" +
          gapTable + "\n\n" +
          "**Overall Role Readiness**: **" + roleGap.readinessScore + "%**\n\n" +
          "**Primary Focus Areas**:\n" +
          (roleGap.criticalGaps.length > 0 ? roleGap.criticalGaps.map(cg => "- **" + cg + "**: Prioritize foundational modules to bridge this high-priority disparity.").join("\n") : "- All core requirements are within benchmark range. Continue taking skill checkpoints!");

        const topSkill = roleGap.gaps[0]?.skill || 'Python';
        relatedTopics = [detectedRole + " Competencies", "Skill Disparity", "Benchmark Alignment"];
        suggestedActions = [
          { label: "Start 3-Question Quiz for " + topSkill, action: "GENERATE_QUIZ", payload: { skill: topSkill, count: 3 } },
          { label: "View Full Skill Gap Matrix", action: "NAVIGATE_SKILL_GAPS", payload: {} },
          { label: "Explore Recommended Courses", action: "NAVIGATE_COURSES", payload: {} }
        ];
      }
      // 5. Specific Intent: "Explain my current learning progress."
      else if (msgLower.includes('progress') || msgLower.includes('telemetry') || msgLower.includes('stats') || msgLower.includes('xp')) {
        const enrolledCount = stats.completedMilestones || 0;
        const streak = stats.streak || 0;
        const totalXp = stats.xp || 0;

        replyContent = "### Your Live Learning Telemetry & Progress 📈\n\n" +
          "Here is your real-time performance summary for **" + currentRole + "**:\n\n" +
          "- ⚡ **Total XP Earned**: **+" + totalXp + " XP**\n" +
          "- 🔥 **Current Study Streak**: **" + streak + " days active**\n" +
          "- 🗺️ **Active Curriculum Phase**: **" + (currentPhase ? ("Phase " + currentPhase.phaseNumber + ": " + currentPhase.title) : "Phase 1: Foundations") + "**\n" +
          "- 🎯 **Readiness Score**: **" + skillGapAnalysis.readinessScore + "%** towards role benchmark\n" +
          "- 🏆 **Completed Milestones**: **" + enrolledCount + " completed**\n\n" +
          "Keep up your daily study cadence to maintain milestone pacing!";

        relatedTopics = ["Progress Telemetry", "XP Milestones", "Roadmap Pacing", "Weekly Study Goals"];
        suggestedActions = [
          { label: "View Full Progress Analytics", action: "NAVIGATE_PROGRESS", payload: {} },
          { label: "Open Active Roadmap", action: "NAVIGATE_ROADMAP", payload: {} }
        ];
      }
      // Default Fallback
      else {
        replyContent = "### Guidance for " + currentRole + " 💡\n\n" +
          "You are currently tracking through **" + (currentPhase ? currentPhase.title : "Phase 1: Core Foundations") + "**.\n\n" +
          "To make the fastest progress:\n" +
          "1. Complete the active lesson modules in your **Learning Path**.\n" +
          "2. Take periodic **Skill Checkpoints** to calibrate your competency metrics.\n" +
          "3. Build the milestone deliverable: **" + (currentPhase?.milestone?.title || "Hands-on Technical Milestone") + "**.\n\n" +
          "Ask me any specific syntax question, architecture concept, or request a 3-question quiz on any topic!";

        relatedTopics = ["Curriculum Guidance", "Assessment Preparation", "Architecture Milestones"];
        suggestedActions = [
          { label: "View Active Roadmap", action: "NAVIGATE_ROADMAP", payload: {} },
          { label: "Start 3-Question Quiz for JavaScript", action: "GENERATE_QUIZ", payload: { skill: "JavaScript", count: 3 } }
        ];
      }
    }

    conversation.messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    });

    conversation.messages.push({
      role: 'assistant',
      content: replyContent,
      timestamp: new Date(),
      contextSnapshot: {
        activePhase: currentPhase?.phaseNumber || 1,
        weakSkills,
        currentMilestone: currentPhase?.milestone?.title || 'Initial Milestone',
      },
    });

    await conversation.save();

    return {
      message: conversation.messages[conversation.messages.length - 1],
      conversationId: conversation._id,
      relatedTopics,
      suggestedActions,
    };
  }

  async getHistory(userId) {
    let conversation = await Conversation.findOne({ user: userId });
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        title: 'LearnPath AI Mentorship',
        messages: [
          {
            role: 'assistant',
            content: "Hello! 👋 I am your **LearnPath AI Mentor**.\n\nI've analyzed your skill gap profile toward your engineering target role.\n\nAsk me anything about your roadmap, why topics are ordered in this sequence, or request a quick 3-question quiz!",
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
