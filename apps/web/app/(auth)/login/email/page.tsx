import EmailLoginForm from "components/auth/email-login-form";
import { auth } from "lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Login",
};

export default async function EmailLoginPage() {
    const session = await auth();
    if (session) return redirect('/');

    return <>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <EmailLoginForm />
            </div>
        </div>
    </>
}