'use strict'

import Reflux from 'reflux'
import { default as Immutable, Map } from 'immutable'

import base from './base'

import actions from '../actions/questions'
import answerActions from '../actions/answers'

const store = Reflux.createStore({
  listenables: actions,

  mixins: [
    base
  ],

  init () {
    this.listenTo(answerActions.upvote.completed, this.onAnswerUpvoteCompleted)
    this.listenTo(answerActions.downvote.completed, this.onAnswerDownvoteCompleted)

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

  onUpvote (id) {
    // TODO
  },

  onUpvoteCompleted (data) {
    this.mergeUpdatedQuestion(data)
  },

  onUpvoteFailed () {
    // TODO
  },

  onDownvote (id) {
    // TODO
  },

  onDownvoteCompleted (data) {
    this.mergeUpdatedQuestion(data)
  },

  onDownvoteFailed () {
    // TODO
  },

  onFavorite (id) {
    this.updateQuestion(id, question => question.set('favorited', true))
  },

  onFavoriteCompleted (data) {
    this.mergeUpdatedQuestion(data)
  },

  onFavoriteFailed (data) {
    // TODO
  },

  onUnfavorite (id) {
    this.updateQuestion(id, question => question.set('favorited', false))
  },

  onUnfavoriteCompleted (data) {
    this.mergeUpdatedQuestion(data)
  },

  onUnfavoriteFailed (data) {
    // TODO
  },

  onAnswerUpvoteCompleted (data) {
    this.mergeUpdatedAnswer(data)
  },

  onAnswerDownvoteCompleted (data) {
    this.mergeUpdatedAnswer(data)
  },

  updateQuestion (id, fn) {
    if (this.questions) {
      let items = this.questions.get('items')
      if (items) {
        let i = items.findIndex(item => item.get('question_id') === id)
        if (i >= 0) {
          this.questions = this.questions.setIn(['items', i], fn(items.get(i)))
          this.refreshState()
        }
      }
    }
  },

  mergeUpdatedQuestion (data) {
    let newQuestion = data.items[0]
    this.updateQuestion(newQuestion.question_id, prevQuestion => prevQuestion.merge(newQuestion))
  },

  mergeUpdatedAnswer (data) {
    let newAnswer = data.items[0]
    let questionId = newAnswer.question_id
    let answerId = newAnswer.answer_id

    if (this.questions) {
      let items = this.questions.get('items')
      if (items) {
        let questionIndex = items.findIndex(item => item.get('question_id') === questionId)
        if (questionIndex >= 0) {
          let allAnswers = items.getIn([questionIndex, 'answers'])
          if (allAnswers) {
            let answerIndex = allAnswers.findIndex(item => item.get('answer_id') === answerId)
            if (answerIndex >= 0) {
              this.questions = this.questions.mergeIn(['items', questionIndex, 'answers', answerIndex], newAnswer)
              this.refreshState()
            }
          }
        }
      }
    }
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
