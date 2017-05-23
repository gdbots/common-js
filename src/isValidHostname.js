// Hostname RFC 1123
// https://en.wikipedia.org/wiki/Hostname
const HOSTNAME_PATTERN = /^((?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)$/;

/**
 * Returns true if the provided value is a valid hostname.
 *
 * @param {string} str
 * @return {boolean}
 */
export default function isValidHostname(str) {
  return HOSTNAME_PATTERN.test(str);
}
