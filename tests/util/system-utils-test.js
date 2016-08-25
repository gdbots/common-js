'use strict';

import {expect} from 'chai'
import SystemUtils from 'gdbots/common/util/system-utils';

describe('system-utils-test', function() {
  it('validate class name', function(done) {
    class Test {
      method1() {}
    }

    expect('Test' === SystemUtils.getClass(new Test())).to.be.true;
    expect('MyClass' === SystemUtils.getClass(new (function MyClass() {}))).to.be.true;
    expect(false === SystemUtils.getClass(function MyFunction() {})).to.be.true;
    expect('Object' === SystemUtils.getClass({})).to.be.true;

    done();
  });

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

    class Foo4 extends SystemUtils.mixinClass(Foo) {}

    expect(Foo4.hasTrait('Trait1')).to.be.true;

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
