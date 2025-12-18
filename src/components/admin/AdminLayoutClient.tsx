'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { Toaster } from '../ui/toaster'

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
    <div className="min-h-screen bg-[#f8f9fc] dark:bg-gray-900 transition-colors duration-300">
      <Sidebar admin={admin} />

      {/* Main content area with responsive margin for sidebar */}
      <div className="lg:ml-16 transition-all duration-300">
        <main className="p-4 pt-16 lg:pt-6 lg:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
      </div>

      <Toaster />
    </div>
  )
}