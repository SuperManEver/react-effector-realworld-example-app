import * as React from 'react'
import { path } from 'ramda'
import { navigate } from '@reach/router'

import { Auth } from 'services/api'
import { LoginErrors } from 'typings'
import CurrentUser from 'services/currentUser'

type LoginPayload = {
  email: string
  password: string
}

type ComponentRef = React.Component<any, any> & ErrorSetable

interface ErrorSetable {
  setErrors(errors: LoginErrors): void
}

export class LoginOperation {
  ref: ComponentRef
  payload: LoginPayload

  constructor(ref: ComponentRef, payload: LoginPayload) {
    this.ref = ref
    this.payload = payload
  }

  static run(ref: ComponentRef, payload: LoginPayload) {
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
      const { response } = err

      const errors: LoginErrors | undefined = path(['body', 'errors'], response)

      if (errors) {
        this.setErrors(errors)
      }
    }
  }

  setErrors(errors: LoginErrors) {
    this.ref.setErrors(errors)
  }
}
