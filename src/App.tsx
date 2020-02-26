import React from 'react'
import { Router } from '@reach/router'

import { Home } from 'pages/Home'
import { Login } from 'pages/Login'
import { Signup } from 'pages/Signup'
import { Profile } from 'pages/Profile'

function App() {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Signup path="/register" />
      <Profile path="/profile" />
    </Router>
  )
}

export default App
