/* eslint-disable */

import isDate from 'lodash/isDate';

/**
 * Checks if value is classified as a Date object.
 *
 * @param  {[type]}  value
 * @return {Boolean}
 */
export default function isValidDate(value) {
  return isDate(value);
}
