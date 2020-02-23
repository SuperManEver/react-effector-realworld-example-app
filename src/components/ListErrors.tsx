import * as React from 'react'

import { LoginErrors } from 'typings'

export function ListErrors(props: { errors: LoginErrors }) {
  const { errors } = props

  if (errors) {
    return (
      <ul className="error-messages">
        {Object.keys(errors).map(key => {
          return (
            <li key={key}>
              {key} {errors[key]}
            </li>
          )
        })}
      </ul>
    )
  } else {
    return null
  }
}
