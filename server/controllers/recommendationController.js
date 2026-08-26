const recommendationEngine = require('../services/recommendation/recommendationEngine');
const Recommendation = require('../models/Recommendation');
const Feedback = require('../models/Feedback');
const LearnerProfile = require('../models/LearnerProfile');

// @desc    Get current recommendations for user
// @route   GET /api/recommendations
// @access  Private
const getRecommendations = async (req, res, next) => {
  try {
    const recommendations = await recommendationEngine.getStoredRecommendations(req.user._id);
    res.json({ success: true, count: recommendations.length, recommendations });
  } catch (error) {
    next(error);
  }
};

// @desc    Trigger re-generation of recommendations
// @route   POST /api/recommendations/generate
// @access  Private
const generateRecommendations = async (req, res, next) => {
  try {
    const result = await recommendationEngine.generateRecommendationsForUser(req.user._id);
    res.json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit feedback on a recommendation
// @route   POST /api/recommendations/:id/feedback
// @access  Private
const submitFeedback = async (req, res, next) => {
  try {
    const { helpful, difficultyRating, comment } = req.body;
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ success: false, message: 'Recommendation not found' });
    }

    recommendation.feedback = {
      helpful,
      difficultyFeedback: difficultyRating,
      timestamp: new Date(),
    };
    await recommendation.save();

    await Feedback.create({
      user: req.user._id,
      recommendation: recommendation._id,
      resource: recommendation.resource,
      helpful,
      difficultyRating,
      comment,
    });

    // Update learner profile format affinities
    const profile = await LearnerProfile.findOne({ user: req.user._id });
    if (profile && profile.formatAffinity) {
      if (!helpful) {
        // Slightly decrease affinity
      }
    }

    res.json({ success: true, message: 'Feedback recorded', recommendation });
  } catch (error) {
    next(error);
  }
};

module.exports = { getRecommendations, generateRecommendations, submitFeedback };
