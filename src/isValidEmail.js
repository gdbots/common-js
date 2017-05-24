import trim from 'lodash/trim';
import startsWith from 'lodash/startsWith';
import endsWith from 'lodash/endsWith';
import isValidIpv4 from './isValidIpv4';
import isValidIpv6 from './isValidIpv6';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

/**
 * Returns true if the provided value is a email address.
 *
 * @param {string} email
 *
 * @return {boolean}
 */
export default function isValidEmail(email) {
  if (!email) {
    return false;
  }

  let ipInEmail = email.split('@')[1];
  if (ipInEmail && startsWith(ipInEmail, '[') && endsWith(ipInEmail, ']')) {
    ipInEmail = trim(ipInEmail, /[|]/);
    return isValidIpv4(ipInEmail) || isValidIpv6(ipInEmail);
  }

  return EMAIL_PATTERN.test(email);
}
