import * as React from 'react'
import { path } from 'ramda'
import { navigate } from '@reach/router'

import { AuthErrors, LoadableComponent } from 'typings'
import CurrentUser, { User } from 'services/currentUser'
import Common from 'services/common'

type ComponentRef = React.Component<any, any> & ErrorSetable & LoadableComponent

interface ErrorSetable {
  setErrors(errors: AuthErrors): void
}

export class AuthOperation<T> {
  ref: ComponentRef
  payload: T

  constructor(ref: ComponentRef, payload: T) {
    this.ref = ref
    this.payload = payload
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
    throw Error('Should be implemented on specific implementation!')
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
