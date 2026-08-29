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
    const { name, email, password, careerGoal, experienceLevel, preferredLearningStyle, weeklyHours } = req.body;

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
      skills: [
        { name: 'HTML & CSS', level: 40, category: 'Frontend' },
        { name: 'JavaScript', level: 30, category: 'Frontend' },
      ],
    });

    await LearnerProfile.create({
      user: user._id,
      careerGoal: user.careerGoal,
      targetRole: user.careerGoal,
      skills: user.skills,
      preferredLearningStyle: user.preferredLearningStyle,
      weeklyStudyHours: user.weeklyHours,
    });

    // Auto-generate initial learning path
    await adaptivePathService.generateLearningPath(user._id);
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
          isDemoUser: user.isDemoUser,
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

// @desc    Demo 1-Click Login for instant judge evaluation
// @route   POST /api/auth/demo-login
// @access  Public
const demoLogin = async (req, res, next) => {
  try {
    let demoUser = await User.findOne({ email: 'demo@learnpath.ai' });

    if (!demoUser) {
      demoUser = await User.create({
        name: 'Akshat (Demo Learner)',
        email: 'demo@learnpath.ai',
        password: 'password123',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AkshatDemo',
        careerGoal: 'Full Stack MERN Developer',
        experienceLevel: 'Intermediate',
        preferredLearningStyle: 'Hands-on Projects',
        weeklyHours: 14,
        preferredDifficulty: 'Intermediate',
        streak: 7,
        points: 1300,
        isDemoUser: true,
        skills: [
          { name: 'HTML & CSS', level: 85, category: 'Frontend' },
          { name: 'JavaScript', level: 65, category: 'Frontend' },
          { name: 'React.js', level: 40, category: 'Frontend' },
          { name: 'Node.js', level: 25, category: 'Backend' },
          { name: 'Express.js', level: 20, category: 'Backend' },
          { name: 'MongoDB', level: 15, category: 'Database' },
        ],
        badges: [
          { id: 'streak_7', name: '7-Day Streak', icon: '🔥', description: 'Learned consistently for 7 straight days' },
          { id: 'quiz_master', name: 'Code Checkpoint', icon: '⚡', description: 'Passed React Hooks Assessment with >80%' },
        ],
      });

      await LearnerProfile.create({
        user: demoUser._id,
        careerGoal: demoUser.careerGoal,
        targetRole: 'Full Stack Developer',
        skills: demoUser.skills,
        interests: ['React', 'Node.js', 'Clean Architecture', 'AI Engineering'],
        preferredLearningStyle: 'Hands-on Projects',
        weeklyStudyHours: 14,
      });

      const LearningActivity = require('../models/LearningActivity');
      const now = new Date();
      const demoActivities = [
        { daysAgo: 6, title: 'Mastered ES6+ Syntax & Scope', skill: 'JavaScript', xp: 150, duration: 60, type: 'resource_completion' },
        { daysAgo: 5, title: 'Asynchronous Control Flow & Promises', skill: 'JavaScript', xp: 150, duration: 45, type: 'resource_completion' },
        { daysAgo: 4, title: 'Event Loop & Microtasks Deep Dive', skill: 'JavaScript', xp: 200, duration: 60, type: 'study_session' },
        { daysAgo: 3, title: 'Passed Assessment: JavaScript Core Checkpoint', skill: 'JavaScript', xp: 200, duration: 15, type: 'quiz_submission' },
        { daysAgo: 2, title: 'Built Interactive Dynamic Widget Milestone', skill: 'HTML & CSS', xp: 250, duration: 90, type: 'project_milestone' },
        { daysAgo: 1, title: 'React Fundamentals & Component Architecture', skill: 'React.js', xp: 150, duration: 45, type: 'resource_completion' },
        { daysAgo: 0, title: 'React Hooks & State Management Deep Dive', skill: 'React.js', xp: 200, duration: 60, type: 'study_session' },
      ];

      for (const log of demoActivities) {
        const actDate = new Date(now);
        actDate.setUTCDate(actDate.getUTCDate() - log.daysAgo);
        actDate.setUTCHours(14, 30, 0, 0);

        await LearningActivity.create({
          user: demoUser._id,
          type: log.type,
          title: log.title,
          skill: log.skill,
          xpEarned: log.xp,
          durationMinutes: log.duration,
          activityDate: actDate,
        });
      }
    }

    const stats = await statisticsService.calculateUserStatistics(demoUser._id);
    const token = generateToken(demoUser._id);

    res.json({
      success: true,
      token,
      user: {
        _id: demoUser._id,
        name: demoUser.name,
        email: demoUser.email,
        avatar: demoUser.avatar,
        careerGoal: demoUser.careerGoal,
        experienceLevel: demoUser.experienceLevel,
        streak: stats.streak,
        points: stats.xp,
        skills: demoUser.skills,
        isDemoUser: true,
        resume: demoUser.resume,
        resumeData: demoUser.resumeData,
      },
    });
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
        isDemoUser: user.isDemoUser,
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
  demoLogin,
  getMe,
  logoutUser,
};
