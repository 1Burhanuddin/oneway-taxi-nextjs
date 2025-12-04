import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  
  // 1. Create Admin User
  console.log('👤 Creating admin user...')
  const hashedPassword = bcrypt.hashSync('admin123', 10)
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@oneway-taxi.com'
    }
  })
  console.log(`✅ Admin created: ${admin.username}`)

  // 2. Create Locations (Cities)
  console.log('📍 Creating locations...')
  const locations = [
    { cityName: 'Mumbai', state: 'Maharashtra' },
    { cityName: 'Surat', state: 'Gujarat' },
    { cityName: 'Ahmedabad', state: 'Gujarat' },
    { cityName: 'Pune', state: 'Maharashtra' },
    { cityName: 'Vadodara', state: 'Gujarat' },
    { cityName: 'Rajkot', state: 'Gujarat' },
    { cityName: 'Nashik', state: 'Maharashtra' },
    { cityName: 'Gandhinagar', state: 'Gujarat' }
  ]

  const createdLocations = []
  for (const location of locations) {
    const loc = await prisma.location.upsert({
      where: { cityName: location.cityName },
      update: {},
      create: location
    })
    createdLocations.push(loc)
    console.log(`   📍 ${loc.cityName}, ${loc.state}`)
  }

  // 3. Create Cabs
  console.log('🚗 Creating cabs...')
  const cabs = [
    {
      name: 'Swift Dzire',
      type: 'sedan',
      capacityPassengers: 4,
      capacityLuggage: 2,
      baseImageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400',
      description: 'Comfortable sedan for city rides'
    },
    {
      name: 'Toyota Innova',
      type: 'suv',
      capacityPassengers: 7,
      capacityLuggage: 4,
      baseImageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400',
      description: 'Spacious SUV for family trips'
    },
    {
      name: 'Hyundai i20',
      type: 'hatchback',
      capacityPassengers: 4,
      capacityLuggage: 2,
      baseImageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
      description: 'Compact and efficient hatchback'
    },
    {
      name: 'Honda City',
      type: 'sedan',
      capacityPassengers: 4,
      capacityLuggage: 3,
      baseImageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400',
      description: 'Premium sedan with comfort features'
    },
    {
      name: 'Mahindra Scorpio',
      type: 'suv',
      capacityPassengers: 7,
      capacityLuggage: 5,
      baseImageUrl: 'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400',
      description: 'Rugged SUV for long journeys'
    },
    {
      name: 'BMW 3 Series',
      type: 'luxury',
      capacityPassengers: 4,
      capacityLuggage: 3,
      baseImageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
      description: 'Luxury sedan for premium experience'
    }
  ]

  const createdCabs = []
  for (const cab of cabs) {
    const createdCab = await prisma.cab.upsert({
      where: { name: cab.name },
      update: {},
      create: cab
    })
    createdCabs.push(createdCab)
    console.log(`   🚗 ${createdCab.name} (${createdCab.type})`)
  }

  // 4. Create One-Way Packages
  console.log('🛣️ Creating one-way packages...')
  const oneWayRoutes = [
    { from: 'Mumbai', to: 'Pune', distance: 150 },
    { from: 'Mumbai', to: 'Surat', distance: 280 },
    { from: 'Ahmedabad', to: 'Surat', distance: 265 },
    { from: 'Ahmedabad', to: 'Vadodara', distance: 110 },
    { from: 'Surat', to: 'Vadodara', distance: 130 },
    { from: 'Mumbai', to: 'Nashik', distance: 165 }
  ]

  for (const route of oneWayRoutes) {
    const sourceLocation = createdLocations.find(l => l.cityName === route.from)
    const destLocation = createdLocations.find(l => l.cityName === route.to)
    
    if (sourceLocation && destLocation) {
      for (const cab of createdCabs) {
        const baseRate = cab.type === 'luxury' ? 25 : cab.type === 'suv' ? 15 : 12
        const priceFixed = 500 + (route.distance * baseRate)
        
        const totalMinutes = Math.ceil(route.distance / 60 * 60) // Assuming 60 km/h average speed
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        
        await prisma.oneWayPackage.create({
          data: {
            sourceId: sourceLocation.id,
            destinationId: destLocation.id,
            cabId: cab.id,
            priceFixed,
            distanceKm: route.distance,
            estimatedHours: hours,
            estimatedMinutes: minutes,
            packageFeatures: ['AC', 'GPS', 'Music System']
          }
        })
      }
      console.log(`   🛣️ ${route.from} → ${route.to} (${route.distance}km)`)
    }
  }

  // 5. Create Round Trip Rates
  console.log('🔄 Creating round trip rates...')
  for (const cab of createdCabs) {
    const ratePerKm = cab.type === 'luxury' ? 25 : cab.type === 'suv' ? 15 : 12
    
    await prisma.roundTripRate.create({
      data: {
        cabId: cab.id,
        ratePerKm,
        minimumKm: 300,
        driverAllowancePerDay: 500
      }
    })
    console.log(`   🔄 ${cab.name}: ₹${ratePerKm}/km`)
  }

  // 6. Create Local Packages
  console.log('🏠 Creating local packages...')
  const localPackageTypes = [
    { hours: 4, km: 40, name: '4/40' },
    { hours: 8, km: 80, name: '8/80' },
    { hours: 12, km: 120, name: '12/120' }
  ]

  for (const cab of createdCabs) {
    for (const packageType of localPackageTypes) {
      const baseRate = cab.type === 'luxury' ? 20 : cab.type === 'suv' ? 12 : 8
      const priceFixed = 300 + (packageType.km * baseRate)
      
      await prisma.localPackage.create({
        data: {
          cabId: cab.id,
          hoursIncluded: packageType.hours,
          kmIncluded: packageType.km,
          priceFixed,
          extraKmRate: baseRate + 2,
          extraHourRate: 100
        }
      })
    }
    console.log(`   🏠 ${cab.name}: 4/40, 8/80, 12/120 packages`)
  }

  console.log('\n✅ Seeding completed successfully!')
  console.log('📊 Database Summary:')
  
  const counts = {
    locations: await prisma.location.count(),
    cabs: await prisma.cab.count(),
    oneWayPackages: await prisma.oneWayPackage.count(),
    roundTripRates: await prisma.roundTripRate.count(),
    localPackages: await prisma.localPackage.count()
  }
  
  console.log(`   📍 Locations: ${counts.locations}`)
  console.log(`   🚗 Cabs: ${counts.cabs}`)
  console.log(`   🛣️ One-way Packages: ${counts.oneWayPackages}`)
  console.log(`   🔄 Round Trip Rates: ${counts.roundTripRates}`)
  console.log(`   🏠 Local Packages: ${counts.localPackages}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })