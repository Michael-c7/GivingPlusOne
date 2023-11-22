import React from 'react'

import aboutImage from "../assets/images/aboutImage.svg"
import { Link } from 'react-router-dom'

const About = () => {

  return (
    <div className="min-h-[100vh] text-center flex flex-row justify-center items-start lg:items-center lg:mt-0 mt-10">
    <p className='max-w-[90%] lg:max-w-[60vh] text-2xl mr-0 lg:mr-6'>
    Welcome to GivingPlusOne, a website dedicated to helping donors find and support high-impact charities.
Since a few days ago, we have been providing in-depth information and evaluations of charities, empowering donors to make informed decisions about where to give their money. We believe that transparency and accountability are essential to building trust in the charitable sector and ensuring that donor support is used effectively.
    </p>
    <img src={aboutImage} className="max-w-[525px] hidden lg:block" alt="programmer Image"/>
  </div>
  )
}

export default About