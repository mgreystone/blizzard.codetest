'use strict'

import React from 'react'
import Reflux from 'reflux'

import questionsStore from '../stores/questions'
import questionsActions from '../actions/questions'

import QuestionsSearchForm from './questions-search-form'
import QuestionsListItem from './questions-list-item'
import QuestionsTabPanel from './questions-tab-panel'
import QuestionsTab from './questions-tab'

const QuestionsList = React.createClass({
  displayName: 'QuestionsList',

  mixins: [
    Reflux.connect(questionsStore, 'questions')
  ],

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
    let questions = this.state.questions
    let items = questions ? questions.getIn(['data', 'items']) : null

    return (
      <div className='questions-list'>
        <QuestionsSearchForm />

        <QuestionsTabPanel>
          <QuestionsTab value='activity' label='Active' />
          <QuestionsTab value='creation' label='Newest' />
          <QuestionsTab value='votes' label='Most Votes' />
          <QuestionsTab value='hot' label='Hot' />
          <QuestionsTab value='week' label='Week' />
          <QuestionsTab value='month' label='Month' />
        </QuestionsTabPanel>

        {!items ? null : items.map(item => {
          return (
            <QuestionsListItem key={item.get('question_id')} question={item} />
          )
        })}
      </div>
    )
  }
})

export default QuestionsList
