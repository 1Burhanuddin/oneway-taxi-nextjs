import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { revalidatePath } from 'next/cache'

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const cabId = parseInt(params.id);

    if (isNaN(cabId) || cabId <= 0) {
      return NextResponse.json({ error: 'Invalid cab ID' }, { status: 400 });
    }

    const body = await request.json();
    const { name, type, capacityPassengers, capacityLuggage, features, baseImageUrl, description } = body;

    if (!name?.trim() || !type?.trim()) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
    }

    const passengersNum = Number(capacityPassengers);
    const luggageNum = Number(capacityLuggage);

    if (isNaN(passengersNum) || passengersNum < 1) {
      return NextResponse.json({ error: 'Passenger capacity must be at least 1' }, { status: 400 });
    }

    if (isNaN(luggageNum) || luggageNum < 0) {
      return NextResponse.json({ error: 'Luggage capacity cannot be negative' }, { status: 400 });
    }

    // Check for name conflicts
    const existingCab = await prisma.cab.findFirst({
      where: {
        name: name.trim(),
        NOT: { id: cabId }
      }
    });

    if (existingCab) {
      return NextResponse.json({ error: 'A cab with this name already exists' }, { status: 400 });
    }

    const updateData: any = {
      name: name.trim(),
      type: type.trim(),
      capacityPassengers: passengersNum,
      capacityLuggage: luggageNum,
      baseImageUrl: baseImageUrl?.trim() || null,
      description: description?.trim() || null
    };

    if (Array.isArray(features) && features.length > 0) {
      updateData.features = features;
    }

    const updatedCab = await prisma.cab.update({
      where: { id: cabId },
      data: updateData
    });

    revalidatePath('/admin/cabs');
    return NextResponse.json(updatedCab);

  } catch (error) {
    console.error('Error updating cab:', error);

    if (error instanceof Error) {
      if (error.message.includes('Record to update not found')) {
        return NextResponse.json({ error: 'Cab not found' }, { status: 404 });
      }
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json({ error: 'A cab with this name already exists' }, { status: 400 });
      }
    }

    return NextResponse.json({ error: 'Failed to update cab' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const cabId = parseInt(params.id);

    if (isNaN(cabId) || cabId <= 0) {
      return NextResponse.json({ error: 'Invalid cab ID' }, { status: 400 });
    }

    const existingCab = await prisma.cab.findUnique({
      where: { id: cabId }
    });

    if (!existingCab) {
      return NextResponse.json({ error: 'Cab not found' }, { status: 404 });
    }



    await prisma.cab.delete({
      where: { id: cabId }
    });

    revalidatePath('/admin/cabs');
    return NextResponse.json({ message: 'Cab deleted successfully' });

  } catch (error) {
    console.error('Error deleting cab:', error);

    if (error instanceof Error) {
      if (error.message.includes('Record to delete does not exist')) {
        return NextResponse.json({ error: 'Cab not found' }, { status: 404 });
      }
    }

    return NextResponse.json({ error: 'Failed to delete cab' }, { status: 500 });
  }
}