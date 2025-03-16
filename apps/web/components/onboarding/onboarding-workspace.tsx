'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input"
import { useOnboarding } from "hooks/use-onboarding";
import { Blocks } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { OnboardingContinueButton } from "./onboarding-form";
import { OnboardingDataWorkspaceSchema } from "lib/validation/onboarding";
import { OnboardingDataWorkspace } from "types/onboarding";



export default function OnboardingStepWorkspace() {
    const { onContinue } = useOnboarding();

    const form = useForm<OnboardingDataWorkspace>({
        resolver: zodResolver(OnboardingDataWorkspaceSchema),
        defaultValues: {
            workspaceName: "Default Workspace"
        }
    })

    const handleSubmit = (data: OnboardingDataWorkspace) => {
        onContinue("domain", data)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md mb-2">
                <Blocks className="size-10" />
            </div>
            <h1 className="text-xl font-bold">Create Your HQ</h1>
            <div className="text-center text-sm">
                Your workspace is home base for all your domains. Name it something cool!
            </div>
            <form className='flex flex-col gap-6 w-full mt-8' onSubmit={form.handleSubmit(handleSubmit)}>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="workspaceName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Workspace Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Default Workspace" {...field} />
                                </FormControl>
                                <FormDescription>This is the name of the workspace you will use to access your data.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )} />
                </Form>
                <OnboardingContinueButton />
            </form>
        </div>
    )
}