/* eslint-disable */

import trimStart from 'lodash/trimStart';

/**
 * Detemines if the slug contains a date in the format YYYY/mm/dd
 *
 * @param {string} slug
 * @return {boolean}
 */
export default function slugContainsDate(slug) {
  return trimStart(slug).match(/^\d{4}\/\d{2}\/\d{2}\/?(\S+)?/) !== null;
}
