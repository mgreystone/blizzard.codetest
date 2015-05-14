'use strict'

import 'normalize.css/normalize.css'

import React from 'react'
import Reflux from 'reflux'
import { RouteHandler } from 'react-router'

import authenticationStore from '../stores/authentication'
import authenticationActions from '../actions/authentication'

const App = React.createClass({
  displayName: 'App',

  mixins: [
    Reflux.connect(authenticationStore, 'authentication')
  ],

  login () {
    authenticationActions.authenticate()
  },

  render () {
    let isAuthenticated = this.state.authentication.get('isAuthenticated')

    return (
      <div>
        { isAuthenticated ? 'Yay' : <button onClick={this.login}>Login</button> }
        <RouteHandler />
      </div>
    )
  }
})

export default App
