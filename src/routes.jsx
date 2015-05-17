'use strict'

import React from 'react'
import { Route, DefaultRoute } from 'react-router'

import App from './components/app'

import QuestionsRoute from './routes/questions'
import SearchRoute from './routes/search'
import QuestionDetailsRoute from './routes/question-details'
import TagsRoute from './routes/tags'
import TaggedQuestionsRoute from './routes/tagged-questions'

const routes = (
  <Route handler={App}>
    <DefaultRoute name='questions' handler={QuestionsRoute} />
    <Route name='search' path='search' handler={SearchRoute} />
    <Route name='question-details' path='question/:questionId' handler={QuestionDetailsRoute} />
    <Route path='tags'>
      <DefaultRoute name='tags' handler={TagsRoute} />
      <Route name='tagged-questions' path=':tag' handler={TaggedQuestionsRoute} />
    </Route>
  </Route>
)

export default routes
