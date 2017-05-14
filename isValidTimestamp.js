import toSafeInteger from 'lodash-es/toSafeInteger';

/**
 * October 15, 1582 UTC
 * @const int
 */
var MIN_UTC_TIME = -12219292800;

/**
 * Returns true if it's a valid timestamp.
 *
 * @param {string} timestamp
 * @param {boolean} [allowNegative]
 *
 * @return {boolean}
 */
export default function isValidTimestamp(timestamp) {
  var allowNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var timestampStr = '' + timestamp;
  var timestampInt = toSafeInteger(timestamp);

  if (allowNegative) {
    return '' + timestampInt === timestampStr && timestampInt <= toSafeInteger(Number.MAX_VALUE) && timestampInt >= MIN_UTC_TIME;
  }

  return '' + timestampInt === timestampStr && timestampInt <= toSafeInteger(Number.MAX_VALUE) && timestampInt >= 0;
}