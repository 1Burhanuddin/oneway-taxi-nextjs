
import { NextRequest, NextResponse } from 'next/server';
import { sendBookingInquiry } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mobile, city, cabName } = body;

        if (!mobile || !city || !cabName) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        await sendBookingInquiry({ mobile, city, cabName });

        return NextResponse.json({ message: 'Inquiry sent successfully' });
    } catch (error) {
        console.error('Error processing booking inquiry:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
