'use strict'

import './answers-list.scss'

import React from 'react'
import Reflux from 'reflux'

import answersStore from '../stores/answers'

import AnswersListItem from './answers-list-item'
import Loader from './loader'

const AnswersList = React.createClass({
  displayName: 'AnswersList',

  mixins: [
    Reflux.connect(answersStore, 'answers')
  ],

  render () {
    let answers = this.state.answers
    let items = answers ? answers.getIn(['answers', 'items']) : null

    return (
      <div className='answers-list'>
        <Loader loaded={!answers.get('isLoading')}>
          {!items ? null : items.map(item => {
            return (
              <AnswersListItem key={item.get('answer_id')} answer={item} />
            )
          })}
        </Loader>
      </div>
    )
  }
})

export default AnswersList
