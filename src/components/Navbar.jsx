import React from 'react'
import { Link,  useLocation } from 'react-router-dom'

import givingPlusOneLogo from "../assets/images/givingPlusOneLogo.svg"
import SearchInput from './SearchInput'



const Navbar = () => {
  const location = useLocation()
  // hide on the homepage because the homepage has a search bar on it already
  let isNavbarSearchInputShown = location.pathname === "/"

  return (
    <nav className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
      {/* container */}
      <div className='flex  flex-col sm:flex-row  justify-between items-center p-6 mx-12'>
        <Link to="/"  className=''>
          <img src={givingPlusOneLogo} className="w-[90vw] max-w-[185px]" alt="givingPlusOne logo"/>
        </Link>
        {/* show input when not on the homepage */}
        {/* <div className={isNavbarSearchInputShown ? "hidden" : "block"}>
          <SearchInput />
        </div> */}

        {/* links */}
        <div className=' sm:mt-0 mt-2'>
          <Link to="/">Home</Link>
          <Link to="about" className='mx-6'>About</Link>
          <Link to="howItWorks">How it Works</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar