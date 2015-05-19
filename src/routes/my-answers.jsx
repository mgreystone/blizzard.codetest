'use strict'

import React from 'react'

import UserAnswers from '../components/user-answers'

const MyAnswersRoute = React.createClass({
  displayName: 'MyAnswersRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let page = parseInt(this.context.router.getCurrentQuery().p, 10)

    return (
      <UserAnswers page={page} />
    )
  }
})

export default MyAnswersRoute
