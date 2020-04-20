'use strict';

const fs = require('fs');
const cwd = require('./cwd');

module.exports = (configAsString, file) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(cwd(file), configAsString, (err) => {
      if (err) {
        return reject(err);
      } else {
        return resolve({
          file: file,
          contents: configAsString
        });
      }
    });
  });
};
