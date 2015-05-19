'use strict'

import Reflux from 'reflux'

import { fetchUserAnswers, upvoteAnswer, downvoteAnswer } from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetchByUserId: { asyncResult: true },
  upvote: { asyncResult: true },
  downvote: { asyncResult: true }
})

actions.fetchByUserId.listenAndPromise(fetchUserAnswers)
actions.upvote.listenAndPromise(upvoteAnswer)
actions.downvote.listenAndPromise(downvoteAnswer)

export default actions
