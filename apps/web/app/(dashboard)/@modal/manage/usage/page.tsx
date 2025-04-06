'use client'
import { Button } from "@repo/ui/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog";
import { Separator } from "@repo/ui/components/ui/separator";
import { Progress } from "@repo/ui/components/ui/progress";
import { Package } from "lucide-react";
import { useSubscription } from "hooks/use-subscription";
import { useEffect, useMemo } from "react";
import { useUser } from "hooks/use-user";
import { formatNumber } from "lib/format-utils";
import { useModalSafeClose } from "hooks/use-modal-close";
import Link from "next/link";

export default function UserUsageDialog() {
    const close = useModalSafeClose();
    const { subscriptionUsage, fetchUsage } = useSubscription();
    const { profile } = useUser()

    useEffect(() => {
        fetchUsage();
    }, [])

    const pageviewPercentage = useMemo(() => {
        const limit = profile.subscription?.usageLimits?.maxMonthlyPageviews || 0
        const usage = subscriptionUsage?.periodUsage.pageviews || 0
        if (limit == 0) return 0;

        return Math.ceil(usage / limit * 100);

    }, [subscriptionUsage, profile.subscription])
    return <>
        <Dialog open={true} onOpenChange={close}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>View Usage</DialogTitle>
                    <DialogDescription>
                        View usage details.
                    </DialogDescription>
                </DialogHeader>
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
                                <div className="text-muted-foreground">{formatNumber(subscriptionUsage?.periodUsage?.pageviews || 0)} / {formatNumber(profile.subscription?.usageLimits?.maxMonthlyPageviews || 0)}</div>
                            </div>
                            <Progress value={pageviewPercentage} className="h-2" />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="font-medium">Domains</div>
                                <div className="text-muted-foreground">1 / {formatNumber(profile.subscription?.usageLimits?.maxDomains || 0)}</div>
                            </div>
                            <Progress value={20} className="h-2" />
                        </div>

                        {/* <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="font-medium">Workspaces</div>
                                <div className="text-muted-foreground">1 / {formatNumber(profile.subscription?.usageLimits?.maxWorkspaces || 0)}</div>
                            </div>
                            <Progress value={100} className="h-2" />
                        </div> */}

                        <Separator />

                        <div className="pt-2">
                            <div className="text-sm text-muted-foreground mb-4">
                                Need more resources? Upgrade your plan to increase your limits.
                            </div>
                            <Button className="w-full" asChild><Link href="/manage/subscription/upgrade">Upgrade Plan</Link></Button>
                        </div>
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    </>
}