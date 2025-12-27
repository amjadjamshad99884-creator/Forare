import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Try to connect and count submissions
        const count = await prisma.submission.count();

        return NextResponse.json({
            status: 'success',
            message: 'Database connection working',
            submissionCount: count,
            env: {
                hasDatabaseUrl: !!process.env.DATABASE_URL,
                hasDirectUrl: !!process.env.DIRECT_URL,
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            env: {
                hasDatabaseUrl: !!process.env.DATABASE_URL,
                hasDirectUrl: !!process.env.DIRECT_URL,
            }
        }, { status: 500 });
    }
}
