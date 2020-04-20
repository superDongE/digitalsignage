'use strict';

const prompt = require('prompt');
const commander = require('commander');
const pkg = require('./package.json');
const cwd = require('./lib/cwd');
const load = require('./lib/load');
const delegate = require('./lib/delegate');
const logger = require('./lib/logger');
const makeconfjson = require(cwd('makeconf.json'));

commander
  .version(pkg.version)
  .parse(process.argv);

load(makeconfjson)
  .then((schema) => {
    prompt.message = '';
    prompt.delimiter = '';

    prompt.get(schema, (err, result) => {
      if (err) {
        return;
      }

      delegate(result, makeconfjson)
        .then((savedResult) => {
          logger.success(`Saved config in ${savedResult.file}`);
        }, (e) => {
          logger.error(e);
        });
    });
  }, (err) => {
    logger.error(err);
  });
