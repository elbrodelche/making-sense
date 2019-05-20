const debug = require('debug')('makingsense:routes:postRouter');
const express = require('express');
const Post = require('../service/posts');

const routes = () => {
  const postRouter = express.Router();

  postRouter.route('/posts').get(async (req, res) => {
    debug('List Posts');

    const { query } = req;

    // Block request filters
    if (query.noDrafts) delete query.noDrafts;
    if (query.noPrivate) delete query.noPrivate;
    if (query.onlyDrafts) delete query.onlyDrafts;
    if (query.author) delete query.author;

    // Do not show drafts or private
    const noDrafts = true;
    const noPrivate = true;
    const filteredQuery = { noPrivate, noDrafts, ...query };

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
  postRouter.route('/posts').put(async (req, res) => {
    debug('Create Post');
    if (!req.user) return res.json('Unauthorized');

    // Block request filters
    if (req.body.id) delete req.body.id;
    if (req.body.post_author) delete req.body.post_author;

    // Assign logged user as post_author
    const post_author = req.user.id;
    const post = { post_author, ...req.body };

    // Main query
    const response = await Post.createPost(post)
    // Catch error and return 200 response
      .catch((e) => {
        debug(`getPosts call error ${e}`);
        // Write error response
        return res.json(e);
      });

    // Write success response
    return res.json(response);
  });
  postRouter.route('/posts/:postId').delete(async (req, res) => {
    debug('Delete Posts');
    if (!req.user) return res.json('Unauthorized');

    // Query Posts Service
    await Post.deletePost(req.user.id)
    // Catch error and return 200 response
      .catch((e) => {
        debug(`deletePost call error ${e}`);
        // Write error response
        return res.json(e);
      });

    // Write success response
    return res.sendStatus(204);
  });
  postRouter.route('/posts/:postId').get(async (req, res) => {
    debug('List Post by ID');
    if (!req.user) return res.json('Unauthorized');

    // Query Posts Service
    const response = await Post.getPostById(req.params.postId)
    // Catch error and return 200 response
      .catch((e) => {
        debug(`getPostById call error ${e}`);
        // Write error response
        return res.json(e);
      });

    // Write success response
    return res.json(response);
  });

  return postRouter;
};

module.exports = routes;
