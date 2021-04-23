// ------ imports ------
// node modules
import React, { Component } from 'react'
import { observer } from 'mobx-react'

// interfaces
import { RouteComponentProps } from 'react-router'


// internal component
import { SelectCate } from '../components/Home/SelectCate'
import { Posts } from '../components/Home/Posts'

// store
import { store } from '../index'
import { withStore } from '../store/Store'

// ------ component ------
// @ts-ignore
@withStore
@observer
export class Home extends Component<RouteComponentProps> {
  componentDidMount () {
    store.fetchUsers()
    store.fetchPost()
    store.fetchCate()
  }

  // rendering
  render () {
    return (
      <>
        <div className="flex  bg-gray-700 min-h-screen flex-col">
          <div className="py-10 px-20 w-full h-full">
            <SelectCate />
          </div>
          <hr className="w-2/3 mx-auto bg-gray-300 border-gray-300 text-gray-300"/>
          <div className="py-10 px-20 w-full h-full">
            <Posts location={this.props.location} history={this.props.history} />
          </div>
        </div>
      </>
    )
  }
}
