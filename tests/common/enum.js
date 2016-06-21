'use strict';

import {expect} from 'chai'
import SystemUtils from 'gdbots/common/util/system-utils';
import Enum from 'gdbots/common/enum';

describe('enum-test', function() {
  it('validate enum values', function(done) {

    class Enum1 extends SystemUtils.mixinClass(Enum) {};

    Enum1.initEnum({
      VALUE: 'value'
    });

    expect(Enum1.VALUE).to.be.eq(Enum1.enumValueOf('VALUE'));
    expect(Enum1.VALUE.getValue()).to.be.eq('value');

    done();
  });
});
