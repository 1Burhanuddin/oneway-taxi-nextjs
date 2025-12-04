import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

// GET - List all locations
export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { cityName: 'asc' }
    })

    return NextResponse.json(locations)
  } catch (error) {
    console.error('Failed to fetch locations:', error)
    return NextResponse.json({ error: 'Failed to fetch locations' }, { status: 500 })
  }
}

// POST - Create new location
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { cityName, state } = data

    // Validate required fields
    if (!cityName) {
      return NextResponse.json({ error: 'City name is required' }, { status: 400 })
    }

    const location = await prisma.location.create({
      data: {
        cityName,
        state
      }
    })

    return NextResponse.json(location, { status: 201 })
  } catch (error) {
    console.error('Failed to create location:', error)
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 })
  }
}