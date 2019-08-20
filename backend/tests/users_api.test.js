const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');
const helper = require('./test_helper');

beforeEach(async () => {
  await User.deleteMany({});
  await new User(helper.userOne).save();
});

describe('When getting a user profile', () => {
  test('succedes when user is logged in', async () => {
    await api
      .get('/api/users/me')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send()
      .expect(200);
  });
  test('fails with error 401 if user is not authenticated', async () => {
    await api
      .get('/api/users/me')
      .send()
      .expect(401);
  });
  test('receives the user data', async () => {
    const user = await api
      .get('/api/users/me')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send()
      .expect(200);
    expect(user.body.email).toEqual(helper.userOne.email);
  });
});

describe('When creating a user', () => {
  test('succedes with statuscode 201 if data valid', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Joao',
        email: 'joao@joao.com',
        password: '123456789',
      })
      .expect(201);
  });
  test('fails with statuscode 400 if data invalid', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Joao',
        email: 'joao@joao.com',
        password: '123',
      })
      .expect(400);
  });
});

describe('When a user is trying to login', () => {
  test('succedes for existing user', async () => {
    await api
      .post('/api/users/login')
      .send({
        email: helper.userOne.email,
        password: helper.userOne.password,
      })
      .expect(200);
  });
  test('fails for nonexisting user', async () => {
    await api
      .post('/api/users/login')
      .send({
        email: 'abc@abc.com',
        password: 'password12345',
      })
      .expect(404);
  });
});

describe('When trying to update user profile', () => {
  test('succedes when user is authenticated and update allowed', async () => {
    const updatedUser = await api
      .patch('/api/users/me')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send({ name: 'Jorge Teixeira' })
      .expect(200);
    expect(updatedUser.body.name).toBe('Jorge Teixeira');
  });
  test('fails when user is authenticated but update is not allowed', async () => {
    await api
      .patch('/api/users/me')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send({ _id: '123456789' })
      .expect(400);
  });
  test('fails when user is not authenticated', async () => {
    await api
      .patch('/api/users/me')
      .send({ name: 'Jorge Teixeira' })
      .expect(401);
  });
});

describe('When trying to delete user', () => {
  test('fails if user is not authenticated', async () => {
    await api
      .delete('/api/users/me')
      .send()
      .expect(401);
  });
  test('succedes if user is authenticated', async () => {
    await api
      .delete('/api/users/me')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send()
      .expect(204);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
