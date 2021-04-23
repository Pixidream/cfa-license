// ------ imports ------
// node modules
import React, { Component } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/outline'

// interfaces
import { CategoryInterface, SelectCateStateInterface } from '../../interfaces/home.interface'
import { withStore } from '../../store/Store'
import { observer } from 'mobx-react'

// store
import { store } from '../../index'

// ------ component ------
// @ts-ignore
@withStore
@observer
export class SelectCate extends Component<any, SelectCateStateInterface> {

  componentDidMount () {
    store.fetchCate()
  }


  setSelectedCategory = (value: CategoryInterface) => {
    store.setSelectedCate(value)
  }

  classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  renderCatIcon = () => {
    if (store.selectedCate?.icon) return (<img src={ store.selectedCate?.icon } alt="categorie icon" className="flex-shrink-0 h-6 w-6 rounded-full"/>)
    else return (<div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-600 animate-pulse" />)
  }

  render () {
    return (
      <Listbox value={ store.selectedCate } onChange={ this.setSelectedCategory }>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-white">Filter by categories: </Listbox.Label>
            <div className="mt-1 relative">
              <div className="flex">
                <Listbox.Button
                  className={ this.classNames(open ? 'rounded-tl-md' : 'rounded-l-md', 'relative w-52 bg-gray-500 shadow-sm pl-3 pr-10 py-2 text-left text-white cursor-default focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 sm:text-sm') }
                >
                  <span className="flex items-center">
                    { this.renderCatIcon() }
                    <span className="ml-3 block truncate">{ store.selectedCate?.name || 'Categories' }</span>
                  </span>
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <SelectorIcon className="h-5 w-5 text-white" />
                  </span>
                </Listbox.Button>
                <div
                  onClick={() => store.setSelectedCate(null)}
                  className="relative w-8 rounded-r-md bg-gray-500 shadow-sm text-right cursor-pointer text-white cursor-default focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 sm:text-sm"
                >
                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <XIcon className="h-5 w-5 text-white" />
                  </span>
                </div>
              </div>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  static
                  className="absolute w-52 bg-gray-500 shadow-lg max-h-56 rounded-b-md py-1 text-base text-white ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                >
                  { store.cate.map((cat: CategoryInterface) => (
                    <Listbox.Option
                      key={ cat._id }
                      className={ ({ active }) =>
                        this.classNames(
                          active ? 'text-white bg-gray-600' : 'text-white',
                          'cursor-default select-none relative  py-2 pl-3 pr-9'
                        )
                      }
                      value={ cat }
                    >
                      { ({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <img src={ cat.icon } alt="categorie icon" className="flex-shrink-0 h-6 w-6 rounded-full"/>
                            <span className={ this.classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate') }>{ cat.name }</span>
                          </div>
                          { selected ? (
                            <span className={this.classNames(active ? 'text-white' : 'text-purple-600',  'absolute inset-y-0 right-0 flex items-center pr-4')}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ): null }
                        </>
                      ) }
                    </Listbox.Option>
                  )) }
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>
    )
  }
}
