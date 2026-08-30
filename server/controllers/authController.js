const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LearnerProfile = require('../models/LearnerProfile');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const recommendationEngine = require('../services/recommendation/recommendationEngine');
const statisticsService = require('../services/statisticsService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, careerGoal, experienceLevel, preferredLearningStyle, weeklyHours, skills } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      password,
      careerGoal: careerGoal || 'Full Stack MERN Developer',
      experienceLevel: experienceLevel || 'Beginner',
      preferredLearningStyle: preferredLearningStyle || 'Hands-on Projects',
      weeklyHours: weeklyHours || 10,
      skills: Array.isArray(skills) ? skills : [],
      points: 0,
      streak: 0,
    });

    await LearnerProfile.create({
      user: user._id,
      careerGoal: user.careerGoal,
      targetRole: user.careerGoal,
      skills: user.skills,
      preferredLearningStyle: user.preferredLearningStyle,
      weeklyStudyHours: user.weeklyHours,
    });

    // Auto-generate initial learning path for chosen goal
    await adaptivePathService.generateLearningPath(user._id, user.careerGoal);
    await recommendationEngine.generateRecommendationsForUser(user._id);

    const stats = await statisticsService.calculateUserStatistics(user._id);
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        careerGoal: user.careerGoal,
        experienceLevel: user.experienceLevel,
        streak: stats.streak,
        points: stats.xp,
        skills: user.skills,
        resume: user.resume,
        resumeData: user.resumeData,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const stats = await statisticsService.calculateUserStatistics(user._id);
      const token = generateToken(user._id);

      res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          careerGoal: user.careerGoal,
          experienceLevel: user.experienceLevel,
          streak: stats.streak,
          points: stats.xp,
          skills: user.skills,
          resume: user.resume,
          resumeData: user.resumeData,
        },
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const stats = await statisticsService.calculateUserStatistics(req.user._id);

    res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        careerGoal: user.careerGoal,
        experienceLevel: user.experienceLevel,
        preferredLearningStyle: user.preferredLearningStyle,
        weeklyHours: user.weeklyHours,
        streak: stats.streak,
        points: stats.xp,
        skills: user.skills,
        badges: user.badges,
        resume: user.resume,
        resumeData: user.resumeData,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser,
};
