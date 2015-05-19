'use strict'

import React from 'react'

import TagCloud from '../components/tag-cloud'

const TagsRoute = React.createClass({
  displayName: 'TagsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let page = parseInt(this.context.router.getCurrentQuery().p, 10)

    return (
      <TagCloud page={page} />
    )
  }
})

export default TagsRoute
