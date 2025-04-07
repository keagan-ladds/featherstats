import { Domain, DomainVerificationStatus, PlanUsageLimit, Workspace } from "@featherstats/database/types";

export type WorkspaceCreateOptions = {
    name: string
}

export type DomainCreateOptions = {
    name: string;
    verficationStatus?: DomainVerificationStatus
    enforce_origin_match: boolean,
    normalize_www: boolean
}

export type WorkspaceWithDomains = Workspace & {
    domains?: Domain[]
}

export type DomainWithSubscriptionDetails = Domain & {
    subscriptionId: string;
    userId: string
}