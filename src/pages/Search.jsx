import React from 'react'
import SearchInput from '../components/SearchInput'
import { IoSearch } from "react-icons/io5";

import { causeTypes } from '../misc/CauseTypes'
import { useStandardContext } from '../standard_context';
import { Link } from 'react-router-dom';



const Search = () => {
  const { searchInputValue, setSearchInputValue, setUserId} = useStandardContext()
  const [currentPage, setCurrentPage] = React.useState(1)
  // amount of chanties to get
  const [amountToGet, setAmountToGet] = React.useState(25)

  const [charityData, setCharityData] = React.useState([])

  // console.log(searchInputValue)
  // get value from location search & causes checkboxes

  async function fetchData() {
    let url = `https://partners.every.org/v0.2/search/pets?apiKey=${import.meta.env.VITE_CHARITY_API_KEY}&take=${amountToGet}&page=${currentPage}`


    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const { nonprofits } = data
      // console.log(nonprofits);
      setCharityData(nonprofits)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [searchInputValue])


  

  return (
    <div className=' bg-gray-100'>
    {/* container */}
      <div className='flex mx-80 py-8'>
        {/* Filter section */}
        <aside className='w-1/4 mr-8 p-4 bg-white rounded-sm'>
          <article>
            <h4 className='font-semibold'>Location</h4>
            <div className='flex-center bg-gray-100 rounded-sm px-2 my-4 mx-2'>
              {/* search location */}
              <div className='text-black mx-2 text-xl' htmlFor="searchLocation"><IoSearch/></div>
              <input type="text" name="searchLocation" id="searchLocation" className='text-black bg-gray-100 focus:outline-0 placeholder:text-gray-600 py-2' placeholder='Search location' autoComplete="off"/>
            </div>
          </article>
          <article>
            <h4 className='font-semibold mt-6'>Causes</h4>
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
          <header className='flex w-full bg-gray-100 my-4 justify-start items-center'>
            <div className='flex-center bg-gray-100 rounded-sm px-2 my-4 w-full'>
              {/* search location */}
              <div className='text-black mx-2 text-xl' htmlFor="search"><IoSearch/></div>
              <input type="text" name="search" id="search" className='text-black bg-gray-100 focus:outline-0 placeholder:text-gray-600 py-2 w-full' placeholder='Explore charities' autoComplete="off"/>
            </div>
          </header>
          {/* main, where cards go */}
          <div className='grid gap-8  '>
            {charityData.map((item, index) => {
            
              return (
                <div key={item.ein} className='bg-gray-100 shadow-[rgba(25,_25,_25,_0.10)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                  {/* img */}
                  <Link>
                    <img src={item.coverImageUrl} alt={item.name} className='min-w-full max-h-[20rem] object-cover'/>
                  </Link>
                  {/* info */}
                  <div className='p-4'>
                    <span>
                      <h2 className='font-semibold text-xl mb-1'>{item.name}</h2>
                      <h3 className='font-semibold'>{item.location}</h3>
                    </span>
                    <div className='mt-6 mb-12'>{item.description}</div>

                    {/* btns */}
                    <div className='flex justify-between items-center'>
                      <Link className='btn-main' to={`/singleItem/${item.ein}`} onClick={() => setUserId(item.ein)}>More Details</Link>
                      <Link className='btn-secondary' to={`https://www.every.org/${item.ein}#donate`}>Donate</Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load more charities button */}
          <div className='flex justify-center items-center p-4'>
            <button className='btn-secondary' onClick={() => setCurrentPage(currentPage + 1)}>Load more charities...</button>
          </div>
        </section>
      </div>
    </div>

  )
}

export default Search