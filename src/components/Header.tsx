import React from 'react'
import { Link } from '@reach/router'
import { useStore } from 'effector-react'
import { StoreState, store, User } from 'services/currentUser'

const LoggedOutView = () => {
  return (
    <ul className="nav navbar-nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
    </ul>
  )
}

type LoggedProps = {
  currentUser: User
}

const LoggedInView = (props: LoggedProps) => {
  if (props.currentUser) {
    const { currentUser } = props

    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose"></i>&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a"></i>&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            {currentUser.image && (
              <img
                src={props.currentUser.image}
                className="user-pic"
                alt={props.currentUser.username}
              />
            )}
            {props.currentUser.username}
          </Link>
        </li>
      </ul>
    )
  }

  return null
}

export function Header() {
  const { currentUser } = useStore<StoreState>(store)

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          conduit
        </Link>

        {currentUser ? (
          <LoggedInView currentUser={currentUser} />
        ) : (
          <LoggedOutView />
        )}
      </div>
    </nav>
  )
}
