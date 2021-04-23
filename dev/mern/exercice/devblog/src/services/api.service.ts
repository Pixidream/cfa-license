// ------ imports ------
// axios
import { instance as axios } from '../axios/blog.axios'

// interfaces
import { ILoginState } from '../interfaces/login.interface'
import { ISignupState } from '../interfaces/signup.interface'
import { CategoryInterfaceState, PostInterfaceState } from '../interfaces/home.interface'

// ------ api services ------
export const fetchAll = (name: string) => {
  return axios.get( `${name}`)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const loginService = (login: ILoginState) => {
  return axios.post('auth/login', login)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const signUpService = (data: ISignupState) => {
  return axios.post('auth/signup', data)
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const createPost = (post: PostInterfaceState, token: string) => {
  return axios.post('posts', post, { headers: { Authorization: `Token ${token}` } })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const updatePost = (post: PostInterfaceState, token: string) => {
  return axios.put(`posts/${post._id}`, post, { headers: { Authorization: `Token ${token}` } })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const createCate = (cate: CategoryInterfaceState, token: string) => {
  return axios.post('categories', cate, { headers: { Authorization: `Token ${token}` } })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const updateCate = (cate: CategoryInterfaceState, token: string) => {
  return axios.put(`categories/${cate._id}`, cate, { headers: { Authorization: `Token ${token}` } })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const verifyToken = (token: string) => {
  return axios.get('auth/verify', { headers: { Authorization: `Token ${token}` } })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const getProfilePict = (pseudo: string) => {
  return axios.post('auth/pp', { pseudo })
    .then(res => res.data)
    .catch(err => {
      throw new Error(err)
    })
}

export const deletePost = (id: string, token: string) => {
  return axios.delete(`posts/${id}`, { headers: { Authorization: `Token ${token}` } })
}
export const deleteCate = (id: string, token: string) => {
  return axios.delete(`categories/${id}`, { headers: { Authorization: `Token ${token}` } })
}
