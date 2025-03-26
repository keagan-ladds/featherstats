import { NextAuthConfig } from "next-auth";

export const AuthConfig = {
    providers:[],
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