import { WorkspaceContext } from "contexts/workspace-context";
import { useContext } from "react";

export function useWorkspace() {
    const context = useContext(WorkspaceContext);
    if (!context) throw new Error("The 'useContext' hook can only be used within a WorkspaceProvider.")
}