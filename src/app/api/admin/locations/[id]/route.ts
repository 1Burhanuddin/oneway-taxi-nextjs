import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'

// PUT - Update location
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json()
    const { cityName, state, isAirport } = body
    const resolvedParams = await params
    const locationId = parseInt(resolvedParams.id)

    if (!cityName || !state) {
      return NextResponse.json(
        { error: 'City name and state are required' },
        { status: 400 }
      )
    }

    const location = await prisma.location.update({
      where: { id: locationId },
      data: {
        cityName,
        state,
        isAirport: isAirport || false
      }
    })

    return NextResponse.json(location)
  } catch (error) {
    console.error('Error updating location:', error)
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    )
  }
}

// DELETE - Delete location
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const locationId = parseInt(resolvedParams.id)

    // Check if location is being used in packages or bookings
    const usage = await prisma.location.findUnique({
      where: { id: locationId },
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

    if (!usage) {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      )
    }

    const totalUsage = usage._count.oneWaySource + usage._count.oneWayDestination + 
                      usage._count.bookingsPick + usage._count.bookingsDrop

    if (totalUsage > 0) {
      return NextResponse.json(
        { error: 'Cannot delete location that is being used in packages or bookings' },
        { status: 400 }
      )
    }

    await prisma.location.delete({
      where: { id: locationId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting location:', error)
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    )
  }
}