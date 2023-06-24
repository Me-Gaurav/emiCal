import React from 'react'
import { GiReceiveMoney } from 'react-icons/gi'

const Banner = () => {
  return (
    <div className='lg:w-1/2 bg-gray-900 flex justify-center items-center text-white'>
      <div className='flex flex-col justify-center items-center text-center space-y-3'>
        <GiReceiveMoney className='text-white text-9xl mb-5' />
        <h1 className='text-sky-600 font-bold text-4xl'>Welcome to EMI Calculator</h1>
        <p className=' mx-12 text-2xl'>EMI Calculator for Home Loan, Car Loan & Personal Loan in India</p>
      </div>
    </div>
  )
}

export default Banner