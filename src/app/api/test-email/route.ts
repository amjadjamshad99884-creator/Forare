import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function GET() {
    try {
        // Test email
        const result = await sendEmail({
            to: 'test@example.com', // Replace with your email for testing
            subject: 'Test Email from Forare',
            html: '<h1>Test Email</h1><p>If you receive this, email integration is working!</p>'
        });

        return NextResponse.json({
            success: result.success,
            data: result.data,
            error: result.error,
            env: {
                hasApiKey: !!process.env.RESEND_API_KEY,
                apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 7)
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
