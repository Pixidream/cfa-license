// ------ imports ------
// node modules
import axios, { AxiosInstance } from 'axios'

// ------ instance ------
export const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/'
})
