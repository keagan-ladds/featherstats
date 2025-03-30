import { withZodValidation } from "lib/api-utils";
import { withAuth } from "lib/auth";
import { DomainCreateOptionsSchema } from "lib/validation/workspace";
import { NextRequest, NextResponse } from "next/server";
import { workspaceService } from "services/workspace.service";
import { DomainCreateOptions } from "types/workspace";

export async function POST(request: NextRequest, context: { params: Promise<{ workspace_id: string }> }) {
    return await withAuth(request, async (_, userId) => {
        return await withZodValidation<DomainCreateOptions>(request, DomainCreateOptionsSchema, async (opts: DomainCreateOptions) => {
            const workspaceId = (await context.params).workspace_id;
            const result = workspaceService.createWorkspaceDomain(workspaceId, opts);
            return NextResponse.json(result)
        });
    });
}