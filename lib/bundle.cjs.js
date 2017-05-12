'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var capitalize = _interopDefault(require('lodash/capitalize'));
var deburr = _interopDefault(require('lodash/deburr'));
var trim = _interopDefault(require('lodash/trim'));
var trimStart = _interopDefault(require('lodash/trimStart'));
var kebabCase = _interopDefault(require('lodash/kebabCase'));
var toSafeInteger = _interopDefault(require('lodash/toSafeInteger'));

/**
 * Returns true if the provided value is a hashtag.
 *
 * - must be alpha numeric (Current version does NOT support international hashtags.)
 * - must have at least one letter
 * - cannot start with an underscore
 * - cannot be greater than 139 characters
 *
 * @link http://twitter.pbworks.com/w/page/1779812/Hashtags
 *
 * @param {string} hashtag
 *
 * @return {boolean}
 */
function isValidHashtag(hashtag) {
  var trimmed = trimStart(hashtag, '#');

  if (trimmed === '') {
    return false;
  }

  var sanitized = trimmed.replace(/[^a-zA-Z0-9_]/, '');
  if (sanitized !== trimmed) {
    return false;
  }

  if (trimmed[0] === '_') {
    return false;
  }

  if (trimmed.length > 139) {
    return false;
  }

  return (/[a-zA-Z]+/.test(trimmed)
  );
}

// some punctuation and other chars are convertable
var convertables = [{ s: "'", r: '' }, { s: '"', r: '' }, { s: '?', r: '' }, { s: '#', r: '' }, { s: '/', r: '' }, { s: '\\', r: '' }, { s: '&amp;', r: ' And ' }, { s: '&', r: ' And ' }, { s: '%', r: ' Percent ' }, { s: '@', r: ' At ' }];

/**
 * Creates a hashtag from the provided string if possible.
 * A null return means the input cannot be made into a hashtag.
 *
 * @param {string} str
 * @param {boolean} [camelize]
 *
 * @return {?string}
 */
function createHashtag(str) {
  var camelize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (isValidHashtag(str)) {
    return trimStart(str, '#');
  }

  var hashtag = trim(str, '#_ ');
  convertables.forEach(function (_ref) {
    var s = _ref.s,
        r = _ref.r;

    hashtag = hashtag.split(s).join(r);
  });

  hashtag = deburr(hashtag);
  hashtag = hashtag.replace(/[^a-zA-Z0-9_]/g, ' ');

  if (camelize) {
    hashtag = hashtag.split(' ').map(capitalize).join(' ');
  }

  hashtag = hashtag.replace(/\s/g, '');

  return isValidHashtag(hashtag) ? hashtag : null;
}

/* eslint-disable */

/**
 * Creates a slug cased string (aka kebab case) from the provided string if possible.
 * A null return means the input cannot be made into a slug.
 *
 * @param {string} str
 * @param {boolean} [allowSlashes]
 *
 * @return {?string}
 */
function createSlug(str) {
  var allowSlashes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return kebabCase(str);
}

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
    babelHelpers.classCallCheck(this, Enum);

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


  babelHelpers.createClass(Enum, [{
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

/**
 * Extracts all of the valid hashtags from a string.
 * multi-line strings will work with this method.
 *
 * @param {string} str
 *
 * @return {string[]} - Unique array of hashtags without the "#"
 */
function extractHashtags(str) {
  var hashtags = new Map();
  str.match(/[\s\S]#([a-z0-9_-]*)/gi).map(function (s) {
    return trimStart(trim(s), '#_');
  }).filter(function (s) {
    return isValidHashtag(s);
  }).map(function (hashtag) {
    return hashtags.set(hashtag.toLowerCase(), hashtag);
  });

  return Array.from(hashtags.values());
}

// This insane regex was yoinked from here:
// http://www.pelagodesign.com/blog/2009/05/20/iso-8601-date-validation-that-doesnt-suck/
// ...and I'm all like:
// http://thecodinglove.com/post/95378251969/when-code-works-and-i-dont-know-why
var crazyInsaneRegexThatSomehowDetectsIso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d'|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/; // eslint-disable-line

/**
 * Returns true if the provided string is a valid ISO8601 formatted date-time.
 *
 * Taken from facebook sdk...
 *
 * @link https://developers.facebook.com/docs/graph-api/using-graph-api/#readmodifiers
 * @link http://www.cl.cam.ac.uk/~mgk25/iso-time.html
 * @link http://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} string
 *
 * @return {boolean}
 */
function isValidISO8601Date(string) {
  return crazyInsaneRegexThatSomehowDetectsIso8601.test(string);
}

/* eslint-disable */

/**
 * Returns true if the provided value is a slug.
 *
 * @param {string} slug
 * @param {boolean} [allowSlashes]
 *
 * @return {boolean}
 */
function isValidSlug(slug) {
  var allowSlashes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return false;
}

/**
 * October 15, 1582 UTC
 * @const int
 */
var MIN_UTC_TIME = -12219292800;

/**
 * Returns true if it's a valid timestamp.
 *
 * @param {string} timestamp
 * @param {boolean} [allowNegative]
 *
 * @return {boolean}
 */
function isValidTimestamp(timestamp) {
  var allowNegative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var timestampStr = '' + timestamp;
  var timestampInt = toSafeInteger(timestamp);

  if (allowNegative) {
    return '' + timestampInt === timestampStr && timestampInt <= toSafeInteger(Number.MAX_VALUE) && timestampInt >= MIN_UTC_TIME;
  }

  return '' + timestampInt === timestampStr && timestampInt <= toSafeInteger(Number.MAX_VALUE) && timestampInt >= 0;
}

exports.createHashtag = createHashtag;
exports.createSlug = createSlug;
exports.Enum = Enum;
exports.extractHashtags = extractHashtags;
exports.isValidHashtag = isValidHashtag;
exports.isValidISO8601Date = isValidISO8601Date;
exports.isValidSlug = isValidSlug;
exports.isValidTimestamp = isValidTimestamp;
