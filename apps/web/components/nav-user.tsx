"use client"

import {
  BadgeCheck,
  Bell,
  ChartLine,
  ChevronsUpDown,
  Cog,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar"
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
import { signOut } from "next-auth/react"
import { useCallback } from "react"
import { UserProfile } from "types/user"
import Link from "next/link"
import { cn } from "lib/utils"


interface Props {
  user: UserProfile
}

export function NavUser({
  user,
}: Props) {
  const { isMobile, open } = useSidebar()
  const onSignOut = useCallback(() => {
    signOut({ redirectTo: '/login' })
  }, [])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className={cn("h-8 w-8 rounded-lg", !open && "size-6 -ml-1")}>
                {user.image && <AvatarImage src={user.image} alt={user.name || 'User Name'} />}
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user.image && <AvatarImage src={user.image} alt={user.name || 'User Name'} />}
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/*<DropdownMenuGroup>
               <DropdownMenuItem asChild>
                <Link href="/manage/subscription/upgrade">
                  <Sparkles />
                  Upgrade to Pro
                </Link>

              </DropdownMenuItem> 
            </DropdownMenuGroup>
            <DropdownMenuSeparator />*/}
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/manage/preferences">
                  <Cog />
                  Preferences
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/manage/subscription">
                  <CreditCard />
                  Subscription
                </Link>

              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/manage/usage">
                  <ChartLine />
                  Usage
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
