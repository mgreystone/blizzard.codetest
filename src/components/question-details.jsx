'use strict'

import './question-details.scss'

import React from 'react'
import Reflux from 'reflux'
import { Iterable } from 'immutable'

import questionsStore from '../stores/questions'
import questionsActions from '../actions/questions'

import Markdown from './markdown'
import Icon from './icon'

const QuestionDetails = React.createClass({
  displayName: 'QuestionDetails',

  mixins: [
    Reflux.connect(questionsStore, 'questions')
  ],

  propTypes: {
    questionId: React.PropTypes.number.isRequired,
    answerId: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      answerId: null
    }
  },

  componentWillMount () {
    this.shouldScroll = !!this.props.answerId
    questionsActions.fetchById(this.props.questionId, { withDetails: true })
  },

  componentWillReceiveProps (nextProps) {
    this.shouldScroll = !!nextProps.answerId && nextProps.answerId !== this.props.answerId
  },

  componentDidUpdate () {
    if (this.shouldScroll) {
      let ref = this.refs[`answer_${this.props.answerId}`]
      if (ref) {
        React.findDOMNode(ref).scrollIntoView()
        this.shouldScroll = false
      }
    }
  },

  render () {
    let question = this.state.questions.getIn(['data', 'items', 0])
    let title = question && question.get('title')
    let body = question && question.get('body_markdown')
    let score = question && question.get('score') || 0
    let answers = question && question.get('answers') || new Iterable()
    let numAnswers = answers.size

    return (
      <div className='question-details'>
        <h1 className='page-title'>{title}</h1>

        <div className='question'>
          <div className='controls'>
            <div className='score'>{score}</div>
          </div>

          <div className='content'>
            <Markdown value={body} />
          </div>
        </div>

        <h2>{numAnswers} Answer{numAnswers === 1 ? '' : 's'}</h2>

        {answers.sort(answerSorter).map(item => {
          let id = item.get('answer_id')
          let body = item.get('body_markdown')
          let score = item.get('score')
          let isAccepted = item.get('is_accepted')

          return (
            <div key={id} ref={`answer_${id}`} className='answer'>
              <div className='controls'>
                <div className='score'>{score}</div>
                {isAccepted ? <div className='check'><Icon glyph='check' /></div> : null}
              </div>

              <div className='content'>
                <Markdown value={body} />
              </div>
            </div>
          )
        })}
      </div>
    )
  }
})

function answerSorter (a, b) {
  if (a.get('is_accepted')) {
    return -1
  }

  if (b.get('is_accepted')) {
    return 1
  }

  return b.get('score') - a.get('score')
}

export default QuestionDetails