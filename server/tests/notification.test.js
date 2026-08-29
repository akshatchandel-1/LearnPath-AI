const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Notification = require('../models/Notification');
const { connectDB, disconnectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Notification.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await Notification.deleteMany({});
  await disconnectDB();
});

describe('Notifications API (Phase 8)', () => {
  let authToken = '';
  let userId = '';
  let userBToken = '';
  let userBId = '';

  let notificationAId = '';
  let notificationBId = '';

  beforeAll(async () => {
    // 1. Create a fresh test user A
    const userA = await User.create({
      name: 'Notify Tester A',
      email: 'notifytest_a@example.com',
      password: 'password123',
    });
    userId = userA._id.toString();
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // 2. Create User B
    const userB = await User.create({
      name: 'Notify Tester B',
      email: 'notifytest_b@example.com',
      password: 'password123',
    });
    userBId = userB._id.toString();
    userBToken = jwt.sign({ id: userBId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Fresh User Defaults', () => {
    it('3, 4. Fresh user returns [] and notifications are scoped', async () => {
      const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.notifications).toEqual([]);
    });

    it('5, 6. Fresh user unread count = 0', async () => {
      const res = await request(app)
        .get('/api/notifications/unread-count')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.count).toBe(0);
    });

    it('2. GET notifications unauthenticated is rejected', async () => {
      const res = await request(app).get('/api/notifications');
      expect(res.statusCode).toBe(401);
    });
  });

  describe('Notification Seeding & Retrieval', () => {
    beforeAll(async () => {
      const notifA = await Notification.create({
        user: userId,
        message: 'Welcome User A!',
      });
      notificationAId = notifA._id.toString();

      await Notification.create({
        user: userId,
        message: 'Second message A',
      });

      const notifB = await Notification.create({
        user: userBId,
        message: 'Welcome User B!',
      });
      notificationBId = notifB._id.toString();
    });

    it('1. GET notifications authenticated retrieves correctly', async () => {
      const res = await request(app)
        .get('/api/notifications')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.notifications.length).toBe(2);
      // Ensures user B's notification is not present
      expect(res.body.notifications.some(n => n.message === 'Welcome User B!')).toBe(false);
    });

    it('Get unread count retrieves correctly', async () => {
      const res = await request(app)
        .get('/api/notifications/unread-count')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.count).toBe(2);
    });
  });

  describe('Mark as Read Operations', () => {
    it('7. Mark notification read', async () => {
      const res = await request(app)
        .put(`/api/notifications/${notificationAId}/read`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.notification.isRead).toBe(true);
      expect(res.body.notification._id.toString()).toBe(notificationAId);

      // Verify DB persistence directly
      const dbNotif = await Notification.findById(notificationAId);
      expect(dbNotif.isRead).toBe(true);
    });

    it('Unread count drops by 1', async () => {
      const res = await request(app)
        .get('/api/notifications/unread-count')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.body.count).toBe(1);
    });

    it('8. Cannot mark another user\'s notification', async () => {
      const res = await request(app)
        .put(`/api/notifications/${notificationBId}/read`)
        .set('Authorization', `Bearer ${authToken}`);
      
      // User A shouldn't find User B's notification to mark
      expect(res.statusCode).toBe(404);

      // Verify DB directly to ensure it was not mutated
      const dbNotif = await Notification.findById(notificationBId);
      expect(dbNotif.isRead).toBe(false); // Remains false
    });

    it('9, 10. Mark all notifications read', async () => {
      const res = await request(app)
        .put(`/api/notifications/read-all`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('All notifications marked as read');

      // Unread count should now be 0 for User A
      const countRes = await request(app)
        .get('/api/notifications/unread-count')
        .set('Authorization', `Bearer ${authToken}`);
      expect(countRes.body.count).toBe(0);

      // Verify User B's notifications remain untouched (cross-user protection)
      const bCountRes = await request(app)
        .get('/api/notifications/unread-count')
        .set('Authorization', `Bearer ${userBToken}`);
      expect(bCountRes.body.count).toBe(1); // Still unread
    });
  });

  describe('Edge Cases', () => {
    it('11. Invalid notification ID', async () => {
      const res = await request(app)
        .put(`/api/notifications/invalid-id/read`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('12. Notification not found', async () => {
      const randomValidId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .put(`/api/notifications/${randomValidId}/read`)
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
