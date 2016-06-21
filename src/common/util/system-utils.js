'use strict';

export default class SystemUtils
{
  /**
   * Loads a module by name.
   *
   * @param string moduleName
   *
   * @return Promise
   */
  static import(moduleName) {
    return new Promise(function(resolve, reject) {
      let global = window;

      if (typeof global.define === 'function' && global.define.amd) {
        global.require([moduleName], resolve, reject);
      } else if (typeof module !== 'undefined' && (module.exports && typeof require !== 'undefined') ||
                typeof module !== 'undefined' && (module.component && (global.require && global.require.loader === 'component'))) {
        resolve(require(moduleName));
      } else {
        resolve(global[moduleName]);
      }
    });
  }

  /**
   * Mixin traits into a class.
   *
   * ex: class Foo extends mixinClass(Trait1) {}
   *
   * @return mixed
   */
  static mixinClass(Base, ...traits) {
    if (!Base) {
      Base = class NoBase {};
    }

    class traitedClass extends Base
    {
      /**
       * Checks to see if a class or trait has a trait
       *
       * @param string trait
       *
       * @return bool
       */
      static hasTrait(trait) {
        return 'object' === typeof this._traits && this._traits.indexOf(trait) >= 0;
      }
    };

    // hold list of trait names
    let _traits = [Base.name];

    // add Base name
    if ('object' === typeof Base._traits) {
      _traits = _traits.concat(Base._traits);
    }

    let subClass = traitedClass;
    for (let superClass of traits) {
      // add trait names
      if ('object' === typeof superClass._traits) {
        _traits = _traits.concat(superClass._traits);
      }
      _traits = _traits.concat([superClass.name]);

      // merge traits
      mixin(subClass, superClass);

      // point to next trait
      subClass = superClass;
    }

    // add list of traits to main class
    Object.defineProperty(traitedClass, '_traits', {
      value: _traits,
      configurable: false,
      writable: false,
      enumerable: true,
    });

    return traitedClass;
  }
}

/**
 * Mixin traits into an Object (another trait)
 */
function mixin(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + (
      typeof superClass === 'undefined' ? 'undefined' : (typeof superClass)
    ));
  }

  subClass.prototype = Object.create(
    superClass && superClass.prototype,
    {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    }
  );

  if (superClass) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : subClass.__proto__ = superClass.__proto__  // eslint-disable-line no-proto
    ;
  }
}
