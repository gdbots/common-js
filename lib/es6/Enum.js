var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INITIALIZED = Symbol('Enum is initialized');

/**
 * This is an abstract class that is not intended to be
 * used directly. Extend it to turn your class into an enum
 * (initialization is performed via `MyEnum.configure({ENUM: 'val')`).
 *
 * Enums are flyweight objects, meaning that once imported into
 * a module only one instance of a given enum value will ever exist.
 */

var Enum = function () {
  /**
   * @param {string}        name  - The name/key of the enum value.  e.g. "PUBLISHED"
   * @param {string|number} value - The value of the enum.
   */
  function Enum(name, value) {
    _classCallCheck(this, Enum);

    // new.target would be better than this.constructor,
    // but isn’t supported by Babel
    if ({}.hasOwnProperty.call(this.constructor, INITIALIZED)) {
      throw new Error('Enum classes can\'t be instantiated');
    }

    Object.defineProperty(this, 'name', { value: name, enumerable: true });
    Object.defineProperty(this, 'value', { value: value, enumerable: true });
    Object.freeze(this);
  }

  /**
   * Configures the enum and closes the class.
   *
   * @param {Object}  values   - An object with properties of the names and instances of the enum.
   * @param {?string} [enumId] - An identifier for this enum (generally used for @gdbots/pbj lib)
   */


  _createClass(Enum, [{
    key: 'getEnumId',


    /**
     * Returns the enum id when calling from an instance of an enum class.
     *
     * @example
     * const enumInstance = MyEnum.create(MyEnum.ENUM1);
     * console.log(enumInstance.getEnumId());
     *
     * @return {?string}
     */
    value: function getEnumId() {
      return this.constructor.getEnumId();
    }

    /**
     * Returns the keys of the enum.
     *
     * @returns {string[]}
     */

  }, {
    key: 'toString',


    /**
     * Returns the value of the enum.
     *
     * @return {string}
     */
    value: function toString() {
      return '' + this.value;
    }

    /**
     * Returns the value of the enum.
     *
     * @return {string|number}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return this.value;
    }

    /**
     * Returns the value of the enum.
     *
     * @return {string|number}
     */

  }, {
    key: 'valueOf',
    value: function valueOf() {
      return this.value;
    }

    /**
     * Returns the name of the enum.
     *
     * @return {string}
     */

  }, {
    key: 'getName',
    value: function getName() {
      return this.name;
    }

    /**
     * Returns the value of the enum.
     *
     * @return {string|number}
     */

  }, {
    key: 'getValue',
    value: function getValue() {
      return this.value;
    }
  }], [{
    key: 'configure',
    value: function configure(values) {
      var _this = this;

      var enumId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      Object.defineProperty(this, 'instances', { value: {} });
      Object.defineProperty(this, 'enumId', { value: enumId });

      Object.keys(values).forEach(function (key) {
        var instance = new _this(key, values[key]);
        Object.defineProperty(_this, key, { value: instance, enumerable: true });
        _this.instances[key] = instance;
      });

      Object.freeze(this.instances);
      this[INITIALIZED] = true;
    }

    /**
     * Returns an Enum instance by the value.
     *
     * @param {string|number} value - The value of the enum name/key.
     *
     * @return {Enum}
     */

  }, {
    key: 'create',
    value: function create(value) {
      var _this2 = this;

      var instance = this.getKeys().filter(function (key) {
        return '' + _this2.instances[key].getValue() === '' + value;
      });
      if (!instance.length) {
        throw new Error('Value "' + value + '" is not part of the enum "' + (this.getEnumId() || this.constructor.name) + '"');
      }

      return this.instances[instance[0]];
    }

    /**
     * Returns the enum id when calling from the class statically.
     *
     * @example
     * console.log(MyEnum.getEnumId());
     *
     * @return {?string}
     */

  }, {
    key: 'getEnumId',
    value: function getEnumId() {
      return this.enumId;
    }
  }, {
    key: 'getKeys',
    value: function getKeys() {
      return Object.keys(this.instances);
    }

    /**
     * Returns the enum keys and values as an object.  {ENUM1: "val1", ENUM2: "val2"}
     *
     * @returns {Object}
     */

  }, {
    key: 'getValues',
    value: function getValues() {
      var _this3 = this;

      var v = {};
      this.getKeys().forEach(function (key) {
        v[key] = _this3.instances[key].getValue();
      });
      return v;
    }
  }]);

  return Enum;
}();

export default Enum;