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
  SE_FILTER_QUESTIONS,
  SE_FILTER_QUESTION_DETAILS
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
  return request(resource)
    .use(prefix)
    .set('Accept', 'application/json')
    .query({ site: SE_SITE })
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

function getQuestionsParams (options) {
  return {
    sort: options.sort,
    filter: options.withDetails ? SE_FILTER_QUESTION_DETAILS : SE_FILTER_QUESTIONS
  }
}

export function fetchQuestions (options) {
  return apiRequest('/questions')
    .query(getQuestionsParams(options))
    .then(res => res.body)
}

export function searchQuestions (options) {
  return apiRequest('/search/advanced')
    .query(getQuestionsParams(options))
    .query({ q: options.query })
    .then(res => res.body)
}

export function fetchQuestionById (id, options) {
  return apiRequest('/questions/' + encodeURIComponent(id))
    .query(getQuestionsParams(options))
    .then(res => res.body)
}

export function fetchTags () {
  return apiRequest('/tags')
    .query({ pagesize: 99 })
    .then(res => res.body)
}

export function fetchTagWiki (id) {
  return apiRequest('/tags/' + encodeURIComponent(id) + '/wiki')
    .then(res => res.body)
}
