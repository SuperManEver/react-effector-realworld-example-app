import * as React from 'react'
import { navigate } from '@reach/router'

import { Auth } from 'services/api'
import CurrentUser from 'services/currentUser'

type LoginPayload = {
  email: string
  password: string
}

export class LoginOperation {
  ref: React.Component
  payload: LoginPayload

  constructor(ref: React.Component<any, any>, payload: LoginPayload) {
    this.ref = ref
    this.payload = payload
  }

  static run(ref: React.Component, payload: LoginPayload) {
    return new LoginOperation(ref, payload).run()
  }

  async run() {
    const { email, password } = this.payload

    try {
      const res = await Auth.login(email, password)
      CurrentUser.events.setUser(res.user)

      navigate('/')

      // TODO: save token to common store
    } catch (err) {
      console.error(err)
    }
  }
}
