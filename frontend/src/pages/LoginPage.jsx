import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import { useAuthStore } from '../context/authStore'
import './LoginPage.css'

const LoginPage = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await authService.login(formData)
      setUser(response.data.user, response.data.token)
      navigate('/')
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed')
    }
  }

  const handleGoogleLogin = () => {
    // Placeholder for Google Sign-In integration
    alert('Google Sign-In will be integrated with Firebase or Google OAuth')
  }

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-form-container">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>
          {error && <div className="error-message">{error}</div>}
          
          <button type="button" className="google-btn" onClick={handleGoogleLogin}>
            <i className="fab fa-google"></i>
            Sign in with Google
          </button>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                required 
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                required 
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button type="submit" className="submit-btn">Login</button>
          </form>
          <p className="form-footer">Don't have an account? <Link to="/register" className="link">Sign Up</Link></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
