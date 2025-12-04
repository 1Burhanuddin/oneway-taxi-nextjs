import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json()
    const { cabId, ratePerKm, minimumKm, driverAllowancePerDay } = body

    const rate = await prisma.roundTripRate.update({
      where: { id: parseInt(id) },
      data: {
        cabId: parseInt(cabId),
        ratePerKm: parseInt(ratePerKm),
        minimumKm: minimumKm ? parseInt(minimumKm) : null,
        driverAllowancePerDay: driverAllowancePerDay ? parseInt(driverAllowancePerDay) : null
      },
      include: {
        cab: true
      }
    })

    revalidatePath('/admin/roundtrip')
    return NextResponse.json(rate)
  } catch (error) {
    console.error('Error updating round trip rate:', error)
    return NextResponse.json({ error: 'Failed to update rate' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.roundTripRate.delete({
      where: { id: parseInt(id) }
    })

    revalidatePath('/admin/roundtrip')
    return NextResponse.json({ message: 'Rate deleted successfully' })
  } catch (error) {
    console.error('Error deleting round trip rate:', error)
    return NextResponse.json({ error: 'Failed to delete rate' }, { status: 500 })
  }
}