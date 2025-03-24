import { AppShellContext } from "contexts/app-shell-context";
import { ReactNode, useCallback, useContext } from "react";

export default function useAppShell() {
    const context = useContext(AppShellContext);
    if (!context) throw new Error("The hook 'useAppShell' can only be used within a 'AppShellProvider' context.")

    

    return {
        pageTitle: context.pageTitle,
        headerContent: context.headerContent,
        setPageTitle: context.setPageTitle,
        setHeaderContent: context.setHeaderContent
    }
}