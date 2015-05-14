'use strict'

import React from 'react'
import Reflux from 'reflux'

import questionsStore from '../stores/questions'
import questionsActions from '../actions/questions'

import QuestionsSearchForm from './questions-search-form'
import QuestionsListItem from './questions-list-item'

const QuestionsList = React.createClass({
  displayName: 'QuestionsList',

  mixins: [
    Reflux.connect(questionsStore, 'questions')
  ],

  propTypes: {
    query: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      query: null
    }
  },

  componentWillMount () {
    questionsActions.fetch({
      query: this.props.query
    })
  },

  componentWillReceiveProps (nextProps) {
    questionsActions.fetch({
      query: nextProps.query
    })
  },

  render () {
    let questions = this.state.questions
    let items = questions ? questions.getIn(['data', 'items']) : null

    return (
      <div className='questions-list'>
        <QuestionsSearchForm />

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
