'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsList from './questions-list'

const UserQuestions = React.createClass({
  displayName: 'UserQuestions',

  propTypes: {
    userId: React.PropTypes.number,
    page: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      userId: null,
      page: 1
    }
  },

  componentWillMount () {
    questionsActions.fetchByUserId(this.props.userId, {
      page: this.props.page || 1
    })
  },

  componentWillReceiveProps (nextProps) {
    questionsActions.fetchByUserId(nextProps.userId, {
      page: nextProps.page || 1
    })
  },

  render () {
    return (
      <QuestionsList />
    )
  }
})

export default UserQuestions
