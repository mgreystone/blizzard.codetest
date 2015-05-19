'use strict'

import './question-details.scss'

import React from 'react'
import Reflux from 'reflux'
import { Iterable } from 'immutable'
import classnames from 'classnames'

import questionsStore from '../stores/questions'
import questionsActions from '../actions/questions'

import answerActions from '../actions/answers'

import authenticationStore from '../stores/authentication'

import Markdown from './markdown'
import Icon from './icon'
import Loader from './loader'

const QuestionDetails = React.createClass({
  displayName: 'QuestionDetails',

  mixins: [
    Reflux.connect(questionsStore, 'questions'),
    Reflux.connect(authenticationStore, 'authentication')
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

  onClickUpvoteQuestion () {
    questionsActions.upvote(this.props.questionId)
  },

  onClickDownvoteQuestion () {
    questionsActions.downvote(this.props.questionId)
  },

  onClickFavoriteQuestion () {
    questionsActions.favorite(this.props.questionId)
  },

  onClickUnfavoriteQuestion () {
    questionsActions.unfavorite(this.props.questionId)
  },

  onClickUpvoteAnswer (answerId) {
    answerActions.upvote(answerId)
  },

  onClickDownvoteAnswer (answerId) {
    answerActions.downvote(answerId)
  },

  render () {
    let isAuthenticated = this.state.authentication.get('isAuthenticated')
    let question = this.state.questions.getIn(['data', 'items', 0])
    let title = question && question.get('title')
    let body = question && question.get('body_markdown')
    let score = question && question.get('score') || 0
    let favorited = question && question.get('favorited')
    let answers = question && question.get('answers') || new Iterable()
    let numAnswers = answers.size

    return (
      <div className='question-details'>
        <Loader loaded={!this.state.questions.get('isLoading')}>
          <h1 className='page-title'>{title}</h1>

          <div className='question'>
            <div className='controls'>
              {!isAuthenticated ? null :
                <div className='vote'>
                  <Icon glyph='caret-up' onClick={this.onClickUpvoteQuestion} />
                </div>
              }

              <div className='score'>{score}</div>

              {!isAuthenticated ? null :
                <div>
                  <div className='vote'>
                    <Icon glyph='caret-down' onClick={this.onClickDownvoteQuestion} />
                  </div>

                  <div className={classnames({ favorite: true, 'is-favorite': favorited })}>
                    {favorited ?
                      <Icon glyph='star' onClick={this.onClickUnfavoriteQuestion} /> :
                      <Icon glyph='star-o' onClick={this.onClickFavoriteQuestion} />
                    }
                  </div>
                </div>
              }
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
                  {!isAuthenticated ? null :
                    <div className='vote'>
                      <Icon glyph='caret-up' onClick={this.onClickUpvoteAnswer.bind(this, id)} />
                    </div>
                  }

                  <div className='score'>{score}</div>

                  {!isAuthenticated ? null :
                    <div className='vote'>
                      <Icon glyph='caret-down' onClick={this.onClickDownvoteAnswer.bind(this, id)} />
                    </div>
                  }

                  {isAccepted ? <div className='check'><Icon glyph='check' /></div> : null}
                </div>

                <div className='content'>
                  <Markdown value={body} />
                </div>
              </div>
            )
          })}
        </Loader>
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
