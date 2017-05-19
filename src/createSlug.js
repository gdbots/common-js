import kebabCase from 'lodash/kebabCase';
import deburr from 'lodash/deburr';
import trim from 'lodash/trim';
import isValidSlug from './isValidSlug';

// some punctuation and other chars are convertable
const convertables = [
  { s: "'", r: '' },
  { s: '"', r: '' },
  { s: '?', r: '' },
  { s: '#', r: '' },
  { s: '\\', r: '' },
  { s: '&amp;', r: ' And ' },
  { s: '&', r: ' And ' },
  { s: '%', r: ' Percent ' },
  { s: '@', r: ' At ' },
];

/**
 * Creates a slug cased string (aka kebab case) from the provided string if possible.
 * A null return means the input cannot be made into a slug.
 *
 * @param {string} str
 * @param {boolean} [allowSlashes]
 *
 * @return {?string}
 */
export default function createSlug(str, allowSlashes = false) {
  let strFiexed = trim(deburr(str));
  let result = null;

  if (!strFiexed) {
    return result;
  }

  convertables.forEach(({ s, r = '' }) => {
    strFiexed = strFiexed.replace(s, r);
  });

  if (!allowSlashes) {
    strFiexed = strFiexed.replace(/[^a-zA-Z0-9\-/]+/g, '-');
    result = kebabCase(strFiexed);

    return isValidSlug(result, false) ? result : null;
  }

  result = trim(strFiexed.replace(/[^a-zA-Z0-9\-/]+/g, '-')
                        .replace(/(\d+)/g, '-$1-')
                        .replace(/-+/g, '-')
                        .replace(/\/+/g, '/')
                        .replace(/(\/-)|(-\/)/g, '/')
                        .toLowerCase(), /[-/]/g);

  return isValidSlug(result, true) ? result : null;
}
