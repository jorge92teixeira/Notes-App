const jwt = require('jsonwebtoken');
const User = require('../models/user');

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint' });
};

const errorHandler = (error, req, res, next) => {
  // ValidationError, CastError, SyntaxError, TypeError
  if (error.name === 'ValidationError') {
    return res.status(400).send({ errName: error.name, errMsg: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).send({ errName: error.name, errMsg: error.message });
  }
  if (error.name === 'SyntaxError') {
    return res.status(400).send({ errName: error.name, errMsg: error.message });
  }
  if (error.name === 'TypeError') {
    return res.status(400).send({ errName: error.name, errMsg: error.message });
  }

  return next(error);
};

const auth = async (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      req.token = authorization.substring(7);
    } else {
      req.token = null;
    }

    const decoded = jwt.verify(req.token, process.env.SECRET);
    req.user = await User.findById(decoded.id);

    return next();
  } catch (e) {
    return res.status(401).send({ errName: e.name, errMsg: e.message });
  }
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  auth,
};
