'use strict'

import './questions-results-list.scss'

import React from 'react'
import Reflux from 'reflux'

import questionsStore from '../stores/questions'
import questionsActions from '../actions/questions'

import QuestionsSearchForm from './questions-search-form'
import QuestionsListItem from './questions-list-item'
import QuestionsTabPanel from './questions-tab-panel'
import QuestionsTab from './questions-tab'

const QuestionsResultsList = React.createClass({
  displayName: 'QuestionsResultsList',

  mixins: [
    Reflux.connect(questionsStore, 'questions')
  ],

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
    let questions = this.state.questions
    let items = questions ? questions.getIn(['data', 'items']) : null

    return (
      <div className='questions-results-list'>
        <QuestionsSearchForm />

        <QuestionsTabPanel>
          <QuestionsTab value='relevance' label='Relevance' />
          <QuestionsTab value='activity' label='Active' />
          <QuestionsTab value='creation' label='Newest' />
          <QuestionsTab value='votes' label='Votes' />
        </QuestionsTabPanel>

        <div className='list-container'>
          {!items ? null : items.map(item => {
            return (
              <QuestionsListItem key={item.get('question_id')} question={item} />
            )
          })}
        </div>
      </div>
    )
  }
})

export default QuestionsResultsList
