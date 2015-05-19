'use strict'

import React from 'react'

import QuestionDetails from '../components/question-details'

const QuestionDetailsRoute = React.createClass({
  displayName: 'QuestionDetailsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let params = this.context.router.getCurrentParams()
    let questionId = parseInt(params.questionId, 10)
    let answerId = params.answerId ? parseInt(params.answerId, 10) : null

    return (
      <QuestionDetails questionId={questionId} answerId={answerId} />
    )
  }
})

export default QuestionDetailsRoute
