const notesRouter = require('express').Router();
const Note = require('../models/note');
const { auth } = require('../utils/middleware');

// Get All Notes
notesRouter.get('/', auth, async (req, res) => {
  const notes = await Note.find({});

  res.json(notes.map((note) => note.toJSON()));
});

// Get Note By Id
notesRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    return res.send(note);
  } catch (e) {
    return next(e);
  }
});

// Create Note
notesRouter.post('/', auth, async (req, res, next) => {
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

// Update Note By Id
notesRouter.patch('/:id', auth, async (req, res, next) => {
  try {
    const { nModified } = await Note
      .updateOne({ _id: req.params.id }, req.body);
    if (nModified === 0) {
      return res.status(404).json({ nModified });
    }
    return res.json({ nModified });
  } catch (e) {
    return next(e);
  }
});

// Delete Note By Id
notesRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const { deletedCount } = await Note.deleteOne({ _id: req.params.id });
    if (deletedCount === 0) {
      return res.status(404).end();
    }
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});


module.exports = notesRouter;
