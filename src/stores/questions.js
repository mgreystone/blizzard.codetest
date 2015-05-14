'use strict'

import Reflux from 'reflux'
import { default as Immutable, Map } from 'immutable'

import base from './base'

import actions from '../actions/questions'

const store = Reflux.createStore({
  listenables: actions,

  mixins: [
    base
  ],

  init () {
    this.questions = null
    this.query = null
    this.isLoading = false
  },

  fetch (params) {
    let options = Object.assign({}, params)
    this.isLoading = true
    this.query = options.query
    this.refreshState()
  },

  fetchCompleted (data) {
    this.isLoading = false
    this.questions = data
    this.refreshState()
  },

  fetchFailed () {
    // TODO
    this.isLoading = false
    this.refreshState()
  },

  getState () {
    return new Map({
      data: Immutable.fromJS(this.questions),
      query: this.query,
      isLoading: this.isLoading
    })
  }
})

export default store
