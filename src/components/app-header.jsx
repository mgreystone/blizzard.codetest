'use strict'

import './app-header.scss'

import React from 'react'

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
