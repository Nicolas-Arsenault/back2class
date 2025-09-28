import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../utils/jwtUtil'

function AuthRedirectRoute({children}) {

  if(isAuthenticated()){
    return <Navigate to="/dashboard" replace/>;
  }
  return children;
}

export default AuthRedirectRoute
