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
    let { questionId, answerId } = params

    return (
      <QuestionDetails questionId={questionId} answerId={answerId} />
    )
  }
})

export default QuestionDetailsRoute
