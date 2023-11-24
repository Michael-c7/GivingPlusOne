import React from 'react'
import { useParams, Link } from 'react-router-dom'

import defaultBgImage from "../assets/images/defaultBackground.jpg"
import defaultUserImage from "../assets/images/defaultUser.png"

const SingleItem = () => {
  const { itemId } = useParams()
  const [charityData, setCharityData] = React.useState([])
  const [charityTagData, setCharityTagData] = React.useState([])

  const [isCharityDataLoading, setIsCharityDataLoading] = React.useState(true)


  let defaultDescription = "The power lies not just in words but in actions. While they may not have provided a detailed description, their mystery only adds to the allure of what they're achieving. Imagine the excitement of unveiling the incredible initiatives and impactful projects they have in store!"


  async function fetchItemData() {
    let url = `https://partners.every.org/v0.2/nonprofit/${itemId}?apiKey=${import.meta.env.VITE_CHARITY_API_KEY}`


    try {
      const response = await fetch(url);
      setIsCharityDataLoading(true)
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // const { nonprofits } = data.data.nonprofit

      setIsCharityDataLoading(false)
      setCharityData(data.data.nonprofit)
      //  can also get the tags w/ data.data.nonprofitTags
      setCharityTagData(data.data.nonprofitTags[0].tagName)
      console.log(data.data.nonprofit)
    } catch (error) {
      setIsCharityDataLoading(false)
      console.error('Error fetching data:', error.message);
    }
  }

  React.useEffect(() => {
    fetchItemData()
  }, [])

  return (
    <div className='bg-gray-100 min-h-[100vh]'>
      <div className='mx-6  lg:mx-28 2xl:mx-80 py-8'>
        {/* Loading */}
        {isCharityDataLoading & charityData.length < 1 ? (
          <h1 className='font-semibold'>Loading...</h1>
        ) : ""}
        {/* Actual Data */}
        <header className='rounded-md shadow-md border border-gray-200 lg:flex flex-col'>
          {/* bg img */}
          <img className='min-h-[25rem] max-h-[25rem] w-full object-cover rounded-t-md' src={charityData.coverImageUrl || defaultBgImage}  alt='cover image'/>
          {/*  heading profile info */}
          <div className='flex items-center py-6 px-10'>
            <img className='w-24 h-24 rounded-full border p-1 border-gray-200' src={charityData.logoUrl || defaultUserImage}  alt='profile image'/>
            {/* name and short description */}
            <div className='ml-4'>
              <h2 className='text-2xl font-semibold'>{charityData.name}</h2>
              <Link to={charityData.websiteUrl}>{charityData.websiteUrl}</Link>
            </div>
            {/* Btns */}
            <div className='ml-auto'>
            <Link className='btn-main mr-6' to={`https://www.every.org/${charityData.ein}#donate`}>Donate</Link>
            <Link className='btn-secondary' to={`${charityData.profileUrl}`}>Every Profile</Link>
            </div>
          </div>
        </header>

        {/* More info & google maps */}
        <div className='flex gap-12 my-8'>
          {/* More info */}
          <div className='flex-1 shadow-sm border-gray-200 border'>
            <header className='bg-gray-200 p-4 text-lg'>
              <span className='font-semibold'>About</span> <span>{charityData.name}</span>
            </header>

            <p className='py-6 px-8 border-b-2 border-gray-200 '>{charityData.descriptionLong || charityData.description || defaultDescription}</p>

            {/* the rest of the info  */}
            <div className='py-6 px-8 border-b-2 border-gray-200'>
              <span className='text-gray-600'>Location: </span>
              <span>{charityData.locationAddress?.toLowerCase()}</span>
            </div>

            <div className='py-6 px-8 border-b-2 border-gray-200'>
              <span className='text-gray-600'>Tags: </span>
              <span>{charityTagData}</span>
            </div>

            <div className='py-6 px-8 border-b-2 border-gray-200'>
              <span className='text-gray-600'>Ein: </span>
              <span>{charityData.ein}</span>
            </div>

            <div className='py-6 px-8 border-b-2 border-gray-200'>
              <span className='text-gray-600'>Ntee Code: </span>
              <span>{charityData.nteeCode}</span>
            </div>

            <div className='py-6 px-8 border-b-2 border-gray-200'>
              <span className='text-gray-600'>Ntee Meaning: </span>
              <span>{charityData.nteeCodeMeaning?.decileMeaning}</span>
            </div>
          </div>
          {/* embedded Google Maps location  */}
          <div className='flex-1 shadow-sm border-gray-200 border'>
            <div className='w-full h-full iframe-loader-gif'>
            <iframe src={`https://maps.google.com/maps?q=+${charityData.locationLatLng?.coordinates[1]}+${charityData.locationLatLng?.coordinates[0]}+&t=&z=15&ie=UTF8&iwloc=&output=embed`} className='w-full h-full'/>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SingleItem