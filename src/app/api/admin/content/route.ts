import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const content = await prisma.siteContent.findMany();
        // Convert array to object for easier frontend consumption
        const contentMap = content.reduce((acc: Record<string, string>, item) => {
            acc[item.key] = item.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(contentMap);
    } catch (error) {
        console.error('Error fetching content:', error);
        return NextResponse.json(
            { message: 'Error fetching content' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { key, value, section } = body;

        if (!key || value === undefined) {
            return NextResponse.json(
                { message: 'Missing key or value' },
                { status: 400 }
            );
        }

        const updatedContent = await prisma.siteContent.upsert({
            where: { key },
            update: { value, section },
            create: { key, value, section: section || 'general' },
        });

        return NextResponse.json(updatedContent);
    } catch (error) {
        console.error('Error updating content:', error);
        return NextResponse.json(
            { message: 'Error updating content' },
            { status: 500 }
        );
    }
}
