import { db } from "@featherstats/database/index";
import { workspacesTable } from "@featherstats/database/schema/app";
import { WorspaceUsage } from "@featherstats/database/types";
import { formatISO, subDays } from "date-fns";
import { tinybirdClient } from "lib/tinybird/server";
import { sql, eq } from 'drizzle-orm';

class UsageService {

    async syncWorkspaceUsage(workspaceId: string) {
        const [workspace] = await db.select({}).from(workspacesTable).where(eq(workspacesTable.id, workspaceId));
        if (!workspace)
        {
            console.log("Could not find workspace with id: ", workspaceId)
            return;
        }
        

    }
}

export const usageService = new UsageService();