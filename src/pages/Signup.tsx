import React from 'react'
import { RouteComponentProps, Link } from '@reach/router'
import { Formik, Form } from 'formik'
import { bind } from 'decko'
import * as Yup from 'yup'

import { LoadableComponent, AuthErrors } from 'typings'
import { InputField } from 'components/InputField'
import { ListErrors } from 'components/ListErrors'
import { RegisterOperation } from 'operations/RegisterOperation'
import { WithHeader } from 'layout/WithHeader'

type Props = RouteComponentProps

type State = {
  inProgress: boolean
  errors: AuthErrors
}

type AuthPayload = {
  username: string
  email: string
  password: string
}

export class Signup extends React.Component<Props, State>
  implements LoadableComponent {
  state: State = {
    inProgress: false,
    errors: {},
  }

  @bind
  setErrors(errors: AuthErrors) {
    this.setState({
      errors,
    })
  }

  @bind
  enableLoading() {}

  @bind
  disableLoading() {}

  @bind
  handleSubmit(values: AuthPayload) {
    RegisterOperation.run(this, values)
  }

  render() {
    const { inProgress, errors } = this.state

    return (
      <WithHeader>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            username: Yup.string()
              .min(6, 'Must be 6 characters or more')
              .required('Required'),
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
                          name="username"
                          type="text"
                          placeholder="batman_rules"
                        />
                      </fieldset>

                      <fieldset className="form-group">
                        <InputField
                          name="email"
                          type="email"
                          placeholder="test@test.com"
                        />
                      </fieldset>

                      <fieldset className="form-group">
                        <InputField name="password" type="password" />
                      </fieldset>

                      <button
                        className="btn btn-lg btn-primary pull-xs-right"
                        type="submit"
                        disabled={inProgress}
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
