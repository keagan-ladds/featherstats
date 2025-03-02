interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return <>
    <a>App Layout</a>
        {children}
    </>
}