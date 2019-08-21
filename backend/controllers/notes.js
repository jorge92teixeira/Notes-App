const notesRouter = require('express').Router();
const Note = require('../models/note');
const { auth } = require('../utils/middleware');

// Get All Notes - that belong to the user
notesRouter.get('/', auth, async (req, res, next) => {
  try {
    const notes = await Note.find({ owner: req.user._id });
    return res.json(notes.map((note) => note.toJSON()));
  } catch (e) {
    return next(e);
  }
});

// Get Note By Id - note has to belong to user
notesRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, owner: req.user._id });
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
      owner: req.user._id,
    });
    await note.save();
    res.status(201).send(note);
  } catch (e) {
    next(e);
  }
});

// Update Note By Id - only owner can update note
notesRouter.patch('/:id', auth, async (req, res, next) => {
  try {
    const { nModified } = await Note
      .updateOne({ _id: req.params.id, owner: req.user._id }, req.body);
    if (nModified === 0) {
      return res.status(404).json({ nModified });
    }
    return res.json({ nModified });
  } catch (e) {
    return next(e);
  }
});

// Delete Note By Id - only owner can delete note
notesRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const { deletedCount } = await Note.deleteOne({ _id: req.params.id, owner: req.user._id });
    if (deletedCount === 0) {
      return res.status(404).end();
    }
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});


module.exports = notesRouter;
