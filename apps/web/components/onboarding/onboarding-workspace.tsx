'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input"
import { useOnboarding } from "hooks/use-onboarding";
import { ArrowRight, Blocks } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { Button } from "@repo/ui/components/ui/button";
import { OnboardingContinueButton } from "./onboarding-form";



export default function OnboardingStepWorkspace() {


    const { onContinue } = useOnboarding();
    const formSchema = z.object({
        workspaceName: z.string().min(2, {
            message: "Workspace name must be at least 2 characters.",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            workspaceName: "Default Workspace"
        }
    })

    const handleSubmit = () => {
        onContinue()
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-md mb-2">
                <Blocks className="size-10" />
            </div>
            <h1 className="text-xl font-bold">Let's Setup a Workspace</h1>
            <div className="text-center text-sm">
                A workspace is like a home for all your domains
            </div>
            <form className='flex flex-col gap-6 w-full mt-10' onSubmit={form.handleSubmit(handleSubmit)}>
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