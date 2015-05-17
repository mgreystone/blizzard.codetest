'use strict'

import Reflux from 'reflux'
import { authenticate, revoke } from '../services/stack-exchange'

const actions = Reflux.createActions({
  authenticate: { asyncResult: true },
  revoke: { asyncResult: true }
})

actions.authenticate.listenAndPromise(authenticate)
actions.revoke.listenAndPromise(revoke)

export default actions
