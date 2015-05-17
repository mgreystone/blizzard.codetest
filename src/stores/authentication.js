'use strict'

import Reflux from 'reflux'
import { Map } from 'immutable'

import base from './base'

import actions from '../actions/authentication'

const store = Reflux.createStore({
  listenables: actions,

  mixins: [
    base
  ],

  init () {
    this.accessToken = null
    this.accountId = null
  },

  onAuthenticateCompleted (data) {
    this.accessToken = data.accessToken
    this.accountId = data.networkUsers[0].account_id
    this.refreshState()
  },

  onAuthenticateFailed () {
    // TODO
  },

  onRevoke () {
    this.accessToken = null
    this.accountId = null
    this.refreshState()
  },

  getState () {
    return new Map({
      isAuthenticated: this.accessToken !== null,
      accessToken: this.accessToken,
      accoundId: this.accountId
    })
  }
})

export default store
