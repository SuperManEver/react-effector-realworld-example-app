import { isNil } from 'ramda'

import { CommonDomain } from './domain'
import { StoreState } from './types'
import { setToken } from './events'

const JWT_NAME = 'jwt'

const initialState: StoreState = {
  token: window.localStorage.getItem(JWT_NAME) || undefined,
}

export const store = CommonDomain.store<StoreState>(initialState).on(
  setToken,
  (state, payload) => {
    return {
      ...state,
      token: payload,
    }
  }
)

store.watch(state => {
  const { token } = state

  if (!isNil(token)) {
    window.localStorage.setItem(JWT_NAME, token)
  } else {
    window.localStorage.removeItem(JWT_NAME)
  }
})
