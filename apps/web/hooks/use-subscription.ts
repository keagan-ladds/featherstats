'use client'
import { getSubscriptionPlans } from "lib/client/api-client";
import { useCallback, useEffect, useState } from "react";
import { PlanWithPrices } from "types/subscription";
import { toast } from "sonner"

export function useSubscription() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [plans, setPlans] = useState<PlanWithPrices[]>([])

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

    return {
        plans,
        isLoading,
        fetchPlans
    }
}