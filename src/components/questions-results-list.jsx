'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsSearchForm from './questions-search-form'
import QuestionsTabPanel from './questions-tab-panel'
import QuestionsTab from './questions-tab'
import QuestionsList from './questions-list'

const QuestionsResultsList = React.createClass({
  displayName: 'QuestionsResultsList',

  propTypes: {
    query: React.PropTypes.string.isRequired,
    sort: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      sort: 'relevance'
    }
  },

  componentWillMount () {
    questionsActions.search({
      query: this.props.query,
      sort: this.props.sort
    })
  },

  componentWillReceiveProps (props) {
    questionsActions.search({
      query: props.query,
      sort: props.sort
    })
  },

  render () {
    return (
      <div className='questions-results-list'>
        <h1 className='page-title'>Search</h1>

        <QuestionsSearchForm />

        <QuestionsTabPanel>
          <QuestionsTab value='relevance' label='Relevance' />
          <QuestionsTab value='activity' label='Active' />
          <QuestionsTab value='creation' label='Newest' />
          <QuestionsTab value='votes' label='Votes' />
        </QuestionsTabPanel>

        <QuestionsList />
      </div>
    )
  }
})

export default QuestionsResultsList