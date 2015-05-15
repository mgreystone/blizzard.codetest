'use strict'

import SE from 'se'
import Promise from 'bluebird'
import request from 'superagent-bluebird-promise'
import prefixify from 'superagent-prefix'

import {
  SE_CLIENT_ID,
  SE_KEY,
  SE_CHANNEL_URL,
  SE_API_PREFIX,
  SE_SITE,
  SE_FILTER_QUESTIONS
}
from '../config'

const prefix = prefixify(SE_API_PREFIX)

const init = new Promise(resolve => {
  SE.init({
    clientId: SE_CLIENT_ID,
    key: SE_KEY,
    channelUrl: SE_CHANNEL_URL,

    complete (data) {
      resolve(data)
    }
  })
})

function apiRequest (resource) {
  return request(resource).use(prefix).query({ site: SE_SITE })
}

export function authenticate () {
  return init.then(() => {
    return new Promise((resolve, reject) => {
      SE.authenticate({
        networkUsers: true,

        success (data) {
          resolve(data)
        },

        error (data) {
          reject(data)
        }
      })
    })
  })
}

export function fetchQuestions (params) {
  let options = Object.assign({}, params)

  return apiRequest('/questions')

    .query({
      sort: options.sort,
      filter: SE_FILTER_QUESTIONS
    })

    .then(res => res.body)
}

export function searchQuestions (params) {
  let options = Object.assign({}, params)

  return apiRequest('/search/advanced')

    .query({
      q: options.query,
      sort: options.sort,
      filter: SE_FILTER_QUESTIONS
    })

    .then(res => res.body)
}
