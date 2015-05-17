'use strict'

import React from 'react'

import QuestionsListHome from '../components/questions-list-home'

const QuestionsRoute = React.createClass({
  displayName: 'QuestionsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let sort = this.context.router.getCurrentQuery().s

    return (
      <QuestionsListHome sort={sort} />
    )
  }
})

export default QuestionsRoute
