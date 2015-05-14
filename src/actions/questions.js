'use strict'

import Reflux from 'reflux'

import { fetchQuestions } from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchQuestions)

export default actions
