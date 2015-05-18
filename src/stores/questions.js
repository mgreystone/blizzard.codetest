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

  fetch (params) {
    let options = Object.assign({}, params)
    this.isLoading = true
    this.query = null
    this.sort = options.sort
    this.refreshState()
  },

  fetchCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  fetchFailed () {
    // TODO
    this.isLoading = false
    this.refreshState()
  },

  search (params) {
    let options = Object.assign({}, params)
    this.isLoading = true
    this.query = options.query
    this.sort = options.sort
    this.refreshState()
  },

  searchCompleted (data) {
    this.fetchCompleted(data)
  },

  searchFailed () {
    this.fetchFailed()
  },

  fetchById (options) {
    this.isLoading = true
    this.query = null
    this.sort = null
    this.refreshState()
  },

  fetchByIdCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  fetchByIdFailed () {
    this.fetchFailed()
  },

  fetchByUserId () {
    this.isLoading = true
    this.query = null
    this.sort = null
    this.refreshState()
  },

  fetchByUserIdCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  fetchByUserIdFailed () {
    this.fetchFailed()
  },

  fetchFavorites () {
    this.isLoading = true
    this.query = null
    this.sort = null
    this.refreshState()
  },

  fetchFavoritesCompleted (data) {
    this.isLoading = false
    this.questions = Immutable.fromJS(data)
    this.refreshState()
  },

  fetchFavoritesFailed () {
    this.fetchFailed()
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
