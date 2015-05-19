'use strict'

import React from 'react'

import UserQuestions from '../components/user-questions'

const MyQuestionsRoute = React.createClass({
  displayName: 'MyQuestionsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let page = parseInt(this.context.router.getCurrentQuery().p, 10)

    return (
      <UserQuestions page={page} />
    )
  }
})

export default MyQuestionsRoute
