const API_BASE_URL = 'http://localhost:3000/api/v1'

export const login = async (email: string, password: string): Promise<{ auth_token: string; user: any }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Login failed')
    }

    const data = await response.json()
    localStorage.setItem('auth_token', data.auth_token) // Save token to localStorage
    return data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}