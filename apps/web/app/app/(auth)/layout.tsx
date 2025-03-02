interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return <>
    <h1>Auth</h1>
    {children}
    </>
}