'use strict'

import React from 'react'

import QuestionsListHome from '../components/questions-list-home'

const QuestionsRoute = React.createClass({
  displayName: 'QuestionsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let currentQuery = this.context.router.getCurrentQuery()
    let sort = currentQuery.s
    let page = parseInt(currentQuery.p, 10)

    return (
      <QuestionsListHome sort={sort} page={page} />
    )
  }
})

export default QuestionsRoute
