import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardCheck, CalendarCheck, UserCheck, UserX, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function StaffDashboard() {
  const [stats, setStats] = useState({
    todayBookings: 0,
    markedPresent: 0,
    markedAbsent: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const today = format(new Date(), 'yyyy-MM-dd');

      const { data: bookings } = await supabase
        .from('meal_bookings')
        .select('id')
        .eq('date', today);

      const { data: attendance } = await supabase
        .from('attendance')
        .select(`
          status,
          meal_bookings!inner (date)
        `)
        .eq('meal_bookings.date', today);

      const present = attendance?.filter((a) => a.status === 'present').length || 0;
      const absent = attendance?.filter((a) => a.status === 'absent').length || 0;

      setStats({
        todayBookings: bookings?.length || 0,
        markedPresent: present,
        markedAbsent: absent,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <DashboardLayout allowedRoles={['staff']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Staff Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome! Today is {format(new Date(), 'EEEE, MMMM d, yyyy')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Today's Bookings"
            value={stats.todayBookings}
            icon={<CalendarCheck className="h-6 w-6" />}
            gradient="primary"
            description="Total meal bookings"
          />
          <StatsCard
            title="Marked Present"
            value={stats.markedPresent}
            icon={<UserCheck className="h-6 w-6" />}
            gradient="success"
            description="Students present"
          />
          <StatsCard
            title="Marked Absent"
            value={stats.markedAbsent}
            icon={<UserX className="h-6 w-6" />}
            gradient="warning"
            description="Students absent"
          />
        </div>

        {/* Quick Action */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Mark Attendance</CardTitle>
            <CardDescription>
              Record student attendance for meals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/staff/attendance">
              <Button className="w-full sm:w-auto gradient-secondary hover:opacity-90">
                <ClipboardCheck className="h-4 w-4 mr-2" />
                Go to Attendance Page
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
