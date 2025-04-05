'use client'
import { CreditCard } from "lucide-react";
import { OnboardingContinueButton } from "./onboarding-form";
import { useOnboarding } from "hooks/use-onboarding";
import { useSubscription } from "hooks/use-subscription";
import { PlanWithPrices } from "types/subscription";
import { BillingPeriod } from "@featherstats/database/types";
import { OnboardingDataSubscription } from "types/onboarding";
import { OnboardingDataSubscriptionSchema } from "lib/validation/onboarding";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@repo/ui/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { formatCurrency } from "lib/format-utils";
import { CardTitle } from "@repo/ui/components/ui/card";
import { Switch } from "@repo/ui/components/ui/switch"
import { cn } from "lib/utils";

export default function OnboardingStepSubscription() {

    const { onContinue, flowParams } = useOnboarding();
    const { plans } = useSubscription();
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")

    const form = useForm<OnboardingDataSubscription>({
        resolver: zodResolver(OnboardingDataSubscriptionSchema),
        defaultValues: {
            priceId: ""
        }
    })

    const getPlanPrice = (plan: PlanWithPrices, billingPeriod: BillingPeriod) => {
        const price = plan.prices.find((p) => p.billingPeriod === billingPeriod)
        return price ? price : plan.prices[0]!
    }

    const handleSubmit = (data: OnboardingDataSubscription) => {
        console.log(data)
        onContinue("workspace", data)
    }

    useEffect(() => {

        let billingPeriod: BillingPeriod = "monthly"

        if (flowParams.period && flowParams.period === "yearly") {
            billingPeriod = "yearly";
            setBillingPeriod(billingPeriod)
        }

        if (flowParams.plan) {

            const plan = plans.find(p => p.name === flowParams.plan);
            if (plan) {
                const price = getPlanPrice(plan, billingPeriod);
                console.log("defaulting price to: ", price.id)
                form.setValue("priceId", price.id, { shouldValidate: true, shouldDirty: true })
            }
        }

    }, [flowParams, plans])

    return <>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <div className="flex h-10 w-10 mb-2">
                    <CreditCard className="size-10" />
                </div>
                <h1 className="text-xl font-bold">Choose Your Plan</h1>
                <div className="text-sm text-muted-foreground">
                    Select the subscription that fits your needs and unlock all the features.
                </div>
            </div>
            <form className='flex flex-col gap-4 w-full' onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="flex items-center justify-center space-x-2 my-3">
                    <span className={cn("text-xs", billingPeriod === "monthly" ? "font-medium" : "text-muted-foreground")}>
                        Monthly
                    </span>
                    <Switch
                        checked={billingPeriod === "yearly"}
                        onCheckedChange={(checked) => setBillingPeriod(checked ? "yearly" : "monthly")}
                    />
                    <span className={cn("text-xs relative", billingPeriod === "yearly" ? "font-medium" : "text-muted-foreground")}>
                        Yearly
                        <div className={cn("absolute top-[-2px] left-[50px] w-[85px] text-center p-0.5 border  rounded-xl bg-background text-[10px]  font-medium", billingPeriod == "yearly" && "border-emerald-500 text-emerald-500")}>Save up to 17%</div>
                    </span>
                </div>

                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="priceId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} value={field.value} className="flex flex-col gap-1">
                                        {plans.map((plan, i) => {
                                            const price = getPlanPrice(plan, billingPeriod)
                                            return (
                                                <FormItem key={plan.id}>
                                                    <FormControl>
                                                        <RadioGroupItem value={price.id} className="peer sr-only" />
                                                    </FormControl>
                                                    <FormLabel className="flex flex-col rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                                        <div className="flex items-center justify-between flex-1">
                                                            <CardTitle className="text-base flex-1">
                                                                {plan.name}
                                                            </CardTitle>
                                                            <div className="flex items-center">
                                                                <span className="text-lg font-bold mr-1">{formatCurrency(price.amount, price.currency)}</span>
                                                                <span className="text-xs text-muted-foreground">
                                                                    /{billingPeriod === "monthly" ? "mo" : "yr"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>)
                                        })}
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )} />

                    <OnboardingContinueButton disabled={!form.formState.isValid} />
                </Form>
            </form>
        </div >
    </>
}
