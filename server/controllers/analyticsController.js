const statisticsService = require('../services/statisticsService');
const QuizAttempt = require('../models/QuizAttempt');
const Progress = require('../models/Progress');
const LearningActivity = require('../models/LearningActivity');
const User = require('../models/User');

// @desc    Get dashboard analytics metrics
// @route   GET /api/analytics/dashboard
// @access  Private
const getDashboardAnalytics = async (req, res, next) => {
  try {
    const stats = await statisticsService.calculateUserStatistics(req.user._id);
    const quizAttempts = await QuizAttempt.find({ user: req.user._id });
    
    // Fetch user progress populated with resource to distinguish courses from lessons
    const progressList = await Progress.find({ user: req.user._id }).populate('resource');

    // Calculate average quiz score
    let avgQuiz = 0;
    if (quizAttempts.length > 0) {
      const sum = quizAttempts.reduce((acc, q) => acc + (q.percentage || 0), 0);
      avgQuiz = Math.round(sum / quizAttempts.length);
    }

    // Active Courses
    const activeCourses = progressList.filter(
      p => p.status === 'in-progress' && p.resource && p.resource.type === 'Course'
    ).length;

    // Completed Courses
    const completedCourses = progressList.filter(
      p => p.status === 'completed' && p.resource && p.resource.type === 'Course'
    ).length;

    // Completed Lessons (non-Course resources)
    const completedLessons = progressList.filter(
      p => p.status === 'completed' && p.resource && p.resource.type !== 'Course'
    ).length;

    // Recent Activity (Top 5)
    const recentActivity = await LearningActivity.find({ user: req.user._id })
      .sort({ activityDate: -1 })
      .limit(5);

    res.json({
      success: true,
      analytics: {
        xp: stats.xp,
        streak: stats.streak,
        activeCourses: activeCourses,
        completedCourses: completedCourses,
        completedLessons: completedLessons,
        learningHours: stats.totalStudyHours,
        averageQuizScore: avgQuiz,
        completedMilestones: 0,
        recentActivity: recentActivity,
        assessmentScores: quizAttempts,
        // Empty fallbacks for frontend compatibility
        weeklyActivity: [],
        learningStyleDistribution: [],
        skillsRadar: [],
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardAnalytics };
