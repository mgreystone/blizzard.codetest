'use strict'

import './questions-list.scss'

import React from 'react'
import Reflux from 'reflux'

import questionsStore from '../stores/questions'

import QuestionsListItem from './questions-list-item'
import Loader from './loader'

const QuestionsList = React.createClass({
  displayName: 'QuestionsList',

  mixins: [
    Reflux.connect(questionsStore, 'questions')
  ],

  render () {
    let questions = this.state.questions
    let items = questions ? questions.getIn(['data', 'items']) : null

    return (
      <div className='questions-list'>
        <Loader loaded={!this.state.questions.get('isLoading')}>
            {!items ? null : items.map(item => {
              return (
                <QuestionsListItem key={item.get('question_id')} question={item} />
              )
            })}
        </Loader>
      </div>
    )
  }
})

export default QuestionsList
