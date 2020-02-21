import { CurrentUserDomain } from './domain'
import { User } from './types'

export const setUser = CurrentUserDomain.event<User>()
export const clearUser = CurrentUserDomain.event<User>()
