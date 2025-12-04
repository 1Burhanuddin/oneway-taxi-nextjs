import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const booking = await prisma.tripBooking.findUnique({
      where: { id: parseInt(id) },
      include: {
        pickupLocation: true,
        dropLocation: true,
        cab: true,
        oneWayPackage: {
          include: {
            source: true,
            destination: true
          }
        },
        localPackage: true
      }
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, firstName, email, mobile, specialRequest, alternativeNumber, flightNumber } = body

    const booking = await prisma.tripBooking.update({
      where: { id: parseInt(id) },
      data: {
        status,
        firstName,
        email,
        mobile,
        specialRequest,
        alternativeNumber,
        flightNumber
      },
      include: {
        pickupLocation: true,
        dropLocation: true,
        cab: true,
        oneWayPackage: {
          include: {
            source: true,
            destination: true
          }
        },
        localPackage: true
      }
    })

    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.tripBooking.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 })
  }
}