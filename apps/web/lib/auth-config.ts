import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { NextAuthConfig } from "next-auth";
import { emailService } from "services/email.service";

export const AuthConfig = {
    providers: [GitHub, Google, Resend({
        apiKey: process.env.RESEND_API_KEY,
        from: 'no-reply@featherstats.com',
        generateVerificationToken: () => {
            const rnd = Math.floor(Math.random() * 899999 + 100000)
            return `${rnd}`;
        },
        sendVerificationRequest({identifier: email, token})  {
            emailService.sendOtpEmail(token, email, "");
        }
    })],
    callbacks: {
        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
        },
        jwt: async ({ token, user }) => {
            token.id = user?.id;
            return token;
        },
        session: async ({session, user, token}) => {
            return {
                ...session,
                user: {
                  ...session.user,
                  // id: user.id, // This is copied from official docs which find user is undefined
                  id: token.sub, // Get id from token instead
                },
              };
        }
    },
    pages: {
        signIn: '/login',
    },

} satisfies NextAuthConfig