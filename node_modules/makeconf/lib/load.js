'use strict';

const _ = require('lodash');
const fs = require('fs');
const cwd = require('./cwd');
const util = require('./util');
const getCompiler = require('./get-compiler');

/**
 * Turns a makeconf.json file into a prompt schema.
 * @param  {Object} makeconfjson
 * @return {Promise}
 */
module.exports = (makeconfjson) => {
  return new Promise((resolve, reject) => {
    const file = _.get(makeconfjson, 'file');
    const format = _.get(makeconfjson, 'format');
    const config = _.get(makeconfjson, 'config');

    let schema = {
      properties: {}
    };

    configExists(file)
      .then(() => {
        return loadConfig(file, format);
      }, () => {
        buildSchema(schema, config);

        return resolve(schema);
      })
      .then((configAsJson) => {
        if (configAsJson) {
          buildSchema(schema, config);
          setSchemaDefaults(schema, config, configAsJson);
        }

        return resolve(schema);
      }, (err) => {
        return reject(err);
      });
  });
};

/**
 * Sets default values for a schema.
 * @param {Object} schema
 * @param {Object} config
 * @param {Object} configAsJson
 * @param {string} path
 */
function setSchemaDefaults(schema, config, configAsJson, path) {
  _.forEach(config, (value, key) => {
    let currentPath = path ? `${path}.${key}` : key;

    if (util.isSchemaItem(value)) {
      const fallbackValue = _.get(config[key], 'default');
      let defaultValue = _.get(configAsJson, key);

      if (!defaultValue || _.isObject(defaultValue)) {
        defaultValue = fallbackValue;
      }

      if (_.isNull(defaultValue)) {
        defaultValue = 'null';
      }

      value.default = defaultValue;

      schema.properties[currentPath] = value;
    } else {
      setSchemaDefaults(schema, config[key], configAsJson[key], currentPath);
    }
  });
}

/**
 * Recursively builds a schema object.
 * @param  {Object} schema
 * @param  {Object} properties
 * @param  {string} path
 */
function buildSchema(schema, properties, path) {
  _.forEach(properties, (value, key) => {
    let currentPath = path ? `${path}.${key}` : key;

    if (util.isSchemaItem(value)) {
      schema.properties[currentPath] = value;
    } else {
      buildSchema(schema, value, currentPath);
    }
  });
}

/**
 * Checks if a config file already exists.
 * @param  {string} file
 * @return {Promise}
 */
function configExists(file) {
  return new Promise((resolve, reject) => {
    fs.stat(cwd(file), (err) => {
      if (err) {
        return reject();
      }

      return resolve();
    });
  });
}

/**
 * Loads an existing config.
 * @param  {string} file
 * @param  {string} format
 * @return {Promise}
 */
function loadConfig(file, format) {
  return new Promise((resolve, reject) => {
    const compiler = getCompiler(format);

    if (!compiler) {
      return reject(`No compiler found for config format: ${format}`);
    }

    compiler.parse(cwd(file))
      .then((configAsJson) => {
        return resolve(configAsJson);
      }, (err) => {
        return reject(err);
      });
  });
}
