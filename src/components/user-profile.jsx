'use strict'

import './user-profile.scss'

import React from 'react'
import Reflux from 'reflux'
import { RouteHandler, Link } from 'react-router'

import usersActions from '../actions/users'
import usersStore from '../stores/users'

const UserProfile = React.createClass({
  displayName: 'UserProfile',

  mixins: [
    Reflux.connect(usersStore, 'users')
  ],

  propTypes: {
    userId: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      userId: null
    }
  },

  componentWillMount () {
    usersActions.fetch(this.props.userId)
  },

  render () {
    let users = this.state.users.get('users')
    let item = users && users.getIn(['items', 0])
    let displayName = item && item.get('display_name')
    let aboutMe = item && item.get('about_me')

    return (
      <div className='user-profile'>
        <h1 className='page-title'>{displayName}</h1>

        <div className='about-me'>
          {aboutMe}
        </div>

        <ul className='tabs'>
          <li>
            <Link to='my-questions'>Questions</Link>
          </li>
          <li>
            <Link to='my-answers'>Answers</Link>
          </li>
          <li>
            <Link to='my-badges'>Badges</Link>
          </li>
        </ul>

        <RouteHandler />
      </div>
    )
  }
})

export default UserProfile
