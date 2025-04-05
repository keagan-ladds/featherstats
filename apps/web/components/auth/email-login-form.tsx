'use client'
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { cn } from "lib/utils";
import { Loader } from "lucide-react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";

import React from "react";
import VerificationInput from "./verification-input";
import { useLogin } from "hooks/use-login";
import { LoginTerms } from "./login-form";

interface Props {
    className?: string;
}

export default function EmailLoginForm({ className, ...props }: Props) {

    const { onVerify, signIn, error, isLoading, isRedirecting, isVerify } = useLogin()

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
        signIn(data.email)
    }


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
            <VerificationInput loading={isLoading} error={error} infoText={`If you have an account, we have sent a code to ${emailForm.getValues().email}. Enter it below.`} onComplete={onVerify} /></>
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
            <LoginTerms />
        </div>
    </>
}