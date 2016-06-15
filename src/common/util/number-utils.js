'use strict';

export default class NumberUtils
{
  /**
   * Returns an integer within a boundary.
   *
   * @param int number
   * @param int min
   * @param int max
   *
   * @return int
   */
  static bound(number, min = 0, max = Number.MAX_VALUE) {
    number = parseInt(number);
    min = parseInt(min);
    max = parseInt(max);

    return Math.min(Math.max(number, min), max);
  }
}
