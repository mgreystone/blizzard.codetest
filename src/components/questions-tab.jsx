'use strict'

import React from 'react'
import { Link, State } from 'react-router'

const QuestionsTab = React.createClass({
  displayName: 'QuestionsTab',

  mixins: [State],

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    onSelect: React.PropTypes.func
  },

  getDefaultProps () {
    return {
      onSelect () {}
    }
  },

  render () {
    let label = this.props.label
    let path = this.getPathname()
    let query = Object.assign({}, this.getQuery(), {
      s: this.props.value
    })

    return (
      <li>
        <Link to={path} query={query}>
          {label}
        </Link>
      </li>
    )
  }
})

export default QuestionsTab
