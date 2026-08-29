const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const LearningActivity = require('../models/LearningActivity');
const { connectDB, disconnectDB } = require('../config/db');
const jwt = require('jsonwebtoken');

beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
  await Quiz.deleteMany({});
  await QuizAttempt.deleteMany({});
  await LearningActivity.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await Quiz.deleteMany({});
  await QuizAttempt.deleteMany({});
  await LearningActivity.deleteMany({});
  await disconnectDB();
});

describe('Quiz & Assessment API', () => {
  let authToken = '';
  let userId = '';
  let userBToken = '';
  let userBId = '';
  let quizId = '';
  let dummyQuizId = new mongoose.Types.ObjectId().toString();

  beforeAll(async () => {
    // 1. Create a fresh test user
    const userA = await User.create({
      name: 'Quiz Tester',
      email: 'quiztest@example.com',
      password: 'password123',
    });
    userId = userA._id.toString();
    authToken = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });

    // 2. Create User B
    const userB = await User.create({
      name: 'Quiz User B',
      email: 'quizuserb@example.com',
      password: 'password123',
    });
    userBId = userB._id.toString();
    userBToken = jwt.sign({ id: userBId }, process.env.JWT_SECRET || 'learnpath_jwt_secret_key_2026', { expiresIn: '30d' });
  });

  describe('GET /api/quiz', () => {
    it('8. GET /api/quiz unauthenticated returns 401', async () => {
      const res = await request(app).get('/api/quiz');
      expect(res.statusCode).toBe(401);
    });

    it('2. GET /api/quiz returns [] for empty database', async () => {
      const res = await request(app)
        .get('/api/quiz')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.quizzes).toEqual([]);
    });

    it('Seed Quizzes', async () => {
      const q1 = await Quiz.create({
        title: 'React Basics',
        skill: 'React',
        difficulty: 'Beginner',
        questions: [
          { question: 'What is JSX?', options: ['A', 'B'], correctAnswerIndex: 0 },
          { question: 'What is state?', options: ['X', 'Y'], correctAnswerIndex: 1 }
        ]
      });
      quizId = q1._id.toString();

      await Quiz.create({
        title: 'Advanced Node',
        skill: 'Node.js',
        difficulty: 'Advanced',
        questions: [
          { question: 'What is Event Loop?', options: ['A', 'B'], correctAnswerIndex: 0 }
        ]
      });
    });

    it('1. GET /api/quiz authenticated returns quizzes', async () => {
      const res = await request(app)
        .get('/api/quiz')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.quizzes.length).toBe(2);
    });

    it('3. GET /api/quiz filtering by skill', async () => {
      const res = await request(app)
        .get('/api/quiz?skill=React')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.quizzes.length).toBe(1);
      expect(res.body.quizzes[0].skill).toBe('React');
    });

    it('4. GET /api/quiz filtering by difficulty', async () => {
      const res = await request(app)
        .get('/api/quiz?difficulty=Advanced')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.body.quizzes.length).toBe(1);
      expect(res.body.quizzes[0].difficulty).toBe('Advanced');
    });
  });

  describe('GET /api/quiz/:id', () => {
    it('5. GET /api/quiz/:id valid', async () => {
      const res = await request(app)
        .get(`/api/quiz/${quizId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.quiz._id.toString()).toBe(quizId);
    });

    it('6. GET /api/quiz/:id invalid ObjectId returns 400', async () => {
      const res = await request(app)
        .get('/api/quiz/invalid-id-123')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(400);
    });

    it('7. GET /api/quiz/:id nonexistent returns 404', async () => {
      const res = await request(app)
        .get(`/api/quiz/${dummyQuizId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe('POST /api/quiz/submit', () => {
    it('16. Unauthenticated submission rejected', async () => {
      const res = await request(app).post('/api/quiz/submit').send({ quizId, answers: [] });
      expect(res.statusCode).toBe(401);
    });

    it('20. Malformed answers rejected with 400 (missing)', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quizId });
      expect(res.statusCode).toBe(400);
    });

    it('20. Malformed answers rejected with 400 (not array)', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ quizId, answers: 'invalid' });
      expect(res.statusCode).toBe(400);
    });

    it('9, 10, 11, 13. Submit valid quiz - Server calculates score & percentage - Attempt persisted', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quizId,
          answers: [
            { questionIndex: 0, selectedOption: 0 },
            { questionIndex: 1, selectedOption: 1 }
          ]
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.result.percentage).toBe(100);
      expect(res.body.result.correctCount).toBe(2);
      expect(res.body.result.attemptId).toBeDefined();

      const attempt = await QuizAttempt.findById(res.body.result.attemptId);
      expect(attempt).toBeTruthy();
      expect(attempt.user.toString()).toBe(userId);
    });

    it('12. Incorrect answers produce correct score', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quizId,
          answers: [
            { questionIndex: 0, selectedOption: 1 }, // Wrong
            { questionIndex: 1, selectedOption: 1 }  // Correct
          ]
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.result.percentage).toBe(50);
      expect(res.body.result.correctCount).toBe(1);
    });

    it('17, 18, 19. Client-provided score/percentage/XP/userId is explicitly ignored (Security Test)', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quizId,
          answers: [
            { questionIndex: 0, selectedOption: 1 }, // Wrong
            { questionIndex: 1, selectedOption: 0 }  // Wrong
          ],
          score: 999999,
          percentage: 100,
          xp: 999999,
          userId: userBId // Trying to inject userB
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.result.percentage).toBe(0);
      expect(res.body.result.correctCount).toBe(0);

      const attempt = await QuizAttempt.findById(res.body.result.attemptId);
      expect(attempt.user.toString()).toBe(userId); // Belongs to A
      expect(attempt.percentage).toBe(0);
    });

    it('21. Invalid answer index gracefully treated as incorrect without crashing', async () => {
      const res = await request(app)
        .post('/api/quiz/submit')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          quizId,
          answers: [
            { questionIndex: 0, selectedOption: 999 } // invalid option
          ]
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.result.percentage).toBe(0);
    });

    it('22, 23. XP/statistics integration and Skill recalibration work', async () => {
      // User passed earlier test with 100%. Check XP and Skill.
      const user = await User.findById(userId);
      const reactSkill = user.skills.find(s => s.name === 'React');
      expect(reactSkill).toBeDefined();
      expect(reactSkill.level).toBeGreaterThan(0);
      expect(user.points).toBeGreaterThan(0);
    });
  });

  describe('GET /api/quiz/history', () => {
    it('14. Attempt history returns user\'s attempts', async () => {
      const res = await request(app)
        .get('/api/quiz/history')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.history.length).toBeGreaterThan(0);
      expect(res.body.history[0].quiz).toBeDefined();
    });

    it('24. Fresh user has no fake attempts', async () => {
      const res = await request(app)
        .get('/api/quiz/history')
        .set('Authorization', `Bearer ${userBToken}`); // Fresh user
      
      expect(res.statusCode).toBe(200);
      expect(res.body.history.length).toBe(0);
    });

    it('15. Attempt history does not expose another user\'s attempts', async () => {
      // User B attempts to access history, should only see 0, not A's history
      const res = await request(app)
        .get('/api/quiz/history')
        .set('Authorization', `Bearer ${userBToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.history.length).toBe(0);
    });
  });

  describe('Dashboard Integration Check', () => {
    it('25. Dashboard assessment score remains based on real QuizAttempt data', async () => {
      // Quick check against the analytics endpoint created in Phase 4
      const res = await request(app)
        .get('/api/analytics/dashboard')
        .set('Authorization', `Bearer ${authToken}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.analytics.assessmentScores.length).toBeGreaterThan(0);
    });
  });
});
