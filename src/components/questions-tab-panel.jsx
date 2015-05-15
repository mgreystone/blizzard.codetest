'use strict'

import './questions-tab-panel.scss'

import React from 'react'

import QuestionsTab from './questions-tab'

const QuestionsTabPanel = React.createClass({
  displayName: 'QuestionsTabPanel',

  propTypes: {
    children: React.PropTypes.arrayOf(QuestionsTab)
  },

  render () {
    return (
      <ul className='questions-tab-panel'>
        {this.props.children}
      </ul>
    )
  }
})

export default QuestionsTabPanel
