import { pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./auth"
import { pgEnum } from "drizzle-orm/pg-core";
import { generateUniqueString } from "../util";

export const workspacesTable = pgTable("workspaces", {
    id: text('id').primaryKey().$default(() => generateUniqueString()),
    name: text('name').notNull().$default(() => "Default Workspace"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
});

export const workspaceUsersTable = pgTable("workspace_users", {
    workspaceId: text('workspace_id').notNull().$default(() => generateUniqueString()).references(() => workspacesTable.id, { onDelete: "cascade" }),
    userId: text('user_id').notNull().references(() => usersTable.id, { onDelete: "cascade" }),
}, (workspaceUsers) => [
    {
        compositePK: primaryKey({
            columns: [workspaceUsers.userId, workspaceUsers.workspaceId],
        }),
    }
]);

export const domainVerificationStatus = pgEnum("domain_verification_status", ["pending", "verified", "failed"])

export const domainsTable = pgTable("domains", {
    id: text('id').primaryKey().$default(() => generateUniqueString()),
    workspaceId: text("workspace_id").notNull().references(() => workspacesTable.id, { onDelete: "cascade" }),
    domainName: varchar().notNull(),
    verificationStatus: domainVerificationStatus("verification_status").notNull().$default(() => "pending"),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at'),
})