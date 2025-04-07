'use client'
import { WorkspaceContext } from "contexts/workspace-context";
import { createDomain } from "lib/client/api-client";
import { useCallback, useContext, useState } from "react";
import { DomainCreateOptions } from "types/workspace";
import { toast } from "sonner"
export function useWorkspace() {
    const context = useContext(WorkspaceContext);
    if (!context) throw new Error("The 'useContext' hook can only be used within a WorkspaceProvider.")

    const [loading, setLoading] = useState<boolean>(false);
    const { domains } = context;

    const addDomain = useCallback(async (opts: DomainCreateOptions) => {
        setLoading(true)
        try {
            const domain = await createDomain(context.workspace!.id, opts)
            context.domains.push(domain)
        } catch (err) {
            toast.error("Something went wrong while creating domain, please refresh the page and try again.")
            throw err;
        } finally {
            setLoading(false);
        }

    }, [])

    return {
        domains,
        loading,
        addDomain,
        
    }
}