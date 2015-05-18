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
    this.sort = null
    this.isLoading = false
  },

  onFetch (params) {
    let options = Object.assign({}, params)
    this.isLoading = true
    this.query = null
    this.sort = options.sort
    this.refreshState()
  },

  onFetchCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchFailed () {
    // TODO
    this.isLoading = false
    this.refreshState()
  },

  onSearch (params) {
    let options = Object.assign({}, params)
    this.isLoading = true
    this.query = options.query
    this.sort = options.sort
    this.refreshState()
  },

  onSearchCompleted (data) {
    this.onFetchCompleted(data)
  },

  onSearchFailed () {
    this.onFetchFailed()
  },

  onFetchById (options) {
    this.isLoading = true
    this.query = null
    this.sort = null
    this.refreshState()
  },

  onFetchByIdCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchByIdFailed () {
    this.onFetchFailed()
  },

  onFetchByUserId () {
    this.isLoading = true
    this.query = null
    this.sort = null
    this.refreshState()
  },

  onFetchByUserIdCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchByUserIdFailed () {
    this.onFetchFailed()
  },

  onFetchFavorites () {
    this.isLoading = true
    this.query = null
    this.sort = null
    this.refreshState()
  },

  onFetchFavoritesCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  onFetchFavoritesFailed () {
    this.onFetchFailed()
  },

  getState () {
    return new Map({
      data: this.questions,
      query: this.query,
      sort: this.sort,
      isLoading: this.isLoading
    })
  }
})

export default store
