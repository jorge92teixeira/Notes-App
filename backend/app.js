const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const notesRouter = require('./controllers/notes');
const usersRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const { clog } = require('./utils/console_logger');

// connect to database
clog(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    clog('connected to mongodb');
  })
  .catch((error) => {
    clog(`error connecting to mongodb: ${error.message}`);
  });

mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyParser.json());

app.use('/api/notes', notesRouter);
app.use('/api/users', usersRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
