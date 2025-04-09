ALTER TABLE "users" DROP CONSTRAINT "users_subscription_id_subscriptions_id_fk";
--> statement-breakpoint
ALTER TABLE "plans" ADD COLUMN "trial_period" integer;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "plans" ADD CONSTRAINT "plans_stripe_product_id_unique" UNIQUE("stripe_product_id");