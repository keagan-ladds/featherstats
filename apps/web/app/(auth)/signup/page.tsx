import SignupForm from "components/auth/signup-form";
import { auth } from "lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";

interface Props {
    searchParams: Promise<{ plan?: string, period?: string, currency?: string, promo?: string }>
}

export const metadata: Metadata = {
    title: "Sign Up",
};

export default async function SignupPage({ searchParams }: Props) {
    const session = await auth();
    if (session) redirect("/")

    const { ...params } = await searchParams


    return <>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm flowParams={params} />
            </div>
        </div>
    </>
}