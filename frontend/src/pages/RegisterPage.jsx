import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import './RegisterPage.css'

import { useAuthStore } from '../context/authStore'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    try {
      console.log('Attempting to register with:', { name: formData.name, email: formData.email })
      
      // Register the user
      const registerResponse = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
      
      console.log('Registration successful:', registerResponse.data)
      
      // Automatically login after successful registration
      console.log('Attempting auto-login...')
      const loginResponse = await authService.login({
        email: formData.email,
        password: formData.password
      })
      
      console.log('Login successful:', loginResponse.data)
      setUser(loginResponse.data.user, loginResponse.data.token)
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error)
      console.error('Error response:', error.response)
      setError(error.response?.data?.message || error.message || 'Registration failed. Please check if the backend server is running.')
    }
  }
  
  const handleGoogleSignup = () => {
    // Placeholder for Google Sign-In integration
    alert('Google Sign-In will be integrated with Firebase or Google OAuth')
  }

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-form-container">
          <h2>Create Account</h2>
          <p className="subtitle">Sign up to get started</p>
          {error && <div className="error-message">{error}</div>}
          
          <button type="button" className="google-btn" onClick={handleGoogleSignup}>
            <i className="fab fa-google"></i>
            Sign up with Google
          </button>
          
          <div className="divider">
            <span>OR</span>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter your full name" 
                required 
                onChange={handleChange}
                value={formData.name}
              />
            </div>
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
                placeholder="Create a password" 
                required 
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm your password" 
                required 
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
            <button type="submit" className="submit-btn">Create Account</button>
          </form>
          <p className="form-footer">Already have an account? <Link to="/login" className="link">Login</Link></p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
