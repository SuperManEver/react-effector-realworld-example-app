import * as React from 'react'
import { path } from 'ramda'
import { navigate } from '@reach/router'

import { Auth } from 'services/api'
import { AuthErrors, LoadableComponent } from 'typings'
import CurrentUser, { User } from 'services/currentUser'
import Common from 'services/common'

type RegisterPayload = {
  username: string
  email: string
  password: string
}

type ComponentRef = React.Component<any, any> & ErrorSetable & LoadableComponent

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
    this.enableLogin()

    try {
      const res = await this.interaction()

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

  interaction(): Promise<{ user: User }> {
    const { username, email, password } = this.payload

    return Auth.register(username, email, password)
  }

  enableLogin() {
    this.ref.enableLoading()
  }

  disableLoading() {
    this.ref.disableLoading()
  }

  setErrors(errors: AuthErrors) {
    this.ref.setErrors(errors)
  }
}
