import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Outlet } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import { Nav } from "./nav"

export default function Page({setIsAuthenticated}) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); // Update authentication state
  };
  return (
    <SidebarProvider>
      <AppSidebar handleLogout={handleLogout} />
      <SidebarInset>
        <Nav />
        <DndProvider backend={HTML5Backend}>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <Outlet />
            <Toaster />
          </div>
        </DndProvider>
      </SidebarInset>
    </SidebarProvider>
  )
}
