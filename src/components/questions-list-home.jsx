'use strict'

import React from 'react'

import questionsActions from '../actions/questions'

import QuestionsTabPanel from './questions-tab-panel'
import QuestionsTab from './questions-tab'
import QuestionsList from './questions-list'
import DocumentTitle from './document-title'

const QuestionsListHome = React.createClass({
  displayName: 'QuestionsListHome',

  propTypes: {
    sort: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      sort: 'activity'
    }
  },

  componentWillMount () {
    questionsActions.fetch({
      sort: this.props.sort
    })
  },

  componentWillReceiveProps (props) {
    questionsActions.fetch({
      sort: props.sort
    })
  },

  render () {
    return (
      <DocumentTitle title='Questions'>
        <div className='questions-list-home'>
          <h1 className='page-title'>All Questions</h1>

          <QuestionsTabPanel>
            <QuestionsTab value='activity' label='Active' />
            <QuestionsTab value='creation' label='Newest' />
            <QuestionsTab value='votes' label='Most Votes' />
            <QuestionsTab value='hot' label='Hot' />
            <QuestionsTab value='week' label='Week' />
            <QuestionsTab value='month' label='Month' />
          </QuestionsTabPanel>

          <QuestionsList />
        </div>
      </DocumentTitle>
    )
  }
})

export default QuestionsListHome
