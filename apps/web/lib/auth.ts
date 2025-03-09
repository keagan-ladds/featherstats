import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import NextAuth, { NextAuthConfig, Session, type NextAuthResult } from 'next-auth';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@featherstats/database";
import { usersTable, accountsTable, sessionsTable, verificationTokensTable, authenticatorsTable } from "@featherstats/database/schema/auth";
import { NextRequest, NextResponse } from "next/server";

const authOptions = {
    providers: [GitHub, Google],
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
        authenticatorsTable: authenticatorsTable
    })

} satisfies NextAuthConfig

const result = NextAuth(authOptions);

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;

export async function withAuth(request: NextRequest, callback: (session: Session, userId: string) => Promise<NextResponse | void> | void) {
    const session =  await auth();

    if (!session) return new NextResponse(null, {status: 401})
    if (!session.user?.id) return new NextResponse(null, {status: 403});

    return await callback(session!, session.user.id);
}