import { Link, useLocation,useSearchParams } from 'react-router-dom'
import { Box, Filter, LayoutGrid, Clock, Settings, Users } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar"
import NavSidebar from './nav-sidebar'
import { getSidebarNavText } from '@/lib/getSidebarNavText'
export function AppSidebar() {
  const location= useLocation()
  const navigationText = getSidebarNavText(location.pathname)
  return (
      <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded bg-white/10 p-1">
            <Box className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">Acme Inc</h3>
            <p className="text-xs text-muted-foreground">Enterprise</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                    <span className="ml-auto text-muted-foreground">12</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/course">
                    <LayoutGrid className="h-4 w-4" />
                    <span>{navigationText.all}</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/recent">
                    <Clock className="h-4 w-4" />
                    <span>{navigationText.recent}</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/my-courses">
                    <LayoutGrid className="h-4 w-4" />
                    <span>{navigationText.my}</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/manage">
                    <Users className="h-4 w-4" />
                    <span>Manage</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/enrollment">
                    <Users className="h-4 w-4" />
                    <span>Enrollment</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      </Sidebar>
  )
}

