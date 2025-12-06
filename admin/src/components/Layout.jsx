import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useUIStore } from '../store/uiStore'
import Sidebar from './Sidebar'
import Header from './Header'
import './layout.css'

const Layout = () => {
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  useEffect(() => {
    // Initialize sidebar state on mount based on window width
    const initSidebarState = () => {
      if (typeof window !== 'undefined') {
        const shouldBeOpen = window.innerWidth > 900
        if (sidebarOpen !== shouldBeOpen) {
          setSidebarOpen(shouldBeOpen)
        }
      }
    }
    
    initSidebarState()

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const shouldBeOpen = window.innerWidth > 900
        if (sidebarOpen !== shouldBeOpen) {
          setSidebarOpen(shouldBeOpen)
        }
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen, setSidebarOpen])

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
