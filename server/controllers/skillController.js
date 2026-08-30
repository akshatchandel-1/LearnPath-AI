const Skill = require('../models/Skill');
const SkillGap = require('../models/SkillGap');
const skillGapEngine = require('../services/recommendation/skillGapEngine');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getAllSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({}).sort({ category: 1, name: 1 });
    res.json({ success: true, count: skills.length, skills });
  } catch (error) {
    next(error);
  }
};

// @desc    Get skill gap analysis for current user (latest snapshot)
// @route   GET /api/skills/gap-analysis
// @access  Private
const getSkillGapAnalysis = async (req, res, next) => {
  try {
    const skillGap = await SkillGap.findOne({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, skillGap, gapReport: skillGap });
  } catch (error) {
    next(error);
  }
};

// @desc    Save skill gap analysis (from AI service)
// @route   POST /api/skills/gap-analysis
// @access  Private
const saveSkillGapAnalysis = async (req, res, next) => {
  try {
    const { targetRole, currentSkills, missingSkills } = req.body;

    if (currentSkills && !Array.isArray(currentSkills)) {
      return res.status(400).json({ success: false, message: 'currentSkills must be an array' });
    }

    if (missingSkills && !Array.isArray(missingSkills)) {
      return res.status(400).json({ success: false, message: 'missingSkills must be an array' });
    }

    const skillGap = await SkillGap.create({
      user: req.user._id,
      targetRole,
      currentSkills: currentSkills || [],
      missingSkills: missingSkills || [],
    });

    res.status(201).json({ success: true, skillGap, gapReport: skillGap });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSkills, getSkillGapAnalysis, saveSkillGapAnalysis };
