'use client'

import { Domain } from "@featherstats/database/types"
import { DomainContext } from "contexts/domain-context"

interface DomainProviderProps {
    children: React.ReactNode
    domain: Domain
}

export default function DomainProvider({ children }: DomainProviderProps) {
    return (<DomainContext.Provider value={null}>{children}</DomainContext.Provider>)
}