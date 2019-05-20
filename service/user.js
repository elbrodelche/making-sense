const debug = require('debug')('app:service:user');

/**
 * Logs user into the system
 * */
const loginUser = async (email) => {
  debug(`loginUser: ${email}`);
};

/**
 * Logs user out the system
 * */
const logoutUser = async (email) => {
  debug(`logoutUser: ${email}`);
};

module.exports = {
  loginUser,
  logoutUser,
};
