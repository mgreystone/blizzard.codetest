'use strict'

import React from 'react'

import QuestionsTab from './questions-tab'

const QuestionsTabPanel = React.createClass({
  displayName: 'QuestionsTabPanel',

  propTypes: {
    children: React.PropTypes.arrayOf(QuestionsTab)
  },

  render () {
    return (
      <ul>
        {this.props.children}
      </ul>
    )
  }
})

export default QuestionsTabPanel
