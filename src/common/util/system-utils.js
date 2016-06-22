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
   * example 1: get_class(new (function MyClass() {}));
   * returns 1: "MyClass"
   *
   * example 2: get_class({});
   * returns 2: "Object"
   *
   * example 3: get_class([]);
   * returns 3: false
   *
   * example 4: get_class(42);
   * returns 4: false
   *
   * example 5: get_class(function MyFunction() {});
   * returns 5: false
   */
  static getClass(obj) {
    if (obj && typeof obj === 'object' &&
			Object.prototype.toString.call(obj) !== '[object Array]' &&
			obj.constructor) {
        var arr = obj.constructor.toString().match(/function\s*(\w+)/);

        if (arr && arr.length === 2) {
            return arr[1];
        }
    }

    return false;
  }

  /**
   * Mixin traits into a class.
   *
   * ex: class Foo extends mixinClass(Trait1) {}
   *
   * @return mixed
   */
  static mixinClass(BaseClass, ...traits) {
    if (null === BaseClass) {
      BaseClass = class EmptyBaseClass {};
    }

    // add names
    let _traits = [].concat([BaseClass.name], BaseClass.prototype._traits || []);

    let subClass = BaseClass;
    for (let superClass of traits) {
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

      // add names
      _traits = _traits.concat([superClass.name], superClass.prototype._traits || []);

      // point to next trait
      subClass = superClass;
    }

    // add list of traits to main class
    BaseClass.prototype._traits = _traits;

    /**
     * Checks to see if a class or trait has a trait
     *
     * @param string trait
     *
     * @return bool
     */
    BaseClass.prototype.hasTrait = function(trait) {
      return 'object' === typeof this._traits && this._traits.indexOf(trait) >= 0;
    };

    return BaseClass;
  }
}
