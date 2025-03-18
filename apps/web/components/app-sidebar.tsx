"use client"

import * as React from "react"
import {
    ChartBarBig,
    ChartLine,
    FileText,
    Lightbulb,
    MapPin,
    Microchip,
    Radio,
    Share2,
    SquareTerminal,
} from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@repo/ui/components/ui/sidebar"
import { DomainSwitcher } from "./domain-switcher"
import { useWorkspace } from "hooks/use-workspace"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Skeleton } from "@repo/ui/components/ui/skeleton"
import { useParams, usePathname } from "next/navigation"
import { NavBrand } from "./nav-brand"


const navDomainItems = (appBaseUrl: string, domainName: string) => [
    // {
    //     title: "Realtime",
    //     url: `${appBaseUrl}/${domainName}/realtime`,
    //     icon: Radio
    // },
    {
        title: "Overview",
        url: `${appBaseUrl}/${domainName}`,
        icon: ChartBarBig,
        isActive: false
    },
    {
        title: "Pages",
        url: `${appBaseUrl}/${domainName}/pages`,
        icon: FileText
    },
    {
        title: "Sources",
        url: `${appBaseUrl}/${domainName}/sources`,
        icon: Share2
    },
    {
        title: "Location",
        icon: MapPin,
        url: `${appBaseUrl}/${domainName}/country`,
        isActive: false,
        items: [
            {
                title: "Country",
                url: `${appBaseUrl}/${domainName}/countries`,
                isActive: false
            },
            {
                title: "City",
                url: `${appBaseUrl}/${domainName}/cities`,
            },
        ]
    },
    {
        title: "Technology",
        icon: Microchip,
        url: `${appBaseUrl}/${domainName}/devices`,
        isActive: false,
        items: [
            {
                title: "Device",
                url: `${appBaseUrl}/${domainName}/devices`,
            },
            {
                title: "Browser",
                url: `${appBaseUrl}/${domainName}/browsers`,
            },
            {
                title: "Operating System",
                url: `${appBaseUrl}/${domainName}/operating-systems`,
            },
        ]
    }
    // {
    //     title: "Insights",
    //     url: `${appBaseUrl}/${domainName}/insights`,
    //     icon: Lightbulb,
    // },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const [sessionLoading, setSessionLoading] = useState<boolean>(true);
    const [paramsLoading, setParamsLoading] = useState<boolean>(true);
    const { domains } = useWorkspace()
    const { data: session } = useSession();
    const pathname = usePathname()
    const params = useParams()
    const domain = params.domain;

    useEffect(() => {
        if (session) setSessionLoading(false)
    }, [session])

    useEffect(() => {
        if (params) setParamsLoading(false);
    }, [params])

    const domainNavItems = React.useMemo(() => {
        const items = navDomainItems('', domain as string);
        items.forEach(item => {
            let itemActive = false;
            item.items?.forEach(subItem => {
                if (pathname.indexOf(subItem.url) > -1) {
                    subItem.isActive = true;
                    itemActive =  true;
                } else {
                    subItem.isActive = false;
                }
            })

            item.isActive = itemActive || pathname.endsWith(item.url);
        })
        return items;
    }, [domain, pathname])

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavBrand />
            </SidebarHeader>
            <SidebarContent>
                {paramsLoading ? <Skeleton className="w-full h-52" /> : <>
                    {domain && <NavMain items={domainNavItems} title="Analytics" />}
                    {/* <NavMain items={data.navWorkspace} title="Workspace" /> */}
                </>}
            </SidebarContent>
            <SidebarFooter>
                {sessionLoading || !session ? <>
                    <Skeleton className="w-full h-12" />
                </> : <NavUser user={session.user!} />}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
