'use strict'

import React from 'react'
import ReactDocumentTitle from 'react-document-title'

const prefix = 'Blizzard Stack Exchange'

const DocumentTitle = React.createClass({
  displayName: 'DocumentTitle',

  propTypes: {
    title: React.PropTypes.string,
    children: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      title: null,
      children: null
    }
  },

  render () {
    let title = this.props.title ? `${prefix} > ${this.props.title}` : prefix

    return (
      <ReactDocumentTitle title={title}>
        {this.props.children}
      </ReactDocumentTitle>
    )
  }
})

export default DocumentTitle
