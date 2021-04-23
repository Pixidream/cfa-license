// ------ imports ------
// node modules
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { PlusCircleIcon } from '@heroicons/react/outline'

// store
import { store } from '../../index'
import { withStore } from '../../store/Store'

// interface
import { CategoryInterface } from '../../interfaces/home.interface'
import { RouteComponentProps } from 'react-router'


// ------ component ------
// @ts-ignore
@withStore
@observer
export class AdminCategory extends Component<RouteComponentProps>{
  render () {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="p-5">
          <h3 className="text-white font-semibold text-xl">Manage Categories:</h3>
        </div>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow-lg overflow-hidden border-b border-gray-700 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800 shadow-lg">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <button className="flex text-sm text-gray-200 bg-gray-700 py-1 px-2 rounded" onClick={() => this.props.history.push('/category/new')}>
                        <PlusCircleIcon className="w-5 h-5 text-gray-200 mr-2" />
                        Add category
                      </button>
                    </th>
                  </tr>
                  </thead>
                  <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {store.cate.map((cate: CategoryInterface) => (
                    <tr key={cate._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={cate.icon} alt="profile" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-200">{cate.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={ `/category/edit/${cate._id}` } className="text-green-500 hover:text-indigo-900">
                          Edit
                        </Link>
                        <button onClick={() => store.deleteACate(cate._id) } className="text-red-500 hover:text-red-600 ml-5">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
