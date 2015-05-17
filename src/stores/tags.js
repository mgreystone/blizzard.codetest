'use strict'

import Reflux from 'reflux'
import { default as Immutable, Map } from 'immutable'

import base from './base'
import actions from '../actions/tags'

const store = Reflux.createStore({
  mixins: [base],
  listenables: actions,

  init () {
    this.isLoading = false
    this.tags = null
    this.wikis = null
  },

  onFetch () {
    this.isLoading = true
    this.refreshState()
  },

  onFetchCompleted (data) {
    this.isLoading = false
    this.tags = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchFailed () {
    // TODO
    this.isLoading = false
  },

  onFetchWiki () {
    this.isLoading = true
    this.refreshState()
  },

  onFetchWikiCompleted (data) {
    this.isLoading = false
    this.wikis = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchWikiFailed () {
    this.onFetchFailed()
  },

  getState () {
    return new Map({
      isLoading: this.isLoading,
      tags: this.tags,
      wikis: this.wikis
    })
  }
})

export default store
