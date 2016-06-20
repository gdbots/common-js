'use strict';

import {expect} from 'chai'
import SystemUtils from 'gdbots/common/util/system-utils';

describe('system-utils-test', function() {
  it('should mixin traits into an object (another trait)', function(done) {

    class Trait1 {
      method1() {}
    };

    class Trait2 {
      method2() {}
    };

    class Base {}
    class Foo extends SystemUtils.mixinClass(Base, Trait1) {}

    expect(Foo.hasTrait('Trait1')).to.be.true;
    expect(Foo.hasTrait('Trait2')).to.be.false;

    class Foo2 extends Foo {}

    expect(Foo2.hasTrait('Trait1')).to.be.true;
    expect(Foo2.hasTrait('Trait2')).to.be.false;

    class Foo3 extends SystemUtils.mixinClass(Foo, Trait2) {}

    expect(Foo3.hasTrait('Trait1')).to.be.true;
    expect(Foo3.hasTrait('Trait2')).to.be.true;

    done();
  });
});
