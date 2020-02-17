import React from 'react'

import { Header } from 'components/Header'

type Props = {
  children: React.ReactElement<any>
}

export function WithHeader({ children }: Props) {
  return (
    <>
      <Header />
      <div className="container page">{children}</div>
    </>
  )
}
