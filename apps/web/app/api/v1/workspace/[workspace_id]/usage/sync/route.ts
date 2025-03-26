import { Request } from "@vercel/functions";
import { NextResponse } from "next/server";
import { usageService } from "services/usage.service";

export async function POST(req: Request, context: { params: Promise<{ workspace_id: string }> }) {
    const workspaceId = (await context.params).workspace_id;

    console.log("Syncing workspace usage for: ", workspaceId)

    await usageService.syncWorkspaceUsage(workspaceId);

    return new NextResponse(null, {status: 200});
}