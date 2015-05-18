'use strict'

import Reflux from 'reflux'
import { Map } from 'immutable'

import base from './base'

import actions from '../actions/authentication'

const LS_KEY_ACCESS_TOKEN = 'authentication.accessToken'
const LS_KEY_ACCOUNT_ID = 'authentication.accountId'

const store = Reflux.createStore({
  listenables: actions,

  mixins: [
    base
  ],

  onAuthenticateCompleted (data) {
    localStorage.setItem(LS_KEY_ACCESS_TOKEN, data.accessToken)
    localStorage.setItem(LS_KEY_ACCOUNT_ID, data.networkUsers[0].account_id)
    this.refreshState()
  },

  onAuthenticateFailed () {
    // TODO
  },

  onRevoke () {
    localStorage.removeItem(LS_KEY_ACCESS_TOKEN)
    localStorage.removeItem(LS_KEY_ACCOUNT_ID)
    this.refreshState()
  },

  getState () {
    let accessToken = localStorage.getItem(LS_KEY_ACCESS_TOKEN)
    let accountId = localStorage.getItem(LS_KEY_ACCOUNT_ID)

    return new Map({
      isAuthenticated: !!accessToken,
      accessToken,
      accountId
    })
  }
})

export default store
