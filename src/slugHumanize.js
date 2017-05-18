/* eslint-disable */

import map from 'lodash/map';
import upperFirst from 'lodash/upperFirst';
import removeDateFromSlug from './removeDateFromSlug';

/**
 * Translates, as best as possible, a slug back into a human readable format.
 *
 * @param {string} slug
 * @return {string}
 */
export default function slugHumanize(slug) {
  return map(removeDateFromSlug(slug).split('-'), upperFirst).join(' ');
}
