import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with real data...')
  
  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.tripBooking.deleteMany()
  await prisma.oneWayPackage.deleteMany()
  await prisma.localPackage.deleteMany()
  await prisma.roundTripRate.deleteMany()
  await prisma.cab.deleteMany()
  await prisma.location.deleteMany()
  await prisma.admin.deleteMany()
  
  console.log('✅ Database cleared. Ready for real data!')
  
  // 1. Create Admin User
  console.log('👤 Creating admin user...')
  const hashedPassword = bcrypt.hashSync('admin123', 10)
  const admin = await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      email: 'admin@oneway-taxi.com'
    }
  })
  console.log(`✅ Admin created: ${admin.username}`)

  // 2. Create Locations
  console.log('📍 Creating locations...')
  const locations = await Promise.all([
    // Gujarat
    prisma.location.create({
      data: { cityName: 'Surat', state: 'Gujarat', isAirport: false }
    }),
    prisma.location.create({
      data: { cityName: 'Surat Airport', state: 'Gujarat', isAirport: true }
    }),
    prisma.location.create({
      data: { cityName: 'Ahmedabad', state: 'Gujarat', isAirport: false }
    }),
    prisma.location.create({
      data: { cityName: 'Ahmedabad Airport', state: 'Gujarat', isAirport: true }
    }),
    prisma.location.create({
      data: { cityName: 'Vadodara', state: 'Gujarat', isAirport: false }
    }),
    prisma.location.create({
      data: { cityName: 'Vadodara Airport', state: 'Gujarat', isAirport: true }
    }),
    prisma.location.create({
      data: { cityName: 'Rajkot', state: 'Gujarat', isAirport: false }
    }),
    prisma.location.create({
      data: { cityName: 'Rajkot Airport', state: 'Gujarat', isAirport: true }
    }),
    // Maharashtra
    prisma.location.create({
      data: { cityName: 'Mumbai', state: 'Maharashtra', isAirport: false }
    }),
    prisma.location.create({
      data: { cityName: 'Mumbai Airport', state: 'Maharashtra', isAirport: true }
    }),
    prisma.location.create({
      data: { cityName: 'Pune', state: 'Maharashtra', isAirport: false }
    }),
    prisma.location.create({
      data: { cityName: 'Pune Airport', state: 'Maharashtra', isAirport: true }
    })
  ])
  console.log(`✅ Created ${locations.length} locations`)

  // 3. Create Cabs with organized data
  console.log('🚗 Creating cabs...')
  const cabs = await Promise.all([
    // Sedan cars (4 passengers, 3 luggage)
    prisma.cab.create({
      data: {
        name: 'Toyota Etios',
        type: 'Sedan',
        capacityPassengers: 4,
        capacityLuggage: 3,
        features: ['AC', 'GPS', 'Music System'],
        baseImageUrl: '/onewaytaxicablogo/etios-car-1.jpg',
        description: 'Comfortable sedan for city travel'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Swift Dzire',
        type: 'Sedan',
        capacityPassengers: 4,
        capacityLuggage: 2,
        features: ['AC', 'GPS', 'Music System'],
        baseImageUrl: '/onewaytaxicablogo/maruti-suzuki-swift-dzire.jpeg',
        description: 'Popular compact sedan'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Hyundai Aura',
        type: 'Sedan',
        capacityPassengers: 4,
        capacityLuggage: 2,
        features: ['AC', 'GPS', 'Music System'],
        baseImageUrl: '/onewaytaxicablogo/Hyundai_Aura.jpg',
        description: 'Modern sedan with premium features'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Hyundai Xcent',
        type: 'Sedan',
        capacityPassengers: 4,
        capacityLuggage: 2,
        features: ['AC', 'GPS', 'Music System'],
        baseImageUrl: '/onewaytaxicablogo/hyundai-xcent.jpg',
        description: 'Reliable compact sedan'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Honda Amaze',
        type: 'Sedan',
        capacityPassengers: 4,
        capacityLuggage: 2,
        features: ['AC', 'GPS', 'Music System'],
        baseImageUrl: '/onewaytaxicablogo/honda_amaze.jpg',
        description: 'Spacious and fuel-efficient sedan'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Suzuki Ciaz',
        type: 'Sedan',
        capacityPassengers: 4,
        capacityLuggage: 3,
        features: ['AC', 'GPS', 'Music System'],
        baseImageUrl: '/onewaytaxicablogo/Maruti-Suzuki-Ciaz.jpg',
        description: 'Premium sedan with extra luggage space'
      }
    }),
    // SUV cars
    prisma.cab.create({
      data: {
        name: 'Toyota Ertiga',
        type: 'SUV',
        capacityPassengers: 7,
        capacityLuggage: 3,
        features: ['AC', 'GPS', 'Music System', 'Extra Space'],
        baseImageUrl: '/onewaytaxicablogo/ertiga.jpg',
        description: '7-seater SUV for family travel'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Toyota Innova',
        type: 'SUV',
        capacityPassengers: 6,
        capacityLuggage: 3,
        features: ['AC', 'GPS', 'Music System', 'Premium Interior'],
        baseImageUrl: '/onewaytaxicablogo/innova.jpg',
        description: '6-seater premium SUV'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Toyota Innova Crysta',
        type: 'SUV',
        capacityPassengers: 6,
        capacityLuggage: 3,
        features: ['AC', 'GPS', 'Music System', 'Premium Interior', 'Leather Seats'],
        baseImageUrl: '/onewaytaxicablogo/Toyota-Innova-Crysta.jpg',
        description: 'Luxury 6-seater SUV with premium features'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'KIA Carnival',
        type: 'SUV',
        capacityPassengers: 6,
        capacityLuggage: 4,
        features: ['AC', 'GPS', 'Music System', 'Premium Interior', 'Captain Seats'],
        baseImageUrl: '/onewaytaxicablogo/Kia-Carnival.jpg',
        description: 'Luxury MPV with captain seats'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'KIA Carens',
        type: 'SUV',
        capacityPassengers: 4,
        capacityLuggage: 4,
        features: ['AC', 'GPS', 'Music System', 'Modern Interior'],
        baseImageUrl: '/onewaytaxicablogo/kia-carens.jpeg',
        description: 'Modern SUV with spacious interior'
      }
    }),
    // Bus/Van options
    prisma.cab.create({
      data: {
        name: 'Tempo Traveler',
        type: 'Bus',
        capacityPassengers: 17,
        capacityLuggage: 10,
        features: ['AC', 'GPS', 'Music System', 'Group Travel'],
        baseImageUrl: '/onewaytaxicablogo/Tempo-traveler.jpg',
        description: '17-seater bus for group travel'
      }
    }),
    prisma.cab.create({
      data: {
        name: 'Tata Winger',
        type: 'Van',
        capacityPassengers: 12,
        capacityLuggage: 8,
        features: ['AC', 'GPS', 'Music System', 'Group Travel'],
        baseImageUrl: '/onewaytaxicablogo/winger.jpg',
        description: '12-seater van for group travel'
      }
    })
  ])
  console.log(`✅ Created ${cabs.length} cabs`)

  // Get cab references for packages
  const sedanCabs = cabs.filter(cab => cab.type === 'Sedan')
  const toyotaErtiga = cabs.find(cab => cab.name === 'Toyota Ertiga')
  const toyotaInnova = cabs.find(cab => cab.name === 'Toyota Innova')
  const toyotaInnovaCrysta = cabs.find(cab => cab.name === 'Toyota Innova Crysta')
  const swiftDzire = cabs.find(cab => cab.name === 'Swift Dzire')
  const kiaCarnival = cabs.find(cab => cab.name === 'KIA Carnival')
  const kiaCarens = cabs.find(cab => cab.name === 'KIA Carens')

  // 4. Create One-Way Packages
  console.log('📦 Creating one-way packages...')
  const oneWayPackages = []
  
  // Surat to Mumbai Airport - All Sedans ₹3,500
  for (const cab of sedanCabs) {
    oneWayPackages.push(
      prisma.oneWayPackage.create({
        data: {
          sourceId: locations[0].id, // Surat
          destinationId: locations[1].id, // Mumbai Airport
          cabId: cab.id,
          priceFixed: 3500,
          distanceKm: 280,
          estimatedHours: 5,
          estimatedMinutes: 30,
          packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
        }
      })
    )
  }

  // Mumbai Airport to Surat - All Sedans ₹3,500 (some ₹4,500 as per data)
  for (const cab of sedanCabs) {
    oneWayPackages.push(
      prisma.oneWayPackage.create({
        data: {
          sourceId: locations[1].id, // Mumbai Airport
          destinationId: locations[0].id, // Surat
          cabId: cab.id,
          priceFixed: 3500, // Note: Some entries showed ₹4,500
          distanceKm: 280,
          estimatedHours: 5,
          estimatedMinutes: 30,
          packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
        }
      })
    )
  }

  // Surat to Mumbai Airport - Toyota Ertiga ₹4,500
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[0].id,
        destinationId: locations[1].id,
        cabId: toyotaErtiga?.id,
        priceFixed: 4500,
        distanceKm: 280,
        estimatedHours: 5,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  // Mumbai Airport to Surat - Toyota Ertiga ₹4,500
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[1].id,
        destinationId: locations[0].id,
        cabId: toyotaErtiga?.id,
        priceFixed: 4500,
        distanceKm: 280,
        estimatedHours: 5,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  // Surat to Mumbai Airport - Toyota Innova Crysta ₹5,000
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[0].id,
        destinationId: locations[1].id,
        cabId: toyotaInnovaCrysta?.id,
        priceFixed: 5000,
        distanceKm: 280,
        estimatedHours: 5,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  // Mumbai Airport to Surat - Toyota Innova Crysta ₹5,000
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[1].id,
        destinationId: locations[0].id,
        cabId: toyotaInnovaCrysta?.id,
        priceFixed: 5000,
        distanceKm: 280,
        estimatedHours: 5,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  // Surat to Ahmedabad - All Sedans ₹3,500
  for (const cab of sedanCabs) {
    oneWayPackages.push(
      prisma.oneWayPackage.create({
        data: {
          sourceId: locations[0].id, // Surat
          destinationId: locations[2].id, // Ahmedabad
          cabId: cab.id,
          priceFixed: 3500,
          distanceKm: 265,
          estimatedHours: 4,
          estimatedMinutes: 30,
          packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
        }
      })
    )
  }

  // Ahmedabad to Surat - All Sedans ₹3,500
  for (const cab of sedanCabs) {
    oneWayPackages.push(
      prisma.oneWayPackage.create({
        data: {
          sourceId: locations[2].id, // Ahmedabad
          destinationId: locations[0].id, // Surat
          cabId: cab.id,
          priceFixed: 3500,
          distanceKm: 265,
          estimatedHours: 4,
          estimatedMinutes: 30,
          packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
        }
      })
    )
  }

  // Surat to Ahmedabad - Toyota Ertiga ₹4,500
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[0].id,
        destinationId: locations[2].id,
        cabId: toyotaErtiga?.id,
        priceFixed: 4500,
        distanceKm: 265,
        estimatedHours: 4,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  // Ahmedabad to Surat - Toyota Ertiga ₹4,500
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[2].id,
        destinationId: locations[0].id,
        cabId: toyotaErtiga?.id,
        priceFixed: 4500,
        distanceKm: 265,
        estimatedHours: 4,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  // Surat to Ahmedabad - Toyota Innova Crysta ₹5,000
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[0].id,
        destinationId: locations[2].id,
        cabId: toyotaInnovaCrysta?.id,
        priceFixed: 5000,
        distanceKm: 265,
        estimatedHours: 4,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  // Ahmedabad to Surat - Toyota Innova Crysta ₹5,000
  oneWayPackages.push(
    prisma.oneWayPackage.create({
      data: {
        sourceId: locations[2].id,
        destinationId: locations[0].id,
        cabId: toyotaInnovaCrysta?.id,
        priceFixed: 5000,
        distanceKm: 265,
        estimatedHours: 4,
        estimatedMinutes: 30,
        packageFeatures: ['Assured Cab', 'Verified Driver', 'Toll Parking Extra']
      }
    })
  )

  await Promise.all(oneWayPackages)
  console.log(`✅ Created ${oneWayPackages.length} one-way packages`)

  // 5. Create Local Packages (Surat Local 8 Hours 80 Kms)
  console.log('🏠 Creating local packages...')
  const localPackages = []
  
  // Surat Local - All Sedans ₹2,000
  for (const cab of sedanCabs) {
    localPackages.push(
      prisma.localPackage.create({
        data: {
          cabId: cab.id,
          hoursIncluded: 8,
          kmIncluded: 80,
          priceFixed: 2000,
          extraKmRate: 12,
          extraHourRate: 150
        }
      })
    )
  }

  // Surat Local - Toyota Ertiga ₹2,700
  localPackages.push(
    prisma.localPackage.create({
      data: {
        cabId: toyotaErtiga?.id,
        hoursIncluded: 8,
        kmIncluded: 80,
        priceFixed: 2700,
        extraKmRate: 14,
        extraHourRate: 200
      }
    })
  )

  // Surat Local - Toyota Innova ₹3,500
  localPackages.push(
    prisma.localPackage.create({
      data: {
        cabId: toyotaInnova?.id,
        hoursIncluded: 8,
        kmIncluded: 80,
        priceFixed: 3500,
        extraKmRate: 16,
        extraHourRate: 250
      }
    })
  )

  await Promise.all(localPackages)
  console.log(`✅ Created ${localPackages.length} local packages`)

  // 6. Create Round Trip Rates
  console.log('🔄 Creating round trip rates...')
  const roundTripRates = [
    // Swift Dzire - ₹11 per km
    prisma.roundTripRate.create({
      data: {
        cabId: swiftDzire?.id,
        ratePerKm: 11,
        dailyKmLimit: 300,
        driverAllowancePerDay: 300
      }
    }),
    // Toyota Ertiga - ₹14 per km
    prisma.roundTripRate.create({
      data: {
        cabId: toyotaErtiga?.id,
        ratePerKm: 14,
        dailyKmLimit: 300,
        driverAllowancePerDay: 400
      }
    }),
    // Toyota Innova - ₹16 per km
    prisma.roundTripRate.create({
      data: {
        cabId: toyotaInnova?.id,
        ratePerKm: 16,
        dailyKmLimit: 300,
        driverAllowancePerDay: 500
      }
    }),
    // Toyota Innova Crysta - ₹20 per km
    prisma.roundTripRate.create({
      data: {
        cabId: toyotaInnovaCrysta?.id,
        ratePerKm: 20,
        dailyKmLimit: 300,
        driverAllowancePerDay: 600
      }
    }),
    // KIA Carnival - ₹35 per km
    prisma.roundTripRate.create({
      data: {
        cabId: kiaCarnival?.id,
        ratePerKm: 35,
        dailyKmLimit: 300,
        driverAllowancePerDay: 800
      }
    }),
    // KIA Carens - ₹17 per km
    prisma.roundTripRate.create({
      data: {
        cabId: kiaCarens?.id,
        ratePerKm: 17,
        dailyKmLimit: 300,
        driverAllowancePerDay: 500
      }
    })
  ]

  await Promise.all(roundTripRates)
  console.log(`✅ Created ${roundTripRates.length} round trip rates`)
  
  console.log('\n✅ Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })