const notesRouter = require('express').Router();
const Note = require('../models/note');

// Get All Notes
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});

  res.json(notes.map(note => note.toJSON()));
});

// Create Note 


module.exports = notesRouter;
