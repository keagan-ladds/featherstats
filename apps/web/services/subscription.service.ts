import { db } from "@featherstats/database/index";
import { sql, eq, and, notInArray, getTableColumns } from 'drizzle-orm';
import { planPricesTable, plansTable, subscriptionsTable } from "@featherstats/database/schema/app";
import Stripe from "stripe";
import { PlanPrice, Subscription, User } from "@featherstats/database/types";
import { fromUnixTime } from "date-fns";
import { stripe } from "lib/stripe/server";
import { usersTable } from "@featherstats/database/schema/auth";
import { PlanWithPrices, UpdateSubscriptionPlanOptions, UpdateSubscriptionPlanResult } from "types/subscription";
import { getURL } from "lib/utils";

export class SubscriptionService {
    async handleSubscriptionCreated(subscription: Stripe.Subscription) {
        const user = await this.getUserByStripeCustomerId(subscription.customer as string);
        if (!user) {
            console.log(`Could not find existing customer by id '${subscription.customer as string}', skipping futher subscription processing.`);
            return;
        }

        const stripePriceId = subscription.items.data[0]?.price.id || "";
        const price = await this.getPlanPriceByStripePriceId(stripePriceId);
        if (!price) {
            console.log(`Could not find price by stripe price id '${stripePriceId}', skipping further processing`);
            return;
        }

        const [sub] = await db.insert(subscriptionsTable).values({
            id: subscription.id,
            userId: user.id,
            status: subscription.status,
            currentPeriodStart: fromUnixTime(subscription.current_period_start),
            currentPeriodEnd: subscription.current_period_end ? fromUnixTime(subscription.current_period_end) : null,
            trialStart: subscription.trial_start ? fromUnixTime(subscription.trial_start) : null,
            trialEnd: subscription.trial_end ? fromUnixTime(subscription.trial_end) : null,
            cancelAt: subscription.cancel_at ? fromUnixTime(subscription.cancel_at) : null,
            canceledAt: subscription.canceled_at ? fromUnixTime(subscription.canceled_at) : null,
            priceId: price.id,
        }).onConflictDoUpdate({
            target: subscriptionsTable.id,
            set: {
                status: sql.raw(`excluded.${subscriptionsTable.status.name}`),
                currentPeriodStart: sql.raw(`excluded.${subscriptionsTable.currentPeriodStart.name}`),
                currentPeriodEnd: sql.raw(`excluded.${subscriptionsTable.currentPeriodEnd.name}`),
                trialStart: sql.raw(`excluded.${subscriptionsTable.trialStart.name}`),
                trialEnd: sql.raw(`excluded.${subscriptionsTable.trialEnd.name}`),
                cancelAt: sql.raw(`excluded.${subscriptionsTable.cancelAt.name}`),
                canceledAt: sql.raw(`excluded.${subscriptionsTable.canceledAt.name}`),
            }
        }).returning()

    }

    async handleSubscriptionUpdated(subscription: Stripe.Subscription) {
        await this.updateSubscription(subscription);
    }

    async handleSubscriptionCancelled(subscription: Stripe.Subscription) {
        await this.updateSubscription(subscription);
    }

