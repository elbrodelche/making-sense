const debug = require('debug')('makingsense:routes:authRouter');
const express = require('express');
const passport = require('passport');

const routes = () => {
  const authRouter = express.Router();

  authRouter.route('/auth/me')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.json('Unauthorized');
      }
    })
    .get(async (req, res) => {
      res.json(req.user);
    });
  authRouter.route('/auth/login').post(async (req, res, next) => {
    debug('Auth Login');
    passport.authenticate('local', {
      successRedirect: '/api/v1/auth/me',
    })(req, res, next);
  });
  authRouter.route('/auth/logout').get(async (req, res) => {
    debug('Auth Logout');
    req.logout();
    res.json('Logged out');
  });

  return authRouter;
};

module.exports = routes;
