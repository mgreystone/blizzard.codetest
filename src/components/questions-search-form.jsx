'use strict'

import React from 'react'
import Reflux from 'reflux'
import { Navigation } from 'react-router'

import questionsStore from '../stores/questions'

const QuestionsSearchForm = React.createClass({
  displayName: 'QuestionsSearchForm',

  mixins: [
    Navigation,
    Reflux.listenTo(questionsStore, 'onQuestionsChange')
  ],

  propTypes: {
    showButton: React.PropTypes.bool
  },

  getDefaultProps () {
    return {
      showButton: false
    }
  },

  getInitialState () {
    let questionsStoreState = questionsStore.getInitialState()

    return {
      query: questionsStoreState.get('query')
    }
  },

  onQuestionsChange (state) {
    this.setState({
      query: state.get('query')
    })
  },

  onSubmit (e) {
    e.preventDefault()
    this.transitionTo('search', {}, { q: this.state.query })
  },

  onQueryChange (e) {
    this.setState({
      query: e.target.value
    })
  },

  render () {
    return (
      <form className='questions-search-form' onSubmit={this.onSubmit}>
        <div>
          <input type='search' value={this.state.query} required
            placeholder='Search' onChange={this.onQueryChange} />

          { this.props.showButton ? <button type='submit'>Search</button> : null }
        </div>
      </form>
    )
  }
})

export default QuestionsSearchForm
