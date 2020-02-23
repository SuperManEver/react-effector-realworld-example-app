export type AuthErrors = { [k: string]: string[] }

export interface LoadableComponent {
  enableLoading(): void
  disableLoading(): void
}
