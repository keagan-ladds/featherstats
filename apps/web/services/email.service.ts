import { Resend } from 'resend';
import { WelcomeEmail } from "@featherstats/email/emails/transactional/user-welcome"

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

}

export const emailService = new EmailService();