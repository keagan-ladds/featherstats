import { auth } from "lib/auth";
import { forbidden, unauthorized } from "next/navigation";
import { NextResponse } from "next/server";
import { workspaceService } from "services/workspace.service";
import { WorkspaceCreateOptions } from "types/workspace";

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) return unauthorized();
        if (!session.user?.id) return forbidden();

        const workspaceCreateOptions = await request.json() as WorkspaceCreateOptions;
        const workspace = workspaceService.createWorkspace(session.user.id, workspaceCreateOptions);

        if (!workspace) return NextResponse.json(null, { status: 500 })

        return NextResponse.json(workspace, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }
}