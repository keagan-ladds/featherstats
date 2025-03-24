import { Resend } from 'resend';
import { WelcomeEmail } from "@featherstats/email/emails/transactional/user-welcome"
import { OtpEmail } from "@featherstats/email/emails/transactional/otp-email"

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
    private defaultFrom: string = 'Featherstats <no-reply@featherstats.com>';


    async sendWelcomeEmail(email: string, userName: string) {
        const { data, error } = await resend.emails.send({
            from: this.defaultFrom,
            to: [email],
            subject: 'Welcome to Featherstats!',
            react: WelcomeEmail({ userName: userName }),
        });
    }

    async sendOtpEmail(token: string, email: string, userName: string) {
        const { data, error } = await resend.emails.send({
            from: this.defaultFrom,
            to: [email],
            subject: `${token} - Featherstats Signin Verification`,
            react: OtpEmail({ userName: userName, oneTimePasscode: token }),
        });
    }

}

export const emailService = new EmailService();