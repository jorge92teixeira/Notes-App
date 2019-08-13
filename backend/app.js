const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');

// connect to database
console.log(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log(`error connecting to mongodb: ${error.message}`);
  })

app.use(cors()); 
app.use(bodyParser.json());

module.exports = app;
