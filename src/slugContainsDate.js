import trimStart from 'lodash/trimStart';

const datePattern = /^\d{4}\/\d{2}\/\d{2}\/?(\S+)?/;

/**
 * Detemines if the slug contains a date in the format YYYY/mm/dd
 *
 * @param {string} slug
 * @return {boolean}
 */
export default function slugContainsDate(slug) {
  return datePattern.test(trimStart(slug));
}
