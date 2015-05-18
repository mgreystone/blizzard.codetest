'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsList from './questions-list'

const UserQuestions = React.createClass({
  displayName: 'UserQuestions',

  propTypes: {
    userId: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      userId: null
    }
  },

  componentWillMount () {
    questionsActions.fetchByUserId(this.props.userId)
  },

  render () {
    return (
      <QuestionsList />
    )
  }
})

export default UserQuestions
