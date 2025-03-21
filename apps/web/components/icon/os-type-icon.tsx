import { cn } from "lib/utils";
import { HardDrive } from "lucide-react";
import Image from "next/image"

interface Props {
    osName: string;
    className?: string;
}

export default function OsIcon({osName: browserName, className}: Props) {
    const iconSrc = osIcons[browserName.toLowerCase()] || null;

  return iconSrc ? <Image src={iconSrc} width={16} height={16} alt={browserName} className={cn("size-4", className)} /> : <HardDrive className={cn("size-4", className)} />;
}

const osIcons: Record<string, string> = {
    "windows": "/icons/os/windows.svg",
    "android": "/icons/os/android.svg",
    "ios": "/icons/os/ios.svg",
    "macos": "/icons/os/apple.svg"
  };