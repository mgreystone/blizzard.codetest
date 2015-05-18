'use strict'

import React from 'react'

import answersActions from '../actions/answers'

import AnswersList from './answers-list'

const UserAnswers = React.createClass({
  displayName: 'UserAnswers',

  propTypes: {
    userId: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      userId: null
    }
  },

  componentWillMount () {
    answersActions.fetchByUserId(this.props.userId)
  },

  render () {
    return (
      <AnswersList />
    )
  }
})

export default UserAnswers
