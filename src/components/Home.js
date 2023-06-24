import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const [downPayment, setDownPayment] = useState('')
    const [loanAmount, setLoanAmount] = useState('')
    const [loanTenure, setLoanTenure] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [emi, setEmi] = useState()
    const [totalInterest, setTotalInterest] = useState('')
    const [currency, setCurrency] = useState('Choose your currency')
    const [res, setRes] =  useState()

    const navigate = useNavigate()

    //checking user logged in or not
    useEffect(() => {
        if (localStorage.getItem("username") === null) {
            navigate('/signUp')
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        let remainingAmount = loanAmount - downPayment
        let interest = (remainingAmount * interestRate) / 100
        let totalAmt = remainingAmount + interest
        let totalEmi = totalAmt / loanTenure
        let totalInterestToPay = interest * loanTenure
        setEmi(totalEmi.toFixed(2))
        setTotalInterest(totalInterestToPay.toFixed(2))
    }

    const handleCurrencyChange = (e) =>{
        setCurrency(e.target.value)
        var myHeaders = new Headers();
        myHeaders.append("apikey", "21CJjUJenIsAcZ45tsgOyn34XeXQHzpP");
        
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        };
        
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${e.target.value}&from=INR&amount=${emi}`, requestOptions)
          .then(response => console.log(response.text()))
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
     
    }


    return (
        <div className='bg-gray-900 pb-10'>
            <header className='flex justify-between py-3 px-10 items-center bg-sky-600'>
                <div className='text-white text-3xl font-semibold tracking-wider uppercase font-mono'>EMI Calculator</div>
            </header>
            <div className='md:flex md:space-x-14 px-8 sm:px-14 md:px-14'>
                <form className='w-full sm:w-2/3 md:w-2/3 space-y-8 py-10' onSubmit={handleSubmit}>
                    <div className='flex flex-col space-y-4'>
                        <div className='space-x-7 flex '>
                            <div>
                                <input type='number' value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className='w-60 sm:text-sm rounded-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1'></input>
                                <span className='bg-gray-500 py-2 px-3.5 border border-gray-400 text-white'>&#8377;</span>
                            </div>
                            <label className='text-2xl text-white'>Loan Amount</label>
                        </div>
                        <input type='range' min={1000} max={100000} value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className='w-full'></input>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div className='space-x-7 flex'>
                            <div>
                                <input type='text' value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className='w-60 sm:text-sm rounded-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1'></input>
                                <span className='bg-gray-500 py-2 px-3.5 border border-gray-400 text-white'>&#8377;</span>
                            </div>
                            <label className='text-2xl text-white'>Down Payment</label>
                        </div>
                        <input type='range' value={downPayment} onChange={(e) => setDownPayment(e.target.value)} min={0} max={loanAmount} className='w-full'></input>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div className='space-x-7 flex'>
                            <div>
                                <input type='text' value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className='w-60 sm:text-sm rounded-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1'></input>
                                <span className='bg-gray-500 py-2 px-3 border border-gray-400 text-white'>%</span>
                            </div>
                            <label className='text-2xl text-white'>Interest Rate</label>
                        </div>
                        <input type='range' value={interestRate} onChange={(e) => setInterestRate(e.target.value)} min={0} max={40} className='w-full'></input>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div className='space-x-7'>
                            <input type='number' value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} className='w-60 sm:text-sm rounded-sm p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1'></input>
                            <label className='text-2xl text-white'>Loan Tenure <span className='text-sm'>/ in months</span></label>
                        </div>
                        <input type='range' value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} className='w-full'></input>
                    </div>
                    <div className='sm:flex md:flex sm:space-x-7 md:space-x-7 px-7 space-y-2 sm:space-y-0 md:space-y-0'>
                        {/* <button className='w-full bg-sky-600 text-white font-semibold rounded-sm px-20 py-3 hover:bg-sky-700' onClick={handleReset}>Reset</button> */}
                        <button className='w-full bg-orange-600 text-white font-semibold rounded-sm px-20 py-3 hover:bg-orange-700' type='submit'>Calculate EMI</button>
                    </div>
                </form>
                <div className='bg-gray-700 flex flex-col justify-center h-full mt-16 items-center py-28 space-y-6 w-full sm:w-1/3 md:w-1/3 font-medium'>
                    <div className=' flex flex-col items-center space-y-2 border border-white border-dashed py-3 w-60'>
                        <span className='text-white text-2xl'>EMI</span>
                        <span className='text-white text-4xl'>{emi}</span>
                    </div>
                    <div className='flex flex-col items-center space-y-2 border border-white border-dashed py-3 w-60'>
                        <span className='text-white text-2xl'>Total Interest</span>
                        <span className='text-white text-4xl'>{totalInterest}</span>
                    </div>
                    <div>
                        <select value={currency} onChange={handleCurrencyChange} className='bg-gray-400 px-7 py-2 rounded-sm border'>
                            <option>Choose your currency</option>
                            <option>INR</option>
                            <option>USD</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home