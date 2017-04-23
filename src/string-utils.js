'use strict';

import SystemUtils from 'gdbots/common/util/system-utils';

// test whether a string is camel-case
const HAS_SPACE = /\s/
const HAS_SEPARATOR = /[\W_]/
const HAS_CAMEL = /([a-z][A-Z]|[A-Z][a-z])/

// separator splitter
const SEPARATOR_SPLITTER = /[\W_]+(.|$)/g

// camelcase splitter
const CAMEL_SPITTER = /(.)([A-Z]+)/g

export default class StringUtils
{
  /**
   * @param mixed obj
   *
   * @return string
   */
  static varToString(obj) {
    if (Array.isArray(obj)) {
      let a = [];
      obj.forEach(function(v, k) {
        a.push(k + ' => ' + this.varToString(v));
      }.bind(this));

      return 'Array(' + a.join(', ') + ')';
    }

    if ('object' === typeof obj) {
      return 'Object(' + SystemUtils.getClass(obj) + ')';
    }

    if (null === obj) {
        return 'null';
    }

    if (false === obj) {
        return 'false';
    }

    if (true === obj) {
        return 'true';
    }

    return String(obj);
  }

  /**
   * Remove any starting case from a 'string', like camel or snake, but keep
   * spaces and punctuation that may be important otherwise.
   *
   * @param string str
   *
   * @return string
   */
  static toNoCase(str) {
    if (HAS_SPACE.test(str)) {
      return str.toLowerCase();
    }
    if (HAS_SEPARATOR.test(str)) {
      return (this.unseparate(str) || str).toLowerCase();
    }
    if (HAS_CAMEL.test(str)) {
      return this.uncamelize(str).toLowerCase();
    }
    return str.toLowerCase();
  }

  /**
   * Un-separate a 'string'.
   *
   * @param string str
   *
   * @return string
   */
  static unseparate(str) {
    return str.replace(SEPARATOR_SPLITTER, function(m, next) {
      return next ? ' ' + next : '';
    });
  }

  /**
   * Un-camelize a 'string'.
   *
   * @param string str
   *
   * @return string
   */
  static uncamelize(str) {
    return str.replace(CAMEL_SPITTER, function(m, previous, uppers) {
      return previous + ' ' + uppers.toLowerCase().split('').join(' ');
    });
  }

  /**
   * Convert a 'string' to space case.
   *
   * @param string str
   *
   * @return string
   */
  static toSpaceCase(str) {
    return this.toNoCase(str).replace(/[\W_]+(.|$)/g, function (matches, match) {
      return match ? ' ' + match : '';
    });
  }

  /**
   * Convert a 'string' to snake case.
   *
   * @param string str
   *
   * @return string
   */
  static toSnakeCase(str) {
    return this.toSpaceCase(str).replace(/\s/g, '_');
  }

  /**
   * Convert a 'string' to slug case.
   *
   * @param string str
   *
   * @return string
   */
  static toSlugCase(str) {
    return this.toSpaceCase(str).replace(/\s/g, '-');
  }

  /**
   * Convert a 'string' to camel case.
   *
   * @param string str
   *
   * @return string
   */
  static toCamelCase(str) {
    return this.toSpaceCase(str).replace(/\s(\w)/g, function (matches, letter) {
      return letter.toUpperCase();
    });
  }

  /**
   * Pad a string to a certain length with another string.
   *
   * @link http://php.net/manual/en/function.str-pad.php
   *
   * example 1: str_pad('Kevin van Zonneveld', 30, '-=', 'STR_PAD_LEFT')
   * returns 1: '-=-=-=-=-=-Kevin van Zonneveld'
   *
   * example 2: str_pad('Kevin van Zonneveld', 30, '-', 'STR_PAD_BOTH')
   * returns 2: '------Kevin van Zonneveld-----'
   */
  static strPad(input, padLength, padString, padType) {
    let half = '';
    let padToGo;

    let _strPadRepeater = function(s, len) {
      let collect = '';

      while (collect.length < len) {
        collect += s;
      }
      collect = collect.substr(0, len);

      return collect;
    };

    input += '';
    padString = padString !== undefined ? padString : ' ';

    if (padType !== 'STR_PAD_LEFT' && padType !== 'STR_PAD_RIGHT' && padType !== 'STR_PAD_BOTH') {
      padType = 'STR_PAD_RIGHT';
    }
    if ((padToGo = padLength - input.length) > 0) {
      if (padType === 'STR_PAD_LEFT') {
        input = _strPadRepeater(padString, padToGo) + input;
      } else if (padType === 'STR_PAD_RIGHT') {
        input = input + _strPadRepeater(padString, padToGo);
      } else if (padType === 'STR_PAD_BOTH') {
        half = _strPadRepeater(padString, Math.ceil(padToGo / 2));
        input = half + input + half;
        input = input.substr(0, padLength);
      }
    }

    return input;
  }

  /**
   * Calculate the md5 hash of a string.
   *
   * @link http://php.net/manual/en/function.md5.php
   *
   * Note: Keep in mind that in accordance with PHP, the whole string is buffered and then
   *   hashed. If available, we'd recommend using Node's native crypto modules directly
   *   in a steaming fashion for faster and more efficient hashing.
   *
   * example 1: md5('Kevin van Zonneveld')
   * returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
  */
  static md5(str) {
    var hash
/*
    try {
      var crypto = require('crypto')
      var md5sum = crypto.createHash('md5')
      md5sum.update(str)
      hash = md5sum.digest('hex')
    } catch (e) {
      hash = undefined
    }
*/

    if (hash !== undefined) {
      return hash
    }

    var utf8Encode = function(s) {
  		for (var c, i = -1, l = (s = s.split('')).length, o = String.fromCharCode; ++i < l;
  			s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]
  		);
  		return s.join('');
  	}

