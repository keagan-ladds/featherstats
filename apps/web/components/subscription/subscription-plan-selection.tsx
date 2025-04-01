"use client"

import { useState } from "react"
import { Check, } from "lucide-react"
import { BillingPeriod } from "@featherstats/database/types"
import { PlanWithPrices } from "types/subscription"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { cn } from "lib/utils"
import { Button } from "@repo/ui/components/ui/button"
import { Switch } from "@repo/ui/components/ui/switch"

// Helper function to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(amount / 100)
}

// Helper function to format numbers with commas
const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num)
}

interface Props {
    subscriptionPlans: PlanWithPrices[],
    isLoading?: boolean,
    currentPlanId?: string;
    currentBillingPeriod?: BillingPeriod
    onPlanSelected?: (planId: string, priceId: string) => void
}

export default function SubscriptionPlanSelection({ subscriptionPlans, isLoading, currentPlanId, onPlanSelected, currentBillingPeriod = "monthly" }: Props) {

    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(currentBillingPeriod)


    // Function to get the price for a plan based on the selected billing period
    const getPlanPrice = (plan: PlanWithPrices) => {
        const price = plan.prices.find((p) => p.billingPeriod === billingPeriod)
        return price ? price : plan.prices[0]!
    }



    // Function to check if a plan has a specific billing period
    const hasBillingPeriod = (plan: PlanWithPrices, period: BillingPeriod) => {
        return plan.prices.some((p) => p.billingPeriod === period)
    }

    // Function to handle plan selection
    const handleSelectPlan = (plan: PlanWithPrices) => {
        const { id: priceId } = getPlanPrice(plan)
        onPlanSelected?.(plan.id, priceId)
    }


    // Find the current plan object
    const currentPlan = currentPlanId ? subscriptionPlans.find((plan) => plan.id === currentPlanId) : null

    return (
        <div>
            <div className="flex items-center justify-center space-x-2 my-3">
                <span className={cn("text-xs", billingPeriod === "monthly" ? "font-medium" : "text-muted-foreground")}>
                    Monthly
                </span>
                <Switch
                    checked={billingPeriod === "yearly"}
                    onCheckedChange={(checked) => setBillingPeriod(checked ? "yearly" : "monthly")}
                />
                <span className={cn("text-xs", billingPeriod === "yearly" ? "font-medium" : "text-muted-foreground")}>
                    Yearly
                    <span className="ml-1 text-[10px] text-emerald-500 font-medium">Save up to 17%</span>
                </span>
            </div>

            {currentPlan && (
                <div className="text-xs text-center mb-2 text-muted-foreground">
                    You are currently on the <span className="font-medium text-foreground">{currentPlan.name}</span> plan
                </div>
            )}

            <div className="space-y-3 mt-2 md:space-y-0 md:gap-4 md:grid md:grid-cols-3">

                {subscriptionPlans.map((plan) => {
                    const price = getPlanPrice(plan)
                    const hasYearly = hasBillingPeriod(plan, "yearly")
                    const isPopular = plan.name === "Growth"
                    const isCurrentPlan = currentPlanId === plan.id

                    return (
                        <Card
                            key={plan.id}
                            className={cn(
                                "relative",
                                isPopular && "border-primary",
                                isCurrentPlan && "border-2 border-primary/70 bg-primary/5",
                            )}
                        >
                            <div className={cn("absolute top-0 h-5 w-full items-center justify-center flex flex-col rounded-t-xl", isPopular && "bg-primary")}>
                                    {isPopular && (
                                        <span className="text-primary-foreground text-[10px] font-medium">
                                            POPULAR
                                        </span>
                                    )}
                                </div>
                            <CardHeader>
                                
                                <div className="flex items-center mt-4">
                                    <CardTitle className="text-base flex-1">
                                        {plan.name}
                                    </CardTitle>
                                    <div className="flex items-center">
                                        <span className="text-lg font-bold mr-1">{formatCurrency(price.amount)}</span>
                                        <span className="text-xs text-muted-foreground">
                                            /{billingPeriod === "monthly" ? "mo" : "yr"}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1">
                                <ul className="space-y-1.5 mt-2 text-sm">
                                    <li className="flex items-start">
                                        <Check className="h-4 w-4 text-primary mr-1.5 mt-0.5 flex-shrink-0" />
                                        <span>{formatNumber(plan.usageLimits.maxMonthlyPageviews)} monthly pageviews</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="h-4 w-4 text-primary mr-1.5 mt-0.5 flex-shrink-0" />
                                        <span>
                                            Up to {plan.usageLimits.maxDomains} domain{plan.usageLimits.maxDomains > 1 ? "s" : ""}
                                        </span>
                                    </li>
                                    {/* <li className="flex items-start">
                                            <Check className="h-4 w-4 text-primary mr-1.5 mt-0.5 flex-shrink-0" />
                                            <span>
                                                {plan.usageLimits.maxWorkspaces} workspace{plan.usageLimits.maxWorkspaces > 1 ? "s" : ""}
                                            </span>
                                        </li> */}
                                    <li className="flex items-start">
                                        <Check className="h-4 w-4 text-primary mr-1.5 mt-0.5 flex-shrink-0" />
                                        <span>{plan.usageLimits.dataRetentionDays} days data retention</span>
                                    </li>
                                </ul>

                            </CardContent>

                            <CardFooter className="p-3">
                                {isCurrentPlan ? (
                                    <Button className="w-full text-sm py-1.5 h-auto" variant="secondary" disabled>
                                        Current Plan
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full text-sm py-1.5 h-auto"
                                        variant={isPopular ? "default" : "outline"}
                                        onClick={() => handleSelectPlan(plan)}
                                        disabled={!hasYearly && billingPeriod === "yearly" || isLoading}>
                                        {currentPlanId ? "Switch Plan" : "Select Plan"}
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
            <div className="text-[10px] text-muted-foreground text-center mt-3">
                All plans include analytics dashboard, real-time data, and basic support.
            </div>
        </div>
    )
}

