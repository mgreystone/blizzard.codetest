'use strict'

import 'font-awesome/scss/font-awesome.scss'

import React from 'react'
import ReactIcon from 'react-icon'

const Icon = React.createClass({
  displayName: 'Icon',

  render () {
    return (
      <ReactIcon {...this.props} />
    )
  }
})

export default Icon
