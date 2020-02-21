import { CurrentUserDomain } from './domain'
import { StoreState } from './types'
import { setUser } from './events'

const initialState = {
  currentUser: undefined,
}

export const store = CurrentUserDomain.store<StoreState>(initialState).on(
  setUser,
  (state, payload) => {
    return {
      ...state,
      currentUser: payload,
    }
  }
)
