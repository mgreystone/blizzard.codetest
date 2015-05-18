'use strict'

import Reflux from 'reflux'

import {
  fetchQuestions,
  searchQuestions,
  fetchQuestionById,
  fetchUserQuestions
}
from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true },
  search: { asyncResult: true },
  fetchById: { asyncResult: true },
  fetchByUserId: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchQuestions)
actions.search.listenAndPromise(searchQuestions)
actions.fetchById.listenAndPromise(fetchQuestionById)
actions.fetchByUserId.listenAndPromise(fetchUserQuestions)

export default actions
