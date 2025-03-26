import { db } from "@featherstats/database/index";
import { workspaceUsageTable, workspacesTable } from "@featherstats/database/schema/app";
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
        

        const to = new Date();
        const from = subDays(new Date(), 7);

        const usageData = await tinybirdClient.getUsageSummary(workspaceId, from, to);
        const usageRecords : WorspaceUsage[] = usageData.map((x) => ({
            usageDate: formatISO(x.date, { representation: "date" }),
            workspaceId: workspaceId,
            visits: x.visits,
            pageviews: x.pageviews
        }));

        await db.insert(workspaceUsageTable).values(usageRecords).onConflictDoUpdate({
            set: { pageviews: sql.raw(`excluded.${workspaceUsageTable.pageviews.name}`), visits: sql.raw(`excluded.${workspaceUsageTable.visits.name}`) },
            target: [workspaceUsageTable.usageDate, workspaceUsageTable.workspaceId]
        });
    }
}

export const usageService = new UsageService();