'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createHashtag;

var _capitalize = require('lodash/capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _deburr = require('lodash/deburr');

var _deburr2 = _interopRequireDefault(_deburr);

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

var _trimStart = require('lodash/trimStart');

var _trimStart2 = _interopRequireDefault(_trimStart);

var _isValidHashtag = require('./isValidHashtag');

var _isValidHashtag2 = _interopRequireDefault(_isValidHashtag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// some punctuation and other chars are convertable
var convertables = [{ s: "'", r: '' }, { s: '"', r: '' }, { s: '?', r: '' }, { s: '#', r: '' }, { s: '/', r: '' }, { s: '\\', r: '' }, { s: '&amp;', r: ' And ' }, { s: '&', r: ' And ' }, { s: '%', r: ' Percent ' }, { s: '@', r: ' At ' }];

/**
 * Creates a hashtag from the provided string if possible.
 * A null return means the input cannot be made into a hashtag.
 *
 * @param {string} str
 * @param {boolean} [camelize]
 *
 * @return {?string}
 */
function createHashtag(str) {
  var camelize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if ((0, _isValidHashtag2.default)(str)) {
    return (0, _trimStart2.default)(str, '#');
  }

  var hashtag = (0, _trim2.default)(str, '#_ ');
  convertables.forEach(function (_ref) {
    var s = _ref.s,
        r = _ref.r;

    hashtag = hashtag.split(s).join(r);
  });

  hashtag = (0, _deburr2.default)(hashtag);
  hashtag = hashtag.replace(/[^a-zA-Z0-9_]/g, ' ');

  if (camelize) {
    hashtag = hashtag.split(' ').map(_capitalize2.default).join(' ');
  }

  hashtag = hashtag.replace(/\s/g, '');

  return (0, _isValidHashtag2.default)(hashtag) ? hashtag : null;
}