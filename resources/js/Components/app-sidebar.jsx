import * as React from "react";
import {
  Command,
  Frame,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Shield,
  ShieldBanIcon,
  User,
} from "lucide-react";

import { NavMain } from "@/Components/nav-main";
import { NavSettings } from "@/Components/nav-settings";
import { NavSecondary } from "@/Components/nav-secondary";
import { NavUser } from "@/Components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: route('dashboard.index'),
      icon: LayoutDashboard,
      isActive: window.location.pathname === route('dashboard.index') || window.location.pathname.startsWith('/dashboard'),
      role: 'dashboard-access',
    },
    {
      title: "Users",
      url: "#",
      icon: User,
      items: [
        {
          title: "User List",
          url: route('dashboard.users.index'),
        },
        {
          title: "Add New User",
          url: route('dashboard.users.create'),
        },
      ],
      role: 'users-access',
    },
    {
      title: "Roles",
      url: route('dashboard.roles.index'),
      icon: Shield,
      isActive: window.location.pathname === route('dashboard.roles.index') || window.location.pathname.startsWith('/dashboard/roles'),
      role: 'roles-access',
    },
    {
      title: "Permissions",
      url: route('dashboard.permissions.index'),
      icon: ShieldBanIcon,
      isActive: window.location.pathname === route('dashboard.permissions.index') || window.location.pathname.startsWith('/dashboard/permissions'),
      role: 'permissions-access',
    },
  ],
  navSecondary: [
    {
      title: "Other Menu 1",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Other Menu 2",
      url: "#",
      icon: Send,
    },
  ],
  settings: [
    {
      name: "Setting 1",
      url: "#",
      icon: Frame,
    },
    {
      name: "Setting 2",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Setting 3",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}) {
  const userRoles = user.roles ? user.roles.map(role => role.name) : [];
  const isSuperAdmin = userRoles.includes('super-admin');
  const allowedItems = isSuperAdmin ? data.navMain : data.navMain.filter(item => userRoles.includes(item.role));

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={allowedItems} />
        <NavSettings settings={data.settings} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
