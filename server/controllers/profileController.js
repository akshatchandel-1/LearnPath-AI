const LearnerProfile = require('../models/LearnerProfile');
const User = require('../models/User');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const recommendationEngine = require('../services/recommendation/recommendationEngine');

// @desc    Get user learner profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res, next) => {
  try {
    let profile = await LearnerProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = await LearnerProfile.create({
        user: req.user._id,
        careerGoal: req.user.careerGoal || 'Full Stack MERN Developer',
        skills: req.user.skills || [],
        preferredLearningStyle: req.user.preferredLearningStyle || 'Hands-on Projects',
        weeklyStudyHours: req.user.weeklyHours || 10,
      });
    }

    res.json({ success: true, profile });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user learner profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { careerGoal, skills, interests, preferredLearningStyle, weeklyStudyHours, preferredDifficulty } = req.body;

    let profile = await LearnerProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = new LearnerProfile({ user: req.user._id });
    }

    if (careerGoal) profile.careerGoal = careerGoal;
    if (skills) profile.skills = skills;
    if (interests) profile.interests = interests;
    if (preferredLearningStyle) profile.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours) profile.weeklyStudyHours = weeklyStudyHours;
    if (preferredDifficulty) profile.preferredDifficulty = preferredDifficulty;

    await profile.save();

    // Update user document
    const user = await User.findById(req.user._id);
    if (careerGoal) user.careerGoal = careerGoal;
    if (skills) user.skills = skills;
    if (preferredLearningStyle) user.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours) user.weeklyHours = weeklyStudyHours;
    await user.save();

    // Regenerate roadmap & recommendations to reflect new profile
    await adaptivePathService.generateLearningPath(req.user._id);
    await recommendationEngine.generateRecommendationsForUser(req.user._id);

    res.json({ success: true, profile, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
