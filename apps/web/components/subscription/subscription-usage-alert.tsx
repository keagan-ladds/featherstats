'use client'

import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert";
import { useSubscription } from "hooks/use-subscription"
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export default function SubscriptionUsageAlert() {
    const { subscriptionUsage, fetchUsage } = useSubscription();
    useEffect(() => {
        fetchUsage();
    }, [fetchUsage])


    const limitWarning = useMemo(() => {
        if (!subscriptionUsage || subscriptionUsage.dailyPageviewSoftlimit == 0) return false;

        return (subscriptionUsage.dailyUsage.pageviews / subscriptionUsage.dailyPageviewSoftlimit) >= 0.75;

    }, [subscriptionUsage])

    const limitExceeded = useMemo(() => {
        if (!subscriptionUsage || subscriptionUsage.dailyPageviewSoftlimit == 0) return false;
        return (subscriptionUsage.dailyUsage.pageviews / subscriptionUsage.dailyPageviewSoftlimit) > 1;
    }, [subscriptionUsage])

    if (!limitWarning && !limitExceeded) {
        return null
    }

    return <>
        <Alert variant={limitExceeded ? "danger" : "warning"}>
            <CircleAlert className="h-4 w-4" />
            <AlertTitle className="font-bold">{limitExceeded ? "You've hit your daily usage limit" : "You're nearing your daily usage limit"}</AlertTitle>
            <AlertDescription className="text-muted-foreground">{limitExceeded ? <>You've reached your daily pageview limit. <Link className=" underline text-foreground" href="/manage/subscription/upgrade">Upgrade</Link> your plan to resume normal service and prevent future interruptions.</> : <>You've used over 75% of your daily pageview quota. To ensure uninterrupted access, consider <Link className="underline text-foreground" href="/manage/subscription/upgrade">upgrading</Link> your plan.</>}</AlertDescription>
        </Alert>
    </>
}