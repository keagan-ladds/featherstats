'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input"
import { useOnboarding } from "hooks/use-onboarding";
import { ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { OnboardingContinueButton } from "./onboarding-form";

export default function OnboardingStepWelcome() {

    const { onContinue } = useOnboarding();
    const { data: session } = useSession()

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
        email: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: session?.user?.name || "",
            email: session?.user?.email || "",
        }
    })

    useEffect(() => {
        form.setValue('name', session?.user?.name || "")
        form.setValue('email', session?.user?.email || "")
    }, [session])

    const handleSubmit = () => {
        onContinue();
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md">
                <Image src="/featherstats.png" width={256} height={256} alt="featherstats" className="rounded-xs"></Image>
            </div>
            <h1 className="text-xl font-bold">Welcome to Featherstats</h1>
            <div className="text-center text-sm">
                We are excited to have you on board. Please fill in the details below to get started.
            </div>
            <form className='flex flex-col gap-6 w-full mt-10' onSubmit={form.handleSubmit(handleSubmit)}>
                <Form {...form}>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormDescription>This is just so we know what to call you when you log in.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />

                    <OnboardingContinueButton />
                </Form>
            </form>
        </div>
    )
}