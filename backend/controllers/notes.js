const notesRouter = require('express').Router();
const Note = require('../models/note');

// Get All Notes
notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({});

  res.json(notes.map((note) => note.toJSON()));
});

// Create Note
notesRouter.post('/', async (req, res, next) => {
  try {
    const note = new Note({
      ...req.body,
      pinned: req.body.pinned || false,
      hidden: req.body.hidden || false,
    });
    await note.save();
    res.status(201).send(note);
  } catch (e) {
    next(e);
  }
});

// Delete Note By Id
notesRouter.delete('/:id', async (req, res, next) => {
  try {
    await Note.deleteOne({ _id: req.params.id });
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});


module.exports = notesRouter;
