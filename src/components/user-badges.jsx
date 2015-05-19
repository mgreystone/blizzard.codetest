'use strict'

import './user-badges.scss'

import React from 'react'
import Reflux from 'reflux'
import { Iterable } from 'immutable'

import badgesStore from '../stores/badges'
import badgesActions from '../actions/badges'

import Loader from './loader'

const UserBadges = React.createClass({
  displayName: 'UserBadges',

  mixins: [
    Reflux.connect(badgesStore, 'badges')
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
    badgesActions.fetchByUserId(this.props.userId)
  },

  render () {
    let items = this.state.badges.getIn(['badges', 'items']) || new Iterable()

    return (
      <div className='user-badges'>
        <Loader loaded={!this.state.badges.get('isLoading')}>
          <ul>
            {items.map(item => {
              let badgeId = item.get('badge_id')
              let name = item.get('name')
              let awardCount = item.get('award_count')

              return (
                <li key={badgeId}>
                  {name}
                  {awardCount > 1 ? <span className='award-count'> x{awardCount}</span> : null}
                </li>
              )
            })}
          </ul>
        </Loader>
      </div>
    )
  }
})

export default UserBadges
