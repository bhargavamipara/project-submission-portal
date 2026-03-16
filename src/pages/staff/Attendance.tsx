import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  CalendarIcon, Coffee, Sun, Moon, Loader2, Save, UserCheck, UserX, Users,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { MealType, AttendanceStatus } from '@/types/database';

interface BookingWithAttendance {
  id: string;
  user_id: string;
  date: string;
  meal_type: MealType;
  status: string;
  full_name?: string;
  email?: string;
  attendanceStatus?: AttendanceStatus | null;
  attendanceId?: string;
}

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');
  const [bookings, setBookings] = useState<BookingWithAttendance[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => { fetchBookings(); }, [selectedDate, selectedMealType]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await api.get('/bookings');
      const allBookings = data.bookings || data || [];
      const dateStr = format(selectedDate, 'yyyy-MM-dd');

      const filtered = allBookings
        .filter((b: any) => b.date === dateStr && b.meal_type === selectedMealType)
        .map((b: any) => ({
          ...b,
          attendanceStatus: b.attendance_status || null,
          attendanceId: b.attendance_id || null,
        }));

      setBookings(filtered);

      const map: Record<string, AttendanceStatus> = {};
      filtered.forEach((b: any) => {
        if (b.attendanceStatus) map[b.id] = b.attendanceStatus;
      });
      setAttendanceMap(map);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch bookings' });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAttendance = (bookingId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({ ...prev, [bookingId]: status }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      for (const booking of bookings) {
        const status = attendanceMap[booking.id];
        if (!status) continue;

        await api.post('/attendance', {
          booking_id: booking.id,
          status,
          marked_by: user?.id,
        });
      }

      toast({ title: 'Success', description: 'Attendance saved successfully' });
      fetchBookings();
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to save attendance' });
    } finally {
      setSaving(false);
    }
  };

  const presentCount = Object.values(attendanceMap).filter((s) => s === 'present').length;
  const absentCount = Object.values(attendanceMap).filter((s) => s === 'absent').length;

  return (
    <DashboardLayout allowedRoles={['staff']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mark Attendance</h1>
          <p className="text-muted-foreground">Record student attendance for meals</p>
        </div>

        <Card className="card-shadow">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-end gap-4">
              <div className="space-y-2">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start"><CalendarIcon className="mr-2 h-4 w-4" />{format(selectedDate, 'PPP')}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <Tabs value={selectedMealType} onValueChange={(v) => setSelectedMealType(v as MealType)}>
                <TabsList>
                  <TabsTrigger value="breakfast" className="gap-2"><Coffee className="h-4 w-4" />Breakfast</TabsTrigger>
                  <TabsTrigger value="lunch" className="gap-2"><Sun className="h-4 w-4" />Lunch</TabsTrigger>
                  <TabsTrigger value="dinner" className="gap-2"><Moon className="h-4 w-4" />Dinner</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-white"><Users className="h-6 w-6" /></div>
                <div><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-bold">{bookings.length}</p></div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-success text-white"><UserCheck className="h-6 w-6" /></div>
                <div><p className="text-sm text-muted-foreground">Present</p><p className="text-2xl font-bold">{presentCount}</p></div>
              </div>
            </CardContent>
          </Card>
          <Card className="card-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-warning text-white"><UserX className="h-6 w-6" /></div>
                <div><p className="text-sm text-muted-foreground">Absent</p><p className="text-2xl font-bold">{absentCount}</p></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="card-shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student Bookings</CardTitle>
              <CardDescription>{format(selectedDate, 'EEEE, MMMM d, yyyy')} • {selectedMealType}</CardDescription>
            </div>
            <Button onClick={handleSaveAttendance} disabled={saving || bookings.length === 0} className="gradient-secondary hover:opacity-90">
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}Save Attendance
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No bookings found for this date and meal type</div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        {(booking.full_name || booking.email || 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{booking.full_name || 'Unknown'}</p>
                        <p className="text-sm text-muted-foreground">{booking.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={attendanceMap[booking.id] === 'present' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleAttendance(booking.id, 'present')}
                        className={cn(attendanceMap[booking.id] === 'present' && 'bg-green-600 hover:bg-green-700')}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />Present
                      </Button>
                      <Button
                        variant={attendanceMap[booking.id] === 'absent' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleToggleAttendance(booking.id, 'absent')}
                        className={cn(attendanceMap[booking.id] === 'absent' && 'bg-red-600 hover:bg-red-700')}
                      >
                        <UserX className="h-4 w-4 mr-1" />Absent
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
