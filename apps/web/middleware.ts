import NextAuth, { type NextAuthResult } from "next-auth"
import { AuthConfig } from "lib/auth-config"

const { auth } = NextAuth(AuthConfig)
export const middleware: NextAuthResult['auth'] = auth

export const config = {
    matcher: ["/((?!api|tracker.js|_next/static|_next/image|favicon.ico|login|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}