import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json()
        const { cabId, hoursIncluded, kmIncluded, priceFixed, extraKmRate, extraHourRate } = body

        const localPackage = await prisma.localPackage.update({
            where: { id: parseInt(id) },
            data: {
                cabId: parseInt(cabId),
                hoursIncluded: parseInt(hoursIncluded),
                kmIncluded: parseInt(kmIncluded),
                priceFixed: parseInt(priceFixed),
                extraKmRate: extraKmRate ? parseInt(extraKmRate) : null,
                extraHourRate: extraHourRate ? parseInt(extraHourRate) : null
            },
            include: {
                cab: true
            }
        })

        revalidatePath('/admin/local-packages')
        return NextResponse.json(localPackage)
    } catch (error) {
        console.error('Error updating local package:', error)
        return NextResponse.json({ error: 'Failed to update package' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.localPackage.delete({
            where: { id: parseInt(id) }
        })

        revalidatePath('/admin/local-packages')
        return NextResponse.json({ message: 'Package deleted successfully' })
    } catch (error) {
        console.error('Error deleting local package:', error)
        return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 })
    }
}