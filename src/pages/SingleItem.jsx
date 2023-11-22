import React from 'react'
import { useParams, Link } from 'react-router-dom'

const SingleItem = () => {
  const { itemId } = useParams()
  const [charityData, setCharityData] = React.useState([])
  const [isCharityDataLoading, setIsCharityDataLoading] = React.useState(true)

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
    <div className='bg-gray-100 min-h-[91.5vh]'>
      <div className=' mx-80 py-8'>
        {/* All info here, when we get more time make a proper layout */}
        <h1 className=' font-medium mb-4'>Charity Details</h1>
        {/* Actual details */}
        <div className='mx-4'>
          <h2 className=' text-2xl '>{charityData.name}</h2>
          <p className='text-2xl my-4'>
            <Link to={`${charityData.websiteUrl}`}>Website Link</Link>
          </p>
          <p className='text-2xl my-4'>{charityData.locationAddress}</p>
          <p className='text-2xl my-4'>{charityData.descriptionLong}</p>

          <Link className='text-2xl my-4' to={`https://www.every.org/${charityData.ein}#donate`}>Donate Link</Link>
          
        </div>

      </div>
    </div>
  )
}

export default SingleItem