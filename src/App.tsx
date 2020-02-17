import React from 'react'
import { Router } from '@reach/router'

import { Home } from 'pages/Home'
import { Login } from 'pages/Login'
import { Signup } from 'pages/Signup'

import './App.css'

function App() {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Signup path="/" />
    </Router>
  )
}

export default App
