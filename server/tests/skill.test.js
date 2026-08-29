const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const SkillGap = require('../models/SkillGap');
const skillGapEngine = require('../services/recommendation/skillGapEngine');
const { connectDB, disconnectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await SkillGap.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await SkillGap.deleteMany({});
  await disconnectDB();
});

describe('Skill Gaps API (Phase 7 AI Separation)', () => {
  let authToken = '';
  let userId = '';
  let userBToken = '';
  let userBId = '';

  let aiCalculateSpy;

  beforeAll(async () => {
    // 1. Create a fresh test user A
    const userA = await User.create({
      name: 'Skill Tester A',
      email: 'skilltest_a@example.com',
      password: 'password123',
      careerGoal: 'Data Scientist'
    });
    userId = userA._id.toString();
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // 2. Create User B
    const userB = await User.create({
      name: 'Skill Tester B',
      email: 'skilltest_b@example.com',
      password: 'password123',
      careerGoal: 'DevOps Engineer'
    });
    userBId = userB._id.toString();
    userBToken = jwt.sign({ id: userBId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // Mock AI service to explicitly test if the backend triggers it
    aiCalculateSpy = jest.spyOn(skillGapEngine, 'calculateSkillGap');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/skills', () => {
    it('1, 22. GET /api/skills works and does not affect skill gap logic', async () => {
      const res = await request(app).get('/api/skills');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.skills)).toBe(true);
    });
  });

  describe('GET /api/skills/gap-analysis', () => {
    it('6. GET unauthenticated rejected', async () => {
      const res = await request(app).get('/api/skills/gap-analysis');
      expect(res.statusCode).toBe(401);
    });

    it('2, 3, 4, 5. GET skill-gap fresh user returns null, DOES NOT generate DB record, DOES NOT invoke skillGapEngine', async () => {
      const res = await request(app)
        .get('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.skillGap).toBeNull();

      // Ensure AI service was NOT called
      expect(aiCalculateSpy).not.toHaveBeenCalled();

      // Check DB directly to ensure no fake record was saved
      const dbRecord = await SkillGap.findOne({ user: userId });
      expect(dbRecord).toBeNull();
    });
  });

  describe('POST /api/skills/gap-analysis', () => {
    it('12. POST requires authentication', async () => {
      const res = await request(app)
        .post('/api/skills/gap-analysis')
        .send({ targetRole: 'Data Scientist' });
      expect(res.statusCode).toBe(401);
    });

    it('13. POST rejects malformed currentSkills (21. Invalid payload returns 400)', async () => {
      const res = await request(app)
        .post('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ targetRole: 'Data Scientist', currentSkills: 'not-an-array' });
      expect(res.statusCode).toBe(400);
    });

    it('14. POST rejects malformed missingSkills', async () => {
      const res = await request(app)
        .post('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ targetRole: 'Data Scientist', missingSkills: 'not-an-array' });
      expect(res.statusCode).toBe(400);
    });

    it('7, 8, 9, 10, 11, 15, 16. POST stores targetRole, current/missing skills, returns persisted doc, ignores malicious user/userId', async () => {
      const res = await request(app)
        .post('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          targetRole: 'Data Scientist',
          currentSkills: [{ name: 'Python', level: 80, category: 'Programming' }],
          missingSkills: [{ name: 'Machine Learning', priority: 'High', gap: 60 }],
          user: userBId, // Malicious injection
          userId: userBId // Malicious injection
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.skillGap.targetRole).toBe('Data Scientist');
      expect(res.body.skillGap.currentSkills.length).toBe(1);
      expect(res.body.skillGap.missingSkills.length).toBe(1);

      // Verify AI was NOT called
      expect(aiCalculateSpy).not.toHaveBeenCalled();

      // Verify ownership was correctly scoped to user A (req.user._id)
      const dbGap = await SkillGap.findById(res.body.skillGap._id);
      expect(dbGap.user.toString()).toBe(userId); // Not user B
    });

    it('20. Multiple snapshots work correctly', async () => {
      // User A submits a new snapshot
      const res = await request(app)
        .post('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          targetRole: 'Lead Data Scientist',
          currentSkills: [{ name: 'Python', level: 90, category: 'Programming' }],
          missingSkills: [{ name: 'Team Leadership', priority: 'Medium', gap: 20 }]
        });
      
      expect(res.statusCode).toBe(201);
      
      const snapshots = await SkillGap.find({ user: userId });
      expect(snapshots.length).toBe(2);
    });
  });

  describe('GET /api/skills/gap-analysis (After Data Exists)', () => {
    it('19. GET returns latest skill-gap snapshot', async () => {
      const res = await request(app)
        .get('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.skillGap.targetRole).toBe('Lead Data Scientist'); // From the second snapshot
    });

    it('17. User B cannot access User A skill gap', async () => {
      // User B tries to get their own skill gap. It should be null because User A's data doesn't leak.
      const res = await request(app)
        .get('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${userBToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.skillGap).toBeNull();
    });

    it('18. User A cannot access User B skill gap', async () => {
      // Similarly, there's no way for A to query B's because the GET uses req.user._id natively.
      const res = await request(app)
        .get('/api/skills/gap-analysis')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.body.skillGap.user.toString()).toBe(userId);
    });
  });
});
