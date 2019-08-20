const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');
const Note = require('../models/note');

const userOneId = new mongoose.Types.ObjectId();
const userOneEmail = 'jorge@jorge.com';
const userOneToken = jwt.sign({ email: userOneEmail, id: userOneId }, process.env.SECRET);
const userOne = {
  _id: userOneId,
  name: 'Jorge',
  email: userOneEmail,
  password: '123456789',
};

beforeEach(async () => {
  await Note.deleteMany({});
  await User.deleteMany({});
  await new User(userOne).save();
});



afterAll(() => {
  mongoose.connection.close();
});
