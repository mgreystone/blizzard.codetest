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
  SE_FILTER_QUESTION_DETAILS_PRIVATE,
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

function apiGet (resource) {
  return request.get(resource)
    .use(prefix)
    .set('Accept', 'application/json')
    .query({
      key: SE_KEY,
      site: SE_SITE,
      access_token: localStorage.getItem(LS_KEY_ACCESS_TOKEN)
    })
}

function apiPost (resource) {
  return request.post(resource)
    .use(prefix)

    .set({
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    })

    .send({
      key: SE_KEY,
      site: SE_SITE,
      access_token: localStorage.getItem(LS_KEY_ACCESS_TOKEN)
    })
}

function returnBody (res) {
  return res.body
}

function returnErrBody (err) {
  throw err && err.res ? err.res.body : null
}

export function isAuthenticated () {
  return !!localStorage.getItem(LS_KEY_ACCESS_TOKEN)
}

export function authenticate () {
  return init.then(() => {
    return new Promise((resolve, reject) => {
      SE.authenticate({
        scope: ['write_access', 'private_info'],
        error: reject,

        success (data) {
          localStorage.setItem(LS_KEY_ACCESS_TOKEN, data.accessToken)
          resolve()
        }
      })
    })
  })
}

export function revoke () {
  localStorage.removeItem(LS_KEY_ACCESS_TOKEN)
}

function getQuestionsParams (options) {
  let filter = SE_FILTER_QUESTIONS

  if (options.withDetails) {
    filter = isAuthenticated() ? SE_FILTER_QUESTION_DETAILS_PRIVATE : SE_FILTER_QUESTION_DETAILS
  }

  return {
    sort: options.sort,
    filter,
    page: options.page
  }
}

export function fetchQuestions (options) {
  return apiGet('/questions')
    .query(getQuestionsParams(options))
    .then(returnBody)
    .catch(returnErrBody)
}

export function searchQuestions (options) {
  return apiGet('/search/advanced')
    .query(getQuestionsParams(options))
    .query({ q: options.query })
    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchQuestionById (id, options) {
  return apiGet('/questions/' + encodeURIComponent(id))
    .query(getQuestionsParams(options))
    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchTags (params) {
  let options = Object.assign({}, params)

  return apiGet('/tags')
    .query({
      pagesize: 99,
      page: options.page
    })

    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchTagWiki (id) {
  return apiGet(`/tags/${encodeURIComponent(id)}/wiki`)
    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchUser (id) {
  let resource = id ? `/users/${encodeURIComponent(id)}` : '/me'

  return apiGet(resource)
    .query({ filter: SE_FILTER_USER_PROFILE })
    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchUserQuestions (id, params) {
  let options = Object.assign({}, params)
  let resource = id ? `/users/${encodeURIComponent(id)}/questions` : '/me/questions'

  return apiGet(resource)

    .query({
      filter: SE_FILTER_QUESTIONS,
      page: options.page
    })

    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchUserAnswers (id, params) {
  let options = Object.assign({}, params)
  let resource = id ? `/users/${encodeURIComponent(id)}/answers` : '/me/answers'

  return apiGet(resource)

    .query({
      filter: SE_FILTER_ANSWERS_LIST,
      page: options.page
    })

    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchUserBadges (id) {
  let resource = id ? `/users/${encodeURIComponent(id)}/badges` : '/me/badges'

  return apiGet(resource)
    .query({ filter: SE_FILTER_BADGES })
    .then(returnBody)
    .catch(returnErrBody)
}

export function fetchUserFavoriteQuestions (id, params) {
  let options = Object.assign({}, params)
  let resource = id ? `/users/${encodeURIComponent(id)}/favorites` : '/me/favorites'

  return apiGet(resource)

    .query({
      filter: SE_FILTER_QUESTIONS,
      page: options.page
    })

    .then(returnBody)
    .catch(returnErrBody)
}

export function upvoteQuestion (id) {
  return apiPost(`/questions/${encodeURIComponent(id)}/upvote`)
    .send({ filter: SE_FILTER_QUESTIONS })
    .then(returnBody)
    .catch(returnErrBody)
}

export function downvoteQuestion (id) {
  return apiPost(`/questions/${encodeURIComponent(id)}/downvote`)
    .send({ filter: SE_FILTER_QUESTIONS })
    .then(returnBody)
    .catch(returnErrBody)
}

export function favoriteQuestion (id) {
  return apiPost(`/questions/${encodeURIComponent(id)}/favorite`)
    .send({ filter: SE_FILTER_QUESTIONS })
    .then(returnBody)
    .catch(returnErrBody)
}

export function unfavoriteQuestion (id) {
  return apiPost(`/questions/${encodeURIComponent(id)}/favorite/undo`)
    .send({ filter: SE_FILTER_QUESTIONS })
    .then(returnBody)
    .catch(returnErrBody)
}

export function upvoteAnswer (id) {
  return apiPost(`/answers/${encodeURIComponent(id)}/upvote`)
    .send({ filter: SE_FILTER_ANSWERS_LIST })
    .then(returnBody)
    .catch(returnErrBody)
}

export function downvoteAnswer (id) {
  return apiPost(`/answers/${encodeURIComponent(id)}/downvote`)
    .send({ filter: SE_FILTER_ANSWERS_LIST })
    .then(returnBody)
    .catch(returnErrBody)
}
