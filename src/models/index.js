'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const shoesModel = require('./shoes');
const userModel = require('../auth/models/users');

const DATABASE_URL = process.env.NODE_ENV === 'test' ?'sqlite:memory' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);



module.exports = {
  db: sequelize,
  shoesModel: shoesModel(sequelize, DataTypes),
  users: userModel(sequelize,DataTypes),
};