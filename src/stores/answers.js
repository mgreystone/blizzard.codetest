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

  onUpvoteCompleted (data) {
    this.mergeUpdatedAnswer(data)
  },

  onUpvoteFailed () {
    // TODO
  },

  onDownvoteCompleted (data) {
    this.mergeUpdatedAnswer(data)
  },

  onDownvoteFailed () {
    // TODO
  },

  mergeUpdatedAnswer (data) {
    let newAnswer = data.items[0]
    let id = newAnswer.answer_id
    if (this.answers) {
      let items = this.answers.get('items')
      if (items) {
        let i = items.findIndex(item => item.get('answer_id') === id)
        if (i >= 0) {
          this.answers = this.answers.mergeIn(['items', i], newAnswer)
          this.refreshState()
        }
      }
    }
  },

  getState () {
    return new Map({
      isLoading: this.isLoading,
      answers: this.answers
    })
  }
})

export default store
