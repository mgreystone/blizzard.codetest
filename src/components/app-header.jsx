'use strict'

import './app-header.scss'

import React from 'react'

import PrimaryNav from './primary-nav'
import QuestionsSearchForm from './questions-search-form'

const AppHeader = React.createClass({
  displayName: 'Header',

  render () {
    return (
      <header className='app-header'>
        <div className='outer'>
          <div className='inner'>
            <h1 className='app-title'>
              <a href='http://blizzard.com'>Bizzard Entertainment</a>
            </h1>

            <PrimaryNav />

            <div className='search-container'>
              <QuestionsSearchForm />
            </div>
          </div>
        </div>
      </header>
    )
  }
})

export default AppHeader
