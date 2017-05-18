/* eslint-disable */

import kebabCase from 'lodash/kebabCase';
import deburr from 'lodash/deburr';
import trim from 'lodash/trim';

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
  convertables.forEach(map => {
    str = str.replace(map.s, map.r);
  });

  if (!allowSlashes) {
    str = str.replace('/', '');
    return kebabCase(str);
  }

  return trim(deburr(str)).replace(/[^a-zA-Z0-9\-\/]+/g, '-')
                          .replace(/(\d+)/g, '-$1-')
                          .replace(/-+/g, '-')
                          .replace(/\/+/g, '/')
                          .replace(/(\/-)|(-\/)/g, '/')
                          .toLowerCase();
}
