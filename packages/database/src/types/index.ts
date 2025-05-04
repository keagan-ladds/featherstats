import { billingPeriod, domainVerificationStatus, domainsTable, planPricesTable, plansTable, subscriptionStatus, subscriptionsTable, workspacesTable } from "../schema/app";
import { usersTable } from "../schema/auth";
import { db } from '../index'

export type DrizzleClient = typeof db;

export type User = typeof usersTable.$inferSelect
export type UserMetadata = {

}

export type SubscriptionPlanMetadata = {

}

export type UserPreferences = {
    theme?: 'dark' | 'light' | 'system',
    clarifyModeEnabled?: boolean
}

export type DomainConversionConfiguration = {
    name: string;
    enabled: boolean
}

export type DomainConfiguration = {
    currency?: string;
    conversions?: Record<string, DomainConversionConfiguration>;
}

export type WorkspaceConfiguration = {

}

export type PlanUsageLimit = {
    maxMonthlyPageviews: number,
    maxDomains: number,
    maxWorkspaces: number,
    dataRetentionDays: number
}

export type Domain = typeof domainsTable.$inferSelect
export type DomainVerificationStatus = typeof domainVerificationStatus.enumValues[number]
export type Workspace = typeof workspacesTable.$inferSelect

export type Plan = typeof plansTable.$inferSelect;
export type PlanPrice = typeof planPricesTable.$inferSelect;
export type Subscription = typeof subscriptionsTable.$inferSelect;
export type SubscriptionStatus = (typeof subscriptionStatus.enumValues)[number]
export type BillingPeriod = (typeof billingPeriod.enumValues)[number]
