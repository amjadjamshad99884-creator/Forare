import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const submission = await prisma.submission.create({
            data: {
                type: 'TEST',
                payload: JSON.stringify({ message: 'Hello World', date: new Date().toISOString() }),
                status: 'PENDING',
            },
        });
        console.log('Successfully created submission:', submission);

        // Verify we can read it back
        const readBack = await prisma.submission.findUnique({
            where: { id: submission.id }
        });
        console.log('Read back submission:', readBack);

    } catch (e) {
        console.error('Error creating submission:', e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
