'use strict'

import Reflux from 'reflux'

import { fetchQuestions, searchQuestions } from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true },
  search: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchQuestions)
actions.search.listenAndPromise(searchQuestions)

export default actions
