import startsWith from 'lodash/startsWith';
import trimStart from 'lodash/trimStart';
import isValidEmail from './isValidEmail';
import isValidIpv6 from './isValidIpv6';

/**
 * inspired by gist https://gist.github.com/dperini/729294
 * and http://blog.mattheworiordan.com/post/13174566389/url-regular-expression-for-links-with-or-without
 * no unicode allowed
 */
function genericUrlRegex() {
  const protocol = '(?:([A-Za-z]{3,9}://)|mailto:)'; // (?:((?:https?|s?ftp|telnet)://)|mailto:)
  const auth = '(?:\\S+(?::\\S*)?@)?';
  const ipv4 = '(?:\\[?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\]?';
  const host = '(?:(?:[a-zA-Z0-9]-*)*[a-zA-Z0-9]+)';
  const domain = '(?:\\.(?:[a-zA-Z0-9]-*)*[a-zA-Z0-9]+)*';
  const tld = '(?:\\.(?:[a-zA-Z]{2,}))\\.?';
  const port = '(?::\\d{2,5})?';
  const path = '(?:[/?#][\\x21-\\x7F]*)?'; // ascii no whitespaces
  const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ipv4}|${host}${domain}${tld})${port}${path}`;

  return new RegExp(`^${regex}$`, 'i');
}

/**
 * Returns true if the provided value is a url.
 *
 * @param {string} url
 * @return {boolean}
 */
export default function isValidUrl(url) {
  if (!url || !url.trim()) {
    return false;
  }

  if (startsWith(url, 'mailto:')) {
    const email = trimStart(url, 'mailto:');
    if (isValidEmail(email)) {
      return true;
    }
  }

  const testIpv6 = url.match(/[\w]:\/\/\[(.+)\]/i);
  if (testIpv6 && isValidIpv6(testIpv6[1])) {
    return true;
  }

  if (genericUrlRegex().test(url)) {
    return true;
  }

  return false;
}
