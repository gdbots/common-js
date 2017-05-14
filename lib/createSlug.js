'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createSlug;

var _kebabCase = require('lodash/kebabCase');

var _kebabCase2 = _interopRequireDefault(_kebabCase);

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
 * Creates a slug cased string (aka kebab case) from the provided string if possible.
 * A null return means the input cannot be made into a slug.
 *
 * @param {string} str
 * @param {boolean} [allowSlashes]
 *
 * @return {?string}
 */
/* eslint-disable */

function createSlug(str) {
  var allowSlashes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return (0, _kebabCase2.default)(str);
}