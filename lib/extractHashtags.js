'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractHashtags;

var _trim = require('lodash/trim');

var _trim2 = _interopRequireDefault(_trim);

var _trimStart = require('lodash/trimStart');

var _trimStart2 = _interopRequireDefault(_trimStart);

var _isValidHashtag = require('./isValidHashtag');

var _isValidHashtag2 = _interopRequireDefault(_isValidHashtag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extracts all of the valid hashtags from a string.
 * multi-line strings will work with this method.
 *
 * @param {string} str
 *
 * @return {string[]} - Unique array of hashtags without the "#"
 */
function extractHashtags(str) {
  var hashtags = new Map();
  str.match(/[\s\S]#([a-z0-9_-]*)/gi).map(function (s) {
    return (0, _trimStart2.default)((0, _trim2.default)(s), '#_');
  }).filter(function (s) {
    return (0, _isValidHashtag2.default)(s);
  }).map(function (hashtag) {
    return hashtags.set(hashtag.toLowerCase(), hashtag);
  });

  return Array.from(hashtags.values());
}