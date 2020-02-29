import React from 'react'
import { Router } from '@reach/router'
import { ToastProvider, useToasts } from 'react-toast-notifications'

import { init } from 'services/notifications'

import { Home } from 'pages/Home'
import { Login } from 'pages/Login'
import { Signup } from 'pages/Signup'
import { Profile } from 'pages/Profile'

function App() {
  init(useToasts())

  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
      <Signup path="/register" />
      <Profile path="/profile" />
    </Router>
  )
}

export default () => (
  <ToastProvider>
    <App />
  </ToastProvider>
)
