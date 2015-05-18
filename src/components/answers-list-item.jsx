'use strict'

import './answers-list-item.scss'

import React from 'react'
import { Link } from 'react-router'

import { ImmutableIterable } from '../prop-types'

const AnswersListItem = React.createClass({
  displayName: 'AnswersListItem',

  propTypes: {
    answer: ImmutableIterable.isRequired
  },

  render () {
    let item = this.props.answer

    let answerId = item.get('answer_id')
    let questionId = item.get('question_id')
    let title = item.get('title')
    let votes = item.get('score')

    return (
      <div className='answers-list-item'>
        <div className='score'>
          {votes}
        </div>

        <div className='title'>
          <Link to='answer-details' params={{ questionId, answerId }}>
            {title}
          </Link>
        </div>
      </div>
    )
  }
})

export default AnswersListItem
