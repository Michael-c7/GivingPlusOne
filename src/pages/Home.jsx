import React from 'react'
import { IoSearch } from "react-icons/io5";


const Home = () => {
  return (
    <div id='homepage'>
      {/* <div className='absolute'>
        <h1>More than 1 million 501(c)(3) charities at your fingertips.</h1>
        <h2>What are you waiting for? Explore and support a cause that matters to you.</h2>
        <form>
          <label>icon</label>
          <input type="text" name="" id="" />
          <button type="submit" className='btn-main'>Search</button>
        </form>
      </div> */}


        
        <div className="header">
            {/* <!--Content before waves--> */}
            <div className="inner-header flex">
              <div>
              <h1  className=' font-semibold'>More than 1 million 501(c)(3) charities at your fingertips.</h1>
              <h2 className="mb-6">What are you waiting for? Explore and support a cause that matters to you.</h2>
              <div className='flex'> 
                <form className='flex bg-white rounded-sm'>
                  <label className='text-black mx-2 text-xl' htmlFor="search"><IoSearch/></label>
                  <input type="text" name="search" id="search" className=' text-black' placeholder='Explore Causes' />
                  <button type="submit" className='btn-main'>Search</button>
                </form>
              </div>

              </div>
            </div>
            
            {/* <!--Waves Container--> */}
            <div>
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
            {/* <!--Waves end--> */}
            
        </div>
        {/* <!--Header ends--> */}
        
        {/* <!--Content starts--> */}
        <footer className="content flex">
            <p>Made with &#9829; by Michael Carr</p>
        </footer>
        {/* <!--Content ends--> */}

    </div>
  )
}

export default Home