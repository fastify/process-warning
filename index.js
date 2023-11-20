'use strict'

const { format } = require('node:util')

/**
 * An object that provides methods for creating process warning, emitting them,
 * and inspecting/managing the emission state of warning.
 *
 * @typedef {object} ProcessWarningManager
 */

/**
 * @typedef {object} CreateOptions
 * @property {boolean} [unlimited=false] Indicates if the warning should be
 * emitted every time (`true`) or only the first time (`false`).
 */

/**
 * An error instance representing a process warning. This is what will be
 * emitted to listeners when the warning is emitted.
 *
 * @typedef {Error} ProcessWarning
 * @property {string} code
 * @property {string} name
 * @property {string} message
 */

/**
 * A function used to create new {@link ProcessWarning} instances.
 *
 * @callback ProcessWarningBuilder
 * @param {*} [param1] First possible string interpolation value.
 * @param {*} [param2] Second possible string interpolation value.
 * @param {*} [param3] Third possible string interpolation value.
 * @returns ProcessWarning
 */

/**
 * @typedef {number} STATE_CONSTANT
 */

/**
 * @private
 * @typdef {object} EMISSION_STATES
 * @property {STATE_CONSTANT} UNLIMITED_INITIAL Indicates that the warning
 * is to be issued an unlimited number of times but has not yet been
 * emitted.
 * @property {STATE_CONSTANT} UNLIMITED_ONGOING Indicates that the warning
 * is to be issued an unlimited number of times and has been emitted at least
 * once.
 * @property {STATE_CONSTANT} LIMITED_INITIAL Indicates that the warning
 * is to be issued only once but has not yet been emitted.
 * @property {STATE_CONSTANT} LIMITED_FINAL Indicates that the warning
 * is to be issued only once and has already been emitted.
 */
const STATES = {
  UNLIMITED_INITIAL: newBooleanState(0),
  UNLIMITED_ONGOING: newBooleanState(-1),
  LIMITED_INITIAL: newBooleanState(1),
  LIMITED_FINAL: newBooleanState(2)
}

/**
 * Factory that builds a new {@link ProcessWarningManager} and returns it.
 *
 * @returns ProcessWarningManager
 */
function processWarning () {
  const codes = Object.create(null)
  const emitted = new Map()

  /**
   * Builds a new {@link ProcessWarning} and adds it to the
   * {@link ProcessWarningManager} such that it can be emitted through the
   * {@link ProcessWarningManager#emit} method.
   *
   * @memberof! ProcessWarningManager
   * @instance
   *
   * @param {string} name Warning name, e.g. `'MyCustomWarning'`.
   * @param {string} code A unique code for the warning, e.g. `'WARN_001'`.
   * @param {string} message The body of the warning.
   * @param {CreateOptions} [options]
   * @returns {ProcessWarningBuilder}
   */
  function create (name, code, message, { unlimited = false } = {}) {
    if (!name) throw new Error('Warning name must not be empty')
    if (!code) throw new Error('Warning code must not be empty')
    if (!message) throw new Error('Warning message must not be empty')
    if (typeof unlimited !== 'boolean') throw new Error('Warning opts.unlimited must be a boolean')

    code = code.toUpperCase()

    if (codes[code] !== undefined) {
      throw new Error(`The code '${code}' already exist`)
    }

    function buildWarnOpts (a, b, c) {
      // more performant than spread (...) operator
      let formatted
      if (a && b && c) {
        formatted = format(message, a, b, c)
      } else if (a && b) {
        formatted = format(message, a, b)
      } else if (a) {
        formatted = format(message, a)
      } else {
        formatted = message
      }

      return {
        code,
        name,
        message: formatted
      }
    }

    emitted.set(code, unlimited ? STATES.UNLIMITED_INITIAL : STATES.LIMITED_INITIAL)
    codes[code] = buildWarnOpts

    return codes[code]
  }

  /**
   * A wrapper for {@link ProcessWarningManager#create} that builds a new
   * deprecation warning. This method is equivalent to passing
   * `name = 'DeprecationWarning'` to the create method.
   *
   * Deprecation warnings have extended support for the Node.js CLI options:
   * `--throw-deprecation`, `--no-deprecation`, and `--trace-deprecation`.
   *
   * @memberof! ProcessWarningManager
   * @instance
   *
   * @param {string} code
   * @param {string} message
   * @param {CreateOptions} opts
   * @returns {ProcessWarningBuilder}
   */
  function createDeprecation (code, message, opts = {}) {
    return create('DeprecationWarning', code, message, opts)
  }

  /**
   * Emits a registered warning associated with the given `code`. If the
   * warning message has interpolation strings present, up to the first three
   * of them can be supplied values with the optional interpolation value
   * parameters.
   *
   * If a warning is set to `unlimited: false`, and has already been emitted
   * once, invoking this method is a no-operation.
   *
   * @memberof! ProcessWarningManager
   * @instance
   *
   * @param {string} code The code for the error to emit, e.g. `'WARN_001'`.
   * This is the same code that was provided to {@link ProcessWarningManager#create}.
   * @param {*} [a] Possible message interpolation value.
   * @param {*} [b] Possible message interpolation value.
   * @param {*} [c] Possible message interpolation value.
   */
  function emit (code, a, b, c) {
    const state = emitted.get(code)
    if (state === STATES.LIMITED_FINAL) return
    if (codes[code] === undefined) throw new Error(`The code '${code}' does not exist`)
    emitted.set(
      code,
      state.stateCode <= STATES.UNLIMITED_INITIAL.stateCode ? STATES.UNLIMITED_ONGOING : STATES.LIMITED_FINAL
    )

    const warning = codes[code](a, b, c)
    process.emitWarning(warning.message, warning.name, warning.code)
  }

  return {
    create,
    createDeprecation,
    emit,
    emitted
  }
}

module.exports = processWarning
module.exports.default = processWarning
module.exports.processWarning = processWarning

function newBooleanState (code) {
  return Object.create(Boolean, { stateCode: { value: code } })
}
