import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cityName, state, isAirport } = body

    if (!cityName || !state) {
      return NextResponse.json(
        { error: 'City name and state are required' },
        { status: 400 }
      )
    }

    const location = await prisma.location.create({
      data: {
        cityName,
        state,
        isAirport: isAirport || false
      }
    })

    return NextResponse.json(location)
  } catch (error) {
    console.error('Error creating location:', error)
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    )
  }
}