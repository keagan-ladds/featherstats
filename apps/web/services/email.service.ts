import { Resend } from 'resend';
import { WelcomeEmail } from "@featherstats/email/emails/transactional/user-welcome"
import { OtpEmail } from "@featherstats/email/emails/transactional/otp-email"
import { DailyLimitWarningEmail } from "@featherstats/email/emails/transactional/daily-limit-warning"
import { DailyLimitExceededEmail } from "@featherstats/email/emails/transactional/daily-limit-exceeded"
import { MonthlyLimitExceededEmail } from "@featherstats/email/emails/transactional/monthly-limit-exceeded"
import { MonthlyLimitWarningEmail } from "@featherstats/email/emails/transactional/monthly-limit-warning"
import { DrizzleClient } from '@featherstats/database/types';
import { db } from '@featherstats/database/index';
import { usersTable } from '@featherstats/database/schema/auth';
import { eq } from "drizzle-orm";
import { subscriptionsTable } from '@featherstats/database/schema/app';
import logger from 'lib/logger';

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
    private defaultFrom: string = 'Featherstats <no-reply@featherstats.com>';
    private database: DrizzleClient;

    constructor() {
        this.database = db;
    }


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

    async sendSoftlimitExceedNotification(subscriptionId: string) {

        const user = await this.getUserBySubscriptionId(subscriptionId);
        if (!user?.email) {
            logger.warn(`Could not find a valid user for the given subscription '${subscriptionId}'.`);
            return;
        }

        const { data, error } = await resend.emails.send({
            from: this.defaultFrom,
            to: [user.email],
            subject: `[Featherstats Usage] You've Reached Your Daily Limit`,
            react: DailyLimitExceededEmail({ userName: user.name || user.email }),
        });
    }

    async sendMonthlyLimitExceedNotification(subscriptionId: string) {

        const user = await this.getUserBySubscriptionId(subscriptionId);
        if (!user?.email) {
            logger.warn(`Could not find a valid user for the given subscription '${subscriptionId}'.`);
            return;
        }

        const { data, error } = await resend.emails.send({
            from: this.defaultFrom,
            to: [user.email],
            subject: `[Featherstats Usage] You've Reached Your Monthly Usage Limit`,
            react: MonthlyLimitExceededEmail({ userName: user.name || user.email }),
        });
    }

    async sendMonthlyLimitWarningNotification(subscriptionId: string) {

        const user = await this.getUserBySubscriptionId(subscriptionId);
        if (!user?.email) {
            logger.warn(`Could not find a valid user for the given subscription '${subscriptionId}'.`);
            return;
        }

        const { data, error } = await resend.emails.send({
            from: this.defaultFrom,
            to: [user.email],
            subject: `[Featherstats Usage] You're Approaching Your Monthly Usage Limit`,
            react: MonthlyLimitWarningEmail({ userName: user.name || user.email }),
        });
    }

    async sendDailyLimitWarningNotification(subscriptionId: string) {

        const user = await this.getUserBySubscriptionId(subscriptionId);
        if (!user?.email) {
            logger.warn(`Could not find a valid user for the given subscription '${subscriptionId}'.`);
            return;
        }

        const { data, error } = await resend.emails.send({
            from: this.defaultFrom,
            to: [user.email],
            subject: `[Featherstats Usage] You've Reached 75% of Your Daily Limit`,
            react: DailyLimitWarningEmail({ userName: user.name || user.email }),
        });
    }

    private async getUserBySubscriptionId(subscriptionId: string) {
        const [user] = await this.database.select({ email: usersTable.email, name: usersTable.name }).from(usersTable)
            .innerJoin(subscriptionsTable, eq(subscriptionsTable.userId, usersTable.id))
            .where(eq(subscriptionsTable.id, subscriptionId));

        return user
    }

}

export const emailService = new EmailService();

