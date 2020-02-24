import * as React from 'react'
import { path } from 'ramda'
import { navigate } from '@reach/router'

import { Auth } from 'services/api'
import { AuthErrors, LoadableComponent } from 'typings'
import CurrentUser, { User } from 'services/currentUser'
import Common from 'services/common'

type LoginPayload = {
  email: string
  password: string
}

type ComponentRef = React.Component<any, any> & ErrorSetable & LoadableComponent

interface ErrorSetable {
  setErrors(errors: AuthErrors): void
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

    this.enableLogin()

    try {
      const res = await Auth.login(email, password)

      CurrentUser.events.setUser(res.user)

      this.setToken(res)

      navigate('/')
    } catch (err) {
      const { response } = err

      const errors: AuthErrors | undefined = path(['body', 'errors'], response)

      if (errors) {
        this.setErrors(errors)
      }
    } finally {
      this.disableLoading()
    }
  }

  setToken(response: { user: User }) {
    const token: string | undefined = path(['user', 'token'], response)

    if (token) {
      Common.events.setToken(token)
    }
  }

  enableLogin() {
    this.ref.enableLoading()
  }

  disableLoading() {
    this.ref.disableLoading()
  }

  disableLogin() {}

  setErrors(errors: AuthErrors) {
    this.ref.setErrors(errors)
  }
}
