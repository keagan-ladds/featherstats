'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/ui/tooltip"
import { useUser } from "hooks/use-user"
import { cn } from "lib/utils"
import { Info } from "lucide-react"

interface Props {
    title?: string | React.ReactElement
    content: string | React.ReactElement
    className?: string
}

export default function ClarityModeTooltip({ className, content }: Props) {
    const { profile } = useUser();
    const clarityEnabled = profile.preferences.clarifyModeEnabled;

    if (!clarityEnabled) return null;

    return <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Info className={cn("size-4", className)} />
                </TooltipTrigger>
                <TooltipContent className="max-w-64">
                    {content}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </>
}