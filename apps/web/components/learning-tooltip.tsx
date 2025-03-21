'use client'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/ui/tooltip";
import { cn } from "lib/utils";
import { Info } from "lucide-react";

interface Props {
    title?: string;
    description: string;
    className?: string
}

export default function LearningTooltip({ description, className }: Props) {
    return <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Info className={cn("size-4", className)} />
                </TooltipTrigger>
                <TooltipContent className="max-w-64">
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </>
}