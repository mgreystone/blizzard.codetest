'use strict'

import './questions-search-results-list.scss'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsSearchForm from './questions-search-form'
import QuestionsTabPanel from './questions-tab-panel'
import QuestionsTab from './questions-tab'
import QuestionsList from './questions-list'
import DocumentTitle from './document-title'

const QuestionsResultsList = React.createClass({
  displayName: 'QuestionsResultsList',

  propTypes: {
    query: React.PropTypes.string.isRequired,
    sort: React.PropTypes.string,
    page: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      sort: 'relevance',
      page: 1
    }
  },

  componentWillMount () {
    questionsActions.search({
      query: this.props.query,
      sort: this.props.sort,
      page: this.props.page || null
    })
  },

  componentWillReceiveProps (props) {
    questionsActions.search({
      query: props.query,
      sort: props.sort,
      page: props.page || null
    })
  },

  render () {
    return (
      <DocumentTitle title='Search'>
        <div className='questions-results-list'>
          <h1 className='page-title'>Search</h1>

          <QuestionsSearchForm showButton />

          <QuestionsTabPanel>
            <QuestionsTab value='relevance' label='Relevance' />
            <QuestionsTab value='activity' label='Active' />
            <QuestionsTab value='creation' label='Newest' />
            <QuestionsTab value='votes' label='Votes' />
          </QuestionsTabPanel>

          <QuestionsList />
        </div>
      </DocumentTitle>
    )
  }
})

export default QuestionsResultsList
