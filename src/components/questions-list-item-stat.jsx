'use strict'

import './questions-list-item-stat.scss'

import React from 'react'

import { roundLargeNumber } from '../utils'

const QuestionsListItemStat = React.createClass({
  displayName: 'QuestionsListItemStat',

  propTypes: {
    value: React.PropTypes.number.isRequired,
    label: React.PropTypes.string.isRequired
  },

  render () {
    let value = this.props.value
    let label = this.props.label

    return (
      <div className='questions-list-item-stat'>
        <div className='value'>
          {roundLargeNumber(value)}
        </div>

        <div className='label'>
          {label}
        </div>
      </div>
    )
  }
})

export default QuestionsListItemStat
