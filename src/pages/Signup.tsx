import React from 'react'
import { RouteComponentProps } from '@reach/router'

import { WithHeader } from 'layout/WithHeader'

type Props = RouteComponentProps

export function Signup<Props>(props: Props) {
  return (
    <WithHeader>
      <div>Signup</div>
    </WithHeader>
  )
}
