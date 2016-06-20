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
  static mixinClass(...traits) {
    class traitedClass
    {
      /**
       * Checks to see if a class or trait has a trait
       *
       * @param string trait
       *
       * @return bool
       */
      static hasTrait(trait) {
        let _traits;
        if ('function' === typeof this) {
          _traits = this.prototype._traits;
        } else {
          _traits = this._traits;
        }
        return 'object' === typeof _traits && Object.keys(_traits).indexOf(trait) >= 0;
      }
    };

    mixin.apply(this, [traitedClass.prototype].concat(traits));

    return traitedClass;
  }
}

/**
 * Mixin traits into an Object (another trait)
 */
function mixin(object, ...traits) {
  let _traits = {};

  if (object._traits) {
    Object.assign(_traits, object._traits);
  }

  let props = {
    _traits: {
      value: _traits,
      writable: true,
      configurable: true
    }
  };

  for (let trait of traits) {
    if ('function' !== typeof trait) {
      continue;
    }

    if (trait.prototype._traits) {
      Object.assign(_traits, trait.prototype._traits);
    }

    for (let name of Object.getOwnPropertyNames(trait)) {
      if ('_traits' !== name && !object.hasOwnProperty(name)) {
        props[name] = {
          value: trait[name],
          writable: true,
          configurable: true
        };
      }
    }

    _traits[trait.name] = trait;
  }

  Object.defineProperties(object, props);

  return object;
};
