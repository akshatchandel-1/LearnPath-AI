const LearningPath = require('../models/LearningPath');
const adaptivePathService = require('../services/adaptive/adaptivePathService');

// @desc    Get active learning path
// @route   GET /api/learning-path
// @access  Private
const getLearningPath = async (req, res, next) => {
  try {
    const learningPath = await LearningPath.findOne({ user: req.user._id, active: true });
    // AI separation: we no longer generate a path if none is found.
    res.json({ success: true, learningPath });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new learning path
// @route   POST /api/learning-path
// @access  Private
const createLearningPath = async (req, res, next) => {
  try {
    const { title, goal, targetRole, totalEstimatedWeeks, phases } = req.body;

    if (!title || !goal) {
      return res.status(400).json({ success: false, message: 'title and goal are required' });
    }

    if (phases && !Array.isArray(phases)) {
      return res.status(400).json({ success: false, message: 'phases must be an array' });
    }

    // Deactivate previous active paths for this user
    await LearningPath.updateMany(
      { user: req.user._id, active: true },
      { $set: { active: false } }
    );

    const learningPath = await LearningPath.create({
      user: req.user._id,
      title,
      goal,
      targetRole,
      totalEstimatedWeeks,
      phases: phases || [],
      active: true,
    });

    res.status(201).json({ success: true, learningPath });
  } catch (error) {
    next(error);
  }
};

// @desc    Update active learning path
// @route   PUT /api/learning-path
// @access  Private
const updateLearningPath = async (req, res, next) => {
  try {
    const { title, goal, targetRole, totalEstimatedWeeks, phases, currentPhase, overallProgress, active } = req.body;

    // Do NOT allow updating immutable fields or other users' paths.
    if (phases && !Array.isArray(phases)) {
      return res.status(400).json({ success: false, message: 'phases must be an array' });
    }

    let learningPath = await LearningPath.findOne({ user: req.user._id, active: true });
    if (!learningPath) {
      return res.status(404).json({ success: false, message: 'Active learning path not found' });
    }

    if (title !== undefined) learningPath.title = title;
    if (goal !== undefined) learningPath.goal = goal;
    if (targetRole !== undefined) learningPath.targetRole = targetRole;
    if (totalEstimatedWeeks !== undefined) learningPath.totalEstimatedWeeks = totalEstimatedWeeks;
    if (phases !== undefined) learningPath.phases = phases;
    if (currentPhase !== undefined) learningPath.currentPhase = currentPhase;
    if (overallProgress !== undefined) learningPath.overallProgress = overallProgress;
    if (active !== undefined) learningPath.active = active;

    await learningPath.save();
    res.json({ success: true, learningPath });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate new learning path (Legacy AI trigger)
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

// @desc    Adapt learning path dynamically based on quiz or user trigger (Legacy AI trigger)
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

module.exports = { getLearningPath, createLearningPath, updateLearningPath, generateLearningPath, adaptLearningPath };
