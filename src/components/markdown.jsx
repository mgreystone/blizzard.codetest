'use strict'

import './markdown.scss'

import React from 'react'
import marked from 'marked'

const Markdown = React.createClass({
  displayName: 'Markdown',

  propTypes: {
    value: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      value: null
    }
  },

  render () {
    let value = this.props.value
    let html = value && marked(value, { sanitize: true })

    return (
      <div className='markdown' dangerouslySetInnerHTML={{ __html: html }} />
    )
  }
})

export default Markdown
