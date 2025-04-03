import { db } from "@featherstats/database";
import { domainsTable, planPricesTable, plansTable, subscriptionsTable, workspacesTable } from "@featherstats/database/schema/app";
import { Domain, Workspace } from "@featherstats/database/types";
import { DomainCreateOptions, DomainWithSubscriptionDetails, WorkspaceCreateOptions, WorkspaceWithDomains } from "types/workspace";
import { eq, and, getTableColumns } from "drizzle-orm"
import { usersTable } from "@featherstats/database/schema/auth";
import { DEFAULT_USAGE_LIMITS } from "./subscription.service";

class WorkspaceService {
    async createDefaultUserWorkspace(userId: string, opts: WorkspaceCreateOptions): Promise<Workspace> {
        const userWorkspaces = await this.findWorkspaceByUserId(userId);
        if (userWorkspaces && userWorkspaces.length > 0) return userWorkspaces[0]!;

        return await this.createWorkspace(userId, opts);
    }

    async createWorkspace(userId: string, { name }: WorkspaceCreateOptions): Promise<Workspace> {
        return await db.transaction(async (transaction) => {
            const [workspace] = await transaction.insert(workspacesTable).values({ name, userId }).returning();
            return workspace!;
        });
    }

    async findWorkspaceByUserId(userId: string): Promise<Workspace[]> {
        return await db.select({ ...getTableColumns(workspacesTable) }).from(workspacesTable)
            .where(eq(workspacesTable.userId, userId))
    }

    async getDefaultWorkspaceByUserId(userId: string): Promise<WorkspaceWithDomains | null> {
        const [workspace] = await db.select({ ...getTableColumns(workspacesTable) }).from(workspacesTable)
            .where(eq(workspacesTable.userId, userId));

        if (!workspace) return null;

        const domains = await db.select().from(domainsTable)
            .where(eq(domainsTable.workspaceId, workspace.id))

        return {
            ...workspace,
            domains
        };
    }

    async getWorkspaceDomainByName(domainName: string, userId: string): Promise<Domain | null> {
        const [domain] = await db.select({ ...getTableColumns(domainsTable) }).from(domainsTable)
            .innerJoin(workspacesTable, eq(domainsTable.workspaceId, workspacesTable.id))
            .where(and(eq(domainsTable.name, this.normalizeDomainName(domainName)), eq(workspacesTable.userId, userId)))

        return domain || null
    }

    async createWorkspaceDomain(workspaceId: string, opts: DomainCreateOptions): Promise<Domain> {
        const verifiedAt = opts.verficationStatus == "verified" ? new Date() : undefined;
        const name = this.normalizeDomainName(opts.name)
        const [domain] = await db.insert(domainsTable).values({ ...opts, verifiedAt, workspaceId, name }).returning();
        return domain!
    }

    async getWorkspaceDomainByKey(key: string): Promise<DomainWithSubscriptionDetails | null> {
        const [domainWithUsageLimits] = await db.select({ ...getTableColumns(domainsTable), usageLimits: plansTable.usageLimits, subscriptionId: subscriptionsTable.id, userId: workspacesTable.userId }).from(domainsTable)
            .innerJoin(workspacesTable, eq(workspacesTable.id, domainsTable.workspaceId))
            .innerJoin(usersTable, eq(usersTable.id, workspacesTable.userId))
            .leftJoin(subscriptionsTable, eq(subscriptionsTable.userId, usersTable.id))
            .leftJoin(planPricesTable, eq(planPricesTable.id, subscriptionsTable.priceId))
            .leftJoin(plansTable, eq(plansTable.id, planPricesTable.planId))
            .where(eq(domainsTable.key, key));

        if (domainWithUsageLimits) {
            return {
                ...domainWithUsageLimits,
                subscriptionId: domainWithUsageLimits.subscriptionId || domainWithUsageLimits.userId,
                usageLimits: { ...DEFAULT_USAGE_LIMITS, ...domainWithUsageLimits.usageLimits }
            }
        }

        return null;
    }

    private normalizeDomainName(domainName: string): string {
        return domainName.toLowerCase();
    }
}

export const workspaceService = new WorkspaceService();