const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const { connectDB, disconnectDB } = require('../config/db');

// Add a slight delay to allow the server's async startServer to initialize in-memory DB if used
beforeAll(async () => {
  await connectDB();
  await User.deleteMany({});
});

afterAll(async () => {
  await User.deleteMany({});
  await disconnectDB();
});

describe('Authentication API', () => {
  const validUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'securePassword123'
  };

  let authToken = '';
  let createdUserId = '';

  it('1. Signup with valid data', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(validUser);
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user).toBeDefined();
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user.password).toBeUndefined(); // Password should not be returned
    
    authToken = res.body.token;
    createdUserId = res.body.user._id;
  });

  it('2. Signup with duplicate email', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(validUser);
    
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('3. Signup with missing email', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({ name: 'Fail User', password: 'securePassword123' }); // Missing email
    
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('3b. Signup with malformed email', async () => {
    const invalidEmails = ['not-an-email', 'abc@', '@gmail.com', 'abc@gmail'];
    
    for (const email of invalidEmails) {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({
          name: 'Invalid Email User',
          email: email,
          password: 'securePassword123'
        });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    }
  });

  it('4. Signup with weak/invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        name: 'Weak Pass',
        email: 'weakpass@example.com',
        password: '123' // Less than 6 chars
      });
    
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('5. Verify password is hashed', async () => {
    const userInDb = await User.findOne({ email: validUser.email }).select('+password');
    expect(userInDb).toBeDefined();
    expect(userInDb.password).not.toBe(validUser.password);
    expect(userInDb.password).toMatch(/^\$2[abxy]\$/); // bcrypt hash format
  });

  it('6. Login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: validUser.email,
        password: validUser.password
      });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.password).toBeUndefined();
  });

  it('7. Login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: validUser.email,
        password: 'wrongpassword'
      });
    
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('8. GET /me authenticated', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(validUser.email);
  });

  it('9. GET /me unauthenticated', async () => {
    const res = await request(app)
      .get('/api/auth/me');
    
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('10. Logout', async () => {
    const res = await request(app)
      .post('/api/auth/logout');
    
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    
    // In supertest, res.headers['set-cookie'] can be checked
    const setCookie = res.headers['set-cookie'];
    if (setCookie) {
      expect(setCookie[0]).toMatch(/token=;/);
    }
  });
});
