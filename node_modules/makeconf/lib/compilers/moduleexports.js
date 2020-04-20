'use strict';

const _ = require('lodash');
const util = require('../util');

module.exports = {
  /**
   * Parses a file and returns it as JSON.
   * @param  {string} file
   * @return {Promise}
   */
  parse(file) {
    return new Promise((resolve, reject) => {
      const configAsJson = require(file);

      if (configAsJson) {
        return resolve(configAsJson);
      }

      return reject(`Failed to parse file: ${file}`);
    });
  },

  /**
   * Compiles a config.
   * @param  {Object} config
   * @return {Promise}
   */
  compile(config) {
    return new Promise((resolve) => {
      let json = {};

      _.forEach(config, (value, key) => {
        value = util.convertType(value);
        _.set(json, key, value);
      });

      json = JSON.stringify(json, null, 2);

      const configAsString = `module.exports = ${json};\n`;

      return resolve(configAsString);
    });
  }
};
