'use strict'

import './questions-list-item.scss'

import React from 'react'
import { Html5Entities } from 'html-entities'

import { ImmutableIterable } from '../prop-types'

import QuestionsListItemStat from './questions-list-item-stat'

const QuestionsListItem = React.createClass({
  displayName: 'QuestionsListItem',

  propTypes: {
    question: ImmutableIterable.isRequired
  },

  render () {
    const entities = new Html5Entities()

    let item = this.props.question

    let title = entities.decode(item.get('title'))
    let votes = item.get('score')
    let answers = item.get('answer_count')
    let views = item.get('view_count')

    return (
      <div className='questions-list-item'>
        <QuestionsListItemStat label='Votes' value={votes} />
        <QuestionsListItemStat label='Answers' value={answers} />
        <QuestionsListItemStat label='Views' value={views} />

        <div className='title-and-tags'>
          <div className='title'>
            {title}
          </div>
        </div>
      </div>
    )
  }
})

export default QuestionsListItem
