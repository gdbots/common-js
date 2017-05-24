import isValidUrl from './isValidUrl';
import isValidUrn from './isValidUrn';

const URI_PATTERN = /^(?:[a-z0-9][a-z0-9-]{1,31}:(?:[a-z0-9()+,-.:=@;$_!*']|%(?:2[1-9a-f]|[3-6][0-9a-f]|7[0-9a-e]))+)$/i;
/**
 * Returns true if the provided value is a uri.
 * The most common form of URI is the Uniform Resource Locator (URL),
 * frequently referred to informally as a web address. More rarely seen in usage
 * is the Uniform Resource Name (URN), which was designed to complement URLs by
 * providing a mechanism for the identification of resources in particular
 * namespaces.
 * scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 *
 * @param {string} uri
 * @return {boolean}
 */
export default function isValidUri(uri) {
  if (isValidUrl(uri) || isValidUrn(uri) || URI_PATTERN.test(uri)) {
    return true;
  }

  return false;
}
