import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';
import isValidHashtag from './isValidHashtag';

/**
 * Extracts all of the valid hashtags from a string.
 * multi-line strings will work with this method.
 *
 * @param {string} str
 *
 * @return {string[]} - Unique array of hashtags without the "#"
 */
export default function extractHashtags(str) {
  var hashtags = new Map();
  str.match(/[\s\S]#([a-z0-9_-]*)/gi).map(function (s) {
    return trimStart(trim(s), '#_');
  }).filter(function (s) {
    return isValidHashtag(s);
  }).map(function (hashtag) {
    return hashtags.set(hashtag.toLowerCase(), hashtag);
  });

  return Array.from(hashtags.values());
}