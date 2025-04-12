import { db } from "@featherstats/database";
import { domainsTable, subscriptionsTable, workspacesTable } from "@featherstats/database/schema/app";
import { Domain, DomainVerificationStatus, DrizzleClient, Workspace } from "@featherstats/database/types";
import { DomainCreateOptions, DomainWithSubscriptionDetails, WorkspaceCreateOptions, WorkspaceWithDomains } from "types/workspace";
import { eq, and, getTableColumns } from "drizzle-orm"
import { usersTable } from "@featherstats/database/schema/auth";

export class WorkspaceService {
    private database: DrizzleClient;

    constructor(database: DrizzleClient = db) {
        this.database = database;
    }

    async createDefaultUserWorkspace(userId: string, opts: WorkspaceCreateOptions): Promise<Workspace> {
        const userWorkspaces = await this.findWorkspaceByUserId(userId);
        if (userWorkspaces && userWorkspaces.length > 0) return userWorkspaces[0]!;

        return await this.createWorkspace(userId, opts);
    }

    async createWorkspace(userId: string, { name }: WorkspaceCreateOptions): Promise<Workspace> {
        const [workspace] = await this.database.insert(workspacesTable).values({ name, userId }).returning();
        return workspace!;
    }

    async findWorkspaceByUserId(userId: string): Promise<Workspace[]> {
        return await this.database.select({ ...getTableColumns(workspacesTable) }).from(workspacesTable)
            .where(eq(workspacesTable.userId, userId))
    }

    async getDefaultWorkspaceByUserId(userId: string): Promise<WorkspaceWithDomains | null> {
        const [workspace] = await this.database.select({ ...getTableColumns(workspacesTable) }).from(workspacesTable)
            .where(eq(workspacesTable.userId, userId));

        if (!workspace) return null;

        const domains = await this.database.select().from(domainsTable)
            .where(eq(domainsTable.workspaceId, workspace.id))

        return {
            ...workspace,
            domains
        };
    }

    async getWorkspaceDomainByName(domainName: string, userId: string): Promise<Domain | null> {
        const [domain] = await this.database.select({ ...getTableColumns(domainsTable) }).from(domainsTable)
            .innerJoin(workspacesTable, eq(domainsTable.workspaceId, workspacesTable.id))
            .where(and(eq(domainsTable.name, this.normalizeDomainName(domainName)), eq(workspacesTable.userId, userId)))

        return domain || null
    }

    async createWorkspaceDomain(workspaceId: string, opts: DomainCreateOptions): Promise<Domain> {
        const verifiedAt = opts.verficationStatus == "verified" ? new Date() : undefined;
        const name = this.normalizeDomainName(opts.name)
        const [domain] = await this.database.insert(domainsTable).values({ ...opts, verifiedAt, workspaceId, name }).returning();
        return domain!
    }

    async getWorkspaceDomainByKey(key: string): Promise<DomainWithSubscriptionDetails | null> {
        const [domainWithUsageLimits] = await this.database.select({ ...getTableColumns(domainsTable), subscriptionId: subscriptionsTable.id, userId: workspacesTable.userId }).from(domainsTable)
            .innerJoin(workspacesTable, eq(workspacesTable.id, domainsTable.workspaceId))
            .innerJoin(usersTable, eq(usersTable.id, workspacesTable.userId))
            .leftJoin(subscriptionsTable, eq(subscriptionsTable.id, usersTable.subscriptionId))
            .where(eq(domainsTable.key, key));

        if (domainWithUsageLimits) {
            return {
                ...domainWithUsageLimits,
                subscriptionId: domainWithUsageLimits.subscriptionId,
                userId: domainWithUsageLimits.userId
            }
        }

        return null;
    }

    async setWorkspaceDomainAsVerified(workspaceId: string, domainName: string) {
        await this.database.update(domainsTable).set({ verificationStatus: "verified" })
        .where(and(eq(domainsTable.workspaceId, workspaceId), eq(domainsTable.name, this.normalizeDomainName(domainName))))
    }

    private normalizeDomainName(domainName: string): string {
        return domainName.toLowerCase();
    }
}

export const workspaceService = new WorkspaceService();