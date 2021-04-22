// ------ imports ------
// node modules
import { makeAutoObservable } from 'mobx'

// ------ store ------
class Store {
  posts = []

  constructor () {
    makeAutoObservable(this)
  }

  fetchPost =  () => {
    this.posts.push('bonjour')
  }
}

export const StoreInstance = new Store()
