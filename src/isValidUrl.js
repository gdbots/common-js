import trim from 'lodash/trim';

const URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

/**
 * Returns true if the provided value is a url.
 *
 * @param {string} url
 *
 * @return {boolean}
 */
export default function isValidUrl(url) {
  return URL_PATTERN.test(trim(url));
}
