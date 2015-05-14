'use strict'

import React from 'react'
import { Route, DefaultRoute } from 'react-router'

import App from './components/app'

import QuestionsRoute from './routes/questions'

const routes = (
  <Route handler={App}>
    <DefaultRoute name='questions' handler={QuestionsRoute} />
  </Route>
)

export default routes
