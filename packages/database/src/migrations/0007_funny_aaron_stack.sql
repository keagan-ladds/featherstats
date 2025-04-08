TRUNCATE TABLE "subscriptions"; --> Truncate subscription data before updating the table schema
ALTER TABLE "subscriptions" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ALTER COLUMN "current_period_start" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD COLUMN "stripe_subscription_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "subscription_id" text;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_stripe_subscription_id_unique" UNIQUE("stripe_subscription_id");