const dotenv = require('dotenv');
const { connectDB } = require('../config/db');

const User = require('../models/User');
const LearnerProfile = require('../models/LearnerProfile');
const Skill = require('../models/Skill');
const Resource = require('../models/Resource');
const Project = require('../models/Project');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const LearningPath = require('../models/LearningPath');
const Progress = require('../models/Progress');
const LearningActivity = require('../models/LearningActivity');
const Conversation = require('../models/Conversation');

const skillsData = require('./skillsData');
const resourcesData = require('./resourcesData');
const projectsData = require('./projectsData');
const quizzesData = require('./quizzesData');

const recommendationEngine = require('../services/recommendation/recommendationEngine');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const prerequisiteEngine = require('../services/recommendation/prerequisiteEngine');
const insightGenerator = require('../services/ai/insightGenerator');

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log('ðŸš€ Starting LearnPath AI Database Seeding Pipeline...');
    await connectDB();

    // Clean existing collections
    console.log('ðŸ§¹ Clearing legacy collections...');
    await Promise.all([
      User.deleteMany({}),
      LearnerProfile.deleteMany({}),
      Skill.deleteMany({}),
      Resource.deleteMany({}),
      Project.deleteMany({}),
      Quiz.deleteMany({}),
      QuizAttempt.deleteMany({}),
      LearningPath.deleteMany({}),
      Progress.deleteMany({}),
      LearningActivity.deleteMany({}),
      Conversation.deleteMany({}),
    ]);

    // 1. Insert Skills
    console.log(`ðŸ“¦ Seeding ${skillsData.length} Core Tech Skills...`);
    const insertedSkills = await Skill.insertMany(skillsData);

    // Initialize prerequisite graph with seeded skills
    await prerequisiteEngine.initialize();

    // 2. Insert Resources
    console.log(`ðŸ“š Seeding ${resourcesData.length} Verified Learning Resources...`);
    const insertedResources = await Resource.insertMany(resourcesData);

    // 3. Insert Projects
    console.log(`ðŸ› ï¸ Seeding ${projectsData.length} Real-World Projects...`);
    const insertedProjects = await Project.insertMany(projectsData);

    // 4. Insert Quizzes
    console.log(`ðŸ“ Seeding ${quizzesData.length} Assessment Quizzes...`);
    const insertedQuizzes = await Quiz.insertMany(quizzesData);

    // 5. Seed Hackathon Demo User
    console.log('ðŸ‘¤ Seeding Demo User (Akshat - Full Stack MERN Aspirant)...');
    const demoUser = await User.create({
      name: 'Akshat (Demo Learner)',
      email: 'sample.learner@learnpath.ai',
      password: 'password123',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AkshatDemo',
      careerGoal: 'Full Stack MERN Developer',
      experienceLevel: 'Intermediate',
      preferredLearningStyle: 'Hands-on Projects',
      weeklyHours: 14,
      preferredDifficulty: 'Intermediate',
      streak: 7,
      points: 1300,
      
      skills: [
        { name: 'HTML & CSS', level: 85, category: 'Frontend' },
        { name: 'JavaScript', level: 68, category: 'Frontend' },
        { name: 'React.js', level: 42, category: 'Frontend' },
        { name: 'Node.js', level: 25, category: 'Backend' },
        { name: 'Express.js', level: 20, category: 'Backend' },
        { name: 'MongoDB', level: 15, category: 'Database' },
      ],
      badges: [
        { id: 'streak_7', name: '7-Day Streak', icon: 'ðŸ”¥', description: 'Learned consistently for 7 straight days' },
        { id: 'quiz_master', name: 'Code Checkpoint', icon: 'âš¡', description: 'Passed React Hooks Assessment with >80%' },
        { id: 'project_builder', name: 'Full Stack Builder', icon: 'ðŸ› ï¸', description: 'Completed first hands-on MERN milestone' },
      ],
    });

    // 6. Seed Learner Profile
    await LearnerProfile.create({
      user: demoUser._id,
      careerGoal: demoUser.careerGoal,
      targetRole: 'Full Stack Developer',
      skills: demoUser.skills,
      interests: ['React', 'Node.js', 'Clean Architecture', 'AI Engineering', 'Full Stack'],
      experience: 'Intermediate',
      preferredLearningStyle: 'Hands-on Projects',
      weeklyStudyHours: 14,
      preferredDifficulty: 'Intermediate',
      completedCourses: ['HTML & CSS Foundations', 'Modern JavaScript Bootcamp'],
      completedProjects: ['Interactive Dynamic Dashboard Widget'],
      learningHistory: [
        { activity: 'Completed Lesson: ES6+ Deep Dive', skill: 'JavaScript', score: 90, details: 'Closures & Promises' },
        { activity: 'Passed Assessment: JavaScript Core Checkpoint', skill: 'JavaScript', score: 85, details: '5/5 correct' },
        { activity: 'Started Module: React Hooks Architecture', skill: 'React.js', score: null, details: 'In Progress' },
      ],
    });

    // 7. Seed 7-Day Realistic Learning Activities (Streak = 7 Days, XP = 1300)
    console.log('ðŸ”¥ Seeding 7-Day Activity History & Data-Driven Streak...');
    const now = new Date();
    const activityLogs = [
      { daysAgo: 6, title: 'Mastered ES6+ Syntax & Scope', skill: 'JavaScript', xp: 150, duration: 60, type: 'resource_completion' },
      { daysAgo: 5, title: 'Asynchronous Control Flow & Promises', skill: 'JavaScript', xp: 150, duration: 45, type: 'resource_completion' },
      { daysAgo: 4, title: 'Event Loop & Microtasks Deep Dive', skill: 'JavaScript', xp: 200, duration: 60, type: 'study_session' },
      { daysAgo: 3, title: 'Passed Assessment: JavaScript Core Checkpoint', skill: 'JavaScript', xp: 200, duration: 15, type: 'quiz_submission' },
      { daysAgo: 2, title: 'Built Interactive Dynamic Widget Milestone', skill: 'HTML & CSS', xp: 250, duration: 90, type: 'project_milestone' },
      { daysAgo: 1, title: 'React Fundamentals & Component Architecture', skill: 'React.js', xp: 150, duration: 45, type: 'resource_completion' },
      { daysAgo: 0, title: 'React Hooks & State Management Deep Dive', skill: 'React.js', xp: 200, duration: 60, type: 'study_session' },
    ];

    for (const log of activityLogs) {
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

    // 8. Generate Roadmap & Recommendations
    console.log('ðŸ—ºï¸ Generating Adaptive Prerequisite Roadmap for Demo User...');
    const learningPath = await adaptivePathService.generateLearningPath(demoUser._id);

    console.log('ðŸ§  Generating ML Hybrid Recommendations with Explainable AI...');
    const recResult = await recommendationEngine.generateRecommendationsForUser(demoUser._id);

    // 9. Seed Initial Completed Resource & Progress
    if (insertedResources.length > 0) {
      demoUser.completedResources = [insertedResources[0]._id];
      demoUser.points = 1300;
      demoUser.streak = 7;
      await demoUser.save();

      await Progress.create({
        user: demoUser._id,
        resource: insertedResources[0]._id,
        learningPath: learningPath._id,
        pathPhaseNumber: 1,
        status: 'completed',
        progressPercent: 100,
        timeSpentMinutes: 180,
        notes: 'Mastered ES6 syntax, closures, and async event loop mechanisms.',
        completedAt: new Date(),
      });
    }

    // 10. Seed Initial Quiz Attempt
    if (insertedQuizzes.length > 0) {
      await QuizAttempt.create({
        user: demoUser._id,
        quiz: insertedQuizzes[0]._id,
        skill: 'JavaScript',
        score: 85,
        percentage: 85,
        totalQuestions: 5,
        correctCount: 4,
        answers: [],
        previousSkillLevel: 55,
        newSkillLevel: 68,
        feedback: 'Outstanding mastery in Async JavaScript and Event Loop!',
        adaptiveActionTriggered: false,
      });
    }

    // 11. Generate AI Insights
    console.log('ðŸ’¡ Generating AI Behavioral Insights...');
    await insightGenerator.generateInsightsForUser(demoUser._id);

    // 12. Seed AI Mentor Conversation
    await Conversation.create({
      user: demoUser._id,
      title: 'Full Stack MERN Mentorship',
      messages: [
        {
          role: 'assistant',
          content: `Hello **Akshat**! ðŸ‘‹ I am your **LearnPath AI Mentor**.\n\nI've analyzed your skill gap profile toward becoming a **Full Stack MERN Developer**:\n- **Strengths**: Strong in HTML/CSS (85%) and solid JavaScript foundations (68%).\n- **Identified Gaps**: React (42%), Node.js (25%), Express (20%), and MongoDB (15%).\n- **Active Roadmap Phase**: **Phase 2: React.js Architecture & Custom Hooks**.\n\nAsk me anything about your roadmap, why topics are ordered in this sequence, or what to build next!`,
          timestamp: new Date(Date.now() - 3600000),
        },
      ],
    });

    console.log(`\n========================================================`);
    console.log(`âœ… DATABASE SEEDING COMPLETED SUCCESSFULLY!`);
    console.log(`--------------------------------------------------------`);
    console.log(`ðŸ“Š Seeded Skills:          ${insertedSkills.length}`);
    console.log(`ðŸ“š Seeded Resources:       ${insertedResources.length}`);
    console.log(`ðŸ› ï¸ Seeded Projects:        ${insertedProjects.length}`);
    console.log(`ðŸ“ Seeded Quizzes:         ${insertedQuizzes.length}`);
    console.log(`ðŸŽ¯ Generated Recomms:      ${recResult.recommendations.length}`);
    console.log(`ðŸ—ºï¸ Generated Roadmap:      ${learningPath.title} (${learningPath.phases.length} phases)`);
    console.log(`--------------------------------------------------------`);
    console.log(`ðŸ”‘ HACKATHON DEMO CREDENTIALS:`);
    console.log(`   Email:    sample.learner@learnpath.ai`);
    console.log(`   Password: password123`);
    console.log(`========================================================\n`);

    process.exit(0);
  } catch (error) {
    console.error('âœ— Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();

