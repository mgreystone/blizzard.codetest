'use strict'

import React from 'react'

import QuestionsList from '../components/questions-list'

const QuestionsRoute = React.createClass({
  displayName: 'QuestionsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let query = this.context.router.getCurrentQuery().q

    return (
      <QuestionsList query={query} />
    )
  }
})

export default QuestionsRoute
