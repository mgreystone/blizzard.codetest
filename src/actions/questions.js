'use strict'

import Reflux from 'reflux'

import {
  fetchQuestions,
  searchQuestions,
  fetchQuestionById,
  fetchUserQuestions,
  fetchUserFavoriteQuestions,
  upvoteQuestion,
  downvoteQuestion,
  favoriteQuestion,
  unfavoriteQuestion
}
from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true },
  search: { asyncResult: true },
  fetchById: { asyncResult: true },
  fetchByUserId: { asyncResult: true },
  fetchFavorites: { asyncResult: true },
  upvote: { asyncResult: true },
  downvote: { asyncResult: true },
  favorite: { asyncResult: true },
  unfavorite: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchQuestions)
actions.search.listenAndPromise(searchQuestions)
actions.fetchById.listenAndPromise(fetchQuestionById)
actions.fetchByUserId.listenAndPromise(fetchUserQuestions)
actions.fetchFavorites.listenAndPromise(fetchUserFavoriteQuestions)
actions.upvote.listenAndPromise(upvoteQuestion)
actions.downvote.listenAndPromise(downvoteQuestion)
actions.favorite.listenAndPromise(favoriteQuestion)
actions.unfavorite.listenAndPromise(unfavoriteQuestion)

export default actions
