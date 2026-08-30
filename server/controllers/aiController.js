const mentorService = require('../services/ai/mentorService');
const goalAnalyzer = require('../services/ai/goalAnalyzer');
const skillAnalyzer = require('../services/ai/skillAnalyzer');
const insightGenerator = require('../services/ai/insightGenerator');
const AIInsight = require('../models/AIInsight');

// @desc    Chat with LearnPath AI Mentor
// @route   POST /api/ai/chat
// @access  Private
const chatWithMentor = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    const result = await mentorService.processMessage(req.user._id, message.trim());
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    Get mentor conversation history
// @route   GET /api/ai/conversation
// @access  Private
const getMentorConversation = async (req, res, next) => {
  try {
    const conversation = await mentorService.getConversation(req.user._id);
    res.json({ success: true, conversation });
  } catch (error) {
    next(error);
  }
};

// @desc    Analyze natural language career goal
// @route   POST /api/ai/analyze-goal
// @access  Public
const analyzeGoal = async (req, res, next) => {
  try {
    const { goalText } = req.body;
    const analysis = await goalAnalyzer.analyzeGoal(goalText);
    res.json({ success: true, analysis });
  } catch (error) {
    next(error);
  }
};

// @desc    Extract skills from conversational text
// @route   POST /api/ai/analyze-skills
// @access  Public
const analyzeSkills = async (req, res, next) => {
  try {
    const { text } = req.body;
    const skills = await skillAnalyzer.extractSkillsFromText(text);
    res.json({ success: true, skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI insights for user
// @route   GET /api/ai/insights
// @access  Private
const getInsights = async (req, res, next) => {
  try {
    let insights = await AIInsight.find({ user: req.user._id });
    if (!insights || insights.length === 0) {
      insights = await insightGenerator.generateInsightsForUser(req.user._id);
    }
    res.json({ success: true, count: insights.length, insights });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithMentor,
  getMentorConversation,
  analyzeGoal,
  analyzeSkills,
  getInsights,
};
