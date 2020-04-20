'use strict';

/**
 * Returns a compiler by format.
 * @param  {string} format
 * @return {Object}
 */
module.exports = (format) => {
  const file = format.replace('.', '');
  return require(`./compilers/${file}`);
};
