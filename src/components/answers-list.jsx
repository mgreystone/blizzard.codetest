'use strict'

import './answers-list.scss'

import React from 'react'
import Reflux from 'reflux'
import { State, Link } from 'react-router'

import answersStore from '../stores/answers'

import AnswersListItem from './answers-list-item'
import Loader from './loader'
import Icon from './icon'

const AnswersList = React.createClass({
  displayName: 'AnswersList',

  mixins: [
    State,
    Reflux.connect(answersStore, 'answers')
  ],

  render () {
    let answers = this.state.answers
    let items = answers ? answers.getIn(['answers', 'items']) : null
    let hasMore = answers ? answers.getIn(['answers', 'has_more']) : false
    let page = answers.get('page')

    let currentPath = this.getPathname()
    let currentQuery = this.getQuery()

    return (
      <div className='answers-list'>
        <Loader loaded={!answers.get('isLoading')}>
          {!items ? null : items.map(item => {
            return (
              <AnswersListItem key={item.get('answer_id')} answer={item} />
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

export default AnswersList
