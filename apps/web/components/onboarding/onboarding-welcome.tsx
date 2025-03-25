'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@repo/ui/components/ui/form";
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
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-0">
                <div className="flex h-10 w-10 justify-center mb-2">
                    <Image src="/featherstats.png" width={64} height={64} alt="featherstats" className="rounded-xs"></Image>
                </div>
                <h1 className="text-xl font-bold">Hey There! Let's Get You Set Up</h1>
                <div className="text-muted-foreground text-sm">
                    We're stoked to have you on board!
                </div>
            </div>

            <form className='flex flex-col gap-4 w-full' onSubmit={form.handleSubmit(handleSubmit)}>
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
                                <FormMessage />
                            </FormItem>
                        )} />

                    <OnboardingContinueButton />
                </Form>
            </form>
        </div>
    )
}