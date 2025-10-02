"use client"

import * as React from "react"
import {
  Frame,
  House,
  HousePlus,
} from "lucide-react"

import { DashboardNavRoutes } from "./dashboard-nav-routes"
import { DashboardNavUser } from "./dashboard-nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
  user: {
    name: "safwan",
    email: "safwanmabdo@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  routes: [
    {
      name: "Overview",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Properties",
      url: "/dashboard/properties",
      icon: House,
    },
    {
      name: "Create New Property",
      url: "/dashboard/properties/create",
      icon: HousePlus,
    },
  ],
}

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="w-full p-2">
          <Image src='/logoipsum.png' height={300} width={300} alt="project logo" className="w-full"/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <DashboardNavRoutes projects={data.routes} />
      </SidebarContent>
      <SidebarFooter>
        <DashboardNavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
