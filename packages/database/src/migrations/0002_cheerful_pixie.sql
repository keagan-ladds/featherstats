CREATE TABLE "workspace_usage" (
	"usage_date" date NOT NULL,
	"workspace_id" text NOT NULL,
	"visits" integer DEFAULT 0 NOT NULL,
	"pageviews" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "workspace_usage_usage_date_workspace_id_pk" PRIMARY KEY("usage_date","workspace_id")
);
--> statement-breakpoint
ALTER TABLE "workspace_usage" ADD CONSTRAINT "workspace_usage_workspace_id_workspaces_id_fk" FOREIGN KEY ("workspace_id") REFERENCES "public"."workspaces"("id") ON DELETE cascade ON UPDATE no action;