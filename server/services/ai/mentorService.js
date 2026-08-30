const llmService = require('./llmService');
const Conversation = require('../../models/Conversation');
const LearningPath = require('../../models/LearningPath');
const User = require('../../models/User');
const skillGapEngine = require('../recommendation/skillGapEngine');
const statisticsService = require('../statisticsService');

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
    if (t.includes('devops') || t.includes('ci/cd')) return 'CI/CD Pipelines';
    if (t.includes('security') || t.includes('cyber')) return 'Cybersecurity';
    if (t.includes('business analysis') || t.includes('excel')) return 'Business Analysis';
    return 'JavaScript';
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
      // 2. Intelligent Context-Aware Fallback Engine

      if (msgLower.includes('progress') || msgLower.includes('status') || msgLower.includes('how am i doing')) {
        replyContent = `### Your Live Learning Telemetry & Progress 📈\n\nHere is your real-time performance summary for **${currentRole}**:\n\n- ⚡ **Total XP Earned**: **+${stats.xp} XP**\n- 🔥 **Current Study Streak**: **${stats.streak} days active**\n- 🗺️ **Active Curriculum Phase**: **Phase ${currentPhase?.phaseNumber || 1}: ${currentPhase?.title || 'Foundations'}**\n- 🎯 **Readiness Score**: **${skillGapAnalysis.overallReadiness}%** towards role benchmark\n- 🏆 **Completed Milestones**: **${stats.completedMilestones || 0} completed**\n\nKeep up your daily study cadence to maintain milestone pacing!`;
        relatedTopics = ['Telemetry Summary', 'Milestone Tracking', 'XP Analytics'];
        suggestedActions = [
          { label: 'View Detailed Progress & Analytics', action: 'NAVIGATE_PROGRESS', payload: {} },
          { label: 'Continue Current Roadmap Phase', action: 'NAVIGATE_ROADMAP', payload: {} },
        ];
      } else if (msgLower.includes('missing') || msgLower.includes('gap') || msgLower.includes('what skills')) {
        const targetForGaps = this.detectRoleFromText(userMessage, currentRole);
        const gaps = skillGapEngine.calculateSkillGap(userSkills, targetForGaps);
        replyContent = `### Skill Gap Matrix for ${targetForGaps} 📊\n\nBased on your profile benchmark against industry standards for **${targetForGaps}**:\n\n- **Target Readiness**: ${gaps.overallReadiness}%\n- **Identified Critical Gaps**: ${gaps.criticalGaps.length > 0 ? gaps.criticalGaps.map(g => `\`${g}\``).join(', ') : '`Foundational Curriculum Prerequisites`'}\n- **Recommended Next Step**: Complete Phase 1 modules in your active roadmap.`;
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
        replyContent = `### Targeted Study Strategy for ${detectedSkill} 🎯\n\nTo bridge your gap in **${detectedSkill}** for your **${currentRole}** track, here is your prioritized remediation roadmap:\n\n1. **Core Fundamentals**: Focus on memory lifecycles, execution context, and error boundaries.\n2. **Subtopics to Master**:\n   - Asynchronous control flow and Promises\n   - Clean modular architecture and testing\n   - Domain modeling patterns\n3. **Practical Project**:\n   - Implement a functional micro-module demonstrating verified proficiency.\n\nTake the 3-question diagnostic checkpoint below to benchmark your progress!`;
        relatedTopics = [`${detectedSkill} Fundamentals`, 'Skill Gap Resolution', 'Curriculum Pacing'];
        suggestedActions = [
          { label: `Start 3-Question Quiz for ${detectedSkill}`, action: 'GENERATE_QUIZ', payload: { skill: detectedSkill, count: 3 } },
          { label: `Explore ${detectedSkill} Courses`, action: 'NAVIGATE_COURSES', payload: { filter: detectedSkill } },
          { label: 'View Skill Gap Analysis', action: 'NAVIGATE_SKILL_GAPS', payload: {} },
        ];
      } else {
        // Concept query fallback
        replyContent = `### ${detectedSkill} Overview & Guidance 💡\n\nRegarding your question on **${userMessage}**:\n\nIn modern software engineering for **${currentRole}**, mastering **${detectedSkill}** involves understanding both fundamental theory and practical production patterns.\n\nKey areas to review:\n1. Core architectural concepts and API standards.\n2. State management, concurrency, and performance optimization.\n3. Hands-on project implementation aligned with your active phase: **${currentPhase?.title || 'Core Foundations'}**.\n\nWould you like to take a 3-question quiz on ${detectedSkill} or explore relevant roadmap modules?`;
        relatedTopics = [`${detectedSkill} Architecture`, `${currentRole} Strategy`, 'Curriculum Pacing'];
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
