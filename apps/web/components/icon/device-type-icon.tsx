import { cn } from "lib/utils";
import { Monitor, MonitorSmartphone, Smartphone, Tablet } from "lucide-react";

interface Props {
    deviceType: string;
    className?: string
}

export default function DeviceTypeIcon({ deviceType, className }: Props) {
    switch (deviceType) {
        case "desktop":
            return <Monitor className={cn("size-4", className)} />
        case "mobile":
            return <Smartphone className={cn("size-4", className)} />
        case "tablet":
            return <Tablet className={cn("size-4", className)} />
        default:
            return <MonitorSmartphone className={cn("size-4", className)} />
    }
}