'use client'
import { getSubscriptionPlans, updateSubscriptionPlan as updateSubscriptionPlanApi } from "lib/client/api-client";
import { useCallback, useEffect, useState } from "react";
import { PlanWithPrices, UpdateSubscriptionPlanOptions, UpdateSubscriptionPlanResult } from "types/subscription";
import { toast } from "sonner"
import useDialog from "./use-dialog";

export function useSubscription() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [plans, setPlans] = useState<PlanWithPrices[]>([])
    const [updateResult, setUpdateResult] = useState<UpdateSubscriptionPlanResult | null>()
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

    const updateSubscriptionPlan = useCallback(async (opts: UpdateSubscriptionPlanOptions) => {
        setIsLoading(true);
        try {
            const data = await updateSubscriptionPlanApi(opts);
            setUpdateResult(data);
        } catch (err) {
            toast.error("Something went wrong while processing subscription plan update, please refresh the page and try again.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        plans,
        isLoading,
        clientSecret: updateResult?.clientSecret,
        intentType: updateResult?.intentType,
        fetchPlans,
        updateSubscriptionPlan,

    }
}