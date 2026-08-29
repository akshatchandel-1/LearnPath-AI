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

    // Validation
    if (careerGoal !== undefined && typeof careerGoal !== 'string') {
      return res.status(400).json({ success: false, message: 'careerGoal must be a string' });
    }
    
    if (skills !== undefined) {
      if (!Array.isArray(skills)) {
        return res.status(400).json({ success: false, message: 'skills must be an array' });
      }
      for (const skill of skills) {
        if (!skill.name || typeof skill.name !== 'string') {
          return res.status(400).json({ success: false, message: 'Each skill must have a valid string name' });
        }
      }
    }

    const validLearningStyles = ['Video', 'Reading', 'Hands-on Projects', 'Practice Problems', 'Mixed'];
    if (preferredLearningStyle !== undefined && !validLearningStyles.includes(preferredLearningStyle)) {
      return res.status(400).json({ success: false, message: 'Invalid preferredLearningStyle' });
    }

    if (weeklyStudyHours !== undefined && (typeof weeklyStudyHours !== 'number' || weeklyStudyHours <= 0)) {
      return res.status(400).json({ success: false, message: 'weeklyStudyHours must be a positive number' });
    }

    const validDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
    if (preferredDifficulty !== undefined && !validDifficulties.includes(preferredDifficulty)) {
      return res.status(400).json({ success: false, message: 'Invalid preferredDifficulty' });
    }

    let profile = await LearnerProfile.findOne({ user: req.user._id });
    if (!profile) {
      profile = new LearnerProfile({ user: req.user._id });
    }

    if (careerGoal !== undefined) profile.careerGoal = careerGoal;
    if (skills !== undefined) profile.skills = skills;
    if (interests !== undefined) profile.interests = interests;
    if (preferredLearningStyle !== undefined) profile.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours !== undefined) profile.weeklyStudyHours = weeklyStudyHours;
    if (preferredDifficulty !== undefined) profile.preferredDifficulty = preferredDifficulty;

    await profile.save();

    // Update user document
    const user = await User.findById(req.user._id).select('-password');
    if (careerGoal !== undefined) user.careerGoal = careerGoal;
    if (skills !== undefined) user.skills = skills;
    if (preferredLearningStyle !== undefined) user.preferredLearningStyle = preferredLearningStyle;
    if (weeklyStudyHours !== undefined) user.weeklyHours = weeklyStudyHours;
    await user.save();

    // Regenerate roadmap & recommendations to reflect new profile asynchronously (Fire-and-forget)
    Promise.all([
      adaptivePathService.generateLearningPath(req.user._id),
      recommendationEngine.generateRecommendationsForUser(req.user._id)
    ]).catch(err => console.error('Background AI Processing Error:', err.message));

    res.json({ success: true, profile, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, updateProfile };
