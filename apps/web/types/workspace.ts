import { Domain, DomainVerificationStatus, Workspace } from "@featherstats/database/types";

export type WorkspaceCreateOptions = {
    name: string
}

export type DomainCreateOptions = {
    name: string;
    verficationStatus?: DomainVerificationStatus
}

export type WorkspaceWithDomains = Workspace & {
    domains?: Domain[]
}