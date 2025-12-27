import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: EmailData) {
    try {
        const data = await resend.emails.send({
            from: 'Forare <noreply@send.forare.eu>',
            to: [to],
            subject,
            html,
        });
        return { success: true, data };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error };
    }
}

export function getConfirmationEmail(type: string, name: string, data: any): string {
    const baseStyles = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #1F2937; margin: 0; font-size: 32px; font-weight: bold;">Forare</h1>
                <p style="color: #374151; margin: 10px 0 0 0; font-size: 16px;">Premium Transport & Logistics</p>
            </div>
            <div style="padding: 40px 30px;">
    `;

    const baseFooter = `
            </div>
            <div style="background: #F3F4F6; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                <p style="color: #6B7280; margin: 0 0 10px 0; font-size: 14px;">Need help? Contact us at <a href="mailto:support@forare.eu" style="color: #F59E0B; text-decoration: none;">support@forare.eu</a></p>
                <p style="color: #9CA3AF; margin: 0; font-size: 12px;">© 2025 Forare. All rights reserved.</p>
                <p style="color: #9CA3AF; margin: 5px 0 0 0; font-size: 12px;">Operated by Codexier AB (Org.nr 559497-3082)</p>
            </div>
        </div>
    `;

    let content = '';

    switch (type) {
        case 'Contact':
            content = `
                <h2 style="color: #1F2937; margin: 0 0 20px 0;">Thank You for Contacting Us!</h2>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">We've received your message and our team will get back to you within 24 hours.</p>
                <div style="background: #F9FAFB; border-left: 4px solid #FCD34D; padding: 20px; margin: 20px 0; border-radius: 4px;">
                    <p style="color: #374151; margin: 0; font-size: 14px;"><strong>Subject:</strong> ${data.subject}</p>
                    <p style="color: #6B7280; margin: 10px 0 0 0; font-size: 14px;">${data.message}</p>
                </div>
            `;
            break;

        case 'Booking':
            content = `
                <h2 style="color: #1F2937; margin: 0 0 20px 0;">Booking Confirmation</h2>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Your ride has been booked! Here are the details:</p>
                <div style="background: #F9FAFB; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #E5E7EB;">
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>📍 Pickup:</strong> ${data.pickup}</p>
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>📍 Drop-off:</strong> ${data.dropoff}</p>
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>📅 Date:</strong> ${data.date}</p>
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>🕐 Time:</strong> ${data.time}</p>
                    <p style="color: #374151; margin: 0;"><strong>🚗 Vehicle:</strong> ${data.carType}</p>
                </div>
                <p style="color: #4B5563; font-size: 14px; line-height: 1.6;">Our driver will contact you shortly to confirm the pickup details.</p>
            `;
            break;

        case 'Delivery':
            content = `
                <h2 style="color: #1F2937; margin: 0 0 20px 0;">Delivery Partnership Request Received</h2>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Hi ${data.contactPerson},</p>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Thank you for your interest in partnering with Forare for delivery services.</p>
                <div style="background: #F9FAFB; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #E5E7EB;">
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>Company:</strong> ${data.companyName}</p>
                    <p style="color: #374151; margin: 0;"><strong>Service Type:</strong> ${data.serviceType}</p>
                </div>
                <p style="color: #4B5563; font-size: 14px; line-height: 1.6;">Our business development team will review your request and contact you within 2 business days.</p>
            `;
            break;

        case 'Moving':
            content = `
                <h2 style="color: #1F2937; margin: 0 0 20px 0;">Moving Quote Request Received</h2>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">We've received your moving quote request. Here's what you submitted:</p>
                <div style="background: #F9FAFB; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #E5E7EB;">
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>From:</strong> ${data.fromAddress}</p>
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>To:</strong> ${data.toAddress}</p>
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>Type:</strong> ${data.moveType}</p>
                    <p style="color: #374151; margin: 0;"><strong>Date:</strong> ${data.date}</p>
                </div>
                <p style="color: #4B5563; font-size: 14px; line-height: 1.6;">Our moving specialists will prepare a detailed quote and contact you within 24 hours.</p>
            `;
            break;

        case 'Driver':
            content = `
                <h2 style="color: #1F2937; margin: 0 0 20px 0;">Driver Application Received</h2>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Hi ${data.firstName} ${data.lastName},</p>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Thank you for applying to join the Forare driver network!</p>
                <div style="background: #F9FAFB; padding: 20px; margin: 20px 0; border-radius: 8px; border: 1px solid #E5E7EB;">
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>License:</strong> ${data.licenseNumber}</p>
                    <p style="color: #374151; margin: 0 0 10px 0;"><strong>Vehicle:</strong> ${data.carModel} (${data.carYear})</p>
                    <p style="color: #374151; margin: 0;"><strong>City:</strong> ${data.city}</p>
                </div>
                <p style="color: #4B5563; font-size: 14px; line-height: 1.6;">Our recruitment team will review your application and contact you within 3-5 business days.</p>
            `;
            break;

        default:
            content = `
                <h2 style="color: #1F2937; margin: 0 0 20px 0;">Submission Received</h2>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">Hi ${name},</p>
                <p style="color: #4B5563; font-size: 16px; line-height: 1.6;">We've received your submission and will get back to you soon.</p>
            `;
    }

    return baseStyles + content + baseFooter;
}
