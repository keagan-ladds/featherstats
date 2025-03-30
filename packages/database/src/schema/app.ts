import { pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./auth"
import { pgEnum } from "drizzle-orm/pg-core";
import { generateUniqueString } from "../util";
import { date } from "drizzle-orm/pg-core";
import { integer, boolean } from "drizzle-orm/pg-core";
import { json } from "drizzle-orm/pg-core";
import { PlanUsageLimit as PlanUsageLimits } from "../types";

export const workspacesTable = pgTable("workspaces", {
    id: text("id").primaryKey().$default(() => generateUniqueString()),
    name: text("name").notNull().$default(() => "Default Workspace"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
});

export const workspaceUsersTable = pgTable("workspace_users", {
    workspaceId: text("workspace_id").notNull().$default(() => generateUniqueString()).references(() => workspacesTable.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
}, (workspaceUsers) => [
    {
        compositePK: primaryKey({
            columns: [workspaceUsers.userId, workspaceUsers.workspaceId],
        }),
    }
]);

export const domainVerificationStatus = pgEnum("domain_verification_status", ["pending", "verified", "failed"])

export const domainsTable = pgTable("domains", {
    id: text("id").primaryKey().$default(() => generateUniqueString()),
    workspaceId: text("workspace_id").notNull().references(() => workspacesTable.id, { onDelete: "cascade" }),
    name: varchar("name").notNull().unique(),
    key: varchar("key").notNull().unique().$default(() => `pk-${generateUniqueString(16)}`),
    verificationStatus: domainVerificationStatus("verification_status").notNull().$default(() => "pending"),
    verifiedAt: timestamp("verified_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at"),
});

export const workspaceUsageTable = pgTable("workspace_usage", {
    usageDate: date("usage_date").notNull(),
    workspaceId: text("workspace_id").notNull().references(() => workspacesTable.id, { onDelete: "cascade" }),
    visits: integer("visits").notNull().default(0),
    pageviews: integer("pageviews").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
}, (workspaceUsage) => [
    primaryKey({ columns: [workspaceUsage.usageDate, workspaceUsage.workspaceId] })
])

export const billingPeriod = pgEnum("billing_period", ["monthly", "yearly"]);

export const plansTable = pgTable("plans", {
    id: text("id").primaryKey().$default(() => generateUniqueString()),
    active: boolean("active").notNull().default(true),
    name: text("name").notNull(),
    description: text("description"),
    usageLimits: json("usage_limits").$type<PlanUsageLimits>().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})

export const planPricesTable = pgTable("plan_prices", {
    id: text("id").primaryKey().$default(() => generateUniqueString()),
    active: boolean("active").notNull().default(true),
    planId: text("plan_id").notNull().references(() => plansTable.id, { onDelete: "cascade" }),
    stripePriceId: text("stripe_price_id").notNull().unique(),
    currency: varchar("currency", { length: 3 }).notNull(),
    billingPeriod: billingPeriod("billing_period").notNull(),
    amount: integer("amount").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})

export const subscriptionStatus = pgEnum("subscription_status", ["trialing", "active", "canceled", "incomplete", "incomplete_expired", "past_due", "unpaid", "paused"])
export const subscriptionsTable = pgTable("subscriptions", {
    id: text("id").primaryKey().notNull(),
    userId: text("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    priceId: text("price_id").notNull().references(() => planPricesTable.id),
    status: subscriptionStatus("status"),
    currentPeriodStart: timestamp("current_period_start"),
    currentPeriodEnd: timestamp("current_period_end"),
    cancelAt: timestamp("cancel_at"),
    canceledAt: timestamp("canceled_at"),
    trialStart: timestamp("trial_start"),
    trialEnd: timestamp("trial_end"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})