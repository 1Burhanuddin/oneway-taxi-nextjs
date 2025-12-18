import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { TripType } from '@prisma/client'
import { sendBookingConfirmation, sendAdminNotification } from '../../../lib/email'

export async function GET() {
  try {
    const bookings = await prisma.tripBooking.findMany({
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
      },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      tripType,
      pickupCityId,
      dropCityId,
      pickupDate,
      pickupTime,
      journeyDays,
      customerName,
      mobile,
      email,
      cabId,
      totalPrice,
      oneWayPackageId,
      localPackageId,
      specialRequest,
      alternativeNumber,
      flightNumber
    } = body

    if (!tripType || !customerName || !mobile) {
      return NextResponse.json({
        error: 'Trip type, customer name, and mobile are required'
      }, { status: 400 })
    }

    // Map old tripType values to new enum values
    let mappedTripType: TripType
    switch (tripType.toLowerCase()) {
      case 'oneway':
      case 'one-way':
        mappedTripType = TripType.ONEWAY
        break
      case 'roundtrip':
      case 'round-trip':
        mappedTripType = TripType.ROUNDTRIP
        break
      case 'local':
        mappedTripType = TripType.LOCAL
        break
      default:
        mappedTripType = TripType.ONEWAY
    }

    const booking = await prisma.tripBooking.create({
      data: {
        type: mappedTripType,
        pickupLocationId: pickupCityId ? parseInt(pickupCityId) : null,
        dropLocationId: dropCityId ? parseInt(dropCityId) : null,
        pickupDate: pickupDate ? new Date(pickupDate) : null,
        pickupTime,
        journeyDays: journeyDays ? parseInt(journeyDays) : null,
        firstName: customerName,
        mobile,
        email,
        cabId: cabId ? parseInt(cabId) : null,
        estimatedPrice: totalPrice ? parseInt(totalPrice) : null,
        oneWayPackageId: oneWayPackageId ? parseInt(oneWayPackageId) : null,
        localPackageId: localPackageId ? parseInt(localPackageId) : null,
        specialRequest,
        alternativeNumber,
        flightNumber,
        status: 'PENDING'
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

    // Send confirmation emails (don't fail booking if email fails)
    try {
      await sendBookingConfirmation(booking);
      await sendAdminNotification(booking);
      console.log('Booking confirmation emails sent successfully');
    } catch (emailError) {
      console.error('Failed to send booking confirmation emails:', emailError);
      // Continue - booking was successful even if email failed
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}