const notesRouter = require('express').Router();
const Note = require('../models/note');

// Get All Notes
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});

  res.json(notes.map(note => note.toJSON()));
});

// Create Note 
notesRouter.post('/', async (req, res, next) => {
  console.log(req.body, 'req.body')
  try {
    const note = new Note ({
      ...req.body,
    })
    await note.save();
    res.status(201).send(note);
  }catch (e) {
    console.log(e.name, 'error')
    next(e);
  }
});


module.exports = notesRouter;
