import { prisma } from '../../lib/prisma'
import Link from 'next/link'
import {
  Car,
  Calendar,
  Clock,
  MapPin,
  Package,
  Route,
  RotateCcw,
  TrendingUp,
  Users,
  ArrowRight,
  Activity
} from 'lucide-react'

export default async function AdminDashboard() {
  const [
    cabsCount,
    bookingsCount,
    pendingBookings,
    locationsCount,
    oneWayPackagesCount,
    localPackagesCount,
    revenueData,
    recentBookings
  ] = await Promise.all([
    prisma.cab.count(),
    prisma.tripBooking.count(),
    prisma.tripBooking.count({ where: { status: 'PENDING' } }),
    prisma.location.count(),
    prisma.oneWayPackage.count(),
    prisma.localPackage.count(),
    prisma.tripBooking.aggregate({
      _sum: { estimatedPrice: true },
      where: { status: 'CONFIRMED' }
    }),
    prisma.tripBooking.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        pickupLocation: true,
        dropLocation: true,
        cab: true
      }
    })
  ])

  const totalRevenue = revenueData._sum.estimatedPrice || 0;

  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      description: 'Confirmed bookings',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Total Bookings',
      value: bookingsCount,
      icon: Calendar,
      description: 'All time bookings',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Pending Requests',
      value: pendingBookings,
      icon: Clock,
      description: 'Requires attention',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'Active Fleet',
      value: cabsCount,
      icon: Car,
      description: 'Available cabs',
      color: 'text-violet-600',
      bg: 'bg-violet-50'
    }
  ]

  const quickActions = [
    {
      title: 'Manage Cabs',
      href: '/admin/cabs',
      icon: Car,
      desc: 'Add or edit vehicle fleet',
      color: 'bg-blue-500'
    },
    {
      title: 'Bookings',
      href: '/admin/bookings',
      icon: Users,
      desc: 'View and manage reservations',
      color: 'bg-indigo-500'
    },
    {
      title: 'One-Way Routes',
      href: '/admin/oneway',
      icon: Route,
      desc: 'Configure intercity packages',
      color: 'bg-violet-500'
    },
    {
      title: 'Round Trip',
      href: '/admin/roundtrip',
      icon: RotateCcw,
      desc: 'Set round trip tariffs',
      color: 'bg-pink-500'
    },
    {
      title: 'Local Packages',
      href: '/admin/local-packages',
      icon: Package,
      desc: 'Manage city tour packages',
      color: 'bg-orange-500'
    },
    {
      title: 'Locations',
      href: '/admin/locations',
      icon: MapPin,
      desc: 'Update service areas',
      color: 'bg-teal-500'
    }
  ]

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your taxi service performance.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-card px-4 py-2 rounded-full border border-border shadow-sm">
          <Activity size={16} className="text-green-500" />
          <span>System Operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-4 rounded-full ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon size={24} />
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-foreground/80">{stat.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Package size={20} className="text-primary" />
            Management Center
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="group flex items-center gap-4 p-4 bg-card rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`p-3 rounded-full ${action.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{action.title}</h3>
                  <p className="text-sm text-muted-foreground">{action.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Recent Activity
          </h2>
          <div className="bg-card rounded-2xl shadow-md p-6 space-y-6">
            {recentBookings.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-4">No recent activity</p>
            ) : (
              <div className="space-y-6">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className={`w-2 h-2 mt-2 rounded-full ${booking.status === 'PENDING' ? 'bg-orange-500' :
                      booking.status === 'CONFIRMED' ? 'bg-green-500' :
                        booking.status === 'CANCELLED' ? 'bg-red-500' : 'bg-gray-500'
                      }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        New Booking #{booking.id}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {booking.firstName} • {booking.type}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {booking.pickupLocation?.cityName} → {booking.dropLocation?.cityName}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(booking.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}