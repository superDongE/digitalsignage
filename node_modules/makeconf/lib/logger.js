'use strict';

const clc = require('cli-color');
const tag = '[makeconf]';

module.exports = {
  /**
   * Logs a normal message.
   * @param {string} message
   */
  normal(message) {
    console.log(message);
  },

  /**
   * Logs an error message in red.
   * @param {string} message
   */
  error(message) {
    console.error(clc.red(`${tag} ${message}`));
  },

  /**
   * Logs a message in green.
   * @param {string} message
   */
  success(message) {
    console.log(clc.green(`${tag} ${message}`));
  }
};
