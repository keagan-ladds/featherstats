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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { useCallback } from "react"
import { DomainCreateOptions } from "types/workspace"
import { DomainCreateOptionsSchema } from "lib/validation/workspace"
import useDialog from "hooks/use-dialog"
import { useWorkspace } from "hooks/use-workspace"


export default function DomainCreateDialog() {
    const { isOpen, close } = useDialog("domain_create");
    const { loading, addDomain } = useWorkspace()

    const form = useForm<DomainCreateOptions>({
        resolver: zodResolver(DomainCreateOptionsSchema),
        defaultValues: {
            name: "",
            enforce_origin_match: true,
            normalize_www: true
        }
    })

    const formState = form.formState;

    const handleSubmit = useCallback(async (opts: DomainCreateOptions) => {
        try {
            await addDomain(opts);
            close();
        } catch {

        }
    }, [])

    return <>
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px]">
                <form className='flex flex-col gap-4 w-full' onSubmit={form.handleSubmit(handleSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Add a New Domain</DialogTitle>
                        <DialogDescription>
                            Track analytics for a new website by adding its domain below.
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
                                        <Input placeholder="Enter your domain name without https://" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <FormField
                            control={form.control}
                            name="enforce_origin_match"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
                    </Form>
                    <DialogFooter>
                        <Button type="submit" disabled={!formState.isValid || loading}>Add domain</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
}


