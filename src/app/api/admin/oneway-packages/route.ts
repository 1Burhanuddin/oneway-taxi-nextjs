import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { revalidatePath } from 'next/cache'
import { calculateDistance, estimateTime, getCityCoordinates } from '../../../../lib/distance'
import { FIXED_PACKAGE_FEATURES } from '../../../../lib/packageFeatures'

// GET - List all one-way packages
export async function GET() {
  try {
    const packages = await prisma.oneWayPackage.findMany({
      include: {
        source: true,
        destination: true,
        cab: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(packages)
  } catch (error) {
    console.error('Failed to fetch one-way packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

// POST - Create new one-way package
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { sourceId, destinationId, cabId, price, estimatedHours, estimatedMinutes } = data

    // Validate required fields
    if (!sourceId || !destinationId || !cabId || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get source and destination locations to calculate distance
    const [sourceLocation, destinationLocation] = await Promise.all([
      prisma.location.findUnique({ where: { id: parseInt(sourceId) } }),
      prisma.location.findUnique({ where: { id: parseInt(destinationId) } })
    ]);

    if (!sourceLocation || !destinationLocation) {
      return NextResponse.json({ error: 'Invalid source or destination' }, { status: 400 })
    }

    // Calculate distance automatically or use provided
    let calculatedDistance: number | null = null;
    let autoEstimatedTime = { hours: 0, minutes: 0 };

    // Use provided distance if available
    if (data.distanceKm !== undefined && data.distanceKm !== null && data.distanceKm !== 0) {
      calculatedDistance = parseFloat(data.distanceKm);
      // If time is not provided but distance is, we can estimate time
      if (estimatedHours === undefined && estimatedMinutes === undefined) {
        autoEstimatedTime = estimateTime(calculatedDistance);
      }
    } else {
      // Try to get coordinates and calculate distance automatically
      const sourceCoords = getCityCoordinates(sourceLocation.cityName);
      const destCoords = getCityCoordinates(destinationLocation.cityName);

      if (sourceCoords && destCoords) {
        calculatedDistance = calculateDistance(
          sourceCoords.lat, sourceCoords.lng,
          destCoords.lat, destCoords.lng
        );
        autoEstimatedTime = estimateTime(calculatedDistance);
      }
    }

    // Use provided time if available, otherwise use auto-estimated
    const finalHours = estimatedHours !== undefined ? parseInt(estimatedHours) : autoEstimatedTime.hours;
    const finalMinutes = estimatedMinutes !== undefined ? parseInt(estimatedMinutes) : autoEstimatedTime.minutes;

    const newPackage = await prisma.oneWayPackage.create({
      data: {
        sourceId: parseInt(sourceId),
        destinationId: parseInt(destinationId),
        cabId: parseInt(cabId),
        priceFixed: parseInt(price),
        distanceKm: calculatedDistance,
        estimatedHours: finalHours,
        estimatedMinutes: finalMinutes,
        packageFeatures: FIXED_PACKAGE_FEATURES
      },
      include: {
        source: true,
        destination: true,
        cab: true
      }
    })

    revalidatePath('/admin/oneway')
    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error('Failed to create one-way package:', error)
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
  }
}