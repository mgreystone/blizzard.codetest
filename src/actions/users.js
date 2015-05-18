'use strict'

import Reflux from 'reflux'
import { fetchUser} from '../services/stack-exchange'

const actions = Reflux.createActions({
  fetch: { asyncResult: true }
})

actions.fetch.listenAndPromise(fetchUser)

export default actions