    var xl

    var _rotateLeft = function (lValue, iShiftBits) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }

    var _addUnsigned = function (lX, lY) {
      var lX4, lY4, lX8, lY8, lResult
      lX8 = (lX & 0x80000000)
      lY8 = (lY & 0x80000000)
      lX4 = (lX & 0x40000000)
      lY4 = (lY & 0x40000000)
      lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
      if (lX4 & lY4) {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
      }
      if (lX4 | lY4) {
        if (lResult & 0x40000000) {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
        } else {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
        }
      } else {
        return (lResult ^ lX8 ^ lY8)
      }
    }

    var _F = function (x, y, z) {
      return (x & y) | ((~x) & z)
    }
    var _G = function (x, y, z) {
      return (x & z) | (y & (~z))
    }
    var _H = function (x, y, z) {
      return (x ^ y ^ z)
    }
    var _I = function (x, y, z) {
      return (y ^ (x | (~z)))
    }

    var _FF = function (a, b, c, d, x, s, ac) {
      a = _addUnsigned(a, _addUnsigned(_addUnsigned(_F(b, c, d), x), ac))
      return _addUnsigned(_rotateLeft(a, s), b)
    }

    var _GG = function (a, b, c, d, x, s, ac) {
      a = _addUnsigned(a, _addUnsigned(_addUnsigned(_G(b, c, d), x), ac))
      return _addUnsigned(_rotateLeft(a, s), b)
    }

    var _HH = function (a, b, c, d, x, s, ac) {
      a = _addUnsigned(a, _addUnsigned(_addUnsigned(_H(b, c, d), x), ac))
      return _addUnsigned(_rotateLeft(a, s), b)
    }

    var _II = function (a, b, c, d, x, s, ac) {
      a = _addUnsigned(a, _addUnsigned(_addUnsigned(_I(b, c, d), x), ac))
      return _addUnsigned(_rotateLeft(a, s), b)
    }

    var _convertToWordArray = function (str) {
      var lWordCount
      var lMessageLength = str.length
      var lNumberOfWordsTemp1 = lMessageLength + 8
      var lNumberOfWordsTemp2 = (lNumberOfWordsTemp1 - (lNumberOfWordsTemp1 % 64)) / 64
      var lNumberOfWords = (lNumberOfWordsTemp2 + 1) * 16
      var lWordArray = new Array(lNumberOfWords - 1)
      var lBytePosition = 0
      var lByteCount = 0
      while (lByteCount < lMessageLength) {
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = (lWordArray[lWordCount] |
          (str.charCodeAt(lByteCount) << lBytePosition))
        lByteCount++
      }
      lWordCount = (lByteCount - (lByteCount % 4)) / 4
      lBytePosition = (lByteCount % 4) * 8
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
      lWordArray[lNumberOfWords - 2] = lMessageLength << 3
      lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
      return lWordArray
    }

    var _wordToHex = function (lValue) {
      var wordToHexValue = ''
      var wordToHexValueTemp = ''
      var lByte
      var lCount

      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255
        wordToHexValueTemp = '0' + lByte.toString(16)
        wordToHexValue = wordToHexValue + wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2)
      }
      return wordToHexValue
    }

    var x = []
    var k
    var AA
    var BB
    var CC
    var DD
    var a
    var b
    var c
    var d
    var S11 = 7
    var S12 = 12
    var S13 = 17
    var S14 = 22
    var S21 = 5
    var S22 = 9
    var S23 = 14
    var S24 = 20
    var S31 = 4
    var S32 = 11
    var S33 = 16
    var S34 = 23
    var S41 = 6
    var S42 = 10
    var S43 = 15
    var S44 = 21

    str = utf8Encode(str)
    x = _convertToWordArray(str)
    a = 0x67452301
    b = 0xEFCDAB89
    c = 0x98BADCFE
    d = 0x10325476

    xl = x.length
    for (k = 0; k < xl; k += 16) {
      AA = a
      BB = b
      CC = c
      DD = d
      a = _FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
      d = _FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
      c = _FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
      b = _FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
      a = _FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
      d = _FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
      c = _FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
      b = _FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
      a = _FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
      d = _FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
      c = _FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
      b = _FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
      a = _FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
      d = _FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
      c = _FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
      b = _FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
      a = _GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
      d = _GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
      c = _GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
      b = _GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
      a = _GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
      d = _GG(d, a, b, c, x[k + 10], S22, 0x2441453)
      c = _GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
      b = _GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
      a = _GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
      d = _GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
      c = _GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
      b = _GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
      a = _GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
      d = _GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
      c = _GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
      b = _GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
      a = _HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
      d = _HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
      c = _HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
      b = _HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
      a = _HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
      d = _HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
      c = _HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
      b = _HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
      a = _HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
      d = _HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
      c = _HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
      b = _HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
      a = _HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
      d = _HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
      c = _HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
      b = _HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
      a = _II(a, b, c, d, x[k + 0], S41, 0xF4292244)
      d = _II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
      c = _II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
      b = _II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
      a = _II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
      d = _II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
      c = _II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
      b = _II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
      a = _II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
      d = _II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
      c = _II(c, d, a, b, x[k + 6], S43, 0xA3014314)
      b = _II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
      a = _II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
      d = _II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
      c = _II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
      b = _II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
      a = _addUnsigned(a, AA)
      b = _addUnsigned(b, BB)
      c = _addUnsigned(c, CC)
      d = _addUnsigned(d, DD)
    }

    var temp = _wordToHex(a) + _wordToHex(b) + _wordToHex(c) + _wordToHex(d)

    return temp.toLowerCase()
  }
}
