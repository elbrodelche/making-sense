const debug = require('debug')('makingsense:service:posts');
const db = require('../db/index');
const util = require('../utils/db-utils');

const postRows = [
  'p.id',
  'u.name as post_author',
  'post_status',
  'post_title',
  'post_excerpt',
  'post_content',
];

/**
 * Create Post
 * */
const createPost = async (post) => {
  debug(`createPost: ${post}`);

  // Main query
  return db('posts').insert(post, 'id');
};

/**
 * Delete Post
 * */
const deletePost = async (postId) => {
  debug(`deletePost: ${postId}`);
  // Main query
  return db('posts')
    .where('id', postId)
    .del()
    .then();
};

/**
 * Get Post
 * */
const getPosts = async (qf) => {
  debug(`getPosts: ${qf}`);

  // Init variables
  const result = {};
  const sort = util.parseSortString(qf.sort, 'p.id');
  const pgSize = Math.min(qf.pgSize, 10);
  const offset = (qf.pgNum - 1) * pgSize;
  const searchTxt = qf.search;
  const { status } = qf;

  // Main query
  return db('posts')
    .count('* as total')
    .then((rows) => {
      result.total = rows[0].total;
    })
    .then(() => {
      // Get offset and count rows
      const query = db('posts as p')
        .select(postRows)
        .leftJoin('users as u', { 'p.post_author': 'u.id' })
        .offset(offset)
        .orderBy(sort.column, sort.direction);
      // If pgSize limit results
      if (pgSize) {
        query.limit(pgSize);
      }
      // If search text exist, lookup in all user columns
      if (searchTxt) {
        query.whereRaw('LOWER(post_title) LIKE \'%\' || LOWER(?) || \'%\' ', searchTxt);
        query.or.whereRaw('LOWER(post_title) LIKE \'%\' || LOWER(?) || \'%\' ', searchTxt);
        query.or.whereRaw('LOWER(post_content) LIKE \'%\' || LOWER(?) || \'%\' ', searchTxt);
        query.or.whereRaw('LOWER(post_excerpt) LIKE \'%\' || LOWER(?) || \'%\' ', searchTxt);
      }
      // Post Status Filter
      if (status) {
        query.or.where('post_status', status);
      }
      return query;
    })
    .then((rows) => {
      // Return formatted data
      result.pgSize = pgSize;
      result.items = rows;
      return result;
    });
};

/**
 * Get Post by ID
 * */
const getPostById = async (id) => {
  debug(`getPostById: ${id}`);

  // Main query
  return db('posts as p')
    .select(postRows)
    .leftJoin('users as u', { 'p.post_author': 'u.id' })
    .where('p.id', id)
    .then();
};

module.exports = {
  getPosts,
  getPostById,
  deletePost,
  createPost,
};
