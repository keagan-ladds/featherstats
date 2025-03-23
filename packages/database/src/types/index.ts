import { domainVerificationStatus, domainsTable, workspaceUsersTable, workspacesTable } from "../schema/app";
import { usersTable } from "../schema/auth";

export type User = typeof usersTable.$inferSelect
export type UserMetadata = {
    
}

export type UserPreferences = {
    theme?: 'dark' | 'light' | 'system',
    clarifyModeEnabled?: boolean
}


export type WorkspaceUsers = typeof workspaceUsersTable.$inferSelect;
export type Domain = typeof domainsTable.$inferSelect
export type DomainVerificationStatus = typeof domainVerificationStatus.enumValues[number]
export type Workspace = typeof workspacesTable.$inferSelect
