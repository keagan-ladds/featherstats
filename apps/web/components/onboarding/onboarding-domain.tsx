'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input"
import { ChevronsUpDown, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { OnboardingContinueButton } from "./onboarding-form";
import { useOnboarding } from "hooks/use-onboarding";
import { OnboardingDataDomain } from "types/onboarding";
import { OnboardingDataDomainSchema } from "lib/validation/onboarding";
import { Switch } from "@repo/ui/components/ui/switch";
import { Separator } from "@repo/ui/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui/components/ui/collapsible";
import { Button } from "@repo/ui/components/ui/button";

export default function OnboardingStepDomain() {

    const { onboardWorkspace } = useOnboarding();

    const form = useForm<OnboardingDataDomain>({
        resolver: zodResolver(OnboardingDataDomainSchema),
        defaultValues: {
            domainName: '',
            enforce_origin_match: true,
            normalize_www: true
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
                    Set up domain tracking in just a few clicks—no tech headaches.
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
                                    <Input placeholder="myawesomesite.com" {...field} />
                                </FormControl>
                                <FormDescription>This is the domain name of your website without the https://</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <div className="text-sm flex items-center gap-2">
                                <Button variant="ghost" size="sm" type="button">
                                    <ChevronsUpDown className="h-4 w-4" />
                                    <span className="sr-only">Toggle</span>
                                </Button>
                                Advanced Settings
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="enforce_origin_match"
                                render={({ field }) => (
                                    <FormItem className="mt-2 flex flex-row items-center justify-between gap-2 rounded-lg border p-3 shadow-xs">
                                        <div className="space-y-0.5">
                                            <FormLabel>Restrict Data to This Domain</FormLabel>
                                            <FormDescription>
                                                Ensure analytics data is only collected from your configured domain, preventing unauthorized tracking from other sources.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="normalize_www"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border p-3 shadow-xs">
                                        <div className="space-y-0.5">
                                            <FormLabel>Combine www and non-www</FormLabel>
                                            <FormDescription>
                                                Track traffic from both www and non-www versions of your domain as a single site.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </CollapsibleContent>
                    </Collapsible>
                </Form>
                <OnboardingContinueButton />
            </form>
        </div>
    )
}