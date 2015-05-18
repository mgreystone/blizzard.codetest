'use strict'

import Reflux from 'reflux'

import { fetchUserBadges } from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetchByUserId: { asyncResult: true }
})

actions.fetchByUserId.listenAndPromise(fetchUserBadges)

export default actions
