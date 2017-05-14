/* eslint-disable */

import kebabCase from 'lodash-es/kebabCase';
import deburr from 'lodash-es/deburr';
import trim from 'lodash-es/trim';
import trimStart from 'lodash-es/trimStart';
import isValidHashtag from './isValidHashtag';

// some punctuation and other chars are convertable
const convertables = [{ s: "'", r: '' }, { s: '"', r: '' }, { s: '?', r: '' }, { s: '#', r: '' }, { s: '/', r: '' }, { s: '\\', r: '' }, { s: '&amp;', r: ' And ' }, { s: '&', r: ' And ' }, { s: '%', r: ' Percent ' }, { s: '@', r: ' At ' }];

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
  return kebabCase(str);
}