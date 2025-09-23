import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage.jsx'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupPage from './Pages/SignupPage.jsx'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element = {<HomePage/>}/>
      <Route path='/Login' element = {<LoginPage/>}/>
      <Route path='/Signup' element = {<SignupPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