    async createUserSubscription(userId: string, priceId: string) {
        const existingSubscription = await this.getActiveUserSubscription(userId);
        if (existingSubscription) throw new Error(`The user already has an active subscription, can't create a new one.`);

        const customerId = await this.findOrCreateStripeCustomerId(userId);
        await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: priceId
                }
            ]
        })
    }

    async getPlans(): Promise<PlanWithPrices[]> {
        const plans = await db.select().from(plansTable)
            .innerJoin(planPricesTable, eq(plansTable.id, planPricesTable.planId))
            .where(and(eq(planPricesTable.active, true), eq(plansTable.active, true)));

        return plans.reduce<PlanWithPrices[]>((acc, el) => {
            const plan = acc.find((x) => x.id === el.plans.id)
            if (plan) {
                plan.prices.push(el.plan_prices)
            } else {
                acc.push({
                    ...el.plans,
                    prices: [el.plan_prices]
                })
            }
            return acc
        }, [])
    }

    private async getActiveUserSubscription(userId: string): Promise<Subscription | null> {
        const [subscription] = await db.select({ ...getTableColumns(subscriptionsTable) })
            .from(subscriptionsTable)
            .where(and(notInArray(subscriptionsTable.status, ["canceled"]), eq(subscriptionsTable.userId, userId)))

        return subscription || null;
    }

    async updateSubscriptionPlan(userId: string, opts: UpdateSubscriptionPlanOptions): Promise<UpdateSubscriptionPlanResult> {
        const [price] = await db.select({ amount: planPricesTable.amount, stripePriceId: planPricesTable.stripePriceId, stripeProductId: plansTable.stripeProductId }).from(planPricesTable)
            .innerJoin(plansTable, eq(plansTable.id, planPricesTable.planId))
            .where(eq(planPricesTable.id, opts.priceId))
        if (!price) throw new Error(`The could not find the stripe price id associated with the given price '${opts.priceId}'.`);

        const customerId = await this.findOrCreateStripeCustomerId(userId);
        const existingSubscription = await this.getActiveUserSubscription(userId);
        if (!existingSubscription) {

            // If it's a free subscription, don't worry about the checkout session, just create the subscription
            if (price.amount === 0) {
                await stripe.subscriptions.create({
                    customer: customerId,
                    items: [
                        {
                            price: price.stripePriceId,
                        }
                    ]
                })
                return {}
            }

            const checkoutSession = await stripe.checkout.sessions.create({
                customer: customerId,
                line_items: [
                    {
                        price: price.stripePriceId,
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: getURL(),
                cancel_url: getURL(),
            });

            return { url: checkoutSession.url! };
        }

        const configuration = await stripe.billingPortal.configurations.create({
            business_profile: {
                headline: "Manage your subscription",
            },
            features: {
                payment_method_update: {
                    enabled: true,
                },
                subscription_update: {
                    enabled: true,
                    default_allowed_updates: ["price"],
                    products: [
                        {
                            product: price.stripeProductId,
                            prices: [price.stripePriceId]
                        }
                    ]
                },
                subscription_cancel: {
                    enabled: false
                },
                customer_update: {
                    enabled: false
                },
                invoice_history: {
                    enabled: false
                }
            }
        });

        // Create a Stripe Portal session with the configuration
        const stripeSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: getURL(),
            configuration: configuration.id
        });

        return { url: stripeSession.url };
    }

    private async findOrCreateStripeCustomerId(userId: string): Promise<string> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId));
        if (!user) throw new Error(`The user with id '${userId}' could not be found.`);

        if (user.stripeCustomerId) return user.stripeCustomerId;

        const { id: stripeCustomerId } = await stripe.customers.create({
            name: user.name || undefined,
            email: user.email || undefined
        });

        await db.update(usersTable).set({ stripeCustomerId }).where(eq(usersTable.id, userId));
        return stripeCustomerId;
    }

    private async getUserByStripeCustomerId(customerId: string): Promise<User | null> {
        const [user] = await db.select().from(usersTable).where(eq(usersTable.stripeCustomerId, customerId));
        return user || null
    }

    private async getPlanPriceByStripePriceId(priceId: string): Promise<PlanPrice | null> {
        const [price] = await db.select().from(planPricesTable).where(eq(planPricesTable.stripePriceId, priceId));
        return price || null
    }

    private async updateSubscription(subscription: Stripe.Subscription) {

        const stripePriceId = subscription.items.data[0]?.price.id || "";
        const price = await this.getPlanPriceByStripePriceId(stripePriceId);

        await db.update(subscriptionsTable).set({
            status: subscription.status,
            priceId: price && price.id || undefined,
            currentPeriodStart: fromUnixTime(subscription.current_period_start),
            currentPeriodEnd: subscription.current_period_end ? fromUnixTime(subscription.current_period_end) : null,
            trialStart: subscription.trial_start ? fromUnixTime(subscription.trial_start) : null,
            trialEnd: subscription.trial_end ? fromUnixTime(subscription.trial_end) : null,
            canceledAt: subscription.canceled_at ? fromUnixTime(subscription.canceled_at) : null,
        }).where(eq(subscriptionsTable.id, subscription.id));
    }
}

export const subscriptionService = new SubscriptionService();