import React from 'react'

import { WithHeader } from 'layout/WithHeader'

type IProps = {
  path: string
}

export function Home<Props>(props: Props) {
  return (
    <WithHeader>
      <div>Home Page</div>
    </WithHeader>
  )
}
