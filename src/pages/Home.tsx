import React from 'react'
import { createEvent, createStore, createEffect } from 'effector'
import { useStore } from 'effector-react'
import { Auth } from 'services/api'
import * as Common from 'services/common'

import { WithHeader } from 'layout/WithHeader'

const loadUser = createEffect({
  handler: async ({ email, password }: { email: string; password: string }) => {
    const res = await Auth.login(email, password)

    return res.user
  },
})

const updateUser = createEvent<any>()

const userStore = createStore({ currentUser: { name: 'Bob' } })
  .on(loadUser.done, (state, payload) => {
    console.log(payload)

    return state
  })
  .on(updateUser, (state, diff) => {
    console.log('DATA: ', state, diff)

    return diff
  })

type IProps = {
  path: string
}

export function Home(props: IProps) {
  const { currentUser } = useStore(userStore)
  const { token } = useStore(Common.store)

  return (
    <WithHeader>
      <div>
        <div>Result</div>
        <p>{JSON.stringify(currentUser, null, 4)}</p>

        <div>
          <p>Token: {token}</p>
        </div>

        {/* <button onClick={handleRun}>Load</button> */}
      </div>
    </WithHeader>
  )
}
