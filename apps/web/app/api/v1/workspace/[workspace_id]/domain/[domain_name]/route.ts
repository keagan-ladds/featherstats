import { withAuth } from "lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { workspaceService } from "services/workspace.service";

export function GET(request: NextRequest, context: { params: Promise<{ domain_name: string }> }) {
    return withAuth(request, async (_, userId) => {
        const { domain_name } = await context.params
        const domain = await workspaceService.getWorkspaceDomainByName(domain_name, userId);
        if (domain) return NextResponse.json(domain);

        return new NextResponse(null, { status: 404 });
    })
}