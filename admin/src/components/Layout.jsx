import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useUIStore } from '../store/uiStore'
import Sidebar from './Sidebar'
import Header from './Header'
import './layout.css'

const Layout = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  useEffect(() => {
    // Handle window resize to auto-adjust sidebar visibility
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const isDesktop = window.innerWidth > 900
        // Only set sidebar open on desktop, closed on mobile
        setSidebarOpen(isDesktop)
      }
    }

    // Call on mount
    handleResize()

    // Add listener for resizes
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setSidebarOpen])

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
