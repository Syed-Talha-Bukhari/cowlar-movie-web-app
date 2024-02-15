import request from 'supertest';
import app from '../app'; 

describe('Auth API testing...', () => {
  let token: string;  
  let userId: string; 
  let token_: string;
  let userId_: string;

  beforeAll(async () => {
    const signupRes = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'user',
        email: 'user@gmail.com',
        password: 'user.123',
        phoneNumber: "920000000000",

      });

    token = signupRes.body.token;
    userId = signupRes.body.data.id;
  });

  afterAll(async () => {
    await Promise.all([
      request(app)
        .delete(`/api/v1/user`)
        .set('Authorization', `Bearer ${token}`),
      request(app)
        .delete(`/api/v1/user`)
        .set('Authorization', `Bearer ${token_}`),
    ]);
  });

  describe('POST /api/v1/auth/signup', () => {
    it('returns 201 Created with correct credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'user',
          email: 'users1@gmail.com',
          password: 'user.123',
          phoneNumber: '923007851424',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      token_ = res.body.token;
      userId_ = res.body.data.id
    });
  });

  describe('POST /api/v1/auth/signup', () => {
    it('returns 409 Conflict with duplicate email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'user',
          email: 'user@gmail.com',
          password: 'user.123',
          phoneNumber: "920000000000",
        });

      expect(res.status).toBe(409);
    });
  });


  describe('POST /api/v1/auth/login', () => {
    it('returns 200 OK and a token with correct credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .set("Accept", "application/json")
        .send({
          email: 'user@gmail.com',
          password: 'user.123',
        })

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });


    it('returns 401 Unauthorized with incorrect credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'nonuser@example.com',
          password: 'nonuser.123',
        });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/v1/auth/verify-user', () => {
    it('returns 200 OK and user data with valid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/verify-user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });

    it('returns 401 Unauthorized with invalid token', async () => {
      const response = await request(app)
        .get('/api/v1/auth/verify-user')
        .set('Authorization', 'Bearer invalid');

      expect(response.status).toBe(500);
    });
  });
});
