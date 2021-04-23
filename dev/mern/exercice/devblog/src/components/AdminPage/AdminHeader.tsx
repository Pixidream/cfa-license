// ------- imports ------
// node modules
import React, { Component } from 'react'
import { UserIcon, AdjustmentsIcon, DocumentIcon } from '@heroicons/react/outline'
import { observer } from 'mobx-react'
import CountUp from 'react-countup'

// store
import { store } from '../../index'
import { withStore } from '../../store/Store'

// ------ component ------
// @ts-ignore
@withStore
@observer
export class AdminHeader extends Component {
  componentDidMount () {
    store.getUserCount()
    store.getCategoryCount()
    store.getPostCount()
  }

  render () {
    return (
      <section className="bg-gray-700 w-100 flex justify-center items-center">
        <div className="py-10 px-24 flex justify-center items-center">
          <div className="bg-gray-800 w-64 h-32 flex rounded-md shadow-lg mx-5">
            <div className="w-full h-full flex items-center justify-center flex-col">
              <UserIcon className="text-green-500 w-1/2 h-1/2" />
              <p className="text-green-500 font-semibold text-center">Users</p>
            </div>
            <div className="border-l-1 border-solid border-green-500 bg-green-500 w-px h-20 my-auto" />
            <div className="w-full h-full flex flex-col flex justify-center items-center">
              <CountUp className="font-semibold text-6xl text-green-500" end={store.userCount} duration={3} />
            </div>
          </div>

          <div className="bg-gray-800 w-64 h-32 flex rounded-md shadow-lg mx-5">
            <div className="w-full h-full flex items-center justify-center flex-col">
              <AdjustmentsIcon className="text-blue-400 w-1/2 h-1/2" />
              <p className="text-blue-400 font-semibold text-center">Categories</p>
            </div>
            <div className="border-l-1 border-solid border-blue-400 bg-blue-400 w-px h-20 my-auto" />
            <div className="w-full h-full flex flex-col flex justify-center items-center">
              <CountUp className="font-semibold text-6xl text-blue-400" end={store.categoryCount} duration={3} />
            </div>
          </div>

          <div className="bg-gray-800 w-64 h-32 flex rounded-md shadow-lg mx-5">
            <div className="w-full h-full flex items-center justify-center flex-col">
              <DocumentIcon className="text-yellow-500 w-1/2 h-1/2" />
              <p className="text-yellow-500 font-semibold text-center">Posts</p>
            </div>
            <div className="border-l-1 border-solid border-yellow-500 bg-yellow-500 w-px h-20 my-auto" />
            <div className="w-full h-full flex flex-col flex justify-center items-center">
              <CountUp className="font-semibold text-6xl text-yellow-500" end={store.postCount} duration={3} />
            </div>
          </div>
        </div>
      </section>
    )
  }
}
