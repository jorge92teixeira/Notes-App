const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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

const initialNotes = [
  {
    title: 'Title of Note One',
    content: 'Content of Note One',
    date: new Date(),
    pinned: true,
    hidden: false,
    owner: userOneId,
  },
  {
    title: 'Title of Note Two',
    content: 'Content of Note Two',
    date: new Date(),
    pinned: false,
    hidden: true,
    owner: userOneId,
  },
  {
    title: 'Title of Note Three',
    content: 'Content of Note Three',
    date: new Date(),
    pinned: false,
    hidden: false,
    owner: userOneId,
  },
];

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

const nonExistingId = async () => {
  const note = new Note({
    title: 'Will delete soon',
    content: 'will delete soon',
    date: new Date(),
    pinned: false,
    hidden: false,
    owner: userOneId,
  });
  await note.save();
  await note.remove();
  return note._id.toString();
};

module.exports = {
  userOne,
  userOneToken,
  initialNotes,
  notesInDb,
  nonExistingId,
};
