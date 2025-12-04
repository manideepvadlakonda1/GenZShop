import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      
      setUser: (user, token) => {
        // Save to zustand store
        set({ user, token })
        // Also save token directly to localStorage for axios interceptor
        if (token) {
          localStorage.setItem('token', token)
        }
      },
      
      logout: () => {
        set({ user: null, token: null })
        localStorage.removeItem('token')
      },
      
      isAuthenticated: () => {
        const state = get()
        return !!state.token
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
