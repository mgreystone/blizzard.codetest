'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsList from './questions-list'
import DocumentTitle from './document-title'

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
      <DocumentTitle title={this.props.tag}>
        <div className='tagged-questions-list'>
          <h1 className='page-title'>Tagged Questions</h1>
          <QuestionsList />
        </div>
      </DocumentTitle>
    )
  }
})

export default TaggedQuestionsList
