export async function isAuthenticated() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  // First do a quick local check for expiry so we avoid unnecessary backend calls
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp * 1000 < Date.now()) {
      return false;
    }
  } catch {
    return false;
  }

  // Then confirm token validity with backend
  try {
    const response = await fetch('/api/auth/verifytoken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }), // send token in JSON body
    });

    console.debug(response.body);

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
}
