import { LoginForm } from "components/auth/login-form";
import { auth } from "lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface LoginPageProps {
    searchParams: Promise<{ callbackUrl?: string }>
}

export const metadata: Metadata = {
    title: "Login",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
    const { callbackUrl } = await searchParams;
    const session = await auth();

    if (session) return redirect(callbackUrl ?? '/');

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    )
}