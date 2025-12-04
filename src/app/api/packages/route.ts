import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET - Get available packages for a route
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sourceId = searchParams.get('sourceId')
    const destinationId = searchParams.get('destinationId')
    const tripType = searchParams.get('tripType') || 'oneway'

    if (tripType === 'oneway' && sourceId && destinationId) {
      // Get one-way packages for specific route
      const packages = await prisma.oneWayPackage.findMany({
        where: {
          sourceId: parseInt(sourceId),
          destinationId: parseInt(destinationId)
        },
        include: {
          source: true,
          destination: true,
          cab: true
        },
        orderBy: { priceFixed: 'asc' }
      })
      
      return NextResponse.json(packages)
    }

    if (tripType === 'local') {
      // Get all local packages grouped by cab
      const packages = await prisma.localPackage.findMany({
        include: {
          cab: true
        },
        orderBy: [
          { cab: { name: 'asc' } },
          { hoursIncluded: 'asc' }
        ]
      })
      
      return NextResponse.json(packages)
    }

    if (tripType === 'roundtrip') {
      // Get round trip rates
      const rates = await prisma.roundTripRate.findMany({
        include: {
          cab: true
        },
        orderBy: { ratePerKm: 'asc' }
      })
      
      return NextResponse.json(rates)
    }

    // Default: return all cabs with their packages
    const cabs = await prisma.cab.findMany({
      include: {
        oneWayPackages: {
          include: {
            source: true,
            destination: true
          }
        },
        localPackages: true,
        roundTripRates: true
      },
      orderBy: { name: 'asc' }
    })
    
    return NextResponse.json(cabs)
    
  } catch (error) {
    console.error('Failed to fetch packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}