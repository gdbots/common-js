import toInteger from 'lodash/toInteger';

export default class Exception extends Error {
  /**
   * @param {string} message - The error message itself.
   * @param {number} code    - A code for this exception.
   */
  constructor(message, code = 0) {
    super(message);
    this.name = this.constructor.name;
    this.code = toInteger(code) || 0;
  }

  /**
   * @return {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @return {string}
   */
  getMessage() {
    return this.message;
  }

  /**
   * Returns the exception code.
   *
   * @link https://github.com/gdbots/schemas/blob/master/schemas/gdbots/pbjx/enums.xml#L8
   *
   * @return {number}
   */
  getCode() {
    return this.code;
  }
}
