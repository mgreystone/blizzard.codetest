'use strict'

import React from 'react'

import QuestionsResultsList from '../components/questions-results-list'

const SearchRoute = React.createClass({
  displayName: 'SearchRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let routeQuery = this.context.router.getCurrentQuery()
    let query = routeQuery.q
    let sort = routeQuery.s
    let page = parseInt(routeQuery.p, 10)

    return (
      <QuestionsResultsList query={query} sort={sort} page={page} />
    )
  }
})

export default SearchRoute
