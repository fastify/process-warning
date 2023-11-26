'use strict'

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
class STATE extends Boolean {
  static UNLIMITED_INITIAL = 0
  static UNLIMITED_ONGOING = -1
  static LIMITED_INITIAL = 1
  static LIMITED_FINAL = 2

  #code = 0

  constructor (value) {
    super()
    this.#code = value ?? 0
  }

  get code () {
    return this.#code
  }

  set code (val) {
    this.#code = val
  }

  isEmitted () {
    return this.valueOf()
  }

  valueOf () {
    switch (this.#code) {
      case STATE.UNLIMITED_INITIAL: return false
      case STATE.UNLIMITED_ONGOING: return true
      case STATE.LIMITED_INITIAL: return false
      case STATE.LIMITED_FINAL: return true
    }
  }
}

module.exports = STATE
