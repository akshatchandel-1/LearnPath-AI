const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const LearningPath = require('../models/LearningPath');
const adaptivePathService = require('../services/adaptive/adaptivePathService');
const { connectDB, disconnectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await LearningPath.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await LearningPath.deleteMany({});
  await disconnectDB();
});

describe('Learning Path API (Phase 6 AI Separation)', () => {
  let authToken = '';
  let userId = '';
  let userBToken = '';
  let userBId = '';

  let aiGenerateSpy;
  let aiAdaptSpy;

  beforeAll(async () => {
    // 1. Create a fresh test user A
    const userA = await User.create({
      name: 'LP Tester A',
      email: 'lptest_a@example.com',
      password: 'password123',
    });
    userId = userA._id.toString();
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // 2. Create User B
    const userB = await User.create({
      name: 'LP Tester B',
      email: 'lptest_b@example.com',
      password: 'password123',
    });
    userBId = userB._id.toString();
    userBToken = jwt.sign({ id: userBId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // Mock AI service to explicitly test if the backend triggers it
    aiGenerateSpy = jest.spyOn(adaptivePathService, 'generateLearningPath');
    aiAdaptSpy = jest.spyOn(adaptivePathService, 'adaptLearningPath');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/learning-path', () => {
    it('7. GET unauthenticated rejected', async () => {
      const res = await request(app).get('/api/learning-path');
      expect(res.statusCode).toBe(401);
    });

    it('2, 3, 4, 21, 24. GET returns null for fresh user & does NOT auto-generate AI roadmap', async () => {
      const res = await request(app)
        .get('/api/learning-path')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.learningPath).toBeNull();

      // Ensure AI service was NOT called
      expect(aiGenerateSpy).not.toHaveBeenCalled();

      // Check DB directly to ensure no fake roadmap was saved
      const dbPath = await LearningPath.findOne({ user: userId });
      expect(dbPath).toBeNull();
    });
  });

  describe('POST /api/learning-path', () => {
    it('12. POST requires authentication', async () => {
      const res = await request(app)
        .post('/api/learning-path')
        .send({ title: 'Test', goal: 'Test Goal' });
      expect(res.statusCode).toBe(401);
    });

    it('13. POST rejects malformed phases', async () => {
      const res = await request(app)
        .post('/api/learning-path')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ title: 'Test', goal: 'Test Goal', phases: 'not-an-array' });
      expect(res.statusCode).toBe(400);
    });

    it('8, 9, 10, 11, 14, 22. POST creates learning path, persists fields, ignores malicious userId, NO AI', async () => {
      const res = await request(app)
        .post('/api/learning-path')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Frontend Master',
          goal: 'Frontend Developer',
          targetRole: 'Senior Frontend',
          phases: [{ phaseNumber: 1, title: 'HTML Basics' }],
          user: userBId, // Malicious injection
          userId: userBId // Malicious injection
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.learningPath.title).toBe('Frontend Master');
      expect(res.body.learningPath.goal).toBe('Frontend Developer');
      expect(res.body.learningPath.targetRole).toBe('Senior Frontend');
      expect(res.body.learningPath.phases.length).toBe(1);

      // Verify AI was NOT called
      expect(aiGenerateSpy).not.toHaveBeenCalled();
      expect(aiAdaptSpy).not.toHaveBeenCalled();

      // Verify ownership was correctly scoped to user A (req.user._id)
      const dbPath = await LearningPath.findById(res.body.learningPath._id);
      expect(dbPath.user.toString()).toBe(userId); // Not user B
    });

    it('20. Multiple active-path behavior: Old path is deactivated when new path is created', async () => {
      // Create a second path for User A
      const res = await request(app)
        .post('/api/learning-path')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Backend Master',
          goal: 'Backend Developer',
        });
      
      expect(res.statusCode).toBe(201);
      
      const activePaths = await LearningPath.find({ user: userId, active: true });
      expect(activePaths.length).toBe(1); // The new one
      expect(activePaths[0].title).toBe('Backend Master');
    });
  });

  describe('GET /api/learning-path (After Data Exists)', () => {
    it('1, 5, 6. GET returns existing active path scoped to user', async () => {
      const res = await request(app)
        .get('/api/learning-path')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.learningPath.title).toBe('Backend Master');
      expect(res.body.learningPath.user.toString()).toBe(userId);
    });
  });

  describe('PUT /api/learning-path', () => {
    it('18. PUT with no active path returns 404', async () => {
      // User B has no active path
      const res = await request(app)
        .put('/api/learning-path')
        .set('Authorization', `Bearer ${userBToken}`)
        .send({ title: 'Update Title' });
      expect(res.statusCode).toBe(404);
    });

    it('19. PUT rejects malformed payload (phases not array)', async () => {
      const res = await request(app)
        .put('/api/learning-path')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ phases: 'invalid-string' });
      expect(res.statusCode).toBe(400);
    });

    it('15, 16, 23. PUT updates active path, persists phases, DOES NOT call AI', async () => {
      const res = await request(app)
        .put('/api/learning-path')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Backend Architect',
          phases: [{ phaseNumber: 1, title: 'Node.js Basics' }]
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.learningPath.title).toBe('Backend Architect');
      expect(res.body.learningPath.phases.length).toBe(1);
      
      // AI check
      expect(aiGenerateSpy).not.toHaveBeenCalled();
      expect(aiAdaptSpy).not.toHaveBeenCalled();
    });

    it('17. PUT cannot update another user\'s path (Cross-user check)', async () => {
      // User B tries to update User A's path by using a malicious payload?
      // Since PUT looks for `user: req.user._id`, User B won't find one.
      const res = await request(app)
        .put('/api/learning-path')
        .set('Authorization', `Bearer ${userBToken}`)
        .send({ title: 'Hacked Title' });
      
      expect(res.statusCode).toBe(404); // User B has no path
      
      // Verify User A's path is unchanged
      const userAPath = await LearningPath.findOne({ user: userId, active: true });
      expect(userAPath.title).toBe('Backend Architect');
    });
  });
});
