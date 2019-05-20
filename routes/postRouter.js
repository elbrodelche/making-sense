const debug = require('debug')('makingsense:routes:postRouter');
const express = require('express');
const Post = require('../service/posts');

const routes = () => {
  const postRouter = express.Router();

  postRouter.use((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.json('Unauthorized');
    }
  });
  postRouter.route('/posts').get(async (req, res) => {
    debug('List Posts');

    const { query } = req;
    // Available parameters
    //   pgNum: '',
    //   pgSize: '',
    //   sort: '',
    //   search: '',
    //   status: '',
    // Query Posts Service
    const response = await Post.getPosts(query)
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

    const response = await Post.createPost(req.body)
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

    // Query Posts Service
    await Post.deletePost(req.params.postId)
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
