import { Navigate, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { UserAuth } from '../services/auth-service'

export default function AuthRoute({ children }) {
  const { user } = UserAuth()
  const location = useLocation()

  if (user && (location.pathname === '/' || location.pathname === '/register')) {
    return <Navigate to="/" />
  }
  return children
}

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired
}
