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
  SE_FILTER_QUESTION_DETAILS,
  SE_FILTER_USER_PROFILE,
  SE_FILTER_ANSWERS_LIST,
  SE_FILTER_BADGES
}
from '../config'

const LS_KEY_ACCESS_TOKEN = 'stackExchange.accessToken'

const prefix = prefixify(SE_API_PREFIX)

const init = new Promise(resolve => {
  SE.init({
    clientId: SE_CLIENT_ID,
    key: SE_KEY,
    channelUrl: SE_CHANNEL_URL,
    complete: resolve
  })
})

function apiRequest (resource) {
  return request(resource)
    .use(prefix)
    .set('Accept', 'application/json')
    .query({
      key: SE_KEY,
      site: SE_SITE,
      access_token: localStorage.getItem(LS_KEY_ACCESS_TOKEN)
    })
}

export function isAuthenticated () {
  return !!localStorage.getItem(LS_KEY_ACCESS_TOKEN)
}

export function authenticate () {
  return init.then(() => {
    return new Promise((resolve, reject) => {
      SE.authenticate({
        error: reject,

        success (data) {
          resolve()
          localStorage.setItem(LS_KEY_ACCESS_TOKEN, data.accessToken)
        }
      })
    })
  })
}

export function revoke () {
  localStorage.removeItem(LS_KEY_ACCESS_TOKEN)
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

export function fetchUser (id) {
  let resource = id ? `/users/${encodeURIComponent(id)}` : '/me'

  return apiRequest(resource)
    .query({ filter: SE_FILTER_USER_PROFILE })
    .then(res => res.body)
}

export function fetchUserQuestions (id) {
  let resource = id ? `/users/${encodeURIComponent(id)}/questions` : '/me/questions'

  return apiRequest(resource)
    .query({ filter: SE_FILTER_QUESTIONS })
    .then(res => res.body)
}

export function fetchUserAnswers (id) {
  let resource = id ? `/users/${encodeURIComponent(id)}/answers` : '/me/answers'

  return apiRequest(resource)
    .query({ filter: SE_FILTER_ANSWERS_LIST })
    .then(res => res.body)
}

export function fetchUserBadges (id) {
  let resource = id ? `/users/${encodeURIComponent(id)}/badges` : '/me/badges'

  return apiRequest(resource)
    .query({ filter: SE_FILTER_BADGES })
    .then(res => res.body)
}
