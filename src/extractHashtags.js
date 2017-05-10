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
  const hashtags = new Map;
  str.match(/[\s\S]#([a-z0-9_-]*)/gi)
    .map(str => trimStart(trim(str), '#_'))
    .filter(str => isValidHashtag(str))
    .map(hashtag => hashtags.set(hashtag.toLowerCase(), hashtag));

  return Array.from(hashtags.values());
}
