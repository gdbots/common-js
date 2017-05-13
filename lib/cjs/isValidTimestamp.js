'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isValidTimestamp;

var _toSafeInteger = require('lodash/toSafeInteger');

var _toSafeInteger2 = _interopRequireDefault(_toSafeInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function isValidTimestamp(timestamp) {
  var allowNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var timestampStr = '' + timestamp;
  var timestampInt = (0, _toSafeInteger2.default)(timestamp);

  if (allowNegative) {
    return '' + timestampInt === timestampStr && timestampInt <= (0, _toSafeInteger2.default)(Number.MAX_VALUE) && timestampInt >= MIN_UTC_TIME;
  }

  return '' + timestampInt === timestampStr && timestampInt <= (0, _toSafeInteger2.default)(Number.MAX_VALUE) && timestampInt >= 0;
}