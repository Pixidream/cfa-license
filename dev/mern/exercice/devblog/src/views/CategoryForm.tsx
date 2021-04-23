// ------ imports ------
// node modules
import React, { Component } from 'react'
import { observer } from 'mobx-react'

// interface
import { CategoryInterfaceState } from '../interfaces/home.interface'

// store
import { store } from '../index'
import { withStore } from '../store/Store'

// helper
import { toB64 } from '../helpers/file.helper'

// component
import { RouteComponentProps } from 'react-router-dom'


// ------ component ------
// @ts-ignore
@withStore
@observer
export class CategoryForm extends Component<RouteComponentProps> {
  state: CategoryInterfaceState = {
    name: '',
    icon: ''
  }

  componentDidMount () {
    store.fetchPost()
    store.fetchCate()
    store.fetchUsers()
    // @ts-ignore
    if (this.props.location.pathname !== '/category/new' ) {
      // @ts-ignore
      const cat = store.cate.find(cat => cat._id === this.props.match.params.id )
      this.setState({
        _id: cat?._id,
        name: cat?.name,
        icon: cat?.icon,
      })
    }
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFileChange = async (event: any) => {
    const b64Image = await toB64(event.target.files[0])
    this.setState({ [event.target.name]: b64Image })
  }

  handleSave = () => {
    if (this.props.location.pathname === '/category/new' ) {
      store.createACate(this.state)
        .then(() => this.props.history.push('/admin'))
    } else {
      store.updateACate(this.state)
        .then(() => this.props.history.push('/admin'))
    }
  }

  render () {
    return (
      <div className="full-screen w-full flex justify-center items-center">
        <div className="shadow-lg sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-gray-800 space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    className="bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 text-white"
                    placeholder="Your category name"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">Icon</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-white"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-white">
                    <label
                      htmlFor="icon"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="icon" name="icon" type="file" className="sr-only" onChange={this.handleFileChange} accept="image/png, image/jpeg" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-800 text-right sm:px-6">
            <button
              onClick={this.handleSave}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  }
}
