/* eslint-disable */
const chai = require('chai');

// Include cryptographic functions.
const {
  generatePassword,
  generateToken,
  comparePassword,
} = require('../../utils/cryptography');

const {
  parseSortString,
  idToMMObjArr,
} = require('../../utils/db-utils.js');

describe('Test Utils', () => {
  // Crypto module test.
  describe('Crypto', () => {
    it('Generate token', (done) => {
      chai.expect(generateToken()).to.be.a('string');
      done();
    });

    it('Generate password', async () => {
      const pwd = await generatePassword('123456789');
      chai.expect(pwd).to.not.be.null;
      chai.expect(pwd).to.be.a('string');
    });

    it('Compare password', async () => {
      const cmp = await comparePassword('123456789', '11111111');
      chai.expect(cmp).to.not.be.null;
      chai.expect(cmp).to.be.a('boolean');
      chai.expect(cmp).to.be.false;
    });
  });

  // Bd utils test.
  describe('BD', () => {
    it('parseSortString token', (done) => {
      const result = parseSortString('test desc', '');
      chai.expect(result).to.be.a('object');
      chai.expect(result).to.have.property('direction');
      chai.expect(result).to.have.property('column');
      chai.expect(result.column).to.be.equal('test');
      chai.expect(result.direction).to.have.equal('desc');
      done();
    });

    it('idToMMObjArr', async () => {
      const testArr = [
        { person_id: 1, movie_id: 4 },
        { person_id: 2, movie_id: 4 },
      ];

      const newArr = idToMMObjArr('testArray', testArr, 'a', 'b');

      chai.expect(newArr).to.not.be.null;
      chai.expect(newArr).to.be.a('array');
    });
  });
});
