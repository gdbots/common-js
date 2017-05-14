import capitalize from 'lodash-es/capitalize';
import deburr from 'lodash-es/deburr';
import trim from 'lodash-es/trim';
import trimStart from 'lodash-es/trimStart';
import isValidHashtag from './isValidHashtag';

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
export default function createHashtag(str) {
  var camelize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (isValidHashtag(str)) {
    return trimStart(str, '#');
  }

  var hashtag = trim(str, '#_ ');
  convertables.forEach(function (_ref) {
    var s = _ref.s,
        r = _ref.r;

    hashtag = hashtag.split(s).join(r);
  });

  hashtag = deburr(hashtag);
  hashtag = hashtag.replace(/[^a-zA-Z0-9_]/g, ' ');

  if (camelize) {
    hashtag = hashtag.split(' ').map(capitalize).join(' ');
  }

  hashtag = hashtag.replace(/\s/g, '');

  return isValidHashtag(hashtag) ? hashtag : null;
}