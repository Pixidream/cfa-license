// ------ imports ------
// node modules
import React, { Component } from 'react'
import { observer } from 'mobx-react'

// svg
import Logo from '../assets/svg/atom.svg'

// interfaces
import { ILoginState } from '../interfaces/login.interface'
import { Link, RouteComponentProps } from 'react-router-dom'

// store
import { store } from '../index'
import { withStore } from '../store/Store'

// ------- component ------
// @ts-ignore
@withStore
@observer
export class Login extends Component<RouteComponentProps> {
  state: ILoginState = {
    pseudo: null,
    password: null
  }

  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSave = () => {
    store.loginUser(this.state, this.props.history)
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
          <div className="w-full py-6 z-20">
            <h1 className="my-6 flex justify-center items-center">
              <img src={Logo} alt="brand logo" className="w-auto h-14 sm:h-15 inline-flex" />
              <span className="font-semibold text-3xl ml-5">DEV BLOG</span>
            </h1>
            <div className="pb-2 pt-4">
              <input required={true} type="text" name="pseudo" id="pseudo" placeholder="Pseudo"
                     className="block w-full p-4 text-lg rounded-full bg-gray-800 bg-opacity-50" onChange={this.handleChange} />
            </div>
            <div className="pb-2 pt-4">
              <input required={true} className="block w-full p-4 text-lg rounded-full bg-gray-800 bg-opacity-50" type="password" name="password"
                     id="password" placeholder="Password" onChange={this.handleChange} />
            </div>
            <div className="text-right text-gray-300 hover:underline hover:text-gray-100">
              <Link to="/signup">Not registered ? Signup now !</Link>
            </div>
            <div className="px-4 pb-2 pt-4">
              <button
                className="transition duration-200 ease-in-out uppercase block w-full p-4 text-lg rounded-full bg-purple-700 hover:bg-purple-800 focus:outline-none hover:bg-opacity-70 bg-opacity-50" onClick={this.handleSave}>sign
                in
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
