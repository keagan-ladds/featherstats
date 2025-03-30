"use client"

import * as React from "react"
import { ChevronsUpDown, Globe, Plus, Sparkles } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/ui/sidebar"
import useDialog from "hooks/use-dialog"
import { useWorkspace } from "hooks/use-workspace"
import SourceIcon from "./icon/source-icon"
import { Domain } from "@featherstats/database/types"
import { redirect, useParams } from "next/navigation"
import { useUser } from "hooks/use-user"

export function DomainSwitcher() {
  const { isMobile } = useSidebar()
  const { domains } = useWorkspace();
  const { profile } = useUser()
  const { open: openDomainCreateDialog } = useDialog("domain_create")
  const { open: openUpgradeDialog } = useDialog("upgrade")
  const [activeDomain, setActiveDomain] = React.useState(domains[0])
  const params = useParams()

  if (!activeDomain) {
    return null
  }

  // Hide the switcher if the user can only have one domain anyway
  if (profile.subscription.usageLimits.maxDomains == 1) {
    return null;
  }

  const domainLimitReached = domains.length >= profile.subscription.usageLimits.maxDomains

  const onDomainSelected = React.useCallback((domain: Domain) => {
    setActiveDomain(domain)
    redirect(`/${domain.name}`)
  }, [])

  React.useEffect(() => {
    if (params.domain) {
      const active = domains.find((domain) => domain.name === params.domain)
      setActiveDomain(active)
    }
    
  }, [params])


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <SourceIcon className="size-4" source={activeDomain.name} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeDomain.name}
                </span>
                {/* <span className="truncate text-xs">{activeDomain.plan}</span> */}
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] !min-w-96 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Domains
            </DropdownMenuLabel>
            {domains.map((domain, index) => (
              <DropdownMenuItem
                key={domain.name}
                onClick={() => onDomainSelected(domain)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <SourceIcon className="size-4 shrink-0" source={domain.name} />
                </div>
                {domain.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            {!domainLimitReached && (<DropdownMenuItem className="gap-2 p-2" onClick={() => openDomainCreateDialog()}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add domain</div>
            </DropdownMenuItem>)}
            {domainLimitReached && (<DropdownMenuGroup>
              <DropdownMenuItem onClick={() => openUpgradeDialog()}>
                <Sparkles />
                Upgrade to add more domains
              </DropdownMenuItem>
            </DropdownMenuGroup>)}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
