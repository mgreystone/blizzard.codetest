'use strict'

import React from 'react'
import Reflux from 'reflux'

import questionsStore from '../stores/questions'
import questionsActions from '../actions/questions'

import authenticationStore from '../stores/authentication'

import QuestionsList from './questions-list'

const UserQuestions = React.createClass({
  displayName: 'UserQuestions',

  mixins: [
    Reflux.connect(questionsStore, 'questions'),
    Reflux.connect(authenticationStore, 'authentication')
  ],

  propTypes: {
    userId: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      userId: null
    }
  },

  componentWillMount () {
    questionsActions.fetchByUserId(this.props.userId, {
      accessToken: this.state.authentication.get('accessToken')
    })
  },

  render () {
    return (
      <QuestionsList />
    )
  }
})

export default UserQuestions
