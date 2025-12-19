'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Car,
  Calendar,
  MapPin,
  Route,
  RotateCcw,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface SidebarProps {
  admin: {
    username: string
  }
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Cabs',
    href: '/admin/cabs',
    icon: Car,
  },
  {
    name: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
  },
  {
    name: 'Locations',
    href: '/admin/locations',
    icon: MapPin,
  },
  {
    name: 'One-Way',
    href: '/admin/oneway',
    icon: Route,
  },
  {
    name: 'Round Trip',
    href: '/admin/roundtrip',
    icon: RotateCcw,
  },
  {
    name: 'Local Packages',
    href: '/admin/local-packages',
    icon: Building2,
  },
]

export default function Sidebar({ admin }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsExpanded(false)
      } else {
        setIsExpanded(true)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      {!isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg shadow-md border border-border"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      )}

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-card border-r border-border shadow-lg transition-all duration-300 ease-in-out flex flex-col',
          // Desktop behavior
          'hidden lg:block',
          isExpanded ? 'lg:w-64' : 'lg:w-16',
          // Mobile behavior
          isMobileOpen && 'block w-64'
        )}
      >
        {/* Toggle Button - Absolutely positioned */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="hidden lg:flex absolute -right-3 top-9 z-50 w-6 h-6 bg-card border border-border rounded-full items-center justify-center shadow-sm hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          {isExpanded ? (
            <ChevronLeft className="w-3 h-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
          )}
        </button>

        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border">
          <div className={cn('flex items-center gap-3', !isExpanded && 'lg:justify-center w-full')}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm shrink-0">
              <Car className="w-5 h-5 text-primary-foreground" />
            </div>
            {(isExpanded || isMobileOpen) && (
              <div className="transition-opacity duration-200 overflow-hidden whitespace-nowrap">
                <h1 className="text-lg font-bold text-foreground">TaxiAdmin</h1>
                <p className="text-xs text-primary font-medium">Management Portal</p>
              </div>
            )}
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-muted text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  !isExpanded && 'lg:justify-center'
                )}
                title={!isExpanded && !isMobileOpen ? item.name : undefined}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0 transition-colors duration-200', isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
                {(isExpanded || isMobileOpen) && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-border p-4">
          {(isExpanded || isMobileOpen) ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-muted-foreground">
                    {admin.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {admin.username}
                  </p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>

              <div className="space-y-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 text-destructive flex-shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}