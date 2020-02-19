import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { RouteComponentProps, Link } from '@reach/router'

import { WithHeader } from 'layout/WithHeader'
import { InputField } from 'components/InputField'

type Props = RouteComponentProps

export function Login<Props>(props: Props) {
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
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2))
        }}
      >
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign In</h1>
                <p className="text-xs-center">
                  <Link to="/register">Need an account?</Link>
                </p>

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
