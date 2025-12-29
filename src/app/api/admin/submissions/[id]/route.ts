import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const { status } = await request.json();
        const submission = await prisma.submission.update({
            where: { id },
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
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        console.log('Attempting to delete submission with ID:', id);

        const result = await prisma.submission.delete({
            where: { id },
        });

        console.log('Successfully deleted submission:', result);
        return NextResponse.json({ message: 'Submission deleted successfully' });
    } catch (error: any) {
        console.error('Error deleting submission:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
        });
        return NextResponse.json({
            error: 'Failed to delete submission',
            details: error.message
        }, { status: 500 });
    }
}
