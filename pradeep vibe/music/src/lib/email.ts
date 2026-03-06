import { Resend } from 'resend';

// Initialize with the API key from environment, falling back to a dummy key if undefined
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback_default');

export const sendWelcomeEmail = async (email: string, name: string) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log(`[MOCK] Sending Welcome Email to ${email}`);
            return { success: true, mock: true };
        }

        const data = await resend.emails.send({
            from: 'Swaramthala <noreply@swaramthala.in>',
            to: [email],
            subject: 'Welcome to Swaramthala! 🎸',
            html: `
                <div style="font-family: sans-serif; text-align: center; padding: 20px;">
                    <h2>Welcome to India's Premiere Gear Marketplace, ${name}!</h2>
                    <p>We are thrilled to have you here. Start browsing over 10,000 live instruments or list your own gear today.</p>
                </div>
            `,
        });

        return { success: true, data };
    } catch (error) {
        console.error("Resend Error:", error);
        return { success: false, error };
    }
};

export const sendOrderAlert = async (sellerEmail: string, itemName: string) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log(`[MOCK] Sending Order Alert to ${sellerEmail} for ${itemName}`);
            return { success: true, mock: true };
        }

        const data = await resend.emails.send({
            from: 'Swaramthala Orders <orders@swaramthala.in>',
            to: [sellerEmail],
            subject: 'Great news! Your gear sold.',
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h2>Someone just bought your ${itemName}!</h2>
                    <p>Please log in to your dashboard to view the shipping instructions.</p>
                </div>
            `,
        });
        return { success: true, data };
    } catch (error) {
        console.error("Resend Order Alert Error:", error);
        return { success: false, error };
    }
};
export const sendNotificationEmail = async (email: string, title: string, content: string, link?: string) => {
    try {
        if (!process.env.RESEND_API_KEY) {
            console.log(`[MOCK] Sending Notification Email to ${email}: ${title}`);
            return { success: true, mock: true };
        }

        const data = await resend.emails.send({
            from: 'Swaramthala <alerts@swaramthala.in>',
            to: [email],
            subject: title,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #7c5cfc, #ff6b6b); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">Swaramthala</h1>
                    </div>
                    <div style="padding: 30px; line-height: 1.6; color: #1e293b;">
                        <h2 style="margin-top: 0; color: #0f172a;">${title}</h2>
                        <p style="font-size: 16px;">${content}</p>
                        ${link ? `
                            <div style="margin-top: 30px; text-align: center;">
                                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${link}" 
                                   style="background: #7c5cfc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                                    View Details
                                </a>
                            </div>
                        ` : ''}
                    </div>
                    <div style="background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
                        © ${new Date().getFullYear()} Swaramthala. All rights reserved.<br/>
                        You received this because it's enabled in your account settings.
                    </div>
                </div>
            `,
        });
        return { success: true, data };
    } catch (error) {
        console.error("Notification Email Error:", error);
        return { success: false, error };
    }
};
