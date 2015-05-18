'use strict'

import Reflux from 'reflux'
import { authenticate, revoke } from '../services/stack-exchange'

const actions = Reflux.createActions({
  authenticate: { asyncResult: true },
  revoke: {}
})

actions.authenticate.listenAndPromise(authenticate)
actions.revoke.listen(revoke)

export default actions
