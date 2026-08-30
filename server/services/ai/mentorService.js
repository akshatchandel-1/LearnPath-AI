const Conversation = require("../../models/Conversation");
const LearnerProfile = require("../../models/LearnerProfile");
const LearningPath = require("../../models/LearningPath");
const User = require("../../models/User");
const llmService = require("./llmService");
const skillGapEngine = require("../recommendation/skillGapEngine");
const statisticsService = require("../statisticsService");

class MentorService {
  extractSkillFromText(text = "") {
    const t = text.toLowerCase();
    if (t.includes("javascript") || t.includes("js")) return "JavaScript";
    if (t.includes("react")) return "React.js";
    if (t.includes("node")) return "Node.js";
    if (t.includes("express")) return "Express.js";
    if (t.includes("python")) return "Python";
    if (t.includes("sql") || t.includes("database") || t.includes("postgres")) return "SQL";
    if (t.includes("mongo")) return "MongoDB";
    if (t.includes("docker")) return "Docker";
    if (t.includes("kubernetes") || t.includes("k8s")) return "Kubernetes";
    if (t.includes("aws") || t.includes("cloud")) return "AWS";
    if (t.includes("pandas") || t.includes("numpy")) return "Pandas";
    if (t.includes("machine learning") || t.includes("ml")) return "Machine Learning";
    if (t.includes("deep learning") || t.includes("neural")) return "Deep Learning";
    if (t.includes("excel")) return "Advanced Excel";
    if (t.includes("power bi") || t.includes("powerbi")) return "Power BI";
    if (t.includes("tableau")) return "Tableau";
    if (t.includes("linux") || t.includes("bash")) return "Linux";
    if (t.includes("security") || t.includes("cyber")) return "Cybersecurity";
    if (t.includes("html") || t.includes("css")) return "HTML5 & CSS3";
    if (t.includes("typescript") || t.includes("ts")) return "TypeScript";
    return "Core Engineering";
  }

  extractQuizRequest(userMessage = "") {
    const msgLower = (userMessage || "").toLowerCase();
    const isQuizIntent = msgLower.includes("quiz") || msgLower.includes("test me") || msgLower.includes("questions");
    if (!isQuizIntent) return null;

    const countMatch = userMessage.match(/\b(\d+)\b/);
    const count = countMatch ? Math.min(20, Math.max(1, parseInt(countMatch[1], 10))) : 3;
    const skill = this.extractSkillFromText(userMessage);

    return { skill: skill === "Core Engineering" ? "JavaScript" : skill, count };
  }

  async processMessage(userId, userMessage) {
    let conversation = await this.getConversation(userId);
    const user = await User.findById(userId);
    const profile = await LearnerProfile.findOne({ user: userId });
    const learningPath = await LearningPath.findOne({ user: userId, active: true });
    const stats = await statisticsService.calculateUserStatistics(userId);

    const currentRole = user?.targetRole || user?.careerGoal || profile?.targetRole || "Software Engineer";
    const userSkills = user?.skills || profile?.skills || [];
    const skillGapAnalysis = skillGapEngine.calculateSkillGap(userSkills, currentRole);
    const currentPhase = learningPath?.phases?.find(p => p.status === "in-progress") || learningPath?.phases?.[0];

    const recentMessages = (conversation.messages || []).slice(-6);
    let historyContext = "";
    if (recentMessages.length > 0) {
      historyContext = "\n\nRecent Conversation Context:\n" +
        recentMessages.map(m => `${m.role === "user" ? "Learner" : "Assistant"}: ${m.content}`).join("\n");
    }

    const systemPrompt = `You are LearnPath AI Mentor, an expert senior engineering tutor, career advisor, and technical chatbot.
You provide clear, accurate, structured, technically deep, and encouraging explanations tailored to the learner.

Learner Context:
- Target Engineering Objective: ${currentRole}
- Active Roadmap Phase: Phase ${currentPhase?.phaseNumber || 1}: ${currentPhase?.title || "Foundations"}
- Verified Skills: ${userSkills.length > 0 ? userSkills.map(s => s.name || s.skill).join(", ") : "None assessed yet"}
- Critical Skill Gaps: ${skillGapAnalysis.criticalGaps.length > 0 ? skillGapAnalysis.criticalGaps.join(", ") : "Foundational skills in progress"}

Instructions:
1. Directly and accurately answer whatever technical or conceptual question the learner asks (e.g., Java, React, REST API, MongoDB, Docker, Git, async/await, databases, etc.).
2. For follow-up questions (e.g., "Why is it useful?", "Give me an example"), resolve pronouns using recent conversation context.
3. Provide concise examples, key principles, and structured points where helpful.
4. Keep tone professional, encouraging, concise, and clear.`;

    const prompt = `${systemPrompt}${historyContext}\n\nLearner Question: "${userMessage}"\n\nMentor Response:`;

    let replyContent = await llmService.generateContent(prompt);
    let relatedTopics = [];
    let suggestedActions = [];

    const quizReq = this.extractQuizRequest(userMessage);
    const detectedSkill = this.extractSkillFromText(userMessage);

    if (replyContent && replyContent.trim().length > 10) {
      relatedTopics = [`${detectedSkill} Concepts`, `${currentRole} Strategy`, "Roadmap Milestones"];

      if (quizReq) {
        suggestedActions.push({
          label: `Start ${quizReq.count}-Question ${quizReq.skill} Quiz`,
          action: "GENERATE_QUIZ",
          payload: { skill: quizReq.skill, count: quizReq.count },
        });
      } else if (detectedSkill !== "Core Engineering") {
        suggestedActions.push({
          label: `Start 3-Question Quiz for ${detectedSkill}`,
          action: "GENERATE_QUIZ",
          payload: { skill: detectedSkill, count: 3 },
        });
        suggestedActions.push({
          label: `Explore ${detectedSkill} Courses`,
          action: "NAVIGATE_COURSES",
          payload: { filter: detectedSkill },
        });
      }

      suggestedActions.push({
        label: "View Active Roadmap",
        action: "NAVIGATE_ROADMAP",
        payload: {},
      });
    } else {
      console.warn("LLM generation unavailable. Returning standard fallback.");
      replyContent = "The AI service is temporarily unavailable. Please try again shortly.";
      relatedTopics = [`${currentRole} Strategy`, "Roadmap Milestones"];
      suggestedActions = [
        { label: "View Active Roadmap", action: "NAVIGATE_ROADMAP", payload: {} },
        { label: "Explore Courses", action: "NAVIGATE_COURSES", payload: {} },
      ];
    }

    const assistantMsg = {
      role: "assistant",
      content: replyContent,
      text: replyContent,
      suggestedActions,
      relatedTopics,
      timestamp: new Date(),
    };

    conversation.messages.push({ role: "user", content: userMessage, timestamp: new Date() });
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
        title: "LearnPath AI Mentorship",
        messages: [
          {
            role: "assistant",
            content: "Hello! I am your **LearnPath AI Mentor**.\n\nI am connected to your live roadmap, skill gaps, and learning telemetry. How can I accelerate your learning today?",
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
