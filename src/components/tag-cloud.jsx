'use strict'

import './tag-cloud.scss'

import React from 'react'
import Reflux from 'reflux'
import { Link, State } from 'react-router'

import tagStore from '../stores/tags'
import tagActions from '../actions/tags'

import Loader from './loader'
import DocumentTitle from './document-title'
import Icon from './icon'

const TagCloud = React.createClass({
  displayName: 'TagCloud',

  mixins: [
    State,
    Reflux.connect(tagStore, 'tags')
  ],

  propTypes: {
    page: React.PropTypes.number
  },

  getDefaultProps () {
    return {
      page: null
    }
  },

  componentWillMount () {
    tagActions.fetch({
      page: this.props.page || 1
    })
  },

  componentWillReceiveProps (nextProps) {
    tagActions.fetch({
      page: nextProps.page || 1
    })
  },

  render () {
    let tags = this.state.tags
    let items = tags ? tags.getIn(['tags', 'items']) : null
    let hasMore = tags ? tags.getIn(['tags', 'has_more']) : false
    let page = tags.get('page')

    let currentPath = this.getPathname()
    let currentQuery = this.getQuery()

    return (
      <DocumentTitle title='Tags'>
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

            {page <= 1 ? null :
              <Link className='prev' to={currentPath} query={Object.assign({}, currentQuery, { p: page - 1 })}>
                <Icon glyph='caret-left' /> Previous Page
              </Link>
            }

            {!hasMore ? null :
              <Link className='next' to={currentPath} query={Object.assign({}, currentQuery, { p: page + 1 })}>
                Next Page <Icon glyph='caret-right' />
              </Link>
            }
          </Loader>
        </div>
      </DocumentTitle>
    )
  }
})

export default TagCloud
