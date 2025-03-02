'use client'

import { createContext } from "react";

interface AnalyticsContext {
    baseUrl: string;
    token: string;
}

interface AnalyticsProviderProps {
    children: React.ReactNode
    token: string
}

export const AnalyticsContext = createContext<AnalyticsContext | null>(null)

export function AnalyticsProvider({ children, token }: AnalyticsProviderProps) {
    const context: AnalyticsContext = {
        baseUrl: "https://api.tinybird.co",
        token
    }

    return <>
        <AnalyticsContext.Provider value={context}>
            {children}
        </AnalyticsContext.Provider>
    </>
}