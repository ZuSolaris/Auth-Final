'use strict';

require('dotenv').config();
const express = require('express');
const cors = require ('cors');
const shoesRouter = require('./router');
const authRouter = require('./auth/userRoute');
const notFound = require('./handlers/404.js');
const errorHandler = require('./handlers/500.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.status(200).send('Hello World!!!');
});

app.use(shoesRouter);
app.use(authRouter);

app.use('/*', notFound);
app.use(errorHandler);


module.exports = { 
  server: app, 
  start: port => {
    if(!port){ throw new Error('Missing Port');}
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};

