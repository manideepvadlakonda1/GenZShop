import { create } from 'zustand'

const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = '123456'

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('adminUser')) || null,
  isAuthenticated: !!localStorage.getItem('adminUser'),

  login: (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = { email: ADMIN_EMAIL, name: 'Admin' }
      localStorage.setItem('adminUser', JSON.stringify(user))
      set({ user, isAuthenticated: true })
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password' }
  },

  logout: () => {
    localStorage.removeItem('adminUser')
    set({ user: null, isAuthenticated: false })
  },
}))
