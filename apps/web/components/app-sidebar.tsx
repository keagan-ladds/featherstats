"use client"

import * as React from "react"
import {
    ChartLine,
    Radio,
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

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navDomain: [
        {
            title: "Realtime",
            url: "#",
            icon: Radio
        },
        {
            title: "Overview",
            url: "app/",
            icon: ChartLine,
            isActive: true,
            items: [
                {
                    title: "Pages",
                    url: "#",
                },
                {
                    title: "Sources",
                    url: "#",
                },
                {
                    title: "Locations",
                    url: "#",
                },
                {
                    title: "Devices",
                    url: "#",
                },
            ],
        },
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },


    ],

    navWorkspace: [
        {
            title: "Domain",
            url: "app/",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
        },


    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

    const [sessionLoading, setSessionLoading] = useState<boolean>(true);
    const { domains } = useWorkspace()
    const { data: session } = useSession();

    useEffect(() => {
        if (session) setSessionLoading(false)

    }, [session])

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <DomainSwitcher domains={domains} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navDomain} title="Analytics" />
                <NavMain items={data.navWorkspace} title="Workspace" />
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
