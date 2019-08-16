/* eslint-disable no-underscore-dangle */
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { auth } = require('../utils/middleware');

// Get All Users
usersRouter.get('/', auth, async (req, res, next) => {
  try {
    const users = await User.find({}).populate('notes');
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// Get User by Id
usersRouter.get('/:id', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('notes');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.send(user);
  } catch (e) {
    return next(e);
  }
});

// Create User
usersRouter.post('/', async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    next(e);
  }
});

// Login User
usersRouter.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(req.body.password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(404).json({ error: 'Unable to Log In' });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  return res.status(200).send({ token, email: user.email, name: user.name });
});

// Logout User

// Update User
usersRouter.patch('/me', auth, async (req, res, next) => {
  const updates = Object.keys(req.body);
  try {
    // const user = await User.findById(req.params.id);
    const { user } = req;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    return res.send(user);
  } catch (e) {
    return next(e);
  }
});

// Delete User
usersRouter.delete('/me', auth, async (req, res, next) => {
  try {
    // const { deletedCount } = await User.deleteOne({ _id: req.params.id });
    // if (deletedCount === 0) {
    //   return res.status(404).end();
    // }
    await req.user.remove();
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

module.exports = usersRouter;
