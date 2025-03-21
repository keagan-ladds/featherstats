import { cn } from "lib/utils";
import { Globe } from "lucide-react";
import Image from "next/image"

interface Props {
    browserName: string;
    className?: string;
}

export default function BrowserIcon({browserName, className}: Props) {
    const iconSrc = browserIcons[browserName.toLowerCase()] || null;

  return iconSrc ? <Image src={iconSrc} width={16} height={16} alt={browserName} className={cn("size-4", className)} /> : <Globe className={cn("size-4", className)} />;
}

const browserIcons: Record<string, string> = {
    "chrome": "/icons/browser/chrome.svg",
    "safari": "/icons/browser/safari.svg",
    "samsung internet": "/icons/browser/samsung-internet.svg",
    "firefox": "/icons/browser/firefox.svg",
    "edge": "/icons/browser/edge.svg",
    "opera": "/icons/browser/opera.svg",
  };