'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input"
import { Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { OnboardingContinueButton } from "./onboarding-form";
import { useOnboarding } from "hooks/use-onboarding";
import { OnboardingDataDomain } from "types/onboarding";
import { OnboardingDataDomainSchema } from "lib/validation/onboarding";

export default function OnboardingStepDomain() {

    const { onboardWorkspace } = useOnboarding();

    const form = useForm<OnboardingDataDomain>({
        resolver: zodResolver(OnboardingDataDomainSchema),
        defaultValues: {
            domainName: ''
        }
    })

    const handleSubmit = (data: OnboardingDataDomain) => {
        onboardWorkspace(data);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <div className="flex h-10 w-10 justify-center rounded-md mb-2">
                    <Globe className="size-10" />
                </div>
                <h1 className="text-xl font-bold">Add Your First Domain</h1>
                <div className="text-muted-foreground text-sm">
                    Where's the magic happening? Enter your domain and let's track some vibes.
                </div>
            </div>
            <form className='flex flex-col gap-4 w-full' onSubmit={form.handleSubmit(handleSubmit)}>
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
                                <FormDescription>This is the domain name of your website without the https://</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                </Form>
                <OnboardingContinueButton />
            </form>
        </div>
    )
}