import { CommonDomain } from './domain'
import { StoreState } from './types'
import { setToken } from './events'

const initialState: StoreState = {
  token: undefined,
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
