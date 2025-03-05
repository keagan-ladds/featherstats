import { pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./auth"
import { pgEnum } from "drizzle-orm/pg-core";

export const workspacesTable = pgTable("workspaces", {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});

export const workspaceUsersTable = pgTable("workspace_users", {
    workspaceId: uuid('workspace_id').notNull().references(() => workspacesTable.id),
    userId: text('user_id').notNull().references(() => usersTable.id),
}, (workspaceUsers) => [
    {
        compositePK: primaryKey({
            columns: [workspaceUsers.userId, workspaceUsers.workspaceId],
        }),
    }
]);

export const domainVerificationStatus = pgEnum("domain_verification_status", ["pending", "verified", "failed"])

export const domainsTable = pgTable("domains", {
    id: uuid('id').primaryKey().defaultRandom(),
    workspaceId: uuid("workspace_id").notNull().references(() => workspacesTable.id, { onDelete: "cascade" }),
    hostname: varchar().notNull(),
    verificationStatus: domainVerificationStatus("verification_status").notNull().$default(() => "pending"),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
})