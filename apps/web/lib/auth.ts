import NextAuth, { NextAuthConfig, Session, type NextAuthResult } from 'next-auth';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@featherstats/database";
import { usersTable, accountsTable, sessionsTable, verificationTokensTable, authenticatorsTable } from "@featherstats/database/schema/auth";
import { NextRequest, NextResponse } from "next/server";
import { AuthConfig } from "./auth-config";
import { emailService } from 'services/email.service';
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"

const authOptions = {
    ...AuthConfig,
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
        authenticatorsTable: authenticatorsTable
    }),
    providers: [GitHub, Google, Resend({
        apiKey: process.env.RESEND_API_KEY,
        from: 'no-reply@featherstats.com',
        maxAge: 300,
        generateVerificationToken: () => {
            const rnd = Math.floor(Math.random() * 899999 + 100000)
            return `${rnd}`;
        },
        sendVerificationRequest({identifier: email, token})  {
            emailService.sendOtpEmail(token, email, "");
        }
    })],
    session: { strategy: "jwt" },
    events: {
        createUser: async ({ user }) => {
            if (user.email) {
                await emailService.sendWelcomeEmail(user.email, user.name!);
            }
        }
    }

} satisfies NextAuthConfig

const result = NextAuth(authOptions);

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;

export async function withAuth(request: NextRequest, callback: (session: Session, userId: string) => Promise<NextResponse | void> | void) {
    const session = await auth();

    if (!session) return new NextResponse(null, { status: 401 })
    if (!session.user?.id) return new NextResponse(null, { status: 403 });

    return await callback(session!, session.user.id);
}