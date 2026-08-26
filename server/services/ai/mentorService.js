const llmService = require('./llmService');
const Conversation = require('../../models/Conversation');
const LearningPath = require('../../models/LearningPath');
const User = require('../../models/User');

class MentorService {
  async processMessage(userId, userMessage) {
    const user = await User.findById(userId);
    const learningPath = await LearningPath.findOne({ user: userId, active: true });

    let conversation = await Conversation.findOne({ user: userId });
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        title: 'Full Stack MERN Mentorship',
        messages: [],
      });
    }

    const currentPhase = learningPath?.phases?.find(p => p.status === 'in-progress') || learningPath?.phases?.[0];
    const weakSkills = (user?.skills || []).filter(s => (s.level || 0) < 50).map(s => s.name);

    const systemPrompt = `You are "LearnPath AI Mentor", a supportive, senior full-stack AI career architect.
Learner Context:
- Name: ${user?.name || 'Learner'}
- Goal: ${user?.careerGoal || 'Full Stack MERN Developer'}
- Active Roadmap Phase: ${currentPhase ? `Phase ${currentPhase.phaseNumber}: ${currentPhase.title}` : 'Phase 1: JavaScript Foundations'}
- Current Milestone: ${currentPhase?.milestone?.title || 'Component State Architect'}
- Identified Skill Gaps: ${weakSkills.join(', ') || 'React, Node.js, Express, MongoDB'}

Provide concise, highly motivating, structured markdown guidance. Explain WHY topics are ordered in this specific sequence using prerequisite graph logic.`;

    const prompt = `${systemPrompt}\n\nLearner asks: "${userMessage}"\n\nMentor response:`;

    const rawReply = await llmService.generateContent(prompt);
    let replyContent = rawReply;

    if (!replyContent) {
      // Deterministic reasoning fallback
      const msgLower = (userMessage || '').toLowerCase();
      if (msgLower.includes('why') && (msgLower.includes('node') || msgLower.includes('backend'))) {
        replyContent = `### Why Learn Node.js & Backend Now? 🚀\n\nBecause your goal is **${user?.careerGoal || 'Full Stack MERN Developer'}** and your roadmap sequences **JavaScript Foundations** first to ensure you understand asynchronous control flow, promises, and the event loop.\n\n1. **Event Loop Continuity**: Node.js uses the exact same V8 engine as the browser, allowing you to reuse your JavaScript mastery directly on the server.\n2. **Prerequisite Ordering**: In our topological curriculum DAG, mastering client state in Phase 2 ensures you know the exact JSON payloads and REST routes your backend needs to deliver.\n3. **Full Stack Milestone**: Once Node & Express are mastered, you will build and connect your full-stack capstone in Phase 6!`;
      } else if (msgLower.includes('react') || msgLower.includes('frontend')) {
        replyContent = `### Mastering React.js & Component Architecture ⚛️\n\nReact is the core UI framework of the MERN stack. Transitioning directly from JavaScript fundamentals into React allows you to apply functional programming (map, filter, reduce) into declarative JSX components.\n\n**Next Recommended Action**: Complete the *React Component Lifecycles & Hooks Checkpoint* quiz to unlock Phase 3!`;
      } else {
        replyContent = `### Great question! 🎯\n\nLooking at your active profile for **${user?.careerGoal || 'Full Stack MERN Developer'}**, you are currently progressing through **${currentPhase?.title || 'Phase 2: React.js Architecture'}**.\n\nKeep focusing on building hands-on milestones and passing your skill checkpoints. Let me know if you need help with any specific code syntax, API architecture, or debugging!`;
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
    };
  }

  async getHistory(userId) {
    let conversation = await Conversation.findOne({ user: userId });
    if (!conversation) {
      conversation = await Conversation.create({
        user: userId,
        title: 'Full Stack MERN Mentorship',
        messages: [
          {
            role: 'assistant',
            content: `Hello! 👋 I am your **LearnPath AI Mentor**.\n\nI've analyzed your skill gap profile toward becoming a **Full Stack MERN Developer**:\n- **Active Roadmap Phase**: **Phase 2: React.js Architecture & Custom Hooks**.\n\nAsk me anything about your roadmap, why topics are ordered in this sequence, or what to build next!`,
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
