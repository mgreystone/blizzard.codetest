'use strict'

import Reflux from 'reflux'
import { Map } from 'immutable'

import base from './base'
import actions from '../actions/authentication'
import { isAuthenticated } from '../services/stack-exchange'

const store = Reflux.createStore({
  listenables: actions,

  mixins: [
    base
  ],

  init () {
    this.isAuthenticated = isAuthenticated()
  },

  onAuthenticateCompleted (data) {
    this.isAuthenticated = true
    this.refreshState()
  },

  onAuthenticateFailed () {
    // TODO
  },

  onRevoke () {
    this.isAuthenticated = false
    this.refreshState()
  },

  getState () {
    return new Map({
      isAuthenticated: this.isAuthenticated
    })
  }
})

export default store
