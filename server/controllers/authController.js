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

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const normalizedEmail = (email || '').trim().toLowerCase();

    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
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

    // Generate initial learning path and recommendations safely
    try {
      await adaptivePathService.generateLearningPath(user._id, user.careerGoal);
    } catch (lpErr) {
      console.error('Initial learning path creation note:', lpErr.message);
    }

    try {
      await recommendationEngine.generateRecommendationsForUser(user._id);
    } catch (recErr) {
      console.error('Initial recommendation creation note:', recErr.message);
    }

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
        streak: stats?.streak || 0,
        points: stats?.xp || 0,
        skills: user.skills || [],
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
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const normalizedEmail = (email || '').trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
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
          streak: stats?.streak || 0,
          points: stats?.xp || 0,
          skills: user.skills || [],
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
        streak: stats?.streak || 0,
        points: stats?.xp || 0,
        skills: user.skills || [],
        resume: user.resume,
        resumeData: user.resumeData,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear session
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = async (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, getMe, logoutUser };
