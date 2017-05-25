import deburr from 'lodash-es/deburr';
import kebabCase from 'lodash-es/kebabCase';
import trim from 'lodash-es/trim';
import isValidSlug from './isValidSlug';

// some punctuation and other chars are convertable
const convertables = [{ s: "'", r: '' }, { s: '"', r: '' }, { s: '?', r: '' }, { s: '#', r: '' }, { s: '\\', r: '' }, { s: '&amp;', r: ' And ' }, { s: '&', r: ' And ' }, { s: '%', r: ' Percent ' }, { s: '@', r: ' At ' }];

/**
 * Creates a slug cased string (aka kebab case) from the provided string if possible.
 * A null return means the input cannot be made into a slug.
 *
 * @param {string} str
 * @param {boolean} [allowSlashes]
 *
 * @returns {?string}
 */
export default function createSlug(str, allowSlashes = false) {
  let strFixed = trim(deburr(str));
  let result = null;

  if (!strFixed) {
    return result;
  }

  convertables.forEach(({ s, r = '' }) => {
    strFixed = strFixed.replace(s, r);
  });

  if (!allowSlashes) {
    strFixed = strFixed.replace(/[^a-zA-Z0-9\-/]+/g, '-');
    result = kebabCase(strFixed);

    return isValidSlug(result, false) ? result : null;
  }

  result = trim(strFixed.replace(/[^a-zA-Z0-9\-/]+/g, '-').replace(/(\d+)/g, '-$1-').replace(/-+/g, '-').replace(/(\/-)|(-\/)/g, '/').replace(/\/+/g, '/').toLowerCase(), /[-/]/g);

  return isValidSlug(result, true) ? result : null;
}