/**
 * Returns true if the provided value is a hashtag.
 *
 * - must have at least one letter
 * - cannot start with an underscore (leading _ automatically removed)
 * - cannot be greater than 139 characters
 *
 * @see http://twitter.pbworks.com/w/page/1779812/Hashtags
 *
 * @param {string} hashtag
 *
 * @return {boolean}
 */
export default function isValidHashtag(hashtag) {
  /*
  hashtag = ltrim(hashtag, '#');
  if (empty(hashtag)) {
    return false;
  }

  $test = preg_replace('/[^a-zA-Z0-9_]/', '', hashtag);
  if ($test !== hashtag) {
    return false;
  }

  if ('_' === hashtag[0]) {
    return false;
  }

  $len = strlen(hashtag);
  if ($len > 139) {
    return false;
  }

  for ($i = 0; $i < $len; $i++) {
    if (!is_numeric(hashtag[$i])) {
      return true;
    }
  }
  */

  return false;
}
