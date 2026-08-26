const Skill = require('../models/Skill');
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

// @desc    Get skill gap analysis for current user
// @route   GET /api/skills/gap-analysis
// @access  Private
const getSkillGapAnalysis = async (req, res, next) => {
  try {
    const userSkills = req.user.skills || [];
    const careerGoal = req.user.careerGoal || 'Full Stack MERN Developer';

    const gapReport = skillGapEngine.calculateSkillGap(userSkills, careerGoal);

    res.json({ success: true, gapReport });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllSkills, getSkillGapAnalysis };
