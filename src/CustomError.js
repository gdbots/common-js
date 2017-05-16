import toInteger from 'lodash/toInteger';

export default class CustomError extends Error {
  /**
   * @param {string} message - The error message itself.
   * @param {number} code    - A code for this error message.
   */
  constructor(message, code = 0) {
    super(message);
    this.name = this.constructor.name;
    this.code = toInteger(code) || 0;
  }

  /**
   * Returns the error code.
   * @link https://github.com/gdbots/schemas/blob/master/schemas/gdbots/pbjx/enums.xml#L8
   *
   * @return {number}
   */
  getCode() {
    return this.code;
  }
}
