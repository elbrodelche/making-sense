/* eslint-disable */
const debug = require('debug')('makingsense:utils:db-utils');
const chalk = require('chalk');

/*
*  Handles the sorting
*/
const parseSortString = (sortString, defaultSort) => {
  debug(chalk.magenta('parseSortString called'));

  let s = sortString || defaultSort || '';
  const result = {
    column: '',
    direction: 'asc',
  };

  // Split string on the space character into an array of tokens
  s = s.split(' ');

  // If no tokens return null
  if (s.length < 1) {
    return null;
  }

  // If at least 1 token, set the sort column as the 1st token
  result.column = s[0];

  // If column is empty return null
  if (!result.column) {
    return null;
  }

  // If only one token return result that sorts by that column in the ASC direction
  if (s.length === 1) {
    return result;
  }

  // If more than 1 token check if 2nd token is requesting a "DESC" direction
  if (s[1].toLowerCase() === 'desc') {
    result.direction = 'desc';
  }

  return result;
};

/*
* Given an array of ids Ex: [1,2]
* Returns a new array of M:M objects
* Ex: [{person_id:1, movie_id:4}, {person_id:2, movie_id:4}]
*/
const idToMMObjArr = (arrFieldName, idArray, otherFieldName, otherID) => idArray.map((o) => {
  debug(chalk.magenta('idToMMObjArr called'));

  const x = {};
  x[arrFieldName] = o;
  x[otherFieldName] = otherID;
  return x;
});

/*
*  Returns an object w/ the add/delete changes to make to a M:M table given the new/existing ids
*/
const getMMDelta = (newIDs, currentIDs, variableFieldName, constFieldName, constantID) => {
  debug(chalk.magenta('getMMDelta called'));

  let i;
  let ii;
  const add = [];
  const del = [];
  let x;

  // Look for ids in newIDs that are NOT in currentIDs. These will be ADDS.  ([] of m:m objects)
  for (i = 0, ii = newIDs.length; i < ii; i++) {
    if (currentIDs.indexOf(newIDs[i]) == -1) {
      x = {};
      x[variableFieldName] = newIDs[i];
      x[constFieldName] = constantID;
      add.push(x);
    }
  }

  // Look for ids in currentIDs that are NOT in newIDs. These will be DELETES.  ([] of ids only)
  for (i = 0, ii = currentIDs.length; i < ii; i++) {
    if (newIDs.indexOf(currentIDs[i]) == -1) {
      del.push(currentIDs[i]);
    }
  }

  return {
    add,
    del,
  };
};

module.exports = {
  parseSortString,
  idToMMObjArr,
  getMMDelta,
};
