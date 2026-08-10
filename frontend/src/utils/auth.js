import { useNavigate } from 'react-router-dom'

export const checkAuth = () => {
  const token = localStorage.getItem('token')
  return !!token
}

export const useAuthRedirect = () => {
  const navigate = useNavigate()

  const requireAuth = (callback, jobId = null) => {
    if (checkAuth()) {
      if (callback) callback()
    } else {
      // Store the job ID in localStorage to apply after login
      if (jobId) {
        localStorage.setItem('pendingJobApplication', jobId)
      }
      navigate('/login', { state: { from: window.location.pathname } })
    }
  }

  return { requireAuth }
} 