'use strict';

import SystemUtils from 'gdbots/common/util/system-utils';
import Identifier from 'gdbots/identifiers/identifier';
import GeneratesIdentifier from 'gdbots/identifiers/generates-identifier';

export default class UuidIdentifier extends SystemUtils.mixin(Identifier, GeneratesIdentifier)
{
}
