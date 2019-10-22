import trim from 'lodash/trim';

const DATE_PATTERN = /(^\d{4}\/\d{2}\/\d{2}\/)|(^\d{4}\/\d{2}\/\d{1,2})|(^\d{4}\/\d{2}\/)|(^\d{4}\/\d{1,2})|(^\d{4}\/)|(^\d{1,4}$)/;

/**
 * Removes the (possibly partial) date from the slug if it is found
 *
 * @param {string} slug
 *
 * @returns {?string}
 */
export default function removeDateToSlug(slug) {
  let s = trim(slug, '/');

  while (DATE_PATTERN.test(s)) {
    s = s.replace(DATE_PATTERN, '');
  }

  return s;
}
