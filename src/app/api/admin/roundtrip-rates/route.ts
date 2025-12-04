import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { revalidatePath } from 'next/cache'

// GET - List all round trip rates
export async function GET() {
  try {
    const rates = await prisma.roundTripRate.findMany({
      include: {
        cab: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(rates)
  } catch (error) {
    console.error('Failed to fetch round trip rates:', error)
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 })
  }
}

// POST - Create new round trip rate
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { cabId, ratePerKm, minimumKm, driverAllowancePerDay } = data

    // Validate required fields
    if (!cabId || !ratePerKm) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const rate = await prisma.roundTripRate.create({
      data: {
        cabId,
        ratePerKm: parseFloat(ratePerKm),
        minimumKm: minimumKm ? parseInt(minimumKm) : 0,
        driverAllowancePerDay: driverAllowancePerDay ? parseFloat(driverAllowancePerDay) : 0
      },
      include: {
        cab: true
      }
    })

    revalidatePath('/admin/roundtrip')
    return NextResponse.json(rate, { status: 201 })
  } catch (error) {
    console.error('Failed to create round trip rate:', error)
    return NextResponse.json({ error: 'Failed to create rate' }, { status: 500 })
  }
}