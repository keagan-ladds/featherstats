import { serve } from "inngest/next";
import { inngest } from "lib/inngest/client";
import { syncAllSubscriptionUsage, syncSubscriptionUsage } from "lib/inngest/functions/sync-subscription-usage";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncAllSubscriptionUsage,
    syncSubscriptionUsage
  ],
});