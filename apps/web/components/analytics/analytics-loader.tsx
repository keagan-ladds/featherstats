import { Skeleton } from "@repo/ui/components/ui/skeleton";

interface AnalyticsLoaderProps {
    children: React.ReactNode;
    loading?: boolean
}

export default function AnalyticsLoader({ children, loading }: AnalyticsLoaderProps) {

    return <>{children}</>;

    if (loading) return (
        <div className="flex flex-col gap-1">
            {Array.from(Array(10)).map((_, i) => (
                <Skeleton key={i} className="w-full h-8 rounded-xs">

                </Skeleton>
            ))}
        </div>);

    

}