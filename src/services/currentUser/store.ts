import { createEffect } from 'effector'
import { isNil } from 'ramda'

import { CurrentUserDomain } from './domain'
import { StoreState } from './types'
import { setUser } from './events'

import { Auth } from 'services/api'
import { showError } from 'services/notifications'
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

fetchUser.fail.watch(() => {
  showError('Fetch user data failed')
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

export const isLoggedIn = store.map(state => {
  const { currentUser } = state

  return !isNil(currentUser)
})
