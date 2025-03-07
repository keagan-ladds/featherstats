'use client'
import { Workspace, Domain } from "@featherstats/database/types";
import { createContext } from "react";

interface WorkspaceContext {
    workspace: Workspace | null
    domains: Domain[]
}

export const WorkspaceContext = createContext<WorkspaceContext | null>(null)