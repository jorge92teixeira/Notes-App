/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');
const Note = require('../models/note');
const helper = require('./test_helper');

beforeEach(async () => {
  await Note.deleteMany({});
  await User.deleteMany({});
  await new User(helper.userOne).save();
  const noteObjects = helper.initialNotes.map((n) => new Note(n));
  console.log(noteObjects, 'noteobjects');
  const promiseArray = noteObjects.map((n) => n.save());
  await Promise.all(promiseArray);
});

describe('Get all notes that belong to a user', () => {
  test('succedes when user is logged in', async () => {
    const response = await api
      .get('/api/notes/')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .expect(200);
    expect(response.body.length).toBe(helper.initialNotes.length);
  });
  test('fails when user is not authenticated', async () => {
    await api
      .get('/api/notes/')
      .expect(401);
  });
});

describe('Get a note by its id', () => {
  test('succeds with a valid id and authenticated user', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];
    const result = await api
      .get(`/api/notes/${noteToView.id}`)
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .expect(200);

    expect(result.body.id).toEqual(noteToView.id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
