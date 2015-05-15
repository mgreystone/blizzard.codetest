'use strict'

import Reflux from 'reflux'

import {
  fetchQuestions,
  searchQuestions,
  fetchQuestionById
}
from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true },
  search: { asyncResult: true },
  fetchById: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchQuestions)
actions.search.listenAndPromise(searchQuestions)
actions.fetchById.listenAndPromise(fetchQuestionById)

export default actions
