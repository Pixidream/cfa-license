// ------ imports ------
// node modules
import React, { Component } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon, XIcon } from '@heroicons/react/outline'

// interfaces
import { CategoryInterface, SelectCateStateInterface, SelectCatePropsInterface } from '../../interfaces/HomeInterface.interface'

// ------ component ------
export class SelectCate extends Component<SelectCatePropsInterface, SelectCateStateInterface> {
  state: SelectCateStateInterface = {
    selectedCategory: this.props.categories.find(cate => cate.id === new URLSearchParams(this.props.location.search).get('select_cate')) || null
  }

  setSelectedCategory = (value: CategoryInterface) => {
    this.setState({
      selectedCategory: value
    })
    const params = new URLSearchParams()
    if (value) params.append('select_cate', value.id)
    else params.delete('select_cate')
    this.props.history.push({ search: params.toString() })
  }

  classNames = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
  }

  renderCatIcon = () => {
    if (this.state.selectedCategory?.icon) return (<img src={ this.state.selectedCategory?.icon } alt="categorie icon" className="flex-shrink-0 h-6 w-6 rounded-full"/>)
    else return (<div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-600 animate-pulse" />)
  }

  clearSelected = (e: any) => {
    e.stopPropagation()
    this.setState({
      selectedCategory: null
    })
    const params = new URLSearchParams()
    params.delete('select_cate')
    this.props.history.push({ search: params.toString() })
  }

  render () {
    return (
      <Listbox value={ this.state.selectedCategory } onChange={ this.setSelectedCategory }>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium text-white">Filter by categories: </Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button
                className={ this.classNames(open ? 'rounded-t-md' : 'rounded-md', 'relative w-52 bg-gray-500 shadow-sm pl-3 pr-10 py-2 text-left text-white cursor-default focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 sm:text-sm') }
              >
                <span className="flex items-center">
                  { this.renderCatIcon() }
                  <span className="ml-3 block truncate">{ this.state.selectedCategory?.name || 'Categories' }</span>
                </span>
                <span className="ml-3 absolute inset-y-0 right-5 flex items-center pr-2 pointer-events-none" onClick={ this.clearSelected }>
                  <XIcon className="h-5 w-5 text-white" />
                </span>
                <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-white" />
                </span>
              </Listbox.Button>
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
                  { this.props.categories.map(cat => (
                    <Listbox.Option
                      key={ cat.id }
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
