'use strict'

import Reflux from 'reflux'
import { default as Immutable, Map } from 'immutable'

import base from './base'
import actions from '../actions/answers'

const store = Reflux.createStore({
  listenables: actions,
  mixins: [base],

  init () {
    this.isLoading = false
    this.answers = null
  },

  onFetchByUserId () {
    this.isLoading = true
    this.refreshState()
  },

  onFetchByUserIdCompleted (data) {
    this.isLoading = false
    this.answers = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchByUserIdFailed () {
    // TODO
    this.isLoading = false
  },

  getState () {
    return new Map({
      isLoading: this.isLoading,
      answers: this.answers
    })
  }
})

export default store
