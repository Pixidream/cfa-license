// ------ imports ------
// node modules
import { makeAutoObservable } from 'mobx'
import { createContext, useContext } from 'react'
import { RouteComponentProps } from 'react-router-dom'

// interface
import {
  CategoryInterface,
  CategoryInterfaceState,
  PostInterface,
  PostInterfaceState
} from '../interfaces/home.interface'
import { IUser } from '../interfaces/user.interface'
import { ILoginState } from '../interfaces/login.interface'
import { ISignupState } from '../interfaces/signup.interface'

// service
import {
  fetchAll,
  getProfilePict,
  loginService,
  signUpService,
  verifyToken,
  deletePost,
  deleteCate,
  createPost,
  updatePost, createCate, updateCate
} from '../services/api.service'

// ------ store ------
export default class Store {
  posts: PostInterface[] = []
  cate: CategoryInterface[]  = []
  selectedCate: CategoryInterface | null | undefined = null
  user: IUser | null = null
  storageToken: string | null = localStorage.getItem('jwt')
  userCount: number = 0
  postCount: number = 0
  categoryCount: number = 0
  users: IUser[] = []

  constructor (posts: PostInterface[], cate: CategoryInterface[], selectedCate: CategoryInterface | null, user: IUser | null, storageToken: string | null, userCount: number,
               postCount: number, categoryCount: number, users: IUser[]) {
    makeAutoObservable(this)
  }

  fetchPost = async () => {
    await fetchAll('posts')
      .then(res => {
        this.posts = res
      })
      .catch(err => console.error(err))
  }
  getPostCount = async () => {
    await fetchAll('posts/count')
      .then(res => {
        this.postCount = res.postCount
      })
      .catch(err => console.error(err))
  }

  createAPost = async (post: PostInterfaceState) => {
    await createPost(post, this?.storageToken || '')
      .then(() => {
        this.fetchPost()
        this.getPostCount()
      })
      .catch(err => console.error(err))
  }
  updateAPost = async (post: PostInterfaceState) => {
    await updatePost(post, this?.storageToken || '')
      .then(() => {
        this.fetchPost()
        this.getPostCount()
      })
      .catch(err => console.error(err))
  }

  createACate = async (cate: CategoryInterfaceState) => {
    await createCate(cate, this?.storageToken || '')
      .then(() => {
        this.fetchCate()
        this.getCategoryCount()
      })
      .catch(err => console.error(err))
  }
  updateACate = async (cate: CategoryInterfaceState) => {
    await updateCate(cate, this?.storageToken || '')
      .then(() => {
        this.fetchCate()
        this.getCategoryCount()
      })
      .catch(err => console.error(err))
  }

  deleteAPost = async (id: string) => {
    await deletePost(id, this.storageToken || '')
      .then(() => {
        this.fetchPost()
          .then(() => {
            this.getPostCount()
          })
      })
      .catch(err => console.error(err))
  }

  fetchCate = async() => {
    await fetchAll('categories')
      .then(res => {
        this.cate = res
      })
      .catch(err => console.error(err))
  }
  getCategoryCount = async () => {
    await fetchAll('categories/count')
      .then(res => {
        this.categoryCount = res.categoryCount
      })
      .catch(err => console.error(err))
  }
  deleteACate = async (id: string) => {
    await deleteCate(id, this.storageToken || '')
      .then(() => {
        this.fetchCate()
          .then(() => {
            this.getCategoryCount()
          })
      })
      .catch(err => console.error(err))
  }

  setSelectedCate = (cate: CategoryInterface | undefined | null) => {
    this.selectedCate = cate
  }

  autoLogin = async () => {
    if (!this.user && !this.storageToken) return false
    else if (this.storageToken) {
      await verifyToken(this.storageToken)
        .then(async res => {
          this.user = res.user.data
          // @ts-ignore
          await getProfilePict(this.user.pseudo)
            .then(res => {
              // @ts-ignore
              this.user = { ...this.user, profilePicture: res.pp.profilePicture }
            })
            .catch(err => console.error(err))
        })
        .catch(() => false)
    }
  }

  checkLogin = async () => {
    if (!this.user && !this.storageToken) return false
    else if (this.storageToken) {
      let resolution: any = null
      await verifyToken(localStorage.getItem('jwt') || this.storageToken)
        .then(res => resolution = res)
        .catch(err => {
          throw new Error(err)
        })
      return resolution
    }
  }

  loginUser = async (login: ILoginState, history: RouteComponentProps['history']) => {
    await loginService(login)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        this.user = res.user
        this.storageToken = res.token
        history.push('/')
      })
      .catch(err => console.error(err))
  }

  signUpUser = async (data: ISignupState, history: RouteComponentProps['history']) => {
    await signUpService(data)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        this.user = res.user
        this.storageToken = res.token
        history.push('/')
      })
      .catch(err => console.error(err))
  }

  getUserCount = async () => {
    await fetchAll('users/count')
      .then(res => {
        this.userCount = res.userCount
      })
      .catch(err => console.error(err))
  }

  fetchUsers = async () => {
    await fetchAll('users')
      .then(res => {
        this.users = res
      })
  }

  signOut = () => {
    localStorage.removeItem('jwt')
    this.user = null
    this.storageToken = null
  }
}

// ------ store helpers ------
// @ts-ignore
const StoreContext = createContext()

export const StoreProvider = ({ children, store }: { children: any; store: any; }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

// hook to inject on functional components
export const useStore = () => useContext(StoreContext)

// HOC to use in store to any functional or class component
export const withStore = (Component: any) => (props: any) => {
  return <Component { ...props } store={useStore()} />
}
