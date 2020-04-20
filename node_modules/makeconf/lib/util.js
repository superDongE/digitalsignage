'use strict';

const _ = require('lodash');

module.exports = {
  /**
   * Attempts to convert a string value to a relevant type.
   * @param  {string} value
   * @return {*}
   */
  convertType(value) {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else if (value === 'null') {
      return null;
    } else if (!isNaN(value)) {
      return Number(value);
    } else {
      return value;
    }
  },

  /**
   * Checks if a config item is a schema item.
   * @param  {Object}  item
   * @return {boolean}
   */
  isSchemaItem(item) {
    const DESCRIPTION = 'description';

    return _.has(item, DESCRIPTION) && !_.isObject(item[DESCRIPTION]);
  }
};
