import { Resend } from 'resend';
import { WelcomeEmail } from "@featherstats/email/emails/transactional/user-welcome"
import { OtpEmail } from "@featherstats/email/emails/transactional/otp-email"
import { DailyLimitWarningEmail } from "@featherstats/email/emails/transactional/daily-limit-warning"

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

    async sendDailyUsageWarningEmail(email: string, userName: string) {
        const { data, error } = await resend.emails.send({
            from: this.defaultFrom,
            to: [email],
            subject: `[Featherstats Usage] You've Reached 80% of Your Daily Soft Limit`,
            react: DailyLimitWarningEmail({ userName: userName }),
        });
    }

}

export const emailService = new EmailService();