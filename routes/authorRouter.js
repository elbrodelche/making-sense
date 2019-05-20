const debug = require('debug')('makingsense:routes:authorRouter');
const express = require('express');
const Post = require('../service/posts');

const routes = () => {
  const authorRouter = express.Router();

  authorRouter.route('/author/:authorId').get(async (req, res) => {
    debug('List Posts from Author Blog');

    const { query } = req;

    // Block request filters
    if (query.noDrafts) delete query.noDrafts;
    if (query.noPrivate) delete query.noPrivate;
    if (query.onlyDrafts) delete query.onlyDrafts;
    if (query.author) delete query.author;

    // Dont list Drafts
    const noDrafts = true;
    const noPrivate = true;
    let filteredQuery = { noDrafts, ...query };

    // Privates can only seen when user logged in
    if (!req.user) filteredQuery = { noPrivate, ...filteredQuery };

    // Only posts from this author
    if (req.params.authorId) {
      const author = req.params.authorId;
      filteredQuery = { author, ...filteredQuery };
    }

    // Query Posts Service
    const response = await Post.getPosts(filteredQuery)
    // Catch error and return 200 response
      .catch((e) => {
        debug(`getPosts call error ${e}`);
        // Write error response
        return res.json(e);
      });

    // Write success response
    return res.json(response);
  });

  authorRouter.route('/me/drafts').get(async (req, res) => {
    debug('List my drafts');
    if (!req.user) return res.json('Unauthorized');
    const { query } = req;

    // Block request filters
    if (query.noDrafts) delete query.noDrafts;
    if (query.noPrivate) delete query.noPrivate;
    if (query.onlyDrafts) delete query.onlyDrafts;
    if (query.author) delete query.author;

    // Only drafts
    const onlyDrafts = true;
    let filteredQuery = { onlyDrafts, ...query };

    // Only posts from this author
    if (req.params.authorId) {
      const author = req.params.authorId;
      filteredQuery = { author, ...filteredQuery };
    }

    // Query Posts Service
    const response = await Post.getPosts(filteredQuery)
    // Catch error and return 200 response
      .catch((e) => {
        debug(`getPosts call error ${e}`);
        // Write error response
        return res.json(e);
      });

    // Write success response
    return res.json(response);
  });

  return authorRouter;
};

module.exports = routes;
