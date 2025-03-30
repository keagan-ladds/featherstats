'use client'
import { Button } from "@repo/ui/components/ui/button";
import { CardDescription, CardTitle } from "@repo/ui/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import useDialog from "hooks/use-dialog";
import { PlusCircle, Settings } from "lucide-react";

export default function UserSubscriptionDialog() {
    const { close, isOpen } = useDialog("subscription")
    const { open: openUpgrade } = useDialog("upgrade")
    return <>
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Subscription</DialogTitle>
                    <DialogDescription>
                        View and manage your current subscription plan and billing details.
                    </DialogDescription>
                </DialogHeader>

                <div className="!pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle>Current Plan</CardTitle>
                        <div className="rounded-full px-3 py-1 text-xs bg-primary/10 text-primary font-medium">Active</div>
                    </div>
                    <CardDescription>Your subscription renews on October 15, 2023</CardDescription>
                </div>
                <div className="pb-3 space-y-5">
                    <div className="flex items-start justify-between">
                        <div>
                            <div className="text-2xl font-bold">Pro Plan</div>
                            <div className="text-sm text-muted-foreground mt-1">Billed monthly</div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold">$29</div>
                            <div className="text-sm text-muted-foreground mt-1">per month</div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div className="flex justify-between">
                        <Button variant="outline" className="gap-1">
                            <Settings className="h-4 w-4" />
                            Update Billing
                        </Button>
                        <Button className="gap-1" onClick={() => openUpgrade()}>
                            <PlusCircle className="h-4 w-4" />
                            Upgrade Plan
                        </Button>
                    </div>
                </DialogFooter>

            </DialogContent>

        </Dialog>
    </>
}