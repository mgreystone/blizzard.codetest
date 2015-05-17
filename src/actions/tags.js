'use strict'

import Reflux from 'reflux'

import { fetchTags } from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchTags)

export default actions
