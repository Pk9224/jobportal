import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
          const res = await axios.get('http://localhost:5000/api/auth/me', config)
          setUser(res.data)
        }
      } catch (error) {
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', userData)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  }

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', userData)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      return res.data
    } catch (error) {
      throw error.response.data
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = {
    user,
    loading,
    register,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 