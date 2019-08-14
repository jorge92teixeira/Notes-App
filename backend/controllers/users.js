const usersRouter = require('express').Router();
const User = require('../models/user');

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
