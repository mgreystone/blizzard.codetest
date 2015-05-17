'use strict'

import React from 'react'

import TaggedQuestionsList from '../components/tagged-questions-list'

const TaggedQuestionsRoute = React.createClass({
  displayName: 'TaggedQuestionsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let tag = this.context.router.getCurrentParams().tag

    return (
      <TaggedQuestionsList tag={tag} />
    )
  }
})

export default TaggedQuestionsRoute
