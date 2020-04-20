'use strict';

const path = require('path');

/**
 * Returns a path relative to the CWD.
 * @param  {string} subpath
 * @return {string}
 */
module.exports = (subpath) => {
  subpath = subpath || '';
  subpath = subpath.replace(/^\/|\/$/g, ''); // strip leading/trailing slashes

  return path.resolve(process.cwd(), subpath);
};
