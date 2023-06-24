import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'

const App = () => {
  const token = localStorage.getItem('username')
  return (
    <>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/signUp" Component={SignUp}/>
        <Route path="/logIn" Component={LogIn}/>
      </Routes>
    </>
  )
}

export default App