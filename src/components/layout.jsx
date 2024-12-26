import { Outlet } from 'react-router-dom'

import { AppSidebar } from './app-sidebar'
import { Nav } from './nav'
import { SidebarProvider } from './ui/sidebar'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <Nav />
        <div className="flex">
          <AppSidebar />
          <main className="">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

