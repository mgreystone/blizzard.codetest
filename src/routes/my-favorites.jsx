'use strict'

import React from 'react'

import UserFavorites from '../components/user-favorites'

const MyFavoritesRoute = React.createClass({
  displayName: 'MyFavoritesRoute',

  render () {
    return (
      <UserFavorites />
    )
  }
})

export default MyFavoritesRoute
