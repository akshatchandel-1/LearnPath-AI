const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const LearnerProfile = require('../models/LearnerProfile');
const { connectDB, disconnectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await LearnerProfile.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await LearnerProfile.deleteMany({});
  await disconnectDB();
});

describe('Profile API', () => {
  let authToken = '';
  let userId = '';
  let dummyUserId = new mongoose.Types.ObjectId().toString();

  beforeAll(async () => {
    // Create a test user
    const user = await User.create({
      name: 'Profile Tester',
      email: 'profiletest@example.com',
      password: 'password123',
    });
    userId = user._id.toString();
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });
  });

  it('1. GET /api/profile authenticated', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.profile.user.toString()).toBe(userId);
  });

  it('2. GET /api/profile unauthenticated', async () => {
    const res = await request(app).get('/api/profile');
    expect(res.statusCode).toBe(401);
  });

  it('3. PUT /api/profile authenticated', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        careerGoal: 'Test Goal'
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.profile.careerGoal).toBe('Test Goal');
  });

  it('4. Update careerGoal', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ careerGoal: 'Data Scientist' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.profile.careerGoal).toBe('Data Scientist');
  });

  it('5. Update skills', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        skills: [{ name: 'Python', level: 50 }]
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.profile.skills[0].name).toBe('Python');
    expect(res.body.profile.skills[0].level).toBe(50);
  });

  it('6. Update learning preferences', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        preferredLearningStyle: 'Reading',
        preferredDifficulty: 'Advanced'
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.profile.preferredLearningStyle).toBe('Reading');
    expect(res.body.profile.preferredDifficulty).toBe('Advanced');
  });

  it('7. Invalid skills payload', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ skills: 'not-an-array' });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('must be an array');
  });

  it('8. Invalid weekly hours', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ weeklyStudyHours: -5 });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('positive number');
  });

  it('9. Attempt to update another user profile using userId', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ user: dummyUserId, careerGoal: 'Hacker Goal' });
    
    expect(res.statusCode).toBe(200);
    
    // Ownership check: profile should still belong to authenticated user, not dummyUserId
    expect(res.body.profile.user.toString()).toBe(userId);
    expect(res.body.profile.user.toString()).not.toBe(dummyUserId);
  });

  it('10. Verify profile data persists in MongoDB', async () => {
    const profile = await LearnerProfile.findOne({ user: userId });
    expect(profile.careerGoal).toBe('Hacker Goal'); // from previous test
    expect(profile.preferredLearningStyle).toBe('Reading');
  });

  it('11. Verify User/LearnerProfile synchronization remains correct', async () => {
    const user = await User.findById(userId);
    const profile = await LearnerProfile.findOne({ user: userId });
    
    expect(user.careerGoal).toBe(profile.careerGoal);
    expect(user.preferredLearningStyle).toBe(profile.preferredLearningStyle);
    // User stores weeklyHours, Profile stores weeklyStudyHours. Both should be equal if set.
    // Let's set it to test sync
    await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ weeklyStudyHours: 15 });
    
    const updatedUser = await User.findById(userId);
    const updatedProfile = await LearnerProfile.findOne({ user: userId });
    
    expect(updatedProfile.weeklyStudyHours).toBe(15);
    expect(updatedUser.weeklyHours).toBe(15);
  });

  it('12. Verify PUT /api/profile does not wait for AI/recommendation processing', async () => {
    const start = Date.now();
    await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ careerGoal: 'Fast Response' });
    const duration = Date.now() - start;
    
    // Assuming AI would take significantly longer if synchronous.
    // Given it's in-memory / non-mocked, a local save should be < 500ms.
    expect(duration).toBeLessThan(1000); 
  });
  it('13. Verify GET /api/profile does not expose user password', async () => {
    const res = await request(app)
      .get('/api/profile')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toBe(200);
    // Profile might not populate user object fully, but if it does, check password
    if (res.body.profile && res.body.profile.user && typeof res.body.profile.user === 'object') {
      expect(res.body.profile.user.password).toBeUndefined();
    }
    // Also check if there's any top-level user object
    if (res.body.user) {
      expect(res.body.user.password).toBeUndefined();
    }
  });

  it('14. Verify PUT /api/profile does not expose user password', async () => {
    const res = await request(app)
      .put('/api/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ careerGoal: 'Security Test' });
    
    expect(res.statusCode).toBe(200);
    // PUT /api/profile explicitly returns the user document
    expect(res.body.user).toBeDefined();
    expect(res.body.user.password).toBeUndefined();
  });
});
