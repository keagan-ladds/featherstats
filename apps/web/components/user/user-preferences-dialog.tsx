'use client'
import { Button } from "@repo/ui/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@repo/ui/components/ui/dialog"
import { Input } from "@repo/ui/components/ui/input"
import { Switch } from "@repo/ui/components/ui/switch"
import { useUser } from "hooks/use-user"
import { UpdateUserPreferencesSchema } from "lib/validation/user"
import { UpdateUserPreferencesOptions } from "types/user"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { useCallback } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"


export default function UserPreferencesDialog() {
    const { loading, profile, preferencesOpen, openPreferences, updateUserPreferences } = useUser();

    const form = useForm<UpdateUserPreferencesOptions>({
        resolver: zodResolver(UpdateUserPreferencesSchema),
        defaultValues: {
            name: profile.name || '',
            theme: profile.preferences.theme || 'dark',
            clarityModeEnabled: profile.preferences.clarifyModeEnabled || false
        }
    })

    const formState = form.formState;

    const handleSubmit = useCallback(async (data: UpdateUserPreferencesOptions) => {
        await updateUserPreferences(data);
    }, [])

    return <>
        <Dialog open={preferencesOpen} onOpenChange={openPreferences}>
            <DialogContent className="sm:max-w-[425px]">
                <form className='flex flex-col gap-4 w-full' onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Edit preferences</DialogTitle>
                        <DialogDescription>
                            Make changes to your preferences here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
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

                        <FormField
                            control={form.control}
                            name="theme"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Theme</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a verified email to display" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="dark">Dark</SelectItem>
                                            {/* <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="system">System Default</SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select how your dashboard looks. You can choose Light, Dark, or match your system settings.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="clarityModeEnabled"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs">
                                    <div className="space-y-0.5">
                                        <FormLabel>Enable Clarity Mode</FormLabel>
                                        <FormDescription>
                                            Clarity Mode helps you understand your analytics with simple explanations and insights. Turn it on for helpful tooltips and key takeaways.
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
                    </Form>
                    <DialogFooter>
                        <Button type="submit" disabled={!formState.isValid || loading}>Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
}