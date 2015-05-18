'use strict'

import React from 'react'

import UserProfile from '../components/user-profile'

const MeRoute = React.createClass({
  displayName: 'MeRoute',

  render () {
    return (
      <UserProfile />
    )
  }
})

export default MeRoute
