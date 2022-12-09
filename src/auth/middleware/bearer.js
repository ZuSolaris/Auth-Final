'use strict';

const { users } = require('../models/users');

module.exports = async (req, res, next) => {
  try {
    if(!req.headers.authorization) { next('Invalid login'); }

    const token = req.headers.authorization.split(' ')[1];
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
  } catch(e) {
    next('Invalid login');
  }
};