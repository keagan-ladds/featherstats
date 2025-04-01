ALTER TABLE "workspace_usage" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "workspace_users" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "workspace_usage" CASCADE;--> statement-breakpoint
DROP TABLE "workspace_users" CASCADE;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;