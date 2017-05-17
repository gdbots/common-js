/* eslint-disable */

import forEach from 'lodash/forEach';
import trim from 'lodash/trim';
import trimStart from 'lodash/trimStart';

/**
 * Removes the date in the format YYYY/mm/dd from the slug if it is fou
 *
 * @param {string} slug
 *
 * @return {?string}
 */

export default function removeDateToSlug(slug) {
  slug = trim(slug, '/');

  let match;
  while((match = slug.match(/^\d{4}\/\d{2}\/\d{2}\/?(\S+)?/)) !== null) {
    slug = trimStart(match[1] ? match[1] : '', '/');
  }

  return slug;
}
