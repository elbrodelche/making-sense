/* eslint-disable */
const debug = require('debug')('makinsense:utils:cryptograpgy');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

/**
 * Given a string returns a hashed password
 * */
const generatePassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  return await bcrypt.hash(password, salt);
};

/**
 * Generates a unique string
 * */
const generateToken = ()=> {
  const today = new Date().getTime();
  const dateLength = 36;
  const token = `${today.toString(dateLength)}${shortid.generate()}`;
  // Remove 'dash' char to avoid breaking client url
  return token.replace(/-/g, '_');
};

/**
 * Given a candidatePassword and localPassword returns true or false
 * */
const comparePassword = async (candidatePassword, localPassword) =>bcrypt.compare(candidatePassword, localPassword);

/**
 * Checks if the userAgent was already saved in userAgents
 * @param {*} userAgent
 * @param {*} userAgents
 */
const compareUserAgent = async (userAgent, userAgents) => {
  const userAgentLogged = userAgents.some((ua) => {
    const deviceVendor = (ua.device.vendor && userAgent.device.vendor) ? ua.device.vendor === userAgent.device.vendor : true;
    const deviceModel = (ua.device.model && userAgent.device.model) ? ua.device.model === userAgent.device.model : true;
    const browser = (ua.browser.name && userAgent.browser.name) ? ua.browser.name === userAgent.browser.name : true;
    const system = (ua.os.name && userAgent.os.name) ? ua.os.name === userAgent.os.name : true;
    const cpu = (ua.cpu.architecture && userAgent.cpu.architecture) ? ua.cpu.architecture === userAgent.cpu.architecture : true;
    return deviceVendor && deviceModel && browser && system && cpu;
  });
  return (userAgentLogged);
};


module.exports = {
  generatePassword,
  generateToken,
  comparePassword,
  compareUserAgent
};
