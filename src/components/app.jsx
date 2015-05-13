'use strict'

import React from 'react'
import { RouteHandler } from 'react-router'

const App = React.createClass({
  displayName: 'App',

  render () {
    return (
      <div>
        Welcome!
        <RouteHandler />
      </div>
    )
  }
})

export default App
