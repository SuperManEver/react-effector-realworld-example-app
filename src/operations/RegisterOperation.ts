import * as React from 'react'
import { path } from 'ramda'
import { navigate } from '@reach/router'

import { Auth } from 'services/api'
import { AuthErrors } from 'typings'
import CurrentUser from 'services/currentUser'

type RegisterPayload = {
  username: string
  email: string
  password: string
}

type ComponentRef = React.Component<any, any> & ErrorSetable

interface ErrorSetable {
  setErrors(errors: AuthErrors): void
}

export class RegisterOperation {
  ref: ComponentRef
  payload: RegisterPayload

  constructor(ref: ComponentRef, payload: RegisterPayload) {
    this.ref = ref
    this.payload = payload
  }

  static run(ref: ComponentRef, payload: RegisterPayload) {
    return new RegisterOperation(ref, payload).run()
  }

  async run() {
    const { username, email, password } = this.payload

    try {
      const res = await Auth.register(username, email, password)

      CurrentUser.events.setUser(res.user)

      navigate('/')

      // TODO: save token to common store
    } catch (err) {
      const { response } = err

      console.log(response)

      const errors: AuthErrors | undefined = path(['body', 'errors'], response)

      if (errors) {
        this.setErrors(errors)
      }
    }
  }

  setErrors(errors: AuthErrors) {
    this.ref.setErrors(errors)
  }
}
