import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail, getConfirmationEmail } from '@/lib/email';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Determine submission type based on fields
        let type = 'Unknown';
        if (body.pickup && body.dropoff) type = 'Booking';
        else if (body.companyName) type = 'Delivery';
        else if (body.moveType) type = 'Moving';
        else if (body.licenseNumber) type = 'Driver';
        else if (body.subject) type = 'Contact';

        // Store in database
        const submission = await prisma.submission.create({
            data: {
                type,
                payload: JSON.stringify(body),
            },
        });

        console.log('Submission stored:', submission.id);

        // Send confirmation email
        const email = body.email;
        const name = body.name || body.firstName || body.contactPerson || 'Customer';

        if (email) {
            const subject = `Confirmation: Your ${type} ${type === 'Contact' ? 'Message' : type === 'Driver' ? 'Application' : 'Request'} - Forare`;
            const html = getConfirmationEmail(type, name, body);

            const emailResult = await sendEmail({ to: email, subject, html });

            if (emailResult.success) {
                console.log('Confirmation email sent to:', email);
            } else {
                console.error('Failed to send email:', emailResult.error);
            }
        }

        return NextResponse.json(
            { message: 'Submission received successfully', id: submission.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Submission error:', error);
        return NextResponse.json(
            { message: 'Error processing submission' },
            { status: 500 }
        );
    }
}
