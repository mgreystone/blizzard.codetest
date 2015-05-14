'use strict'

import Reflux from 'reflux'
import { authenticate } from '../services/stack-exchange'

const actions = Reflux.createActions({
  authenticate: { asyncResult: true }
})

actions.authenticate.listenAndPromise(authenticate)

export default actions
