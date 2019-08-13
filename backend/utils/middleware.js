const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknow endpoint'});
};

module.exports = {
  unknownEndpoint,
};
