const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const prerequisiteEngine = require('./services/recommendation/prerequisiteEngine');

// Load environment variables
dotenv.config();

const app = express();

// Core Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/skills', require('./routes/skillRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));
app.use('/api/recommendations', require('./routes/recommendationRoutes'));
app.use('/api/learning-path', require('./routes/learningPathRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

// API Root Endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'LearnPath AI API is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      profile: '/api/profile',
      skills: '/api/skills',
      resources: '/api/resources',
      recommendations: '/api/recommendations',
      learningPath: '/api/learning-path',
      progress: '/api/progress',
      quiz: '/api/quiz',
      ai: '/api/ai',
      analytics: '/api/analytics',
      projects: '/api/projects',
    },
  });
});

// System Health & ML Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    product: 'LearnPath AI - AI-Powered Personalized Learning Path Recommender',
    version: '1.0.0',
    llmProvider: process.env.LLM_PROVIDER || 'gemini',
    geminiKeyActive: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 5),
    timestamp: new Date(),
  });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const Resource = require('./models/Resource');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Quiz = require('./models/Quiz');
const skillsData = require('./seed/skillsData');
const resourcesData = require('./seed/resourcesData');
const projectsData = require('./seed/projectsData');
const quizzesData = require('./seed/quizzesData');

// Start Server and Database
const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed if database is freshly started
    const resCount = await Resource.countDocuments();
    if (resCount === 0) {
      console.log('🌱 Fresh database detected. Auto-populating initial taxonomy & resources...');
      await Skill.insertMany(skillsData);
      await Resource.insertMany(resourcesData);
      await Project.insertMany(projectsData);
      await Quiz.insertMany(quizzesData);
      console.log('✓ Initial seed completed automatically.');
    }

    await prerequisiteEngine.initialize();

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 LearnPath AI Server running on port ${PORT}`);
      console.log(`⚡ API URL: http://localhost:${PORT}/api`);
      console.log(`🧠 ML Recommendation & Prerequisite Engines: Active`);
      console.log(`====================================================`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
  }
};

startServer();

module.exports = app;
