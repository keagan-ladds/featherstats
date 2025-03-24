'use client'
import { AppShellContext } from "contexts/app-shell-context";
import { ReactNode, useState } from "react";

interface Props {
    children: React.ReactElement
}


export default function AppShellProvider({ children }: Props) {
    const [pageTitle, setPageTitle] = useState<string>();
    const [headerContent, setHeaderContentFunc] = useState<() => ReactNode>(() => () => null)

    const setHeaderContent = (content : ReactNode) => {
        setHeaderContentFunc(() => () => content)
    }

    const context = {
        pageTitle,
        headerContent,
        setPageTitle,
        setHeaderContent
    }

    return <>
        <AppShellContext.Provider value={context}>
            {children}
        </AppShellContext.Provider>
    </>
}