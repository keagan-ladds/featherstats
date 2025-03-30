'use client'
import { getSubscriptionPlans, updateSubscriptionPlan as updateSubscriptionPlanApi } from "lib/client/api-client";
import { useCallback, useEffect, useState } from "react";
import { PlanWithPrices } from "types/subscription";
import { toast } from "sonner"
import useDialog from "./use-dialog";

export function useSubscription() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [plans, setPlans] = useState<PlanWithPrices[]>([])
    const { close } = useDialog("upgrade")
    const fetchPlans = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getSubscriptionPlans();
            setPlans(data);
        } catch (err) {
            toast.error("Something went wrong while getting available subscription plans.")
        }

        setIsLoading(false)
    }, [])

    useEffect(() => {
        fetchPlans()
    }, [fetchPlans])

    const updateSubscriptionPlan = useCallback(async (planId: string, priceId: string) => {
        setIsLoading(true);
        try {
            const data = await updateSubscriptionPlanApi({ planId, priceId });
            if (data.url)
                window.location.href = data.url;
            else {
                close();
                toast("Your subscription has been updated successfully")
            }
        } catch (err) {
            toast.error("Something went wrong while processing subscription plan update, please refresh the page and try again.")
        }

        setIsLoading(false)
    }, [])

    return {
        plans,
        isLoading,
        fetchPlans,
        updateSubscriptionPlan
    }
}