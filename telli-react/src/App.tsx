import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import RegisterForm from './components/RegisterForm'
import LogInForm from './components/LogInForm'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<RegisterForm />}></Route>
          <Route path="/login" element={<LogInForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
