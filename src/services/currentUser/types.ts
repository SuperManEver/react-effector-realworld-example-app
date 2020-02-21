export interface User {
  id: number
  email: string
  createdAt: string
  updatedAt: string
  username: string
  bio: string
  image: string
}

export interface StoreState {
  currentUser: User | undefined
}
