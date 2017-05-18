/* eslint-disable */

import trim from 'lodash/trim';
import createSlug from './createSlug';

/**
 * Creates a slug from a CamelCase string
 *
 * @param {string} str
 * @param {boolean} [allowSlashes]
 *
 * @return {?string}
 */
export default function createSlugFromCamel(str, allowSlashes = false) {
  str = trim(str).replace(/([A-Z0-9])/g, ' $1');
  return createSlug(str, allowSlashes);
}
