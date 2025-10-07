export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem('token') 
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || `API error: ${res.status}`)
  }

  return res.json()
}
