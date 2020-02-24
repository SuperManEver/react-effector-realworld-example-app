export type AuthErrors = { [k: string]: string[] }

export interface LoadableComponent {
  enableLoading(): void
  disableLoading(): void
}

export interface WithAuthErrors<T> {
  setErrors(errors: T): void
}
