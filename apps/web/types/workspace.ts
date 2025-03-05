import { DomainVerificationStatus, Workspace } from "@featherstats/database/types";

export type WorkspaceCreateRequest = {
    userId: string;
}

export type DomainCreateRequest = {
    workspaceId: string;
    hostname: string;
    verficationStatus?: DomainVerificationStatus
}