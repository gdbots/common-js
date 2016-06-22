'use strict';

import Uuid from 'uuid';
import SystemUtils from 'gdbots/common/util/system-utils';
import Identifier from 'gdbots/identifiers/identifier';
import GeneratesIdentifier from 'gdbots/identifiers/generates-identifier';

export default class UuidIdentifier extends SystemUtils.mixinClass(Identifier, GeneratesIdentifier)
{
  /**
   * @param string uuid
   */
  constructor(uuid) {
    super(); // require before using `this`

    uuid = uuid.toLowerCase();

    let version1Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!version1Regex.test(uuid)) {
      throw new Error('An invalid uuid [' + uuid + '] was provided.');
    }

    /** @var string */
    this.uuid = uuid;
  }

  /**
   * {@inheritdoc}
   */
  static generate() {
    return new this(Uuid.v4());
  }

  /**
   * {@inheritdoc}
   */
  static fromString(string) {
    return new this(Uuid.unparse(Uuid.parse(string)));
  }

  /**
   * {@inheritdoc}
   */
  toString() {
    return this.uuid;
  }

  /**
   * {@inheritdoc}
   */
  equals(other) {
    return this.toString() == other.toString();
  }
}
