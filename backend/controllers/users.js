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

module.exports = usersRouter;
