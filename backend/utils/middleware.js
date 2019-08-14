const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint' });
};

const errorHandler = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).send({ error: error.message });
  }

  return next(error);
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
