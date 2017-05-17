/* eslint-disable */

import removeDateFromSlug from './removeDateFromSlug';
import isValidDate from './isValidDate';

/**
 * Returns true if the provided value is a slug.
 *
 * @param {string} slug
 * @param {Date} date
 *
 * @return {?string}
 */
export default function addDateToSlug(slug, date) {
  if (!isValidDate(date)) {
    return null; // throw execption
  }

  // date->format(YYYY/MM/DD) + removeDateFromSlug(slug)
  date = formatDate(date);
  slug = removeDateFromSlug(slug);

  return `${date}/${slug}`;
}

/**
 * Return the required date format in slug (YYYY/MM/DD)
 *
 * @param  {Date} date
 * @return {string} YYYY/MM/DD formated date
 */
function formatDate(date) {
  let year, month, day;

  year = date.getFullYear();

  month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}/${month}/${day}`;
}
