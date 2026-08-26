const LearningPath = require('../models/LearningPath');
const adaptivePathService = require('../services/adaptive/adaptivePathService');

// @desc    Get active learning path
// @route   GET /api/learning-path
// @access  Private
const getLearningPath = async (req, res, next) => {
  try {
    let learningPath = await LearningPath.findOne({ user: req.user._id, active: true });
    if (!learningPath) {
      learningPath = await adaptivePathService.generateLearningPath(req.user._id);
    }
    res.json({ success: true, learningPath });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate new learning path
// @route   POST /api/learning-path/generate
// @access  Private
const generateLearningPath = async (req, res, next) => {
  try {
    const learningPath = await adaptivePathService.generateLearningPath(req.user._id);
    res.json({ success: true, learningPath });
  } catch (error) {
    next(error);
  }
};

// @desc    Adapt learning path dynamically based on quiz or user trigger
// @route   POST /api/learning-path/adapt
// @access  Private
const adaptLearningPath = async (req, res, next) => {
  try {
    const learningPath = await adaptivePathService.adaptLearningPath(req.user._id, req.body);
    res.json({ success: true, learningPath, message: 'Learning path recalibrated successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLearningPath, generateLearningPath, adaptLearningPath };
