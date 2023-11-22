import React from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { useStandardContext } from '../standard_context';



const SearchInput = () => {
    const { searchInputValue, setSearchInputValue} = useStandardContext()
    const navigate = useNavigate()

    const handleInput = (e) => {
        e.preventDefault()

        if(searchInputValue) {
          navigate("/search")
        }
    }


  return (
    <div className='flex-center'> 
        <form onSubmit={handleInput} className='flex-center bg-white rounded-sm shadow-[rgba(50,_50,_50,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
            <label className='text-black mx-2 text-xl' htmlFor="search"><IoSearch/></label>
            <input type="text" name="search" id="search" className='text-black focus:outline-0' placeholder='Explore Causes' autoComplete="off" value={searchInputValue} onChange={(e) => setSearchInputValue(e.target.value)}/>
            <button type="submit" className='btn-main rounded-l-none'>Search</button>
        </form>
    </div>
  )
}

export default SearchInput