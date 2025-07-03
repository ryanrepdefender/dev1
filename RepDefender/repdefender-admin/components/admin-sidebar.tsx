"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Users, MessageSquare, AlertTriangle, Download, Settings, Shield } from "lucide-react"

interface AdminSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    id: "overview",
  },
  {
    title: "Users",
    icon: Users,
    id: "users",
  },
  {
    title: "Reviews",
    icon: MessageSquare,
    id: "reviews",
  },
  {
    title: "Disputes",
    icon: AlertTriangle,
    id: "disputes",
  },
  {
    title: "Export Data",
    icon: Download,
    id: "export",
  },
  {
    title: "Settings",
    icon: Settings,
    id: "settings",
  },
]

export function AdminSidebar({ activeSection, setActiveSection }: AdminSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <Shield className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold">RepDefender</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-gray-500">Admin Panel v1.0</div>
      </SidebarFooter>
    </Sidebar>
  )
}
