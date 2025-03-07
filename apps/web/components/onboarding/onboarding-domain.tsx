'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input"
import { Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { OnboardingContinueButton } from "./onboarding-form";

export default function OnboardingStepDomain() {

    const formSchema = z.object({
        domainName: z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleSubmit = () => {

    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md mb-2">
                <Globe className="size-10" />
            </div>
            <h1 className="text-xl font-bold">Let's Add a Domain</h1>
            <div className="text-center text-sm">
                Add a domain to your workspace so you can track it.
            </div>
            <form className='flex flex-col gap-6 w-full mt-10' onSubmit={form.handleSubmit(handleSubmit)}>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="domainName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Domain Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="example.com" {...field} />
                                </FormControl>
                                <FormDescription>This is the domain name of the website you want to track.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                </Form>
                <OnboardingContinueButton />
            </form>
        </div>
    )
}