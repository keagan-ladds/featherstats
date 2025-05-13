'use client'


import { DomainContext } from "contexts/domain-context";
import { useContext } from "react"

export default function useDomain() {
    const context = useContext(DomainContext);
    if (!context) throw new Error("The hook 'useDomain' can only be used within an DomainProvider context.")

    const {domain} = context;

    return {
        domain,
        currency: domain.configuration.currency || "USD",
        conversionConfiguration: domain.configuration.conversions,
        showConversions: domain.configuration.conversions && Object.keys(domain.configuration.conversions).length > 0
    }
}