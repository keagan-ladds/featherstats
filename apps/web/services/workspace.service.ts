import { db } from "@featherstats/database";
import { domainsTable, workspaceUsersTable, workspacesTable } from "@featherstats/database/schema/app";
import { Domain, Workspace } from "@featherstats/database/types";
import { DomainCreateRequest, WorkspaceCreateRequest } from "types/workspace";
import { eq, getTableColumns } from "drizzle-orm"

class WorkspaceService {
    async createDefaultUserWorkspace({ userId }: WorkspaceCreateRequest) {
        const userWorkspaces = await this.findWorkspaceByUserId(userId);
        if (userWorkspaces && userWorkspaces.length > 0) return userWorkspaces[0];

        return await this.createWorkspace({ userId });
    }

    async createWorkspace({ userId }: WorkspaceCreateRequest): Promise<Workspace | undefined> {
        return await db.transaction(async (transaction) => {
            const [workspace] = await transaction.insert(workspacesTable).values({}).returning();
            await transaction.insert(workspaceUsersTable).values({ userId: userId, workspaceId: workspace!.id });
            return workspace;
        });
    }

    async findWorkspaceByUserId(userId: string): Promise<Workspace[]> {
        return await db.select({ ...getTableColumns(workspacesTable) }).from(workspacesTable)
            .innerJoin(workspaceUsersTable, eq(workspacesTable.id, workspaceUsersTable.workspaceId))
            .where(eq(workspaceUsersTable.userId, userId))
    }

    async createWorkspaceDomain(request: DomainCreateRequest): Promise<Domain> {
        const verifiedAt = request.verficationStatus == "verified" ? new Date() : undefined;
        const [domain] = await db.insert(domainsTable).values({ ...request, verifiedAt }).returning();
        return domain!
    }
}

export const workspaceService = new WorkspaceService();