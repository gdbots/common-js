// inspired by gist https://gist.github.com/dperini/729294
// no unicode allowed
function UrlRegex() {
  const protocol = '(?:(?:[a-z]+:)?//)';
  const auth = '(?:\\S+(?::\\S*)?@)?';
  const ip = '(?:([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])';
  const host = '(?:(?:[a-zA-Z0-9]-*)*[a-zA-Z0-9]+)';
  const domain = '(?:\\.(?:[a-zA-Z0-9]-*)*[a-zA-Z0-9]+)*';
  const tld = '(?:\\.(?:[a-zA-Z]{2,}))\\.?';
  const port = '(?::\\d{2,5})?';
  const path = '(?:[/?#][\\x21-\\x7F]*)?'; // ascii no whitespaces
  const regex = `(?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path}`;

  return new RegExp(`(?:^${regex}$)`, 'i');
}

/**
 * Returns true if the provided value is a url.
 *
 * @param {string} url
 * @return {boolean}
 */
export default function isValidUrl(url) {
  return UrlRegex().test(url);
}
