import { prisma } from '../../../lib/prisma'
import { Card } from '../../../components/ui/card'

export default async function LocationsPage() {
  const locations = await prisma.location.findMany({
    orderBy: { cityName: 'asc' },
    include: {
      _count: {
        select: {
          oneWaySource: true,
          oneWayDestination: true,
          bookingsPick: true,
          bookingsDrop: true
        }
      }
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Locations</h1>
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-all duration-200 hover:shadow-lg">
          Add Location
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <Card key={location.id} className="p-6 rounded-xl border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">{location.cityName}</h3>
                {location.state && (
                  <p className="text-sm text-muted-foreground">{location.state}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Source Routes</p>
                  <p className="font-medium text-foreground">{location._count.oneWaySource}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Destination Routes</p>
                  <p className="font-medium text-foreground">{location._count.oneWayDestination}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pickup Bookings</p>
                  <p className="font-medium text-foreground">{location._count.bookingsPick}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Drop Bookings</p>
                  <p className="font-medium text-foreground">{location._count.bookingsDrop}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <button className="flex-1 px-3 py-2.5 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-accent transition-all duration-200 border border-border hover:border-ring">
                  Edit
                </button>
                <button className="flex-1 px-3 py-2.5 text-sm bg-destructive/10 text-destructive rounded-full hover:bg-destructive/20 transition-all duration-200 border border-destructive/20 hover:border-destructive/40">
                  Delete
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {locations.length === 0 && (
        <Card className="p-12 text-center rounded-xl border border-border">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">No locations found</h3>
            <p className="text-muted-foreground">Get started by adding your first location.</p>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary-dark transition-all duration-200 hover:shadow-lg">
              Add Location
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}