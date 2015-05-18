'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsList from './questions-list'

const UserFavorites = React.createClass({
  displayName: 'UserFavorites',

  propTypes: {
    userId: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      userId: null
    }
  },

  componentWillMount () {
    questionsActions.fetchFavorites(this.props.userId)
  },

  render () {
    return (
      <QuestionsList />
    )
  }
})

export default UserFavorites
