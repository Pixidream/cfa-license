// ------ imports ------
// node modules
import React, { Component } from 'react'
import { observer } from 'mobx-react'

// components
import { AdminHeader } from '../components/AdminPage/AdminHeader'
import { AdminPost } from '../components/AdminPage/AdminPost'
import { AdminCategory } from '../components/AdminPage/AdminCategory'

// store
import { store } from '../index'
import { withStore } from '../store/Store'

// interfaces
import { RouteComponentProps } from 'react-router-dom'

// ------ component ------
// @ts-ignore
@withStore
@observer
export class AdminPage extends Component<RouteComponentProps> {
  componentDidMount () {
    store.fetchPost()
    store.fetchCate()
    store.fetchUsers()
  }

  render () {
    return (
      <div className="full-screen">
        <AdminHeader />
        <div className="border-l-1 border-solid border-gray-500 bg-gray-600 rounded-md shadow-lg w-3/4 h-1 mx-auto my-5" />
        <section className="w-full flex py-10 px-24 justify-center">
          <div className="=h-full w-full flex items-center justify-center">
            <AdminPost history={this.props.history} location={this.props.location} match={this.props.match} />
          </div>
          <div className="=h-full w-full flex items-center justify-center">
            <AdminCategory history={this.props.history} location={this.props.location} match={this.props.match} />
          </div>
        </section>
      </div>
    )
  }
}
