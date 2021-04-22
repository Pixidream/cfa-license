// ------ imports ------
// node modules
import React, { Component } from 'react'
import dayjs from 'dayjs'

// interfaces
import { CategoryInterface, PostInterface } from '../interfaces/HomeInterface.interface'
import { RouteComponentProps } from 'react-router-dom'


// internal component
import { SelectCate } from '../components/Home/SelectCate'
import { Posts } from '../components/Home/Posts'

// ------ component ------
export class Home extends Component<RouteComponentProps> {

  fetchCategories = (): CategoryInterface[] => {
    return  [
      { name: "Javascript", id: "4352", icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F6a%2FJavaScript-logo.png&f=1&nofb=1" },
      { name: "Python", id: "95432", icon: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F10%2FPython_logo_icon.png&f=1&nofb=1" },
      { name: "Tech", id: "549j5nj", icon: "https://www.flaticon.com/svg/vstatic/svg/1452/1452186.svg?token=exp=1618987210~hmac=7d4175ade4bf9ddf79024442c4c6ed29" }
    ]
  }

  fetchPosts = (): PostInterface[] => {
    return [
      { id: 'p4532r', title: 'title 1', description: 'a first super article', author: 'Francois Lavigne Marbach', created: dayjs().format('dd D MM YYYY - H:m'), updated: dayjs().format('dd D MM YYYY - H:m'), cover: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", content: "un super contenu", categoryId: "4352" },
      { id: 'p4532r', title: 'title 2', description: 'a second super article', author: 'Francois Lavigne Marbach', created: dayjs().format('dd D MM YYYY - H:m'), updated: dayjs().format('dd D MM YYYY - H:m'), cover: "https://images.unsplash.com/photo-1480497490787-505ec076689f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80", content: "un super contenu", categoryId: "95432" },
      { id: 'p4532r', title: 'title 3', description: 'a third  super article', author: 'Francois Lavigne Marbach', created: dayjs().format('dd D MM YYYY - H:m'), updated: dayjs().format('dd D MM YYYY - H:m'), cover: "https://images.unsplash.com/photo-1461301214746-1e109215d6d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80", content: "un super contenu", categoryId: "549j5nj" }
    ]
  }

  // rendering
  render () {
    // @ts-ignore
    return (
      <>
        <div className="flex w-screen  bg-gray-700 min-h-screen flex-col">
          <div className="py-10 px-20 w-full h-full">
            <SelectCate categories={ this.fetchCategories() } history={this.props.history} location={this.props.location} />
          </div>
          <hr className="w-2/3 mx-auto bg-gray-300 border-gray-300 text-gray-300"/>
          <div className="py-10 px-20 w-full h-full">
            <Posts posts={ this.fetchPosts() } categories={ this.fetchCategories() } location={this.props.location} />
          </div>
        </div>
      </>
    )
  }
}
