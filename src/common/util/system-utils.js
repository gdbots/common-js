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
   * Extends given class by object with functions or properties.
   *
   * @param mixed Parent
   *
   * @return return new MixedClass extended by Mixins
   */
  static mixin(Parent /*, ...mixins*/) {
    // use slice as node 4 does not support param spread.
    let mixins = Array.prototype.slice.call(arguments, 1);
    class Mixed extends Parent {}
    for (let mixin of mixins) {
      for (let prop in mixin) {
        Mixed.prototype[prop] = mixin[prop];
      }
    }
    return Mixed;
  }
}
