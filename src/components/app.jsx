'use strict'

import 'normalize.css/normalize.css'
import './app.scss'

import React from 'react'
import { RouteHandler } from 'react-router'

import AppHeader from './app-header'
import Banner from './banner'
import DocumentTitle from './document-title'

const App = React.createClass({
  displayName: 'App',

  render () {
    return (
      <DocumentTitle>
        <div className='app'>
          <AppHeader />
          <Banner />
          <div className='main-outer'>
            <main className='main'>
              <RouteHandler />
            </main>
          </div>
        </div>
      </DocumentTitle>
    )
  }
})

export default App
