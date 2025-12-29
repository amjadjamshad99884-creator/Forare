import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { status } = await request.json();
        const submission = await prisma.submission.update({
            where: { id: params.id },
            data: { status },
        });
        return NextResponse.json(submission);
    } catch (error) {
        console.error('Error updating submission:', error);
        return NextResponse.json({ error: 'Failed to update submission' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.submission.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ message: 'Submission deleted successfully' });
    } catch (error) {
        console.error('Error deleting submission:', error);
        return NextResponse.json({ error: 'Failed to delete submission' }, { status: 500 });
    }
}
