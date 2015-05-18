'use strict'

import Reflux from 'reflux'

import { fetchUserAnswers } from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetchByUserId: { asyncResult: true }
})

actions.fetchByUserId.listenAndPromise(fetchUserAnswers)

export default actions
