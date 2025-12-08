import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GET() {
  try {
    const cabs = await prisma.cab.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(cabs)
  } catch (error) {
    console.error('Error fetching cabs:', error)
    return NextResponse.json({ error: 'Failed to fetch cabs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, type, capacityPassengers, capacityLuggage, features, baseImageUrl, description } = body

    if (!name || !type || !capacityPassengers) {
      return NextResponse.json({
        error: 'Name, type, and capacityPassengers are required'
      }, { status: 400 })
    }

    const createData: any = {
      name,
      type,
      capacityPassengers: parseInt(capacityPassengers),
      capacityLuggage: capacityLuggage ? parseInt(capacityLuggage) : 0,
      baseImageUrl: baseImageUrl?.trim() || null,
      description: description?.trim() || null
    };

    if (Array.isArray(features) && features.length > 0) {
      createData.features = features;
    }

    const cab = await prisma.cab.create({
      data: createData
    })

    revalidatePath('/admin/cabs')
    return NextResponse.json(cab, { status: 201 })
  } catch (error) {
    console.error('Error creating cab:', error)
    return NextResponse.json({ error: 'Failed to create cab' }, { status: 500 })
  }
}

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json()
//     const { name, type, capacityPassengers, capacityLuggage, features, baseImageUrl, description } = body

//     if (!name || !type || !capacityPassengers) {
//       return NextResponse.json({
//         error: 'Name, type, and capacityPassengers are required'
//       }, { status: 400 })
//     }

//     const createData: any = {
//       name,
//       type,
//       capacityPassengers: parseInt(capacityPassengers),
//       capacityLuggage: capacityLuggage ? parseInt(capacityLuggage) : 0,
//       baseImageUrl: baseImageUrl?.trim() || null,
//       description: description?.trim() || null
//     };

//     if (Array.isArray(features) && features.length > 0) {
//       createData.features = features;
//     }

//     const cab = await prisma.cab.create({
//       data: createData
//     })

//     revalidatePath('/admin/cabs')
//     return NextResponse.json(cab, { status: 201 })
//   } catch (error) {
//     console.error('Error creating cab:', error)
//     return NextResponse.json({ error: 'Failed to create cab' }, { status: 500 })
//   }
// }