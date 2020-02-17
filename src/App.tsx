import React from 'react'
import { Router } from '@reach/router'

import { Home } from 'pages/Home'
import { Login } from 'pages/Login'
import { Signup } from 'pages/Signup'

function App() {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Signup path="/register" />
    </Router>
  )
}

export default App
