import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// GET - List all local packages
export async function GET() {
  try {
    const packages = await prisma.localPackage.findMany({
      include: {
        cab: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(packages)
  } catch (error) {
    console.error('Failed to fetch local packages:', error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

// POST - Create new local package
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { cabId, hoursIncluded, kmIncluded, priceFixed, extraKmRate, extraHourRate } = data

    // Validate required fields
    if (!cabId || !hoursIncluded || !kmIncluded || !priceFixed) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const newPackage = await prisma.localPackage.create({
      data: {
        cabId,
        hoursIncluded: parseInt(hoursIncluded),
        kmIncluded: parseInt(kmIncluded),
        priceFixed: parseFloat(priceFixed),
        extraKmRate: extraKmRate ? parseFloat(extraKmRate) : 0,
        extraHourRate: extraHourRate ? parseFloat(extraHourRate) : 0
      },
      include: {
        cab: true
      }
    })

    revalidatePath('/admin/local-packages')
    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    console.error('Failed to create local package:', error)
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
  }
}