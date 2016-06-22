'use strict';

import Uuid from 'uuid';
import SystemUtils from 'gdbots/common/util/system-utils';
import UuidIdentifier from 'gdbots/identifiers/uuid-identifier';

export default class TimeUuidIdentifier extends SystemUtils.mixinClass(UuidIdentifier)
{
  /**
   * @param string uuid
   *
   * @throws \InvalidArgumentException
   */
  constructor(uuid) {
    super(uuid);

    let version1Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!version1Regex.test(uuid)) {
      throw new Error('A time based (version 1) uuid is required.');
    }
  }

  /**
   * {@inheritdoc}
   */
  static generate() {
    return new this(Uuid.v1());
  }
}
