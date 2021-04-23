// ----- imports -----
// node modules
import { Disclosure,  Menu, Transition } from '@headlessui/react'
import { MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

// svg
import Logo from '../../assets/svg/atom.svg'

// store
import { store } from '../../index'
import { withStore } from '../../store/Store'

// interfaces
import { IHeader, IHeaderState, INavItem } from '../../interfaces/header.interface'


// ----- header ------
// @ts-ignore
@withStore
@observer
export class Header extends Component<IHeader> {
  state: IHeaderState = {
    navigation: [
      { name: 'Home', href: '/', current: this.props.location.pathname === '/', login: false, display: true },
      { name: 'Admin', href: '/admin', current: this.props.location.pathname === '/admin', login: true, display: true },
    ],
    isAuthenticated: false
  }

  private classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  componentWillMount () {
    store.autoLogin()
      .then(() => this.checkPermission())
  }

  componentDidUpdate (prevProps: Readonly<IHeader>, prevState: Readonly<{}>, snapshot?: any) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        navigation: [
          { name: 'Home', href: '/', current: this.props.location.pathname === '/', login: false, display: true },
          { name: 'Admin', href: '/admin', current: this.props.location.pathname === '/admin', login: true, display: true },
        ]
      })
      this.checkPermission()
    }
  }

  checkPermission = async () => {
    await store.checkLogin()

      .then(res => {
        // @ts-ignore
        this.setState({ isAuthenticated: res.verified })
      })
      .catch(() => this.setState({ isAuthenticated: false }))
  }

  handleSignOut = () => {
    store.signOut()
    this.props.history.push('/')
    this.checkPermission()

  }

  render () {
    return (
      <Disclosure as="nav" className="bg-gray-800">
        { ({ open }) => (
          <>
            <div className="px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/ }
                  <Disclosure.Button
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    { open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true"/>
                    ) : (
                      <MenuAlt2Icon className="block h-6 w-6" aria-hidden="true"/>
                    ) }
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={ Logo }
                      alt="dev blog logo"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src={ Logo }
                      alt="dev blog logo"
                    />
                    <Link to="/" className="ml-3 text-2xl font-semibold tracking-widest text-white">
                      DEV BLOG
                    </Link>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">

                      { !this.state.isAuthenticated ? this.state.navigation.filter((nav: INavItem) => !nav.login && nav.display).map((item) => (
                        <Link
                          key={ item.name }
                          to={ item.href }
                          className={ this.classNames(
                            item.current ? 'bg-gray-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          ) }
                          aria-current={ item.current ? 'page' : undefined }
                        >
                          { item.name }
                        </Link>
                      )) : this.state.navigation.filter((nav: INavItem) => nav.display).map((item: INavItem) => (
                        <Link
                          key={ item.name }
                          to={ item.href }
                          className={ this.classNames(
                            item.current ? 'bg-gray-600 text-white font-semibold' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          ) }
                          aria-current={ item.current ? 'page' : undefined }
                        >
                          { item.name }
                        </Link>
                      )) }
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  { !this.state.isAuthenticated ? (
                    <button
                      onClick={ () => this.props.history.push('/login') }
                      className="bg-gray-600 px-3 py-1.5 rounded text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      Login
                    </button>
                  ) : (
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={store.user?.profilePicture}
                                alt="profile"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    onClick={this.handleSignOut}
                                    className={this.classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  ) }
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                { this.state.navigation.map((item) => (
                  <a
                    key={ item.name }
                    href={ item.href }
                    className={ this.classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    ) }
                    aria-current={ item.current ? 'page' : undefined }
                  >
                    { item.name }
                  </a>
                )) }
              </div>
            </Disclosure.Panel>
          </>
        ) }
      </Disclosure>
    )
  }
}
