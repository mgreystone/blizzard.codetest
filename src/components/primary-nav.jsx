'use strict'

import './primary-nav.scss'

import React from 'react'
import { Link } from 'react-router'

const PrimaryNav = React.createClass({
  displayName: 'PrimaryNav',

  render () {
    return (
      <nav className='primary-nav'>
        <ul>
          <li>
            <Link to='questions'>Questions</Link>
          </li>
        </ul>
      </nav>
    )
  }
})

export default PrimaryNav
