import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { bind } from 'decko'
import { RouteComponentProps, Link } from '@reach/router'

import { AuthErrors } from 'typings'
import { WithHeader } from 'layout/WithHeader'
import { InputField } from 'components/InputField'
import { ListErrors } from 'components/ListErrors'
import { LoginOperation } from 'operations/LoginOperation'

type Props = RouteComponentProps
type State = {
  errors: AuthErrors
}

type AuthPayload = { email: string; password: string }

export class Login extends React.Component<Props, State> {
  state = {
    errors: {},
  }

  @bind
  setErrors(errors: AuthErrors): void {
    this.setState({
      errors,
    })
  }

  @bind
  handleSubmit(values: AuthPayload) {
    this.clearErrors()
    LoginOperation.run(this, values)
  }

  @bind
  clearErrors() {
    this.setState({
      errors: {},
    })
  }

  render() {
    const { errors } = this.state

    return (
      <WithHeader>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .min(8, 'Must be 8 characters or more')
              .required('Required'),
          })}
          onSubmit={this.handleSubmit}
        >
          <div className="auth-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Sign In</h1>
                  <p className="text-xs-center">
                    <Link to="/register">Need an account?</Link>
                  </p>

                  <ListErrors errors={errors} />

                  <Form>
                    <fieldset>
                      <fieldset className="form-group">
                        <InputField
                          name="email"
                          type="email"
                          placeholder="test@test.com"
                        />
                      </fieldset>

                      <fieldset className="form-group">
                        <InputField
                          name="password"
                          type="password"
                          placeholder="test@test.com"
                        />
                      </fieldset>

                      <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </fieldset>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Formik>
      </WithHeader>
    )
  }
}
