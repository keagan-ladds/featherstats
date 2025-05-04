'use client'

import { Domain } from "@featherstats/database/types"
import { DomainContext } from "contexts/domain-context"

interface DomainProviderProps {
    children: React.ReactNode
    domain: Domain
}

export default function DomainProvider({ children, domain }: DomainProviderProps) {
    const context = {
        domain
    }

    return (<DomainContext.Provider value={context}>{children}</DomainContext.Provider>)
}