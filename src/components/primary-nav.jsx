'use strict'

import './primary-nav.scss'

import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'

import authenticationActions from '../actions/authentication'
import authenticationStore from '../stores/authentication'

const PrimaryNav = React.createClass({
  displayName: 'PrimaryNav',

  mixins: [
    Reflux.connect(authenticationStore, 'authentication')
  ],

  onClickLogin () {
    authenticationActions.authenticate()
  },

  onClickLogout () {
    authenticationActions.revoke()
  },

  render () {
    let isAuthenticated = this.state.authentication.get('isAuthenticated')

    return (
      <nav className='primary-nav'>
        <ul>
          <li>
            <Link to='questions'>Questions</Link>
          </li>
          <li>
            <Link to='tags'>Tags</Link>
          </li>
          {!isAuthenticated ? null :
            <li>
              <Link to='me'>Profile</Link>
            </li>
          }
          <li>
            {!isAuthenticated ?
              <span className='link' onClick={this.onClickLogin}>Login</span> :
              <span className='link' onClick={this.onClickLogout}>Logout</span>}
          </li>
        </ul>
      </nav>
    )
  }
})

export default PrimaryNav
