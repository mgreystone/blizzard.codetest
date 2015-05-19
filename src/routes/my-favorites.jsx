'use strict'

import React from 'react'

import UserFavorites from '../components/user-favorites'

const MyFavoritesRoute = React.createClass({
  displayName: 'MyFavoritesRoute',

  contextTypes: {
    router: React.PropTypes.func
  },

  render () {
    let page = parseInt(this.context.router.getCurrentQuery().p, 10)

    return (
      <UserFavorites page={page} />
    )
  }
})

export default MyFavoritesRoute
