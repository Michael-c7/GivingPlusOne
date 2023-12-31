import React from 'react'
import SearchInput from '../components/SearchInput'
import { IoSearch } from "react-icons/io5";

import { causeTypes } from '../misc/CauseTypes'
import { useStandardContext } from '../standard_context';
import { Link } from 'react-router-dom';


import defaultCoverImg from "../assets/images/defaultBackground.jpg"



const Search = () => {
  const { searchInputValue, setSearchInputValue, setUserId} = useStandardContext()
  const [currentPage, setCurrentPage] = React.useState(1)
  // amount of chanties to get
  const [amountToGet, setAmountToGet] = React.useState(25)

  const [charityData, setCharityData] = React.useState([])
  const [isCharityDataLoading, setIsCharityDataLoading] = React.useState(true)

  const [isError, setIsError] = React.useState(false)

  const [locationSearchInput, setLocationSearchInput] = React.useState("")

  // all the causes
  const [checkedItems, setCheckedItems] = React.useState({});

  const [cleanedCheckedItems, setCleanedCheckedItems] = React.useState([])

  // Handler function to update the state when a checkbox is clicked
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({ ...prevCheckedItems, [name]: checked }));
  }


  function generateUniqueKey() {
    // Date.now() provides a timestamp, ensuring uniqueness
    const timestamp = Date.now();
  
    // Math.random() generates a random number to further enhance uniqueness
    const random = Math.random();
  
    // Convert the combination to a string and remove the decimal point
    const key = `${timestamp}${random}`.replace('.', '');
  
    return key;
  }
  

  // console.log(searchInputValue)
  // get value from location search & causes checkboxes

  async function fetchData() {
    let baseSearchUrl = "https://partners.every.org/v0.2/search/"
    let address = `address=${locationSearchInput}`

    let causes = `causes=${cleanedCheckedItems.join(",")}`
    console.log(cleanedCheckedItems.join(","))
    let url = `${baseSearchUrl}${searchInputValue}&${address}&causes=${causes}?apiKey=${import.meta.env.VITE_CHARITY_API_KEY}&take=${amountToGet}&page=${currentPage}`


    try {
      const response = await fetch(url);
      setIsCharityDataLoading(true)
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const { nonprofits } = data
      // console.log(nonprofits);
      setIsCharityDataLoading(false)
      setIsError(false)

      setCharityData(nonprofits)

    } catch (error) {
      setIsCharityDataLoading(false)
      setIsError(true)
      console.error('Error fetching data:', error.message);
    }
  }

  // React.useEffect(() => {
  //   console.log(checkedItems)
  // }, [checkedItems])


  React.useEffect(() => {
    fetchData()
  }, [searchInputValue, currentPage, locationSearchInput, checkedItems])




  React.useEffect(() => {
    // cleanedCheckedItems, setCleanedCheckedItems

    const filterTrueValues = (data) => {
      // Use Object.entries to get an array of [key, value] pairs
      return Object.entries(data)
        // Filter the pairs to include only those with true values
        .filter(([key, value]) => value === true)
        // Map the filtered pairs to get the names
        .map(([key]) => key);
    }

    // set clean for the causes filter http request
    setCleanedCheckedItems(filterTrueValues(checkedItems))

  }, [checkedItems])






  

  return (
    <div className=' bg-gray-100'>
    {/* container */}
      <div className='flex 2xl:mx-52 xl:mx-40  mx-4 py-8'>
        {/* Filter section */}
        <aside className='w-1/4 mr-8 p-4 bg-white rounded-sm'>
          <article>
            <h4 className='font-semibold'>Location</h4>
            <div className='flex flex-start items-center bg-gray-100 rounded-sm p-2 my-4 mx-2'>
              {/* search location */}
              <div className='text-black mx-2 text-xl' htmlFor="searchLocation"><IoSearch/></div>
              <input 
                type="text"
                name="searchLocation"
                id="searchLocation"
                className='bg-transparent text-black focus:outline-0 placeholder:text-gray-600 py-2 w-full'
                placeholder='Search for city or country'
                autoComplete="off"
                value={locationSearchInput}
                onChange={(e) => setLocationSearchInput(e.target.value)} 
              />
            </div>
          </article>
          <article>
            <h4 className='font-semibold mt-6'>Causes</h4>
            {causeTypes.map((item, index) => {
              return (
                <div 
                  key={index}className='flex px-2 my-4 select-none'>
                  <label htmlFor={item} className='flex-1'>{item}</label>
                  <input 
                    type="checkbox"
                    id={item}
                    name={item}
                     
                    checked={checkedItems[item.label]}
                    onChange={handleCheckboxChange}
                  />
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
              {/* searchInputValue, setSearchInputValue */}
              <input 
                type="text"
                name="search"
                id="search" 
                className='text-black bg-gray-100 focus:outline-0 placeholder:text-gray-600 py-2 w-full'
                placeholder='Explore charities'
                autoComplete="off"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
              />
            </div>
          </header>
          {/* main, where cards go */}
          <div className='grid lg:grid-cols-2 grid-cols-1 gap-6' key={() => generateUniqueKey()}>
            {/* Loading */}
            {isCharityDataLoading & charityData.length < 1 ? (
              <h1 className='font-semibold'>Loading...</h1>
            ) : ""}

            {/* No Results Found */}
            {!isCharityDataLoading & !isError & charityData.length < 1 ? (
              <div className='flex flex-col items-center'>
                <h1 className='font-semibold'>No Results Found</h1>
                <h2 className='my-2 '>Please refine your search and try again</h2>
              </div>
            ) : ""}
            
            {/* Error */}
            {isError ? (
              <div className='flex flex-col items-center'>
                <h1 className='font-semibold'>Error loading data</h1>
                <h2 className='my-2 '>If you'd like to see the app in action go to the how it work tab</h2>
                <Link to="/howItWorks" className='btn-main my-4'>App Demonstration</Link>
              </div>
            ) : ""}
            
            {/* Actual data */}
            {charityData.map((item) => {
              let defaultDescription = "We don't know a lot about them but we're sure their great. Click on the Details button to learn more information."

              return (
                <div key={item.ein} className='flex flex-col  bg-gray-100 shadow-[rgba(25,_25,_25,_0.10)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                  {/* img */}
                  <Link to={`/singleItem/${item.ein}`} onClick={() => setUserId(item.ein)}>
                    <img src={item.coverImageUrl || defaultCoverImg} alt={item.name || "cover image"} className='h-64 w-full object-cover'/>
                  </Link>
                  {/* info */}
                  <div className='p-4 flex flex-col justify-between flex-1'>
                    <div>
                      <div>
                        <h2 className='font-semibold text-xl mb-1'>{item.name || "Location unavailable"}</h2>
                        <h3 className='font-semibold'>{item.location || "Location unavailable"}</h3>
                      </div>

                      <div className='mt-6 mb-12'>
                        {item.description || defaultDescription}
                      </div>
                    </div>

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

          {/* Load more charities button, only show the btn when charities are loaded in */}
          {!isCharityDataLoading & !charityData.length < 1 ? (
            <div className='flex justify-center items-center p-4'>
              <button className='btn-secondary' onClick={() => setCurrentPage(currentPage + 1)}>Load more charities...</button>
            </div>
          ) : ""}
        </section>
      </div>
    </div>

  )
}

export default Search