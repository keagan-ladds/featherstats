'use client'
import SocialLoginGithub from "./login-social-github";
import SocialLoginGoogle from "./login-social-google";
import { FormField, FormItem, FormLabel, FormMessage, FormControl, Form } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@repo/ui/components/ui/button";
import { useCallback, useEffect } from "react";
import { useLogin } from "hooks/use-login";
import { Loader } from "lucide-react";
import { cn } from "lib/utils";
import VerificationInput from "./verification-input";
import { LoginTerms } from "./login-form";
import { setFlowCookies } from "lib/onboarding-utils";

interface Props {
    flowParams?: {
        plan?: string;
        period?: string;
        currency?: string;
        promo?: string;
    }
}

export default function SignupForm({flowParams} : Props) {

    const { onVerify, signIn, error, isLoading, isRedirecting, isVerify } = useLogin()
    const signupFormSchema = z.object({
        email: z.string().email("Please provide a valid email address.")
    })

    const form = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = useCallback(async (data: z.infer<typeof signupFormSchema>) => {
        signIn(data.email)
    }, [])

    useEffect(() => {
        if (flowParams) {
            setFlowCookies(flowParams)
        }
    }, [flowParams])

    if (isRedirecting) {
        return <>
            <div className={cn("grid gap-6 items-center")}>
                <div className="flex items-center gap-2 justify-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    <h1 className="text-xl font-bold text-center">Redirecting...</h1>
                </div>
            </div>
        </>
    }

    if (isVerify) {
        return <VerificationInput loading={isLoading} error={error} infoText={`We have sent a code to ${form.getValues().email}. Enter it below.`} onComplete={onVerify} />
    }

    return <>
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-xl font-bold">Signup to Featherstats</h1>
                    <div className="text-center text-sm">
                        Enter your email below to create an account
                    </div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="sr-only">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading} className="w-full">
                            {isLoading && (
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Continue with Email
                        </Button>
                    </form>
                </Form>
                <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                        Or
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    <SocialLoginGithub />
                    <SocialLoginGoogle />
                </div>
            </div>
            <LoginTerms />
        </div>
    </>
}