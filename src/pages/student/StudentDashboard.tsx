import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  CalendarCheck,
  CalendarDays,
  Clock,
  ArrowRight,
  CalendarPlus,
  Coffee,
  Sun,
  Moon,
} from 'lucide-react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { MealBooking, MealType } from '@/types/database';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBookings: 0,
    thisWeek: 0,
    pending: 0,
  });
  const [recentBookings, setRecentBookings] = useState<MealBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchRecentBookings();
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      const weekStart = format(startOfWeek(new Date()), 'yyyy-MM-dd');
      const weekEnd = format(endOfWeek(new Date()), 'yyyy-MM-dd');

      const [totalRes, weekRes, pendingRes] = await Promise.all([
        supabase
          .from('meal_bookings')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user?.id),
        supabase
          .from('meal_bookings')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user?.id)
          .gte('date', weekStart)
          .lte('date', weekEnd),
        supabase
          .from('meal_bookings')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user?.id)
          .eq('status', 'pending'),
      ]);

      setStats({
        totalBookings: totalRes.count || 0,
        thisWeek: weekRes.count || 0,
        pending: pendingRes.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('meal_bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('date', { ascending: false })
        .limit(5);

      if (error) throw error;
      setRecentBookings(data || []);
    } catch (error) {
      console.error('Error fetching recent bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMealIcon = (mealType: MealType) => {
    switch (mealType) {
      case 'breakfast':
        return <Coffee className="h-4 w-4" />;
      case 'lunch':
        return <Sun className="h-4 w-4" />;
      case 'dinner':
        return <Moon className="h-4 w-4" />;
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
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your dining activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<CalendarCheck className="h-6 w-6" />}
            gradient="primary"
            description="All time"
          />
          <StatsCard
            title="This Week"
            value={stats.thisWeek}
            icon={<CalendarDays className="h-6 w-6" />}
            gradient="secondary"
            description="Meals booked"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={<Clock className="h-6 w-6" />}
            gradient="accent"
            description="Awaiting confirmation"
          />
        </div>

        {/* Quick Actions & Recent Bookings */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Book your next meal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/student/book">
                <Button className="w-full justify-between gradient-primary hover:opacity-90">
                  <span className="flex items-center gap-2">
                    <CalendarPlus className="h-4 w-4" />
                    Book a Meal
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/student/bookings">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                >
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    View My Bookings
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Your latest meal reservations</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted animate-pulse rounded-lg" />
                  ))}
                </div>
              ) : recentBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No bookings yet</p>
                  <Link to="/student/book">
                    <Button className="mt-4" variant="outline">
                      Book your first meal
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {getMealIcon(booking.meal_type)}
                        </div>
                        <div>
                          <p className="font-medium capitalize">
                            {booking.meal_type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(booking.date), 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
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
