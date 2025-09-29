import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/jwtUtil';

function AuthRedirectRoute({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setIsAuth(result);
      setAuthChecked(true);
    };

    checkAuth();
  }, []);

  if (!authChecked) {
    return <div>Loading...</div>; // Or null
  }

  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AuthRedirectRoute;
