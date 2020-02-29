import * as React from 'react'

import { Auth } from 'services/api'
import { AuthErrors, LoadableComponent } from 'typings'
import { User } from 'services/currentUser'

import { AuthOperation } from './AuthOperation'

type LoginPayload = {
  email: string
  password: string
}

type ComponentRef = React.Component<any, any> & ErrorSetable & LoadableComponent

interface ErrorSetable {
  setErrors(errors: AuthErrors): void
}

export class LoginOperation extends AuthOperation<LoginPayload> {
  static run(ref: ComponentRef, payload: LoginPayload) {
    return new LoginOperation(ref, payload).run()
  }

  interaction(): Promise<{ user: User }> {
    const { email, password } = this.payload

    return Auth.login(email, password)
  }
}
