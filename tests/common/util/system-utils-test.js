'use strict';

import {expect} from 'chai'
import SystemUtils from 'gdbots/common/util/system-utils';

describe('system-utils-test', function() {
  it('mixin traits into an object (another trait)', function(done) {
    class Trait1 {
      method1() {}
    };

    class Trait2 {
      method2() {}
    };

    class Base {}
    class Foo extends SystemUtils.mixinClass(Base, Trait1) {}

    expect(new Foo().hasTrait('Trait1')).to.be.true;
    expect(new Foo().hasTrait('Trait2')).to.be.false;

    class Foo2 extends SystemUtils.mixinClass(Foo) {}

    expect(new Foo2().hasTrait('Trait1')).to.be.true;
    expect(new Foo2().hasTrait('Trait2')).to.be.false;

    class Foo3 extends SystemUtils.mixinClass(Foo, Trait2) {}

    expect(new Foo3().hasTrait('Trait1')).to.be.true;
    expect(new Foo3().hasTrait('Trait2')).to.be.true;

    done();
  });

  it('validate static class creation traits', function(done) {
    class Parent {
      constructor() {
        this.field = 'name';
      }

      static create() {
        return new this();
      }
    }

    class Child extends SystemUtils.mixinClass(Parent) {
      getField() {
        return this.field;
      }
    }

    expect(Child.create().hasTrait('Parent')).to.be.true;

    done();
  });
});
