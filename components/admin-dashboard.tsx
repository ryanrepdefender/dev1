"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { DashboardOverview } from "@/components/dashboard-overview"
import { UsersManagement } from "@/components/users-management"
import { ReviewsMonitoring } from "@/components/reviews-monitoring"
import { DisputesTracking } from "@/components/disputes-tracking"
import { DataExport } from "@/components/data-export"
import { AdminSettings } from "@/components/admin-settings"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview")

  const getSectionTitle = (section: string) => {
    switch (section) {
      case "overview":
        return "Dashboard Overview"
      case "users":
        return "Users Management"
      case "reviews":
        return "Reviews Monitoring"
      case "disputes":
        return "Disputes Tracking"
      case "export":
        return "Data Export"
      case "settings":
        return "Admin Settings"
      default:
        return "Dashboard"
    }
  }

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UsersManagement />
      case "reviews":
        return <ReviewsMonitoring />
      case "disputes":
        return <DisputesTracking />
      case "export":
        return <DataExport />
      case "settings":
        return <AdminSettings />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <AdminSidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">RepDefender Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{getSectionTitle(activeSection)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 bg-gray-50">{renderContent()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
