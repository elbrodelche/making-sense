/* eslint-disable */
const faker = require('faker');

const status = ['draft', 'public', 'private'];
const authors_ids = [1,2,3];

// Return a fake post
const createFaker = function () {
  return {
    post_author: authors_ids[faker.random.number({ min: 0, max: 2 })],
    post_title: faker.lorem.sentence(),
    post_excerpt: faker.lorem.paragraph(),
    post_content: faker.lorem.text(),
    post_status: status[faker.random.number({ min: 0, max: 2 })],
  }
};

exports.seed = function (knex, Promise) {
  // Config
  const tblName = 'posts';
  const desiredFakers = 500;
  const fakers = [];

  // Create fakers
  for (let i = 0; i < desiredFakers; i++) {
    fakers.push(createFaker());
  }

  return knex.insert(fakers).into(tblName)
    .then(() => { return console.log('Rows added to ' + tblName) })
    .catch((error) => { return console.log('Insert into ' + tblName + ' fails. Error: ', error) }); // Insert new rows
};
