'use strict';

const VALID_SLUG_PATTERN = /^[a-z0-9-]+/;
const VALID_DATED_SLUG_PATTERN = /^([a-z0-9-]|[a-z0-9-][a-z0-9-\/]*[a-z0-9-])/;

export default class SlugUtils
{
  /**
   * Creates a slug from the text given.
   *
   * @param string string
   * @param bool   allowSlashes
   *
   * @return string
   */
  static create(string, allowSlashes = false) {
    let nonWord = /[^\w\-]+/g;
    if (allowSlashes) {
      nonWord = /[^\w\/\-]+/g;
    }

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-')    // Replace spaces with -
      .replace(nonWord, '')    // Remove all non-word chars
      .replace(/\-\-+/g, '-')  // Replace multiple - with single -
      .replace(/^-+/, '')      // Trim - from start of text
      .replace(/-+$/, '');     // Trim - from end of text
  }

  /**
   * Adds the date in the format YYYY/mm/dd to the slug.
   *
   * @param string slug
   * @param Date   date
   *
   * @return string
   */
  static addDate(slug, date) {
    return date.getFullYear() + '/' + ('00' + date.getMonth()).slice(-2) + '/' + ('00' + date.getDate()).slice(-2) + '/' + this.removeDate(slug);
  }

  /**
   * Removes the date in the format YYYY/mm/dd from the slug if it is found.
   *
   * @param string slug
   *
   * @return string
   */
  static removeDate(slug) {
    return slug.replace(/^\d{4}\/\d{2}\/\d{2}\/?(\S+)?/, '$1').trim();
  }

  /**
   * Detemines if the slug contains a date in the format YYYY/mm/dd
   *
   * @param string slug
   *
   * @return int
   */
  static containsDate(slug) {
    return /^\d{4}\/\d{2}\/\d{2}\/?(\S+)?/.test(slug);
  }

  /**
   * Translates, as best as possible, a slug back into a human readable format.
   *
   * @param string slug
   *
   * @return string
   */
  static humanize(slug) {
    let words = slug
      .replace('-', ' ')
      .split(' ')
      .map(function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      });

    return words.join(' ');
  }

  /**
   * @param string string
   * @param bool   allowSlashes
   *
   * @return bool
   */
  static isValid(string, allowSlashes = false) {
    let match = allowSlashes ? VALID_DATED_SLUG_PATTERN : VALID_SLUG_PATTERN;

    return match.test(string);
  }

  /**
   * @param string string
   * @param bool   allowSlashes
   *
   * @return string
   */
  static createFromCamel(string, allowSlashes = false) {
    string = string.replace(/(([A-Z]|[0-9])[^A-Z])/, ' 1').trim();

    return this.create(string, allowSlashes);
  }
}
