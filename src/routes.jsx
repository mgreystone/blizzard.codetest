'use strict'

import React from 'react'
import { Route, DefaultRoute } from 'react-router'

import App from './components/app'

import QuestionsRoute from './routes/questions'
import SearchRoute from './routes/search'
import QuestionDetailsRoute from './routes/question-details'
import TagsRoute from './routes/tags'
import TaggedQuestionsRoute from './routes/tagged-questions'
import MeRoute from './routes/me'
import MyQuestionsRoute from './routes/my-questions'
import MyAnswersRoute from './routes/my-answers'
import MyBadgesRoute from './routes/my-badges'

const routes = (
  <Route handler={App}>
    <DefaultRoute name='questions' handler={QuestionsRoute} />
    <Route name='search' path='search' handler={SearchRoute} />

    <Route name='question-details' path='question/:questionId' handler={QuestionDetailsRoute} />
    <Route name='answer-details' path='question/:questionId/answer/:answerId' handler={QuestionDetailsRoute} />

    <Route path='tags'>
      <DefaultRoute name='tags' handler={TagsRoute} />
      <Route name='tagged-questions' path=':tag' handler={TaggedQuestionsRoute} />
    </Route>

    <Route name='me' path='me' handler={MeRoute}>
      <DefaultRoute name='my-questions' handler={MyQuestionsRoute} />
      <Route name='my-answers' path='answers' handler={MyAnswersRoute} />
      <Route name='my-badges' path='badges' handler={MyBadgesRoute} />
    </Route>
  </Route>
)

export default routes
