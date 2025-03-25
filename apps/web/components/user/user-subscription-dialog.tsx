'use client'
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { Separator } from "@repo/ui/components/ui/separator";
import { Progress } from "@repo/ui/components/ui/progress";
import useDialog from "hooks/use-dialog";
import { Package, PlusCircle, Settings } from "lucide-react";

export default function UserSubscriptionDialog() {
    const { close, isOpen } = useDialog("subscription")
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
                    <CardHeader className="!pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle>Current Plan</CardTitle>
                            <div className="rounded-full px-3 py-1 text-xs bg-primary/10 text-primary font-medium">Active</div>
                        </div>
                        <CardDescription>Your subscription renews on October 15, 2023</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3 space-y-5">
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

                        <Separator />

                        <div className="pt-2 flex justify-between">
                            <Button variant="outline" className="gap-1">
                                <Settings className="h-4 w-4" />
                                Update Billing
                            </Button>
                            <Button className="gap-1">
                                <PlusCircle className="h-4 w-4" />
                                Upgrade Plan
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Resource Usage
                        </CardTitle>
                        <CardDescription>Your current usage across all resources</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="font-medium">Pageviews</div>
                                <div className="text-muted-foreground">1,000 / 5,000</div>
                            </div>
                            <Progress value={20} className="h-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="font-medium">Domains</div>
                                <div className="text-muted-foreground">1 / 5</div>
                            </div>
                            <Progress value={20} className="h-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="font-medium">Workspaces</div>
                                <div className="text-muted-foreground">1 / 1</div>
                            </div>
                            <Progress value={100} className="h-2" />
                        </div>

                        <Separator />

                        <div className="pt-2">
                            <div className="text-sm text-muted-foreground mb-4">
                                Need more resources? Upgrade your plan to increase your limits.
                            </div>
                            <Button className="w-full">Upgrade Plan</Button>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    </>
}