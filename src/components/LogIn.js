import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import Banner from '../customComponents/Banner'
import validation from '../utils/validation'

const SignUpForm = () => {
    const [formValues, setFormValues] = useState({ name: '', email: '', password: '', confirmPassword: '' })
    const [nameError, setNameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    // encrypting credetials
    var ciphertextUsername = CryptoJS.AES.encrypt(JSON.stringify(formValues.name), 'my-secret-key@123').toString();
    var ciphertextPassword = CryptoJS.AES.encrypt(JSON.stringify(formValues.password), 'my-secret-key@123').toString();

    const handleSubmit = (e) => {
        e.preventDefault()
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(formValues.name === ''){
            setNameError('Username is required')
        }
        if(formValues.email === ''){
            setEmailError('Email is required')
        } else if (!emailPattern.test(formValues.email)){
            setEmailError('Invalid email format')
        }
        if(formValues.password === ''){
            setPasswordError('Password is required')
        } else if (formValues.password.length < 8){
            setPasswordError('Password should contains minimum 8 characters')
        } else if (!passwordPattern.test(formValues.password)){
            setPasswordError('Password should contain a numeric value and an uppercase letter')
        }
        if(formValues.confirmPassword === ''){
            setConfirmPasswordError('Please confirm your password!')
        } else if (formValues.confirmPassword !== formValues.password){
            setConfirmPasswordError('Password did not matched')
        } else {
            localStorage.setItem('username', ciphertextUsername)
            localStorage.setItem('email', formValues.email)
            localStorage.setItem('password', ciphertextPassword)
            navigate('/logIn')
        }
       
    }

    return (
        <div className='lg:flex'>
            <Banner />
            <div className='lg:w-1/2'>
                <section className=" bg-gray-900">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-semibold text-center leading-tight tracking-tight md:text-2xl text-white">
                                    Create an Account
                                </h1>
                                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                    <div>
                                        <input type="text" value={formValues.name} name="name" onChange={handleInput} className="sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1" placeholder="Username" required="" />
                                        {nameError && <p className='text-[13px] text-red-400 -mb-4'>{nameError}</p>}
                                    </div>
                                    <div>
                                        <input type="email" value={formValues.email} name="email" onChange={handleInput} className="sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1" placeholder="Email" required="" />
                                        {emailError && <p className='text-[13px] text-red-400 -mb-4'>{emailError}</p>}
                                    </div>
                                    <div>
                                        <input type="password" value={formValues.password} name="password" onChange={handleInput} className="sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1" placeholder="Create your password" required="" />
                                        {passwordError && <p className='text-[13px] text-red-400 -mb-4'>{passwordError}</p>}
                                    </div>
                                    <div>
                                        <input type="password" value={formValues.confirmPassword} name="confirmPassword" onChange={handleInput} className="sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1" placeholder='Confirm your password' required="" />
                                        {confirmPasswordError && <p className='text-[13px] text-red-400 -mb-4'>{confirmPasswordError}</p>}
                                    </div>
                                    <button type="submit" className="w-full text-white bg-sky-800 hover:bg-sky-900  focus:ring-1 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default SignUpForm