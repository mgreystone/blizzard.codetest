'use strict'

const mixin = {
  getInitialState () {
    return this.getState()
  },

  refreshState () {
    this.trigger(this.getState())
  }
}

export default mixin
