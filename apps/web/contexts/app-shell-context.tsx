import { ReactNode, createContext } from "react";

interface AppShellContext {
    pageTitle?: string;
    setPageTitle: (title: string) => void;
    headerContent: () => ReactNode
    setHeaderContent: (content: ReactNode) => void;
}

export const AppShellContext = createContext<AppShellContext | null>(null)