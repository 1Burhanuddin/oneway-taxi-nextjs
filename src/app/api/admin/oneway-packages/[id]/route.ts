import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { revalidatePath } from 'next/cache'
import { calculateDistance, estimateTime, getCityCoordinates } from '../../../../../lib/distance'
import { FIXED_PACKAGE_FEATURES } from '../../../../../lib/packageFeatures'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    const { sourceId, destinationId, cabId, price, estimatedHours, estimatedMinutes } = body

    // Get source and destination locations to recalculate distance
    const [sourceLocation, destinationLocation] = await Promise.all([
      prisma.location.findUnique({ where: { id: parseInt(sourceId) } }),
      prisma.location.findUnique({ where: { id: parseInt(destinationId) } })
    ]);

    if (!sourceLocation || !destinationLocation) {
      return NextResponse.json({ error: 'Invalid source or destination' }, { status: 400 })
    }

    // Recalculate distance automatically
    let calculatedDistance: number | null = null;
    let autoEstimatedTime = { hours: 0, minutes: 0 };

    const sourceCoords = getCityCoordinates(sourceLocation.cityName);
    const destCoords = getCityCoordinates(destinationLocation.cityName);

    if (sourceCoords && destCoords) {
      calculatedDistance = calculateDistance(
        sourceCoords.lat, sourceCoords.lng,
        destCoords.lat, destCoords.lng
      );
      autoEstimatedTime = estimateTime(calculatedDistance);
    }

    // Use provided time if available, otherwise use auto-estimated
    const finalHours = estimatedHours !== undefined ? parseInt(estimatedHours) : autoEstimatedTime.hours;
    const finalMinutes = estimatedMinutes !== undefined ? parseInt(estimatedMinutes) : autoEstimatedTime.minutes;

    const oneWayPackage = await prisma.oneWayPackage.update({
      where: { id: parseInt(id) },
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
    return NextResponse.json(oneWayPackage)
  } catch (error) {
    console.error('Error updating one-way package:', error)
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.oneWayPackage.delete({
      where: { id: parseInt(id) }
    })

    revalidatePath('/admin/oneway')
    return NextResponse.json({ message: 'Package deleted successfully' })
  } catch (error) {
    console.error('Error deleting one-way package:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete package' },
      { status: 500 }
    )
  }
}