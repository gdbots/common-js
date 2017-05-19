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
  const s = trim(str).replace(/([A-Z])/g, ' $1').replace(/([0-9]+)/g, ' $1');
  return createSlug(s, allowSlashes);
}
