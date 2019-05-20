const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../../../service/user');
const { comparePassword } = require('../../../utils/cryptography');

module.exports = async function localStrategy() {
  passport.use(new Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      // Search user
      const user = await User.getUserByEmail(email);
      if (comparePassword(password, user.password)) {
        console.info('Password Match');
        delete user.password;
        done(null, user);
      } else {
        done(null, false);
      }
    },
  ));
};
