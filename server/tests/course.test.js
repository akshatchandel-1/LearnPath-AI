const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Resource = require('../models/Resource');
const Progress = require('../models/Progress');
const { connectDB, disconnectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Resource.deleteMany({});
  await Progress.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await Resource.deleteMany({});
  await Progress.deleteMany({});
  await disconnectDB();
});

describe('Course API', () => {
  let authToken = '';
  let userId = '';
  let course1Id = '';
  let course2Id = '';
  let videoResource = '';
  let dummyUserId = new mongoose.Types.ObjectId().toString();

  beforeAll(async () => {
    // 1. Create a test user
    const user = await User.create({
      name: 'Course Tester',
      email: 'coursetest@example.com',
      password: 'password123',
    });
    userId = user._id.toString();
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });
  });

  describe('GET /api/courses', () => {
    it('2. GET /api/courses returns [] when no courses exist', async () => {
      const res = await request(app).get('/api/courses');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.courses.length).toBe(0);
    });

    it('Seed resources', async () => {
      const c1 = await Resource.create({
        title: 'React Course',
        description: 'Learn React',
        type: 'Course',
        url: 'http://test.com/react',
        difficulty: 'Beginner',
        skills: ['React']
      });
      course1Id = c1._id.toString();

      const c2 = await Resource.create({
        title: 'Advanced Node Course',
        description: 'Learn Node',
        type: 'Course',
        url: 'http://test.com/node',
        difficulty: 'Advanced',
        skills: ['Node.js']
      });
      course2Id = c2._id.toString();

      const vid = await Resource.create({
        title: 'JS Basics Video',
        description: 'Learn JS',
        type: 'Video',
        url: 'http://test.com/js',
        difficulty: 'Beginner',
        skills: ['JavaScript']
      });
      videoResource = vid._id.toString();

      await Resource.ensureIndexes(); // Fix race condition with $text index in test
    });

    it('1. GET /api/courses returns courses', async () => {
      const res = await request(app).get('/api/courses');
      expect(res.statusCode).toBe(200);
      expect(res.body.courses.length).toBe(2);
      expect(res.body.courses[0].type).toBe('Course');
    });

    it('18. Course type restriction is enforced', async () => {
      const res = await request(app).get('/api/courses');
      // Should not contain the 'Video' type resource
      const hasVideo = res.body.courses.some(c => c.type === 'Video');
      expect(hasVideo).toBe(false);
    });

    it('6. Search courses', async () => {
      const res = await request(app).get('/api/courses?search=React');
      expect(res.statusCode).toBe(200);
      expect(res.body.courses.length).toBe(1);
      expect(res.body.courses[0].title).toBe('React Course');
    });

    it('7. Filter courses', async () => {
      const res = await request(app).get('/api/courses?difficulty=Advanced');
      expect(res.statusCode).toBe(200);
      expect(res.body.courses.length).toBe(1);
      expect(res.body.courses[0].title).toBe('Advanced Node Course');
    });
  });

  describe('GET /api/courses/:id', () => {
    it('3. GET course by valid ID', async () => {
      const res = await request(app).get(`/api/courses/${course1Id}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.course._id.toString()).toBe(course1Id);
    });

    it('4. GET course with invalid ID', async () => {
      const res = await request(app).get(`/api/courses/123invalid`);
      expect(res.statusCode).toBe(400); // Handled by CastError catch
    });

    it('5. GET non-existent course', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).get(`/api/courses/${fakeId}`);
      expect(res.statusCode).toBe(404);
    });

    it('18b. Ensure GET /api/courses/:id cannot return non-course resource', async () => {
      const res = await request(app).get(`/api/courses/${videoResource}`);
      expect(res.statusCode).toBe(404); // Should be 404 because type !== 'Course'
    });
  });

  describe('POST /api/courses/:id/enroll', () => {
    it('8. Unauthenticated enrollment rejected', async () => {
      const res = await request(app).post(`/api/courses/${course1Id}/enroll`);
      expect(res.statusCode).toBe(401);
    });

    it('9. Authenticated enrollment succeeds', async () => {
      const res = await request(app)
        .post(`/api/courses/${course1Id}/enroll`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.progress.user.toString()).toBe(userId);
      expect(res.body.progress.resource.toString()).toBe(course1Id);
      expect(res.body.progress.status).toBe('not-started');
      expect(res.body.progress.progressPercent).toBe(0);
      expect(res.body.progress.timeSpentMinutes).toBe(0);
    });

    it('10. Duplicate enrollment does not create duplicate Progress', async () => {
      const countBefore = await Progress.countDocuments();
      const res = await request(app)
        .post(`/api/courses/${course1Id}/enroll`)
        .set('Authorization', `Bearer ${authToken}`);
      
      const countAfter = await Progress.countDocuments();
      expect(res.statusCode).toBe(200); // Already enrolled
      expect(countAfter).toBe(countBefore); // No new doc created
    });

    it('19. No fake course/progress data is generated', async () => {
      const progress = await Progress.findOne({ resource: course1Id });
      expect(progress.progressPercent).toBe(0); // Real data based on request
    });
  });

  describe('GET /api/courses/enrolled', () => {
    it('12. Unauthenticated enrolled-courses request rejected', async () => {
      const res = await request(app).get('/api/courses/enrolled');
      expect(res.statusCode).toBe(401);
    });

    it('11. Enrolled courses returns only current user\'s courses', async () => {
      const res = await request(app)
        .get('/api/courses/enrolled')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.enrolledCourses.length).toBe(1);
      expect(res.body.enrolledCourses[0].resource.title).toBe('React Course');
      expect(res.body.enrolledCourses[0].user.toString()).toBe(userId);
    });
  });

  describe('PUT /api/courses/:id/progress', () => {
    it('13. Progress update succeeds', async () => {
      const res = await request(app)
        .put(`/api/courses/${course1Id}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          progressPercent: 50,
          status: 'in-progress',
          timeSpentMinutes: 30
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.progress.progressPercent).toBe(50);
      expect(res.body.progress.status).toBe('in-progress');
      expect(res.body.progress.timeSpentMinutes).toBe(30);
    });

    it('14. Invalid progressPercent rejected', async () => {
      const res = await request(app)
        .put(`/api/courses/${course1Id}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ progressPercent: 150 });
      
      expect(res.statusCode).toBe(400);
    });

    it('15. Invalid status rejected', async () => {
      const res = await request(app)
        .put(`/api/courses/${course1Id}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'fake-status' });
      
      expect(res.statusCode).toBe(400);
    });

    it('16. Negative timeSpentMinutes rejected', async () => {
      const res = await request(app)
        .put(`/api/courses/${course1Id}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ timeSpentMinutes: -10 });
      
      expect(res.statusCode).toBe(400);
    });

    it('17. User cannot modify another user\'s progress', async () => {
      // Trying to inject userId in body should be ignored
      await request(app)
        .put(`/api/courses/${course1Id}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ user: dummyUserId, progressPercent: 90 });
      
      const progress = await Progress.findOne({ user: userId, resource: course1Id });
      expect(progress.progressPercent).toBe(90);
      expect(progress.user.toString()).toBe(userId); // still belongs to auth user
    });

    it('20. Existing XP/statistics behavior is not broken', async () => {
      const res = await request(app)
        .put(`/api/courses/${course1Id}/progress`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ status: 'completed' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.progress.status).toBe('completed');
      expect(res.body.progress.progressPercent).toBe(100);
      expect(res.body.progress.completedAt).toBeDefined();

      const user = await User.findById(userId);
      // Completed resources array is updated
      expect(user.completedResources.map(id => id.toString())).toContain(course1Id);
    });
  });
});
