import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

// GET - List all cities (mapped from Location model for backward compatibility)
export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { cityName: 'asc' }
    })

    // Map Location model to the expected City format for backward compatibility
    const cities = locations.map(location => ({
      id: location.id,
      name: location.cityName,
      state: location.state,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt
    }))

    return NextResponse.json(cities)
  } catch (error) {
    console.error('Failed to fetch cities:', error)
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 })
  }
}