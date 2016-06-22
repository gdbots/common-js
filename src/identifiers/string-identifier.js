'use strict';

import StringUtils from 'gdbots/common/util/string-utils';
import SystemUtils from 'gdbots/common/util/system-utils';
import Identifier from 'gdbots/identifiers/identifier';

export default class StringIdentifier extends SystemUtils.mixinClass(Identifier)
{
  /**
   * @param string string
   *
   * @throws \InvalidArgumentException
   */
  constructor(string) {
    super(); // require before using `this`

    if ('string' !== typeof string) {
      throw new Error('String expected but got [' + StringUtils.varToString(string) + '].');
    }

    /** @var string */
    this.string = string.trim();

    if (!this.string || this.string.length === 0) {
      throw new Error('String cannot be empty.');
    }
  }

  /**
   * {@inheritdoc}
   */
  static fromString(string) {
    return new this(string);
  }

  /**
   * {@inheritdoc}
   */
  toString() {
    return this.string;
  }

  /**
   * {@inheritdoc}
   */
  equals(other) {
    return this.toString() == other.toString();
  }
}
