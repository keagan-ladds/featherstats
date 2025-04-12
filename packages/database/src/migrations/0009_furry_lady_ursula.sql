ALTER TABLE "domains" DROP CONSTRAINT "domains_name_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "domains_workspace_id_name_index" ON "domains" USING btree ("workspace_id","name");