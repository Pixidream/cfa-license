// ------ imports ------
// node modules
import React, { Component } from 'react'
import { observer } from 'mobx-react'

// svg
import Logo from '../assets/svg/atom.svg'

// interfaces
import { ISignupState } from '../interfaces/signup.interface'
import { Link, RouteComponentProps } from 'react-router-dom'

// store
import { store } from '../index'
import { withStore } from '../store/Store'

// helper
import { toB64 } from '../helpers/file.helper'

// ------- component ------
// @ts-ignore
@withStore
@observer
export class Signup extends Component<RouteComponentProps> {
  state: ISignupState = {
    fullName: null,
    pseudo: null,
    email: null,
    password: null,
    profilePicture: null
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleFileChange = async (event: any) => {
    const b64Image = await toB64(event.target.files[0])
    this.setState({ [event.target.name]: b64Image })
  }

  handleSave = () => {
    store.signUpUser(this.state, this.props.history)
  }

  render () {
    return (
      <section className="full-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center bg-login">
          <div className="absolute bg-black opacity-60 inset-0 z-0"/>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">STAY UPDATED ON THE LATEST DEV NEWS</h1>
            <p className="text-3xl my-4">NEVER MISS NEW TRENDS.</p>
            <p className="text-3xl my-4">SAVE TIME LIKE A PRO.</p>
            <p className="text-3xl my-4">BE PART OF A COMMUNITY.</p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 bg-purple-gradient from-red-900 to-purple-900">
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center bg-login">
            <div className="absolute bg-black opacity-60 inset-0 z-0"/>
          </div>
          <div className="w-96 py-6 z-20 flex items-center flex-col">
            <h1 className="my-6 flex justify-center items-center">
              <img src={Logo} alt="brand logo" className="w-auto h-14 sm:h-15 inline-flex" />
              <span className="font-semibold text-3xl ml-5">DEV BLOG</span>
            </h1>
            <div className="pb-2 pt-4">
              <input required={true} type="text" name="fullName" id="fullName" placeholder="Full Name"
                     className="block w-full p-4 text-lg transition duration-200 ease-in-out rounded-full hover:bg-gray-900 focus:bg-gray-900 bg-gray-800 bg-opacity-50" onChange={this.handleChange} />
            </div>
            <div className="pb-2 pt-4">
              <input required={true} type="text" name="pseudo" id="pseudo" placeholder="Pseudo"
                     className="block w-full p-4 text-lg transition duration-200 ease-in-out rounded-full hover:bg-gray-900 focus:bg-gray-900 bg-gray-800 bg-opacity-50" onChange={this.handleChange} />
            </div>
            <div className="pb-2 pt-4">
              <input required={true} type="email" name="email" id="email" placeholder="Email"
                     className="block w-full p-4 transition duration-200 ease-in-out text-lg rounded-full hover:bg-gray-900 focus:bg-gray-900 bg-gray-800 bg-opacity-50" onChange={this.handleChange} />
            </div>
            <div className="pb-2 pt-4">
              <input required={true} className="block transition duration-200 ease-in-out w-full p-4 text-lg hover:bg-gray-900 focus:bg-gray-900 rounded-full bg-gray-800 bg-opacity-50" type="password" name="password"
                     id="password" placeholder="Password" onChange={this.handleChange} />
            </div>
            <div className="pb-2 pt-4">
              <div className="overflow-hidden transition duration-200 ease-in-out bg-gray-800 hover:bg-gray-900 hover:bg-opacity-70 bg-opacity-50 rounded-full relative w-96 mb-6 cursor-pointer">
                <button
                  className="h-14 text-white font-bold py-2 px-4 w-full inline-flex items-center justify-center cursor-pointer">
                  <svg fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                  </svg>
                  <span className="ml-2">Profile Picture (max 50mb)</span>
                </button>
                <input className="top-3 right-5 cursor-pointer absolute block opacity-0 pin-r pin-t" type="file"
                       name="profilePicture" id="profilePicture" onChange={this.handleFileChange} accept="image/png, image/jpeg" />
              </div>
            </div>
            <div className="text-right text-gray-300 hover:underline hover:text-gray-100">
              <Link to='/login'>registered ? Login now !</Link>
            </div>
            <div className="px-4 pb-2 pt-4">
              <button
                className="transition duration-200 ease-in-out uppercase block w-96 p-4 text-lg rounded-full bg-purple-700 hover:bg-purple-800 focus:outline-none hover:bg-opacity-70 bg-opacity-50" onClick={this.handleSave}>sign
                in
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
