// ------ imports ------
// node modules
import React from 'react'
import { HeartIcon } from '@heroicons/react/outline'

// ------ footer ------
export const Footer = () => (
    <div className="w-full text-center pin-b bg-gray-800 h-16 flex justify-center items-center text-white flex-row">
      <p>Developed with <HeartIcon className="text-red-600 h-5 w-5 mb-1 inline-block" /> in Paris &bull; <a href="https://studiopixidream.com" className="font-semibold text-red-600">Studio Pixidream</a> &bull; 2021</p>
    </div>
)
