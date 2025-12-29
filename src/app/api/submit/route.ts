import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { sendEmail, getConfirmationEmail } from '@/lib/email';
import { checkRateLimit, getClientIdentifier } from '@/lib/rateLimit';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Honeypot protection - if this field is filled, it's a bot
        if (body.website || body.honeypot) {
            console.log('Bot detected via honeypot');
            return NextResponse.json(
                { message: 'Submission received successfully' },
                { status: 200 }
            );
        }

        // Rate limiting - TEMPORARILY DISABLED FOR TESTING
        // const clientId = getClientIdentifier(request);
        // const rateLimit = checkRateLimit(clientId);

        // if (!rateLimit.allowed) {
        //     return NextResponse.json(
        //         { message: 'Too many submissions. Please try again later.' },
        //         { status: 429 }
        //     );
        // }

        // Determine submission type based on fields
        let type = 'Unknown';
        if (body.pickup && body.dropoff) type = 'Booking';
        else if (body.companyName) type = 'Delivery';
        else if (body.moveType || body.fromAddress) type = 'Moving';
        else if (body.licenseType || body.licenseNumber || body.serviceInterest) type = 'Driver';
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
