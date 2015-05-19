'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsList from './questions-list'

const UserFavorites = React.createClass({
  displayName: 'UserFavorites',

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
    questionsActions.fetchFavorites(this.props.userId, {
      page: this.props.page || 1
    })
  },

  componentWillReceiveProps (nextProps) {
    questionsActions.fetchFavorites(nextProps.userId, {
      page: nextProps.page || 1
    })
  },

  render () {
    return (
      <QuestionsList />
    )
  }
})

export default UserFavorites
