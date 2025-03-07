'use client'

import { Domain, Workspace } from "@featherstats/database/types";
import { WorkspaceContext } from "contexts/workspace-context";
import { useState } from "react";

interface WorkspaceProviderProps {
    children: React.ReactNode;
    workspace?: Workspace | null
    domains?: Domain[] | null
}

export default function WorkspaceProvider({ children, ...props }: WorkspaceProviderProps) {
    const [workspace, setWorkspace] = useState<Workspace | null>(props.workspace || null)
    const [domains, setDomains] = useState<Domain[]>(props.domains || []);

    const context = {
        workspace,
        domains,
        setWorkspace
    };

    return <WorkspaceContext.Provider value={context}>{children}</WorkspaceContext.Provider>
}