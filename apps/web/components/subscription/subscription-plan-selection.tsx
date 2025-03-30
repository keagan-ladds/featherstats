"use client"

import { useState } from "react"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { BillingPeriod, Plan } from "@featherstats/database/types"
import { PlanWithPrices } from "types/subscription"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { cn } from "lib/utils"
import { Button } from "@repo/ui/components/ui/button"
import { Switch } from "@repo/ui/components/ui/switch"
import { useSubscription } from "hooks/use-subscription"

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
    currentPlanId?: string
    currentBillingPeriod?: BillingPeriod
}

export default function SubscriptionPlanSelection({
    currentPlanId,
    currentBillingPeriod = "monthly",
}: Props) {
    const { plans: subscriptionPlans } = useSubscription();
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(currentBillingPeriod)
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

    // Default to expanding the current plan if it exists, otherwise the Growth plan
    const [expandedPlan, setExpandedPlan] = useState<string | null>(currentPlanId || null)

    // Function to get the price for a plan based on the selected billing period
    const getPlanPrice = (plan: PlanWithPrices) => {
        const price = plan.prices.find((p) => p.billingPeriod === billingPeriod)
        return price ? price.amount : plan.prices[0]!.amount
    }

    // Function to check if a plan has a specific billing period
    const hasBillingPeriod = (plan: PlanWithPrices, period: BillingPeriod) => {
        return plan.prices.some((p) => p.billingPeriod === period)
    }

    // Function to handle plan selection
    const handleSelectPlan = (planId: string) => {
        setSelectedPlan(planId)
        // In a real application, you would handle the subscription process here
        console.log(`Selected plan: ${planId} with ${billingPeriod} billing`)
    }

    // Function to toggle plan details expansion
    const togglePlanExpansion = (planId: string) => {
        setExpandedPlan(expandedPlan === planId ? null : planId)
    }

    // Find the current plan object
    const currentPlan = currentPlanId ? subscriptionPlans.find((plan) => plan.id === currentPlanId) : null

    return (
        <div>
            <div className="flex items-center justify-center md:justify-start space-x-2 my-3">
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

            <div className="space-y-3 mt-2">
                {subscriptionPlans.map((plan) => {
                    const price = getPlanPrice(plan)
                    const hasYearly = hasBillingPeriod(plan, "yearly")
                    const isPopular = plan.name === "Growth"
                    const isExpanded = expandedPlan === plan.id
                    const isCurrentPlan = currentPlanId === plan.id

                    return (
                        <Card
                            key={plan.id}
                            className={cn(
                                "overflow-hidden",
                                isPopular && "border-primary",
                                isCurrentPlan && "border-2 border-primary/70 bg-primary/5",
                            )}
                        >
                            <CardHeader className="p-3 !pb-2">
                                <div className="flex items-center">
                                    <CardTitle className="text-base flex-1">
                                        {plan.name}
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {isPopular && (
                                                <span className="bg-primary text-primary-foreground text-[10px] font-medium py-0.5 px-1.5 rounded">
                                                    POPULAR
                                                </span>
                                            )}
                                            {isCurrentPlan && (
                                                <span className="bg-primary/20 text-primary text-[10px] font-medium py-0.5 px-1.5 rounded">
                                                    CURRENT PLAN
                                                </span>
                                            )}
                                        </div>
                                    </CardTitle>
                                    <div className="flex items-center">
                                        <span className="text-lg font-bold mr-1">{formatCurrency(price)}</span>
                                        <span className="text-xs text-muted-foreground">
                                            /{billingPeriod === "monthly" ? "mo" : "yr"}
                                        </span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-3 !pt-0">
                                <div
                                    className="flex items-center justify-between cursor-pointer text-sm"
                                    onClick={() => togglePlanExpansion(plan.id)}
                                >
                                    <span className="text-muted-foreground">{isExpanded ? "Hide details" : "Show details"}</span>
                                    {isExpanded ? (
                                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </div>

                                {isExpanded && (
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
                                )}
                            </CardContent>

                            <CardFooter className="p-3 pt-0">
                                {isCurrentPlan ? (
                                    <Button className="w-full text-sm py-1.5 h-auto" variant="secondary" disabled>
                                        Current Plan
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full text-sm py-1.5 h-auto"
                                        variant={isPopular ? "default" : "outline"}
                                        onClick={() => handleSelectPlan(plan.id)}
                                        disabled={!hasYearly && billingPeriod === "yearly"}
                                    >
                                        {selectedPlan === plan.id
                                            ? "Selected"
                                            : currentPlanId
                                                ? getPlanPrice(plan) > (currentPlan ? getPlanPrice(currentPlan) : 0)
                                                    ? "Upgrade"
                                                    : getPlanPrice(plan) < (currentPlan ? getPlanPrice(currentPlan) : 0)
                                                        ? "Downgrade"
                                                        : "Switch Plan"
                                                : "Select Plan"}
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

