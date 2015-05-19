'use strict'

import './tag-cloud.scss'

import React from 'react'
import Reflux from 'reflux'
import { Link } from 'react-router'

import tagStore from '../stores/tags'
import tagActions from '../actions/tags'

import Loader from './loader'

const TagCloud = React.createClass({
  displayName: 'TagCloud',

  mixins: [
    Reflux.connect(tagStore, 'tags')
  ],

  componentWillMount () {
    tagActions.fetch()
  },

  render () {
    let tags = this.state.tags
    let items = tags ? tags.getIn(['tags', 'items']) : null

    return (
      <div className='tag-cloud'>
        <Loader loaded={!tags.get('isLoading')}>
          <h1 className='page-title'>Tags</h1>

          <ul>
            {!items ? null : items.map(item => {
              let name = item.get('name')

              return (
                <li key={name}>
                  <Link to='tagged-questions' params={{ tag: name }}>
                    {name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Loader>
      </div>
    )
  }
})

export default TagCloud
