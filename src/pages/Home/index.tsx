import React from 'react'
import { useStore } from 'effector-react'
import { isLoggedIn } from 'services/currentUser'

import { WithHeader } from 'layout/WithHeader'

import Banner from './Banner'

type IProps = {
  path: string
}

export function Home(props: IProps) {
  const loggedIn = useStore(isLoggedIn)

  return (
    <WithHeader>
      <div className="home-page">
        <Banner isLoggedIn={loggedIn} appName={'Test'} />

        <div className="container page">
          <div className="row">
            {/* <MainView /> */}

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                {/* <Tags tags={tags} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WithHeader>
  )
}
