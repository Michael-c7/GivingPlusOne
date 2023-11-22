import React from 'react'
import SearchInput from '../components/SearchInput'
import { IoSearch } from "react-icons/io5";

import { causeTypes } from '../misc/CauseTypes'

const Search = () => {
  return (
    <div className=' bg-gray-100'>
    {/* container */}
      <div className='flex mx-80 py-8'>
        {/* Filter section */}
        <aside className='w-1/4 mr-8 p-4 bg-white rounded-sm'>
          <article>
            <h4 className='font-semibold'>Location</h4>
            <div className='flex-center bg-gray-100 rounded-sm'>
              <div className='text-black mx-2 text-xl' htmlFor="search"><IoSearch/></div>
              <input type="text" name="search" id="search" className='text-black bg-gray-100 focus:outline-0 placeholder:text-gray-600 py-2' placeholder='Search location' autoComplete="off"/>
            </div>
          </article>
          <article>
            <h4 className='font-semibold'>Causes</h4>
            {causeTypes.map((item, index) => {
              return (
                <div key={item} className='flex px-2  my-4  select-none'>
                  <label htmlFor={item} className='flex-1'>{item}</label>
                  <input type="checkbox" id={item} name={item} value={item} className=''/>
                </div>
              )
            })}
          </article>
        </aside>
        {/* main section */}
        <section className='flex-1 bg-white p-8 rounded-sm'>
          {/* head */}
          <header  className='flex w-full bg-slate-500'>
            <div className='flex-start bg-gray-100 rounded-sm w-full'>
              <div className='text-black mx-2 text-xl' htmlFor="search"><IoSearch/></div>
              <input type="text" name="search" id="search" className='text-black bg-gray-100 focus:outline-0 placeholder:text-gray-600 py-2' placeholder='Search location' autoComplete="off"/>
            </div>
          </header>
          {/* main */}
          <div>
            <p></p>CARDS GO HERE
          </div>
        </section>
      </div>
    </div>
  )
}

export default Search