'use strict'

import './loader.scss'

import React from 'react'

const Loader = React.createClass({
  displayName: 'Loader',

  propTypes: {
    loaded: React.PropTypes.boolean,
    children: React.PropTypes.any
  },

  getDefaultProps () {
    return {
      loaded: false,
      children: null
    }
  },

  render () {
    if (this.props.loaded) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }

    return (
      <div className='sk-spinner sk-spinner-wave'>
        <div className='sk-rect1'></div>
        <div className='sk-rect2'></div>
        <div className='sk-rect3'></div>
        <div className='sk-rect4'></div>
      </div>
    )
  }
})

export default Loader
