import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '@/lib/api';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, CalendarCheck, UtensilsCrossed, UserCheck, Plus, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    todayBookings: 0,
    menuItems: 0,
    activeStaff: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchRecentBookings();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersData, bookingsData, menuData] = await Promise.all([
        api.get('/users'),
        api.get('/bookings/user/all'),
        api.get('/menu'),
      ]);

      const users = usersData.users || usersData || [];
      const bookings = bookingsData.bookings || bookingsData || [];
      const menu = menuData.menuItems || menuData || [];
      const today = format(new Date(), 'yyyy-MM-dd');

      setStats({
        totalUsers: users.length,
        todayBookings: bookings.filter((b: any) => b.date === today).length,
        menuItems: menu.length,
        activeStaff: users.filter((u: any) => u.role === 'staff').length,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const data = await api.get('/bookings/user/all');
      const bookings = data.bookings || data || [];
      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Total Users" value={stats.totalUsers} icon={<Users className="h-6 w-6" />} gradient="primary" description="Registered users" />
          <StatsCard title="Today's Bookings" value={stats.todayBookings} icon={<CalendarCheck className="h-6 w-6" />} gradient="secondary" description="Meals booked today" />
          <StatsCard title="Menu Items" value={stats.menuItems} icon={<UtensilsCrossed className="h-6 w-6" />} gradient="accent" description="Available dishes" />
          <StatsCard title="Active Staff" value={stats.activeStaff} icon={<UserCheck className="h-6 w-6" />} gradient="success" description="Staff members" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/users">
                <Button className="w-full justify-between gradient-primary hover:opacity-90">
                  <span className="flex items-center gap-2"><Plus className="h-4 w-4" />Add New User</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/admin/menu">
                <Button className="w-full justify-between gradient-secondary hover:opacity-90">
                  <span className="flex items-center gap-2"><UtensilsCrossed className="h-4 w-4" />Manage Menu</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/admin/reports">
                <Button className="w-full justify-between gradient-accent hover:opacity-90">
                  <span className="flex items-center gap-2"><CalendarCheck className="h-4 w-4" />View Reports</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest meal reservations</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : recentBookings.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No bookings yet</p>
              ) : (
                <div className="space-y-3">
                  {recentBookings.map((booking: any) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div>
                        <p className="font-medium">{booking.full_name || booking.email || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(booking.date), 'MMM d, yyyy')} • {booking.meal_type}
                        </p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
