const usersRouter = require('express').Router();
const User = require('../models/user');

// Get All Users
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// Get User by Id
usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
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

// Update User
usersRouter.patch('/:id', async (req, res, next) => {
  const updates = Object.keys(req.body);
  try {
    const user = await User.findById(req.params.id);
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

// Delete User by Id
usersRouter.delete('/:id', async (req, res, next) => {
  try {
    const { deletedCount } = await User.deleteOne({ _id: req.params.id });
    if (deletedCount === 0) {
      return res.status(404).end();
    }
    return res.status(204).end();
  } catch (e) {
    return next(e);
  }
});

module.exports = usersRouter;
