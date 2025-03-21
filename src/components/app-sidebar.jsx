import { Link, useLocation,useSearchParams } from 'react-router-dom'
import { Box, Filter, LayoutGrid, BookCheck, Settings, LayoutDashboard, MailIcon, Users, Newspaper } from 'lucide-react'
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
  SidebarFooter
} from "./ui/sidebar"
import NavSidebar from './nav-sidebar'
import NavUser from './nav-user'
import { getSidebarNavText } from '@/lib/getSidebarNavText'
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}
export function AppSidebar({handleLogout}) {
  const location= useLocation()
  const navigationText = getSidebarNavText(location.pathname)
  return (
      <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="rounded bg-white/10 p-1">
            {/* <Box className="h-6 w-6" /> */}
            <img src="/logo.svg" alt="dyc logo" />
          </div>
          <div>
            <h3 className="font-semibold">Acme Inc</h3>
            <p className="text-xs text-muted-foreground">Enterprise</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* <SidebarGroup>
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
        </SidebarGroup> */}
        <SidebarGroup>
          <SidebarGroupContent>
          <SidebarGroupLabel>Dashboard Features</SidebarGroupLabel>
            <SidebarMenu className="mt-[1rem]">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/overviews">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Overviews</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/subscribers">
                    <MailIcon className="h-4 w-4" />
                    <span>Subscribers</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/candidates">
                    <Users className="h-4 w-4" />
                    <span>Candidates</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/blogs">
                    <BookCheck className="h-4 w-4" />
                    <span>Blogs</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavSidebar to="/dashboard/newsletter">
                    <Newspaper className="h-4 w-4" />
                    <span>Newsletter</span>
                  </NavSidebar>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser handleLogout={handleLogout} user={data.user} />
      </SidebarFooter>
      </Sidebar>
  )
}

