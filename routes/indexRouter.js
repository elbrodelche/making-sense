const debug = require('debug')('makingsense:routes:indexRouter');
const express = require('express');

const routes = (app) => {
  const indexRouter = express.Router();

  app.get('/', (req, res) => {
    debug('Index API');
    res.json('Making Sense API version 1.0.0. Status OK.');
  });

  return indexRouter;
};

module.exports = routes;
