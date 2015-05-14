'use strict'

import React from 'react'

import QuestionsList from '../components/questions-list'

const QuestionsRoute = React.createClass({
  displayName: 'QuestionsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let sort = this.context.router.getCurrentQuery().s

    return (
      <QuestionsList sort={sort} />
    )
  }
})

export default QuestionsRoute
