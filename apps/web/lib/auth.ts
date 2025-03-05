import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import NextAuth, { NextAuthConfig, type NextAuthResult } from 'next-auth';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@featherstats/database";
import { usersTable, accountsTable, sessionsTable, verificationTokensTable, authenticatorsTable } from "@featherstats/database/schema/auth";
import { workspaceService } from "services/workspace.service";

const authOptions = {
    providers: [GitHub, Google],
    adapter: DrizzleAdapter(db, {
        usersTable: usersTable,
        accountsTable: accountsTable,
        sessionsTable: sessionsTable,
        verificationTokensTable: verificationTokensTable,
        authenticatorsTable: authenticatorsTable
    }),
    callbacks: {
        signIn: async ({ user }) => {
            await workspaceService.createDefaultUserWorkspace({ userId: user.id! })
            return true
        }
    }

} satisfies NextAuthConfig

const result = NextAuth(authOptions);

export const handlers: NextAuthResult['handlers'] = result.handlers;
export const auth: NextAuthResult['auth'] = result.auth;
export const signIn: NextAuthResult['signIn'] = result.signIn;
export const signOut: NextAuthResult['signOut'] = result.signOut;