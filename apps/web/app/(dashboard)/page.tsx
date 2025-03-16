'use client'
import DomainCard from "components/workspace/domain-card";
import { useWorkspace } from "hooks/use-workspace";

export default function DefaultDashboardPage() {
    const { domains } = useWorkspace()

    return <>
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Your Domains</h2>
            <div className="flex items-center space-x-2">
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((domain, i) => <DomainCard domainName={domain.name} key={i} />)}
        </div>
    </>
}