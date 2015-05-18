'use strict'

import Reflux from 'reflux'
import { default as Immutable, Map } from 'immutable'

import base from './base'
import actions from '../actions/users'

const store = Reflux.createStore({
  listenables: actions,

  mixins: [
    base
  ],

  init () {
    this.isLoading = false
    this.users = null
  },

  fetch () {
    this.isLoading = true
    this.refreshState()
  },

  fetchCompleted (data) {
    this.isLoading = false
    this.users = Immutable.fromJS(data)
    this.refreshState()
  },

  fetchFailed () {
    // TODO
    this.isLoading = false
  },

  getState () {
    return new Map({
      isLoading: this.isLoading,
      users: this.users
    })
  }
})

export default store
