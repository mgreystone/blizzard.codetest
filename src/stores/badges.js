'use strict'

import Reflux from 'reflux'
import { default as Immutable, Map } from 'immutable'

import base from './base'
import actions from '../actions/badges'

const store = Reflux.createStore({
  listenables: actions,
  mixins: [base],

  init () {
    this.isLoading = false
    this.badges = null
  },

  onFetchByUserId () {
    this.isLoading = true
    this.refreshState()
  },

  onFetchByUserIdCompleted (data) {
    this.isLoading = false
    this.badges = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchByUserIdFailed () {
    this.isLoading = false
    this.refreshState()
    // TODO
  },

  getState () {
    return new Map({
      isLoading: this.isLoading,
      badges: this.badges
    })
  }
})

export default store
