'use strict'

import React from 'react'
import { Route, DefaultRoute } from 'react-router'

import App from './components/app'

import QuestionsRoute from './routes/questions'
import SearchRoute from './routes/search'

const routes = (
  <Route handler={App}>
    <DefaultRoute name='questions' handler={QuestionsRoute} />
    <Route name='search' path='search' handler={SearchRoute} />
  </Route>
)

export default routes
