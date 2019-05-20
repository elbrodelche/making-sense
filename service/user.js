const debug = require('debug')('makingsense:service:user');
const db = require('../db/index');

/**
 * Get user
 *
 * */
const getUserByEmail = async (email) => {
  debug(`getUserByEmail: ${email}`);

  // Main query
  return db('users').select()
    .where('email', email)
    .first()
    .then();
};

module.exports = {
  getUserByEmail,
};
