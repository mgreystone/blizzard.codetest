'use strict'

import React from 'react'

import QuestionDetails from '../components/question-details'

const QuestionDetailsRoute = React.createClass({
  displayName: 'QuestionDetailsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let questionId = this.context.router.getCurrentParams().questionId

    return (
      <QuestionDetails questionId={questionId} />
    )
  }
})

export default QuestionDetailsRoute
