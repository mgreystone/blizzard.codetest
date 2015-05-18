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

  onFetch () {
    this.isLoading = true
    this.refreshState()
  },

  onFetchCompleted (data) {
    this.isLoading = false
    this.users = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchFailed () {
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
