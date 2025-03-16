'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input"
import { useOnboarding } from "hooks/use-onboarding";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { OnboardingContinueButton } from "./onboarding-form";
import { OnboardingDataWelcomeSchema } from "lib/validation/onboarding";
import { OnboardingDataWelcome } from "types/onboarding";

export default function OnboardingStepWelcome() {

    const { onContinue } = useOnboarding();
    const { data: session } = useSession()



    const form = useForm<OnboardingDataWelcome>({
        resolver: zodResolver(OnboardingDataWelcomeSchema),
        defaultValues: {
            name: session?.user?.name || ""
        }
    })

    useEffect(() => {
        form.setValue('name', session?.user?.name || "")
    }, [session])

    const handleSubmit = (data: OnboardingDataWelcome) => {
        onContinue("workspace", data);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center mb-2">
                <Image src="/featherstats.png" width={256} height={256} alt="featherstats" className="rounded-xs"></Image>
            </div>
            <h1 className="text-xl font-bold">Hey there, let's get you set up!</h1>
            <div className="text-center text-sm">
            Stoked to have you on board! Drop your details below, and let's roll.
            </div>
            <form className='flex flex-col gap-6 w-full mt-8' onSubmit={form.handleSubmit(handleSubmit)}>
                <Form {...form}>
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