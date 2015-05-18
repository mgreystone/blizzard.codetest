'use strict'

import Reflux from 'reflux'

import {
  fetchQuestions,
  searchQuestions,
  fetchQuestionById,
  fetchUserQuestions,
  fetchUserFavoriteQuestions
}
from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true },
  search: { asyncResult: true },
  fetchById: { asyncResult: true },
  fetchByUserId: { asyncResult: true },
  fetchFavorites: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchQuestions)
actions.search.listenAndPromise(searchQuestions)
actions.fetchById.listenAndPromise(fetchQuestionById)
actions.fetchByUserId.listenAndPromise(fetchUserQuestions)
actions.fetchFavorites.listenAndPromise(fetchUserFavoriteQuestions)

export default actions
