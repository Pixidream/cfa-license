// ------ imports ------
// node modules
import React, { Component } from 'react'
import { StoreContext } from '../../index'

// interfaces
import { PostsPropsInterface, PostInterface } from '../../interfaces/HomeInterface.interface'

// ------ component ------
export class Posts extends Component<PostsPropsInterface> {

  filterPosts = (): PostInterface[] => {
    if (new URLSearchParams(this.props.location.search).get('select_cate')) return this.props.posts.filter(post => post.categoryId === new URLSearchParams(this.props.location.search).get('select_cate'))
    else return this.props.posts
  }

  render () {
    return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      { this.filterPosts().map(post => (
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800" key={ post.id }>
            <img src={ post.cover } alt="post cover" className="w-full" />
            <div className="px-6 py-4">
              <h2 className="font-bold text-xl mb-2 text-white">{ post.title }</h2>
              <p className="text-gray-400 text-base">{ post.description }</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <div className="flex h-full items-center">
                <span className="pills">
                  #{ this.props.categories.find(cate => cate.id === post.categoryId)?.name }
                </span>
                <div className="border-l-1 border-solid border-gray-300 bg-gray-300 w-px h-12 mx-5" />
                <div className="text-sm">
                  <p className="text-gray-300 leading-none">{ post.author }</p>
                  <p className="text-gray-400">{ post.updated }</p>
                  <ul>
                    <StoreContext.Consumer>
                      { store.posts.map((value: string) => <li>{ value }</li>) }
                    </StoreContext.Consumer>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )) }
      </div>
    )
  }
}
