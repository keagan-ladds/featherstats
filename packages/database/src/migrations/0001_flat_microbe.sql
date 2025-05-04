ALTER TABLE "domains" ADD COLUMN "configuration" json DEFAULT '{}'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "workspaces" ADD COLUMN "configuration" json DEFAULT '{}'::json NOT NULL;