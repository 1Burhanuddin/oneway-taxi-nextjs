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
  Activity,
  CreditCard,
  Percent
} from 'lucide-react'

export const dynamic = 'force-dynamic';

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
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: {
        pickupLocation: true,
        dropLocation: true,
        cab: true
      }
    })
  ])

  const totalRevenue = revenueData._sum.estimatedPrice || 0;

  // New Modern Colors & Gradients
  const stats = [
    {
      title: 'Total Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      description: '',
      gradient: 'from-emerald-500 to-teal-500',
      text: '',
      bg: 'bg-emerald-50'
    },
    {
      title: 'Total Bookings',
      value: bookingsCount,
      icon: Calendar,
      description: '',
      gradient: 'from-blue-500 to-indigo-500',
      text: '',
      bg: 'bg-blue-50'
    },
    {
      title: 'Pending',
      value: pendingBookings,
      icon: Clock,
      description: '',
      gradient: 'from-orange-500 to-amber-500',
      text: '',
      bg: 'bg-orange-50'
    },
    {
      title: 'Fleet Size',
      value: cabsCount,
      icon: Car,
      description: '',
      gradient: 'from-violet-500 to-purple-500',
      text: 'text-blue',
      bg: 'bg-violet-50'
    }
  ]

  const quickActions = [
    {
      title: 'Manage Cabs',
      href: '/admin/cabs',
      icon: Car,
      desc: 'Add/Edit Fleet',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Bookings',
      href: '/admin/bookings',
      icon: Users,
      desc: 'View Reservations',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'One-Way',
      href: '/admin/oneway',
      icon: Route,
      desc: 'Intercity Routes',
      color: 'bg-violet-100 text-violet-600'
    },
    {
      title: 'Round Trip',
      href: '/admin/roundtrip',
      icon: RotateCcw,
      desc: 'Return Tariffs',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      title: 'Local',
      href: '/admin/local-packages',
      icon: Package,
      desc: 'City Tours',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Locations',
      href: '/admin/locations',
      icon: MapPin,
      desc: 'Service Areas',
      color: 'bg-teal-100 text-teal-600'
    }
  ]

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      {/* Modern Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-500 delay-75">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back, Admin. Here's your daily overview.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-full border border-gray-100 shadow-sm backdrop-blur-sm bg-opacity-80">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="text-sm font-medium text-gray-600">System Online</span>
        </div>
      </div>

      {/* Stats Grid with Modern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in zoom-in-50 fade-in duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
              <stat.icon size={80} className={stat.text} />
            </div>

            <div className="relationship relative z-10 flex flex-col h-full justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={22} />
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">{stat.title}</p>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${stat.text.replace('text', 'bg')}`}></div>
                <p className="text-xs text-gray-400 font-medium truncate">{stat.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">

        {/* Quick Actions Panel */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Package className="text-gray-400" size={20} />
              Quick Management
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 group text-center h-full"
              >
                <div className={`mb-3 p-3 rounded-full ${action.color} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon size={24} />
                </div>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{action.desc}</p>
              </Link>
            ))}
          </div>

          {/* Secondary Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">One-Way Routes</p>
                <h3 className="text-3xl font-bold mt-1">{oneWayPackagesCount}</h3>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <span className="text-xs bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">Active</span>
                <Route size={24} className="text-indigo-200 opacity-50" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Local Packages</p>
                <h3 className="text-3xl font-bold mt-1 text-gray-900">{localPackagesCount}</h3>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">Available</span>
                <Package size={24} className="text-gray-300" />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Service Locations</p>
                <h3 className="text-3xl font-bold mt-1 text-gray-900">{locationsCount}</h3>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">Cities</span>
                <MapPin size={24} className="text-gray-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-fit">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              Recent Bookings
            </h2>
            <Link href="/admin/bookings" className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
              View All
            </Link>
          </div>

          <div className="p-2">
            {recentBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Clock size={20} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-1">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="group flex items-center gap-4 p-4 hover:bg-gray-50/80 rounded-xl transition-all duration-200">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm
                      ${booking.status === 'PENDING' ? 'bg-orange-100 text-orange-600' :
                        booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-600' :
                          booking.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }
                    `}>
                      {booking.status === 'PENDING' ? <Clock size={18} /> :
                        booking.status === 'CONFIRMED' ? <CreditCard size={18} /> :
                          <Activity size={18} />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {booking.pickupLocation?.cityName || 'Unknown'} <span className="text-gray-300 px-1">→</span> {booking.dropLocation?.cityName || 'Unknown'}
                        </p>
                        <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap ml-2">
                          {new Date(booking.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate flex items-center gap-2">
                        <span className="font-medium text-gray-700">{booking.firstName}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                        {booking.type}
                        {booking.cab && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            {booking.cab.name}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-50 text-center">
            <Link href="/admin/bookings" className="text-xs text-gray-500 hover:text-gray-800 font-medium flex items-center justify-center gap-1 transition-colors">
              Show more history <ArrowRight size={12} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}