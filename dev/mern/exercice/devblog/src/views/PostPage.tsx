// ------ imports ------
// node modules
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'

// interface
import { PostInterface } from '../interfaces/home.interface'

// store
import { store } from '../index'
import { withStore } from '../store/Store'
import { RouteComponentProps } from 'react-router-dom'

// ------ component ------
// @ts-ignore
@withStore
@observer
export class PostPage extends Component<RouteComponentProps> {
  state: PostInterface = {
    _id: '',
    title: '',
    description: '',
    cover: '',
    content: '',
    categoryId: '',
    authorId: '',
    created: '',
    updated: ''
  }

  componentDidMount () {
    store.fetchCate()
    store.fetchUsers()
    store.fetchPost()
      .then(() => {
        // @ts-ignore
        const post = store.posts.find(post => post._id === this.props.match.params.id)
        this.setState({
          id: post?._id,
          title: post?.title,
          description: post?.description,
          cover: post?.cover,
          content: post?.content,
          categoryId: post?.categoryId,
          authorId: post?.authorId,
          created: post?.created,
          updated: post?.updated
        })
      })
  }


  render () {
    return (
      <div className="full-screen flex items-center flex-col">
        <div className="h-64 w-3/4 mt-5 overflow-hidden relative">
          <img src={this.state.cover} className="absolute h-full w-full object-cover" />
        </div>
        <div className="flex justify-center items-center mt-5 text-white font-semibold text-xl">
          <div className="h-12 w-12 rounded-full relative mr-5">
            <img src={store.cate.find(cate => cate._id === this.state.categoryId)?.icon} className="absolute h-full w-full object-cover" />
          </div>
          <p>&bull; {store.cate.find(cate => cate._id === this.state.categoryId)?.name}</p>
          <div className="border-l-1 border-solid border-gray-300 bg-gray-300 w-px h-12 mx-5" />
          <div className="h-12 w-12 rounded-full relative mr-5">
            <img src={store.users.find(user => user._id === this.state.authorId)?.profilePicture} className="absolute h-full w-full object-cover" />
          </div>
          <p>&bull; {store.users.find(user => user._id === this.state.authorId)?.fullName}</p>
          <div className="border-l-1 border-solid border-gray-300 bg-gray-300 w-px h-12 mx-5" />
          <p>Created: { dayjs(this.state.created).format('D MMM YYYY') }</p>
          <p className="ml-5">Updated: { dayjs(this.state.updated).format('D MMM YYYY') }</p>
        </div>
        <div className="mt-10">
          <h2 className="text-white text-3xl font-bold">{this.state.title}</h2>
        </div>
        <div className="mt-5">
          <p className="font-semibold text-xl text-gray-200">{ this.state.description }</p>
        </div>
      </div>
    )
  }
}
