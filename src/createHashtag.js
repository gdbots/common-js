import trimStart from 'lodash/trimStart';
import isValidHashtag from './isValidHashtag';

/**
 * Creates a hashtag from the provided string if possible.
 * A null return means the input cannot be made into a hashtag.
 *
 * @param {string} str
 * @param {boolean} [camelize]
 *
 * @return {?string}
 */
export default function createHashtag(str, camelize = true) {
  if (isValidHashtag(str)) {
    return trimStart(str, '#');
  }

  return isValidHashtag(str) ? str : null;
}
