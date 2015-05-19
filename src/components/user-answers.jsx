'use strict'

import React from 'react'

import answersActions from '../actions/answers'

import AnswersList from './answers-list'

const UserAnswers = React.createClass({
  displayName: 'UserAnswers',

  propTypes: {
    userId: React.PropTypes.number,
    page: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      userId: null,
      page: null
    }
  },

  componentWillMount () {
    answersActions.fetchByUserId(this.props.userId, {
      page: this.props.page || 1
    })
  },

  componentWillReceiveProps (nextProps) {
    answersActions.fetchByUserId(nextProps.userId, {
      page: nextProps.page || 1
    })
  },

  render () {
    return (
      <AnswersList />
    )
  }
})

export default UserAnswers
