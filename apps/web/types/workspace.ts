import { Domain, DomainVerificationStatus, Workspace } from "@featherstats/database/types";

export type WorkspaceCreateRequest = {
    workspaceName: string
    userId: string;
}

export type DomainCreateRequest = {
    workspaceId: string;
    domainName: string;
    verficationStatus?: DomainVerificationStatus
}

export type WorkspaceWithDomains = Workspace & {
    domains?: Domain[]
}