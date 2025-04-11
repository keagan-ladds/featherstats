'use client'
import { getSubscriptionPlans, getSubscriptionUsage, updateSubscriptionBillingDetails, updateSubscriptionPlan as updateSubscriptionPlanApi } from "lib/client/api-client";
import { useCallback, useEffect, useState } from "react";
import { PlanWithPrices, SubscriptionPaymentIntent, UpdateSubscriptionPlanOptions, UpdateSubscriptionPlanResult } from "types/subscription";
import { toast } from "sonner"
import { SubscriptionUsage } from "types/usage";

export function useSubscription() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [plans, setPlans] = useState<PlanWithPrices[]>([])
    const [paymentIntent, setPaymentIntent] = useState<SubscriptionPaymentIntent | null>()
    const [subscriptionUsage, setSubscriptionUsage] = useState<SubscriptionUsage>();


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

    const fetchUsage = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getSubscriptionUsage();
            setSubscriptionUsage(data);
        } catch (err) {
            toast.error("Something went wrong while getting subscription usage.")
        }

        setIsLoading(false)
    }, [])


    const updateSubscriptionPlan = useCallback(async (opts: UpdateSubscriptionPlanOptions) => {
        setIsLoading(true);
        try {
            const result = await updateSubscriptionPlanApi(opts);
            if (result.redirectUrl) {
                window.location.href = result.redirectUrl
            }

        } catch (err) {
            toast.error("Something went wrong while processing subscription plan update, please refresh the page and try again.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    const updateBillingDetails = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await updateSubscriptionBillingDetails();
            if (result.redirectUrl) {
                window.location.href = result.redirectUrl
            }

        } catch (err) {
            toast.error("Something went wrong while processing billing details update, please refresh the page and try again.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        plans,
        isLoading,
        paymentIntent,
        subscriptionUsage,
        fetchPlans,
        fetchUsage,
        updateSubscriptionPlan,
        updateBillingDetails
    }
}