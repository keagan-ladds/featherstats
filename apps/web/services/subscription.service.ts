import { db } from "@featherstats/database/index";
import { sql, eq, and, getTableColumns } from 'drizzle-orm';
import { planPricesTable, plansTable, subscriptionsTable } from "@featherstats/database/schema/app";
import Stripe from "stripe";
import { DrizzleClient, PlanPrice, PlanUsageLimit, Subscription, User } from "@featherstats/database/types";
import { fromUnixTime } from "date-fns";
import { stripe } from "lib/stripe/server";
import { usersTable } from "@featherstats/database/schema/auth";
import { PlanWithPrices, UpdateSubscriptionPlanOptions, UpdateSubscriptionPlanResult } from "types/subscription";
import { fromUnixTimeOrUndefined } from "lib/utils";
import logger from "lib/logger";

export class SubscriptionService {
    private database: DrizzleClient;

    constructor(database: DrizzleClient = db) {
        this.database = database;
    }

    async handleSubscriptionCreated(stripeSubscription: Stripe.Subscription) {
        const user = await this.getUserByStripeCustomerId(stripeSubscription.customer as string);
        if (!user) {
            console.log(`Could not find existing customer by id '${stripeSubscription.customer as string}', skipping futher subscription processing.`);
            return;
        }

        const stripePriceId = stripeSubscription.items.data[0]?.price.id || "";
        const price = await this.getPlanPriceByStripePriceId(stripePriceId);
        if (!price) {
            console.log(`Could not find price by stripe price id '${stripePriceId}', skipping further processing`);
            return;
        }

        const [subscription] = await this.database.insert(subscriptionsTable).values({
            stripeSubscriptionId: stripeSubscription.id,
            userId: user.id,
            status: stripeSubscription.status,
            currentPeriodStart: fromUnixTime(stripeSubscription.current_period_start),
            currentPeriodEnd: fromUnixTimeOrUndefined(stripeSubscription.current_period_end),
            trialStart: fromUnixTimeOrUndefined(stripeSubscription.trial_start),
            trialEnd: fromUnixTimeOrUndefined(stripeSubscription.trial_end),
            cancelAt: fromUnixTimeOrUndefined(stripeSubscription.cancel_at),
            canceledAt: fromUnixTimeOrUndefined(stripeSubscription.canceled_at),
            priceId: price.id,
        }).onConflictDoUpdate({
            target: subscriptionsTable.stripeSubscriptionId,
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

        await this.database.update(usersTable).set({ subscriptionId: subscription!.id }).where(eq(usersTable.id, user.id));

    }

    async handleSubscriptionUpdated(stripeSubscription: Stripe.Subscription) {
        await this.updateSubscription(stripeSubscription);
    }

    async handleSubscriptionCancelled(stripeSubscription: Stripe.Subscription) {
        logger.debug(`Handling subscription cancelled event for subscription '${stripeSubscription?.id}'.`);

        const cancelledSubscription = await this.updateSubscription(stripeSubscription);
        if (cancelledSubscription) {
            const userId = cancelledSubscription.userId;
            const userActiveSubscription = await this.getActiveUserSubscription(userId);

            // The cancelled subscription was the user's active subscription
            if (userActiveSubscription && userActiveSubscription.id == cancelledSubscription.id) {
                logger.info(`Cancelled subscription was user's active subscription, attempting to create new 'Free' subscription.`);
                const plans = await this.getPlans()
                const freePlanPrice = plans.find(plan => plan.name.toLocaleLowerCase() === "free")?.prices[0];

                if (freePlanPrice) {
                    await this.createUserSubscription(userId, freePlanPrice.id, false, true)
                } else {
                    logger.warn(`Could not create new 'Free' subscription for user '${userId}', free plan price could not be found.`)
                }
            }
        }
    }

    async createUserSubscription(userId: string, priceId: string, includeTrialPeriod?: boolean, skipActiveSubscriptionValidation?: boolean) {
        if (!skipActiveSubscriptionValidation) {
            const existingSubscription = await this.getActiveUserSubscription(userId);
            if (existingSubscription) throw new Error(`The user already has an active subscription, can't create a new one.`);
        }

        const customerId = await this.findOrCreateStripeCustomerId(userId);
        const [price] = await this.database.select({ stripePriceId: planPricesTable.stripePriceId, trialPeriod: plansTable.trialPeriod }).from(planPricesTable)
            .innerJoin(plansTable, eq(plansTable.id, planPricesTable.planId))
            .where(eq(planPricesTable.id, priceId))
        if (!price) throw new Error(`Could not find plan price with id '${priceId}'.`);

        const trialPeriodDays = includeTrialPeriod && price.trialPeriod || undefined

        await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: price.stripePriceId
                }
            ],
            trial_period_days: trialPeriodDays,
            payment_settings: {
                save_default_payment_method: 'on_subscription',
            },
            trial_settings: {
                end_behavior: {
                    missing_payment_method: 'cancel',
                },
            },
        })
    }

    async getPlans(): Promise<PlanWithPrices[]> {
        const plans = await this.database.select().from(plansTable)
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

    async getActiveUserSubscription(userId: string): Promise<Subscription | null> {
        const [subscription] = await this.database.select({ ...getTableColumns(subscriptionsTable) })
            .from(usersTable)
            .innerJoin(subscriptionsTable, eq(subscriptionsTable.id, usersTable.subscriptionId))
            .where(eq(usersTable.id, userId))

        return subscription || null;
    }

    async updateSubscriptionPlan(userId: string, opts: UpdateSubscriptionPlanOptions): Promise<UpdateSubscriptionPlanResult> {
        const [price] = await this.database.select({ amount: planPricesTable.amount, stripePriceId: planPricesTable.stripePriceId, stripeProductId: plansTable.stripeProductId }).from(planPricesTable)
            .innerJoin(plansTable, eq(plansTable.id, planPricesTable.planId))
            .where(eq(planPricesTable.id, opts.priceId))

        if (!price) throw new Error(`The could not find the stripe price id associated with the given price '${opts.priceId}'.`);

        const customerId = await this.findOrCreateStripeCustomerId(userId);
        const existingSubscription = await this.getActiveUserSubscription(userId);
        let stripeSubscription: Stripe.Subscription;

        if (!existingSubscription) {
            stripeSubscription = await stripe.subscriptions.create({
                payment_behavior: "default_incomplete",
                customer: customerId,
                items: [
                    {
                        price: price.stripePriceId,
                    }
                ],
                payment_settings: {
                    save_default_payment_method: 'on_subscription',
                },
                expand: ['latest_invoice.payment_intent', 'pending_setup_intent']
            })
        } else {
            const stripeSubscriptionId = existingSubscription.stripeSubscriptionId;
            const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
            const prorationDate = Math.floor(Date.now() / 1000)

            stripeSubscription = await stripe.subscriptions.update(stripeSubscriptionId, {
                payment_behavior: "default_incomplete",
                proration_behavior: "always_invoice",
                proration_date: prorationDate,
                items: [
                    {
                        id: subscription.items.data[0]!.id,
                        price: price.stripePriceId
                    }
                ],
                payment_settings: {
                    save_default_payment_method: 'on_subscription',
                },
                expand: ['latest_invoice.payment_intent', 'pending_setup_intent']
            });
        }

        if ((stripeSubscription.latest_invoice as Stripe.Invoice).paid === true) {
            return { complete: true }
        }

        if ((stripeSubscription.latest_invoice as Stripe.Invoice).payment_intent !== null) {
            const latestInvoice = stripeSubscription.latest_invoice as Stripe.Invoice
            let paymentIntent = latestInvoice.payment_intent as Stripe.PaymentIntent

            if (stripeSubscription.default_payment_method !== null) {
                // Attempt to collect payment using the default payment method (if possible)
                paymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
            }

            if (paymentIntent.status == "succeeded" || paymentIntent.status === "processing") {
                return { complete: true }
            }

            return { complete: false, paymentIntent: { intentType: "payment_intent", clientSecret: paymentIntent.client_secret!, amount: paymentIntent.amount, currency: paymentIntent.currency } }
        }

        if (stripeSubscription.pending_setup_intent !== null) {
            const setupIntent = stripeSubscription.pending_setup_intent as Stripe.SetupIntent;
            return { complete: false, paymentIntent: { intentType: "setup_intent", clientSecret: setupIntent.client_secret! } }
        }

        return { complete: true }

        // // See what the next invoice would look like with a price switch
        // // and proration set:
        // const items = [{
        //     id: subscription.items.data[0]!.id,
        //     price: price.stripePriceId, // Switch to new price
        // }];

        // const invoice = await stripe.invoices.createPreview({
        //     customer: customerId,
        //     subscription: subscriptionId,
        //     subscription_details: {
        //         items: items,
        //         proration_date: prorationDate
        //     },
        // });
    }

    private async findOrCreateStripeCustomerId(userId: string): Promise<string> {
        const [user] = await this.database.select().from(usersTable).where(eq(usersTable.id, userId));
        if (!user) throw new Error(`The user with id '${userId}' could not be found.`);

        if (user.stripeCustomerId) return user.stripeCustomerId;

        const { id: stripeCustomerId } = await stripe.customers.create({
            name: user.name || undefined,
            email: user.email || undefined
        });

        await this.database.update(usersTable).set({ stripeCustomerId }).where(eq(usersTable.id, userId));
        return stripeCustomerId;
    }

    private async getUserByStripeCustomerId(customerId: string): Promise<User | null> {
        const [user] = await this.database.select().from(usersTable).where(eq(usersTable.stripeCustomerId, customerId));
        return user || null
    }

    private async getPlanPriceByStripePriceId(priceId: string): Promise<PlanPrice | null> {
        const [price] = await this.database.select().from(planPricesTable).where(eq(planPricesTable.stripePriceId, priceId));
        return price || null
    }

    private async updateSubscription(stripeSubscription: Stripe.Subscription) {

        const stripePriceId = stripeSubscription.items.data[0]?.price.id || "";
        const price = await this.getPlanPriceByStripePriceId(stripePriceId);

        const [subscription] = await this.database.update(subscriptionsTable).set({
            status: stripeSubscription.status,
            priceId: price && price.id || undefined,
            currentPeriodStart: fromUnixTime(stripeSubscription.current_period_start),
            currentPeriodEnd: fromUnixTimeOrUndefined(stripeSubscription.current_period_end),
            trialStart: fromUnixTimeOrUndefined(stripeSubscription.trial_start),
            trialEnd: fromUnixTimeOrUndefined(stripeSubscription.trial_end),
            canceledAt: fromUnixTimeOrUndefined(stripeSubscription.canceled_at),
        }).where(eq(subscriptionsTable.stripeSubscriptionId, stripeSubscription.id)).returning()

        return subscription || null;
    }
}

export const subscriptionService = new SubscriptionService();