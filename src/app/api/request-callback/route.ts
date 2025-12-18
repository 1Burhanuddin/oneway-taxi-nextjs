
import { NextRequest, NextResponse } from 'next/server';
import { sendCallbackNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mobile } = body;

        if (!mobile) {
            return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 });
        }

        await sendCallbackNotification(mobile);

        return NextResponse.json({ message: 'Request sent successfully' });
    } catch (error) {
        console.error('Error processing callback request:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}
