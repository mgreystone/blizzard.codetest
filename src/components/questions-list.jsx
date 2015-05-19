'use strict'

import './questions-list.scss'

import React from 'react'
import Reflux from 'reflux'
import { State, Link } from 'react-router'

import questionsStore from '../stores/questions'

import QuestionsListItem from './questions-list-item'
import Loader from './loader'
import Icon from './icon'

const QuestionsList = React.createClass({
  displayName: 'QuestionsList',

  mixins: [
    State,
    Reflux.connect(questionsStore, 'questions')
  ],

  render () {
    let questions = this.state.questions
    let items = questions ? questions.getIn(['data', 'items']) : null
    let hasMore = questions ? questions.getIn(['data', 'has_more']) : false
    let page = questions.get('page')

    let currentPath = this.getPathname()
    let currentQuery = this.getQuery()

    return (
      <div className='questions-list'>
        <Loader loaded={!this.state.questions.get('isLoading')}>
          {!items ? null : items.map(item => {
            return (
              <QuestionsListItem key={item.get('question_id')} question={item} />
            )
          })}

          {page <= 1 ? null :
            <Link className='prev' to={currentPath} query={Object.assign({}, currentQuery, { p: page - 1 })}>
              <Icon glyph='caret-left' /> Previous Page
            </Link>
          }

          {!hasMore ? null :
            <Link className='next' to={currentPath} query={Object.assign({}, currentQuery, { p: page + 1 })}>
              Next Page <Icon glyph='caret-right' />
            </Link>
          }
        </Loader>
      </div>
    )
  }
})

export default QuestionsList
