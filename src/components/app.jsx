'use strict'

import 'normalize.css/normalize.css'
import './app.scss'

import React from 'react'
import { RouteHandler } from 'react-router'

import AppHeader from './app-header'
import Banner from './banner'

const App = React.createClass({
  displayName: 'App',

  render () {
    return (
      <div className='app'>
        <AppHeader />
        <Banner />
        <div className='main-outer'>
          <div className='main'>
            <RouteHandler />
          </div>
        </div>
      </div>
    )
  }
})

export default App
