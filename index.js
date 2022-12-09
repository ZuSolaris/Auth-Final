'use strict';

require('dotenv').config();

const { db } = require('./src/auth/models');
const { app, start } = require('./src/server.js');
const PORT = process.env.PORT;

db.sync().then(() => {
  console.log('successful connection');
  app.start(PORT);
});

