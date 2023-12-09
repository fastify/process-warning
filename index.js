'use strict'

const { format } = require('node:util')

/**
 * @namespace processWarning
 */

/**
 * Represents a warning item with details.
 * @typedef {Object} WarningItem
 * @property {string} name - The name of the warning.
 * @property {string} code - The code associated with the warning.
 * @property {string} message - The warning message.
 * @property {boolean} emitted - Indicates if the warning has been emitted.
 * @property {function} emit - Emits the warning.
 * @property {function} format - Formats the warning message.
 */

/**
 * Options for creating a process warning.
 * @typedef {Object} ProcessWarningOptions
 * @property {boolean} [unlimited=false] - If true, allows unlimited emissions of the warning.
 */

/**
 * Represents the process warning functionality.
 * @typedef {Object} ProcessWarning
 * @property {function} createWarning - Creates a warning item.
 * @property {function} createDeprecation - Creates a deprecation warning item.
 */

/**
 * Creates a deprecation warning item.
 * @function
 * @memberof processWarning
 * @param {string} code - The code associated with the warning.
 * @param {string} message - The warning message.
 * @param {ProcessWarningOptions} [opts={}] - Options for creating the warning.
 * @returns {WarningItem} The created deprecation warning item.
 */
function createDeprecation (code, message, opts = {}) {
  return createWarning('DeprecationWarning', code, message, opts)
}

/**
 * Creates a warning item.
 * @function
 * @memberof processWarning
 * @param {string} name - The name of the warning.
 * @param {string} code - The code associated with the warning.
 * @param {string} message - The warning message.
 * @param {ProcessWarningOptions} [opts={}] - Options for creating the warning.
 * @returns {WarningItem} The created warning item.
 * @throws {Error} Throws an error if name, code, or message is empty, or if opts.unlimited is not a boolean.
 */
function createWarning (name, code, message, { unlimited = false } = {}) {
  if (!name) throw new Error('Warning name must not be empty')
  if (!code) throw new Error('Warning code must not be empty')
  if (!message) throw new Error('Warning message must not be empty')
  if (typeof unlimited !== 'boolean') throw new Error('Warning opts.unlimited must be a boolean')

  code = code.toUpperCase()

  return new WarningItem(name, code, message, unlimited)
}

/**
 * Represents a warning item with details.
 * @class
 * @memberof processWarning
 * @param {string} name - The name of the warning.
 * @param {string} code - The code associated with the warning.
 * @param {string} message - The warning message.
 * @param {boolean} unlimited - If true, allows unlimited emissions of the warning.
 */
class WarningItem {
  constructor (name, code, message, unlimited) {
    this.name = name
    this.code = code
    this.message = message
    this.unlimited = unlimited
    this.emitted = false
  }

  /**
   * Emits the warning.
   * @param {*} [a] Possible message interpolation value.
   * @param {*} [b] Possible message interpolation value.
   * @param {*} [c] Possible message interpolation value.
   */
  emit (a, b, c) {
    if (this.emitted === true && this.unlimited === false) {
      return
    }
    this.emitted = true

    process.emitWarning(this.format(a, b, c), this.name, this.code)
  }

  /**
   * Formats the warning message.
   * @param {*} [a] Possible message interpolation value.
   * @param {*} [b] Possible message interpolation value.
   * @param {*} [c] Possible message interpolation value.
   * @returns {string} The formatted warning message.
   */
  format (a, b, c) {
    let formatted
    if (a && b && c) {
      formatted = format(this.message, a, b, c)
    } else if (a && b) {
      formatted = format(this.message, a, b)
    } else if (a) {
      formatted = format(this.message, a)
    } else {
      formatted = this.message
    }
    return formatted
  }
}

/**
 * Module exports containing the process warning functionality.
 * @namespace
 * @property {function} createWarning - Creates a warning item.
 * @property {function} createDeprecation - Creates a deprecation warning item.
 * @property {ProcessWarning} processWarning - Represents the process warning functionality.
 */
const out = { createWarning, createDeprecation }
module.exports = out
module.exports.default = out
module.exports.processWarning = out
