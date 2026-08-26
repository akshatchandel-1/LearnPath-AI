const Progress = require('../models/Progress');
const User = require('../models/User');
const statisticsService = require('../services/statisticsService');

// @desc    Get user progress summary
// @route   GET /api/progress
// @access  Private
const getUserProgress = async (req, res, next) => {
  try {
    const progressList = await Progress.find({ user: req.user._id }).populate('resource');
    res.json({ success: true, count: progressList.length, progress: progressList });
  } catch (error) {
    next(error);
  }
};

// @desc    Update progress on a resource
// @route   POST /api/progress
// @access  Private
const updateProgress = async (req, res, next) => {
  try {
    const { resourceId, status, progressPercent, timeSpentMinutes, notes } = req.body;

    let progress = await Progress.findOne({ user: req.user._id, resource: resourceId });

    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        resource: resourceId,
      });
    }

    if (status) progress.status = status;
    if (progressPercent !== undefined) progress.progressPercent = progressPercent;
    if (timeSpentMinutes !== undefined) progress.timeSpentMinutes += timeSpentMinutes;
    if (notes) progress.notes = notes;

    if (status === 'completed' && !progress.completedAt) {
      progress.completedAt = new Date();
      progress.progressPercent = 100;

      // Add to user completed resources
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { completedResources: resourceId },
      });

      // Record activity and award XP
      await statisticsService.recordActivity(req.user._id, {
        type: 'resource_completion',
        title: `Completed Resource Learning Module`,
        xpEarned: 50,
        durationMinutes: timeSpentMinutes || 30,
      });
    }

    await progress.save();
    const stats = await statisticsService.calculateUserStatistics(req.user._id);

    res.json({ success: true, progress, stats });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserProgress, updateProgress };
