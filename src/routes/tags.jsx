'use strict'

import React from 'react'

import TagCloud from '../components/tag-cloud'

const TagsRoute = React.createClass({
  displayName: 'TagsRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    return (
      <TagCloud />
    )
  }
})

export default TagsRoute
