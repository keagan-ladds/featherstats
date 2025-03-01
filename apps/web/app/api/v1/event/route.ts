import { NextResponse } from 'next/server';
import { headers } from 'next/headers';



export async function POST(request: Request) {
    try {
        return NextResponse.json({
            success: true
        });
    } catch (error) {
        console.error('Error processing telemetry:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}