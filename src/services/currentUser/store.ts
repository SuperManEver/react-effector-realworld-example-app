import { createEffect } from 'effector'
import { isNil } from 'ramda'

import { CurrentUserDomain } from './domain'
import { StoreState } from './types'
import { setUser } from './events'

import { Auth } from 'services/api'
import { store as CommonStore } from 'services/common'

const initialState = {
  currentUser: undefined,
}

const fetchUser = createEffect({
  handler: async () => {
    const { user } = await Auth.current()

    return user
  },
})

// TODO: handle fail case
fetchUser.fail.watch(({ params, error }) => {
  console.error(params) // {name: 'zerobias'}
  console.error(error) // rejected value
})

fetchUser.done.watch(({ params, result }) => setUser(result))

export const store = CurrentUserDomain.store<StoreState>(initialState).on(
  setUser,
  (state, payload) => {
    return {
      ...state,
      currentUser: payload,
    }
  }
)

CommonStore.watch(async state => {
  const { token } = state

  if (!isNil(token)) {
    await fetchUser()
  }
})
