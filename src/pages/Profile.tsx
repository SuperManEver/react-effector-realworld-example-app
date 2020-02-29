import React, { useEffect, useState } from 'react'
import { isEmpty } from 'ramda'
import { RouteComponentProps } from '@reach/router'
import { Auth } from 'services/api'

import { WithHeader } from 'layout/WithHeader'

export function Profile(props: RouteComponentProps) {
  const [user, setUser] = useState({})

  useEffect(() => {
    async function run() {
      try {
        const { user } = await Auth.current()

        setUser(user)
      } catch (err) {
        console.error(err)
      }
    }

    run()
  }, [])

  return (
    <WithHeader>
      <div>
        <p>Profile</p>
        {isEmpty(user) ? 'No User' : <div>{JSON.stringify(user, null, 4)}</div>}
      </div>
    </WithHeader>
  )
}
