'use client'
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/components/ui/input-otp";
import { cn } from "lib/utils";
import { Loader } from "lucide-react";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react"
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import React from "react";

interface Props {
    className?: string;
}

export default function EmailLoginForm({ className, ...props }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVerify, setIsVerify] = useState<boolean>(false)
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false)
    const [token, setToken] = useState<string>()
    const [error, setError] = useState<string>();

    const emailFormSchema = z.object({
        email: z.string().email()
    })

    const emailForm = useForm<z.infer<typeof emailFormSchema>>({
        resolver: zodResolver(emailFormSchema),
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof emailFormSchema>) => {
        const email = data.email;
        setIsLoading(true);
        try {
            await signIn("resend", { redirect: false, email })
            setIsVerify(true)
        } catch (err) { }
        setIsLoading(false);
    }

    const onVerify = useCallback(async (token: string) => {
        const email = emailForm.getValues().email.toLocaleLowerCase();
        setIsLoading(true);
        const res = await fetch(`/api/auth/callback/resend?token=${token}&email=${encodeURIComponent(email)}`)
        if (res.ok) {
            setIsRedirecting(true);
            window.location.href = '/'
        } else {
            setError("The OTP you entered is invalid or has expired. Please request a new code and try again.")
        }
        setIsLoading(false);
    }, [token])

    if (isRedirecting) {
        return <>
            <div className={cn("grid gap-6 items-center", className)} {...props}>
                <div className="flex items-center gap-2 justify-center">
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    <h1 className="text-xl font-bold text-center">Redirecting...</h1>
                </div>
            </div>
        </>
    }

    if (isVerify) {
        return <>
            <div className={cn("grid gap-6", className)} {...props}>
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-3xl font-bold">Verification</h1>
                    <div className="text-center text-sm">
                        If you have an account, we have sent a code to {emailForm.getValues().email}. Enter it below.
                    </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <InputOTP className={cn(error && "animate-shake")} disabled={isLoading} maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={token} onChange={setToken} onComplete={onVerify}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="!h-16 !w-12" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={1} className="!h-16 !w-12" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={2} className="!h-16 !w-12" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={3} className="!h-16 !w-12" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={4} className="!h-16 !w-12" />
                        </InputOTPGroup>
                        <InputOTPGroup>
                            <InputOTPSlot index={5} className="!h-16 !w-12" />
                        </InputOTPGroup>
                    </InputOTP>

                </div>
                {isLoading && (<div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                    </div>
                </div>)}

                {error && (<div className="flex flex-col items-center text-sm">
                    <div className="flex items-center text-destructive text-center">
                        {error}
                    </div>
                </div>)}
            </div></>
    }

    return <>
        <div className={cn("grid gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-bold">Log in to Featherstats</h1>
            </div>

            <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={emailForm.control}
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
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    </>
}