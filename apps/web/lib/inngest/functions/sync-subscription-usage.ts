import { subscriptionService } from "services/subscription.service";
import { inngest } from "../client";
import { usageService } from "services/usage.service";

export const syncSubscriptionUsage = inngest.createFunction(
    { id: "sync-subscription-usage" },
    { event: "usage/sync" },
    async ({ event, step }) => {
        const subscriptionId = event.data.subscriptionId;
        return usageService.syncSubscriptionUsage(subscriptionId)
    });

export const syncAllSubscriptionUsage = inngest.createFunction(
    { id: "sync-all-subscription-usage" },
    { cron: "0 */2 * * *" },
    async ({ event, step }) => {

        const subscriptionIds = await step.run("get-active-subscriptions", async () => {
            return subscriptionService.getActiveSubscriptionIds()
        });

        for (var subscriptionId of subscriptionIds) {
            await step.invoke(`sync-subscription-usage-${subscriptionId}`, {
                function: syncSubscriptionUsage,
                data: {
                    subscriptionId: subscriptionId
                }
            });
        }
    });
