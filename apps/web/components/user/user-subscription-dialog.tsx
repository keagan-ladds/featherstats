'use client'
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { formatDate } from "date-fns";
import useDialog from "hooks/use-dialog";
import { useUser } from "hooks/use-user";
import { formatCurrency } from "lib/format-utils";
import { PlusCircle, Settings } from "lucide-react";

export default function UserSubscriptionDialog() {
    const { close, isOpen } = useDialog("subscription")
    const { open: openUpgrade } = useDialog("upgrade")
    const { profile } = useUser()
    const subscription = profile.subscription
    return <>
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Manage Subscription</DialogTitle>
                    <DialogDescription>
                        View and manage your current subscription plan and billing details.
                    </DialogDescription>
                </DialogHeader>
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Current Plan</CardTitle>
                            <div className="rounded-full px-3 py-1 text-xs bg-primary/10 text-primary font-medium capitalize">{subscription.status}</div>
                        </div>
                        {subscription.currentPeriodEnd && <CardDescription>Your subscription renews on {formatDate(subscription.currentPeriodEnd, "MMMM d, yyyy")}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="text-2xl font-bold">{subscription.name}</div>
                                <div className="text-sm text-muted-foreground">Billed {subscription.billingPeriod == "monthly" ? "Monthly" : "Yearly"}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold">{formatCurrency(subscription.amount, subscription.currency)}</div>
                                <div className="text-sm text-muted-foreground">per {subscription.billingPeriod == "monthly" ? "month" : "year"}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <DialogFooter>
                    {subscription.amount > 0 && (<Button variant="outline" className="gap-1 w-full">
                        <Settings className="h-4 w-4" />
                        Update Billing
                    </Button>)}
                    <Button className="gap-1 w-full" onClick={() => openUpgrade()}>
                        <PlusCircle className="h-4 w-4" />
                        Switch Plan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
}