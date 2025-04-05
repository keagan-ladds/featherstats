'use client'

import { useCallback, useState } from "react"
import { signIn as authSignIn } from "next-auth/react"

export function useLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
    const [error, setError] = useState<string>();
    const [isVerify, setIsVerify] = useState<boolean>(false)
    const [email, setEmail] = useState<string>();

    const onVerify = useCallback(async ( token: string) => {
        if (!email) throw new Error("Email in unexpectedly null or empty, make sure to call 'signIn' first.")

        setIsLoading(true);
        const res = await fetch(`/api/auth/callback/resend?token=${token}&email=${encodeURIComponent(email.toLocaleLowerCase())}`)
        if (res.ok) {
            setIsRedirecting(true);
            window.location.href = '/'
        } else {
            setError("The OTP you entered is invalid or has expired. Please request a new code and try again.")
        }
        setIsLoading(false);
    }, [email])

    const signIn = useCallback(async (email: string) => {
        setIsLoading(true);
        setEmail(email);
        try {
            await authSignIn("resend", { redirect: false, email })
            setIsVerify(true)
        } catch (err) { }
        setIsLoading(false);
    }, [])

    return {
        isLoading,
        isRedirecting,
        isVerify,
        error,
        onVerify,
        signIn
    }
}