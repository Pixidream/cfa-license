// ------ imports ------
// node modules
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// interfaces
import { PostsPropsInterface, PostInterface, CategoryInterface } from '../../interfaces/home.interface'
import { IUser } from '../../interfaces/user.interface'

// store
import { store } from '../../index'
import { withStore } from '../../store/Store'

// ------ component ------
// @ts-ignore
@withStore
@observer
export class Posts extends Component<PostsPropsInterface> {

  filterPosts = (): PostInterface[] => {
    if (store.selectedCate) return store.posts.filter((post: PostInterface) => post.categoryId === store.selectedCate?._id)
    else return store.posts
  }

  handleCateClick = (id: string) => store.setSelectedCate(store.cate.find((cat: CategoryInterface) => cat._id === id))

  componentDidMount () {
    store.fetchPost()
    store.fetchUsers()
  }

  render () {
    dayjs.extend(relativeTime)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        { this.filterPosts().map((post: PostInterface) => (
          <div className="max-w-sm h-fit-content rounded overflow-hidden shadow-lg bg-gray-800" key={ post._id }>
            <img src={ post.cover } alt="post cover" className="w-full" />
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2 text-white cursor-pointer" onClick={() => this.props.history.push(`/post/${post._id}`)}>{ post.title }</h2>
              <p className="text-gray-400 text-base max-h-full max-w-full">{ post.description }</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="flex h-full items-center mb-5">
                <span className="pills cursor-pointer truncate" onClick={() => this.handleCateClick(post.categoryId)}>
                  #{ store.cate.find((cate: CategoryInterface) => cate._id === post.categoryId)?.name }
                </span>
                <div className="border-l-1 border-solid border-gray-300 bg-gray-300 w-px h-12 mr-3" />
                <div className="text-sm">
                  <p className="text-gray-300 leading-none">{ store.users.find((user: IUser) => user._id === post.authorId)?.fullName }</p>
                  <p className="text-gray-400 text-xs">last update: { dayjs(post.updated).fromNow() }</p>
                </div>
              </div>
            </div>
          </div>
        )) }
      </div>
    )
  }
}
