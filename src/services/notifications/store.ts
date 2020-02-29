import { createStore, createEvent } from 'effector'

import { ToastControls } from './types'

type State = {
  notifications: undefined | ToastControls
}

const initialState: State = {
  notifications: undefined,
}

export const init = createEvent<ToastControls>()
export const showError = createEvent<string>()

export const store = createStore(initialState)
  .on(init, (state, payload) => ({
    ...state,
    notifications: payload,
  }))
  .on(showError, (state, msg) => {
    if (state.notifications) {
      state.notifications.addToast(msg, {
        appearance: 'error',
        autoDismiss: true,
      })
    }

    return state
  })
