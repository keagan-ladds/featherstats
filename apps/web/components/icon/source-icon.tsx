import { cn } from "lib/utils";

interface Props {
    source: string;
    className?: string;
}
export default function SourceIcon({ source, className }: Props) {
    const iconSrc = `/favicon/${source}`;
    return <img src={iconSrc} width={32} height={32} alt={source} className={cn("size-4", className)}/>
}