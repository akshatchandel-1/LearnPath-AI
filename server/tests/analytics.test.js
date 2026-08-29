const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Resource = require('../models/Resource');
const Progress = require('../models/Progress');
const LearningActivity = require('../models/LearningActivity');
const QuizAttempt = require('../models/QuizAttempt');
const { connectDB, disconnectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Resource.deleteMany({});
  await Progress.deleteMany({});
  await LearningActivity.deleteMany({});
  await QuizAttempt.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await Resource.deleteMany({});
  await Progress.deleteMany({});
  await LearningActivity.deleteMany({});
  await QuizAttempt.deleteMany({});
  await disconnectDB();
});

describe('Analytics & Dashboard API', () => {
  let authToken = '';
  let userId = '';
  let userBToken = '';
  let userBId = '';
  let courseId = '';
  let lessonId = '';

  beforeAll(async () => {
    // 1. Create a fresh user A
    const userA = await User.create({
      name: 'Fresh Analytics Tester',
      email: 'freshtest@example.com',
      password: 'password123',
    });
    userId = userA._id.toString();
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // 2. Create user B
    const userB = await User.create({
      name: 'User B',
      email: 'userb@example.com',
      password: 'password123',
    });
    userBId = userB._id.toString();
    userBToken = jwt.sign({ id: userBId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // Seed resources
    const course = await Resource.create({
      title: 'Analytics Course',
      description: 'Course',
      type: 'Course',
      url: 'http://test.com/course',
      difficulty: 'Beginner',
      skills: ['Analytics']
    });
    courseId = course._id.toString();

    const lesson = await Resource.create({
      title: 'Analytics Lesson',
      description: 'Video',
      type: 'Video',
      url: 'http://test.com/video',
      difficulty: 'Beginner',
      skills: ['Analytics']
    });
    lessonId = lesson._id.toString();
  });

  describe('Fresh User Behavior', () => {
    it('1. Dashboard requires authentication', async () => {
      const res = await request(app).get('/api/analytics/dashboard');
      expect(res.statusCode).toBe(401);
    });

    it('2-12, 21-23. Fresh user returns strict zeros and empty arrays', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      const data = res.body.analytics;
      
      expect(data.xp).toBe(0);
      expect(data.streak).toBe(0);
      expect(data.activeCourses).toBe(0);
      expect(data.completedCourses).toBe(0);
      expect(data.completedLessons).toBe(0);
      expect(data.learningHours).toBe(0);
      expect(data.averageQuizScore).toBe(0);
      expect(data.completedMilestones).toBe(0);
      expect(data.recentActivity).toEqual([]);
      expect(data.assessmentScores).toEqual([]);
      expect(data.weeklyActivity).toEqual([]);
      
      // Assure no fake values or 85/65 fallbacks
      expect(data.learningStyleDistribution).toEqual([]);
      expect(data.skillsRadar).toEqual([]);
      expect(data.averageQuizScore).not.toBe(85);
      expect(data.mastery).not.toBe(65); // Just in case it's lingering
    });
  });

  describe('Data Aggregation', () => {
    it('13. Enrolled course appears in activeCourses', async () => {
      await Progress.create({ user: userId, resource: courseId, status: 'in-progress' });
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.analytics.activeCourses).toBe(1);
    });

    it('14. Completed course appears in completedCourses', async () => {
      await Progress.updateOne({ user: userId, resource: courseId }, { status: 'completed' });
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.analytics.completedCourses).toBe(1);
      expect(res.body.analytics.activeCourses).toBe(0);
    });

    it('15. Completed non-course resource appears in completedLessons', async () => {
      await Progress.create({ user: userId, resource: lessonId, status: 'completed' });
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.analytics.completedLessons).toBe(1);
    });

    it('16. Real activity contributes to learning hours and XP', async () => {
      await LearningActivity.create({
        user: userId,
        type: 'study_session',
        title: 'Study',
        durationMinutes: 120, // 2 hours
        xpEarned: 50,
        activityDate: new Date()
      });
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.analytics.learningHours).toBe(2);
      expect(res.body.analytics.xp).toBe(50);
    });

    it('17. Real activity contributes to streak', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.analytics.streak).toBeGreaterThan(0);
    });

    it('18. Recent activities are returned in descending order', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.analytics.recentActivity.length).toBe(1);
      expect(res.body.analytics.recentActivity[0].type).toBe('study_session');
    });

    it('19. Real quiz attempts affect averageQuizScore', async () => {
      const dummySkillId = new mongoose.Types.ObjectId();
      await QuizAttempt.create({ user: userId, quiz: new mongoose.Types.ObjectId(), skill: dummySkillId, score: 9, totalQuestions: 10, percentage: 90 });
      await QuizAttempt.create({ user: userId, quiz: new mongoose.Types.ObjectId(), skill: dummySkillId, score: 7, totalQuestions: 10, percentage: 70 });
      
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.analytics.averageQuizScore).toBe(80);
      expect(res.body.analytics.assessmentScores.length).toBe(2);
    });

    it('20. User A cannot see User B\'s analytics', async () => {
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${userBToken}`);
      
      const data = res.body.analytics;
      // User B is fresh
      expect(data.xp).toBe(0);
      expect(data.averageQuizScore).toBe(0);
      expect(data.completedCourses).toBe(0);
      expect(data.recentActivity).toEqual([]);
    });
  });
});
