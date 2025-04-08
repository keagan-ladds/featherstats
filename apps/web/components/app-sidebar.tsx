"use client"

import * as React from "react"
import {
    ChartBarBig,
    FileText,
    MapPin,
    Microchip,
    Share2,
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
import { useWorkspace } from "hooks/use-workspace"
import { useEffect, useState } from "react"
import { Skeleton } from "@repo/ui/components/ui/skeleton"
import { useParams, usePathname } from "next/navigation"
import { NavBrand } from "./nav-brand"
import { useUser } from "hooks/use-user"
import { DomainSwitcher } from "./domain-switcher"


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
        title: "Acquisition",
        url: `#`,
        icon: Share2,
        items: [
            {
                title: "Source",
                url: `${appBaseUrl}/${domainName}/sources`,
                isActive: false
            },
            {
                title: "Channel",
                url: `${appBaseUrl}/${domainName}/channels`,
            },
        ]
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

    const [paramsLoading, setParamsLoading] = useState<boolean>(true);
    const { domains } = useWorkspace()
    const { profile } = useUser();
    const pathname = usePathname()
    const params = useParams()
    const domain = params.domain;


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
                    itemActive = true;
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
                <DomainSwitcher/>
            </SidebarHeader>
            <SidebarContent>
                {paramsLoading ? <SidebarNavSkeleton /> : <>
                    {domain && <NavMain items={domainNavItems} title="Analytics" />}
                    {/* <NavMain items={data.navWorkspace} title="Workspace" /> */}
                </>}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={profile} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}

const SidebarNavSkeleton = () => <>
    <div className="w-full px-2 flex flex-col gap-1">
        <Skeleton className="h-3 w-full" />
        {Array.from({ length: 6 }, (_, i) =>
            <Skeleton className="h-8 w-full" key={i} />
        )}
    </div>
</>
