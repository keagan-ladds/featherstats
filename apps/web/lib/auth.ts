import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import NextAuth, { type NextAuthResult } from 'next-auth';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@featherstats/database";
import { usersTable } from "@featherstats/database/schema/user";
import { accountsTable, sessionsTable, verificationTokensTable, authenticatorsTable } from "@featherstats/database/schema/auth";

const authOptions = {
    providers: [GitHub, Google],
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
        authenticatorsTable: authenticatorsTable
    }),
}

const result = NextAuth(authOptions);

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;