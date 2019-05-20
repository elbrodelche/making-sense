/* eslint-disable */
// Testing library
const supertest = require('supertest');
const should = require('chai')
  .should();
const expect = require('chai').expect;

// Disable certificate verification
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

// This agent refers to PORT where program is runninng.
const server = supertest.agent('http://localhost:8000');

// Specs
describe('userService', function () {
  describe('getPost', function () {
    it('should list posts with specific keys', function (done) {
      server
        .get('/api/v1/posts')
        .end(function (err, res) {
          // Must have all properties for an object
          expect(res.body).to.have.keys([
            'items',
            'pgSize',
            'total',
          ]);
          done();
        });
    });
  });
});
