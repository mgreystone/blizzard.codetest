'use strict'

import './questions-tab.scss'

import React from 'react'
import Reflux from 'reflux'
import { Link, State } from 'react-router'
import classNames from 'classnames'

import questionsStore from '../stores/questions'

const QuestionsTab = React.createClass({
  displayName: 'QuestionsTab',

  mixins: [
    State,
    Reflux.connect(questionsStore, 'questions')
  ],

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

    let linkClasses = classNames({
      'tab-active': this.props.value === this.state.questions.get('sort')
    })

    return (
      <li className='questions-tab'>
        <Link className={linkClasses} to={path} query={query}>
          {label}
        </Link>
      </li>
    )
  }
})

export default QuestionsTab
