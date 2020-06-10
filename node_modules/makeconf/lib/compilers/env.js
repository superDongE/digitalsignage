'use strict';

const _ = require('lodash');
const envfile = require('envfile');

module.exports = {
  /**
   * Parses a .env file and returns it as JSON.
   * @param  {string} file
   * @return {Promise}
   */
  parse(file) {
    return new Promise((resolve, reject) => {
      const configAsEnv = envfile.parseFileSync(file);
      let configAsJson = {};

      _.forEach(configAsEnv, (value, propertyPath) => {
        _.set(configAsJson, propertyPath, value);
      });

      if (configAsJson) {
        resolve(configAsJson);
      } else {
        reject('Config file not found.');
      }
    });
  },

  /**
   * Compiles the config.
   * @param  {Object} config
   * @param  {string} file
   * @return {Promise}
   */
  compile(config, file) {
    return new Promise((resolve) => {
      file = file || '.env';

      let configAsString = '';

      _.forEach(config, (choice, name) => {
        if (choice) {
          configAsString += `${name}=${choice}\n`;
        }
      });

      return resolve(configAsString);
    });
  }
};
