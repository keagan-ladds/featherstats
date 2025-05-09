'use client'

import { useSidebar } from "@repo/ui/components/ui/sidebar"
import { cn } from "lib/utils"
import Image from "next/image"
import Link from "next/link"

export function NavBrand() {
    const { open } = useSidebar()
    return <>
        <div className="flex items-center">
            <Link className="flex items-center" href="/">
                <Image className={cn("size-12 aspect-square transition-all", !open && 'size-8', !open && "mt-2" )} src="/featherstats.png" width={64} height={64} alt="Featherstats Logo" />
                <h2 className={cn("ml-2 text-xl font-bold tracking-tight transition-all", open || 'hidden')}>Featherstats</h2>
            </Link>

        </div>
    </>
}