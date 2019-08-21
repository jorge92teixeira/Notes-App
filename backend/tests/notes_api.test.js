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
  test('a specific note is within returned notes', async () => {
    const response = await api
      .get('/api/notes/')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .expect(200);
    const contents = response.body.map((r) => r.content);
    expect(contents).toContain('Content of Note Two');
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
  test('fails with unauthenticated user', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToView = notesAtStart[0];
    await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(401);
  });
  test('fails with statuscode 404 if note does not exist', async () => {
    const validNoneExistingId = await helper.nonExistingId();
    await api
      .get(`/api/notes/${validNoneExistingId}`)
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .expect(404);
  });
  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '2345dfhg';
    await api
      .get(`/api/notes/${invalidId}`)
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .expect(400);
  });
});

describe('Create a new note', () => {
  test('succedes with valid data and authenticated user', async () => {
    await api
      .post('/api/notes/')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send({
        title: 'Title of Note 3000',
        content: 'Content of Note 3000',
        date: new Date(),
        pinned: true,
        hidden: false,
        owner: helper.userOneId,
      })
      .expect(201);
    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd.length).toBe(helper.initialNotes.length + 1);
    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).toContain('Content of Note 3000');
  });
  test('fails with unauthenticated user', async () => {
    await api
      .post('/api/notes/')
      .send({
        title: 'Title of Note 3000',
        content: 'Content of Note 3000',
        date: new Date(),
        pinned: true,
        hidden: false,
        owner: helper.userOneId,
      })
      .expect(401);
  });
  test('fails with invalid data', async () => {
    await api
      .post('/api/notes/')
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send({
        content: 'Content of Note 3000',
        date: new Date(),
        pinned: true,
        hidden: false,
        owner: helper.userOneId,
      })
      .expect(400);
  });
});

describe('Updating a note', () => {
  test('succedes with valid update and authenticated user', async () => {
    const notes = await helper.notesInDb();
    const noteToUpdate = notes[0];
    const response = await api
      .patch(`/api/notes/${noteToUpdate.id}`)
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .send({ title: 'Title of note 11111' })
      .expect(200);
    expect(response.body).toEqual({ nModified: 1 });
  });
  test('fails with valid update and unauthenticated user', async () => {
    const notes = await helper.notesInDb();
    const noteToUpdate = notes[0];
    await api
      .patch(`/api/notes/${noteToUpdate.id}`)
      .send({ title: 'Title of note 11111' })
      .expect(401);
  });
});

describe('Deleting a note', () => {
  test('succedes with status code 204', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .expect(204);
    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd.length).toBe(helper.initialNotes.length - 1);
    const contents = notesAtEnd.map((n) => n.content);
    expect(contents).not.toContain(noteToDelete.content);
  });
  test('fails with unauthenticated user', async () => {
    const notesAtStart = await helper.notesInDb();
    const noteToDelete = notesAtStart[0];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(401);
  });
  test('fails with status code 404 if note does not exist', async () => {
    const notesAtStart = await helper.notesInDb();
    const validNoneExistingId = await helper.nonExistingId();

    await api
      .delete(`/api/notes/${validNoneExistingId}`)
      .set('Authorization', `bearer ${helper.userOneToken}`)
      .expect(404);
    const notesAtEnd = await helper.notesInDb();
    expect(notesAtEnd.length).toBe(notesAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
