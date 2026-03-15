import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Users, UtensilsCrossed, FileBarChart, ClipboardCheck,
  CalendarPlus, CalendarDays, LogOut, ChefHat,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminRoutes = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'User Management', url: '/admin/users', icon: Users },
  { title: 'Menu Management', url: '/admin/menu', icon: UtensilsCrossed },
  { title: 'Reports', url: '/admin/reports', icon: FileBarChart },
];

const staffRoutes = [
  { title: 'Dashboard', url: '/staff', icon: LayoutDashboard },
  { title: 'Mark Attendance', url: '/staff/attendance', icon: ClipboardCheck },
];

const studentRoutes = [
  { title: 'Dashboard', url: '/student', icon: LayoutDashboard },
  { title: 'Book Meal', url: '/student/book', icon: CalendarPlus },
  { title: 'My Bookings', url: '/student/bookings', icon: CalendarDays },
];

export function AppSidebar() {
  const { role, signOut, user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const routes = role === 'admin' ? adminRoutes : role === 'staff' ? staffRoutes : studentRoutes;
  const roleLabel = role === 'admin' ? 'Admin Panel' : role === 'staff' ? 'Staff Panel' : 'Student Portal';
  const roleColor = role === 'admin' ? 'gradient-primary' : role === 'staff' ? 'gradient-secondary' : 'gradient-accent';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className={cn('flex items-center gap-3 px-2 py-3', collapsed && 'justify-center')}>
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg text-white', roleColor)}>
            <ChefHat className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-foreground">DineFlow</span>
              <span className="text-xs text-muted-foreground">{roleLabel}</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link to={item.url}><item.icon className="h-4 w-4" /><span>{item.title}</span></Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className={cn('flex flex-col gap-2 p-2', collapsed && 'items-center')}>
          {!collapsed && user && (
            <div className="px-2 py-1">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </div>
          )}
          <Button variant="ghost" size={collapsed ? 'icon' : 'sm'} onClick={signOut}
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-4 w-4" />{!collapsed && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
