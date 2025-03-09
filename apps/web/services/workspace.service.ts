import { db } from "@featherstats/database";
import { domainsTable, workspaceUsersTable, workspacesTable } from "@featherstats/database/schema/app";
import { Domain, Workspace } from "@featherstats/database/types";
import { DomainCreateOptions, WorkspaceCreateOptions, WorkspaceWithDomains } from "types/workspace";
import { eq, getTableColumns } from "drizzle-orm"

class WorkspaceService {
    async createDefaultUserWorkspace(userId: string, opts: WorkspaceCreateOptions) : Promise<Workspace> {
        const userWorkspaces = await this.findWorkspaceByUserId(userId);
        if (userWorkspaces && userWorkspaces.length > 0) return userWorkspaces[0]!;

        return await this.createWorkspace(userId, opts);
    }

    async createWorkspace(userId: string, { name }: WorkspaceCreateOptions): Promise<Workspace> {
        return await db.transaction(async (transaction) => {
            const [workspace] = await transaction.insert(workspacesTable).values({ name }).returning();
            await transaction.insert(workspaceUsersTable).values({ userId: userId, workspaceId: workspace!.id });
            return workspace!;
        });
    }

    async findWorkspaceByUserId(userId: string): Promise<Workspace[]> {
        return await db.select({ ...getTableColumns(workspacesTable) }).from(workspacesTable)
            .innerJoin(workspaceUsersTable, eq(workspacesTable.id, workspaceUsersTable.workspaceId))
            .where(eq(workspaceUsersTable.userId, userId))
    }

    async getDefaultWorkspaceByUserId(userId: string): Promise<WorkspaceWithDomains | null> {
        const [workspace] = await db.select({ ...getTableColumns(workspacesTable) }).from(workspacesTable)
            .innerJoin(workspaceUsersTable, eq(workspacesTable.id, workspaceUsersTable.workspaceId))
            .where(eq(workspaceUsersTable.userId, userId));

        if (!workspace) return null;

        const domains = await db.select().from(domainsTable)
            .where(eq(domainsTable.workspaceId, workspace.id))

        return {
            ...workspace,
            domains
        };
    }

    async createWorkspaceDomain(workspaceId: string, opts: DomainCreateOptions): Promise<Domain> {
        const verifiedAt = opts.verficationStatus == "verified" ? new Date() : undefined;
        const [domain] = await db.insert(domainsTable).values({ verifiedAt, workspaceId, ...opts }).returning();
        return domain!
    }
}

export const workspaceService = new WorkspaceService();