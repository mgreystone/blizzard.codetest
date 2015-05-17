'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsList from './questions-list'

const TaggedQuestionsList = React.createClass({
  displayName: 'TaggedQuestionsList',

  propTypes: {
    tag: React.PropTypes.string.isRequired
  },

  componentWillMount () {
    questionsActions.fetch({ tag: this.props.tag })
  },

  render () {
    return (
      <div className='tagged-questions-list'>
        <h1 className='page-title'>Tagged Questions</h1>
        <QuestionsList />
      </div>
    )
  }
})

export default TaggedQuestionsList
