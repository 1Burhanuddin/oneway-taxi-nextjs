'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'

interface AdminLayoutClientProps {
  admin: {
    username: string
  }
  children: React.ReactNode
}

export default function AdminLayoutClient({ admin, children }: AdminLayoutClientProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarExpanded(false)
      } else {
        setSidebarExpanded(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar admin={admin} />
      
      {/* Main content area with responsive margin for sidebar */}
      <div className="lg:ml-16 transition-all duration-300">
        <main className="p-4 pt-16 lg:pt-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}