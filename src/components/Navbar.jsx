import React from 'react'
import { Link } from 'react-router-dom'

import givingPlusOneLogo from "../assets/images/givingPlusOneLogo.svg"

const Navbar = () => {


  return (
    <nav>
      {/* container */}
      <div className='flex p-4  mx-36'>
        <Link to="/"  className='mr-auto'>
          <img src={givingPlusOneLogo} className="w-[90vw] max-w-[185px]" alt="givingPlusOne logo"/>
        </Link>
        {/* show input when not on the homepage */}
        <div>input here</div>

        {/* links */}
        <div className='ml-auto'>
          <Link to="about">About</Link>
          <Link to="howItWorks">How it Works</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar