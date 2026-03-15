import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, Coffee, Sun, Moon, Loader2, X, Filter } from 'lucide-react';
import { format, isBefore, startOfDay } from 'date-fns';
import { MealBooking, MealType, BookingStatus } from '@/types/database';

export default function MyBookings() {
  const [bookings, setBookings] = useState<MealBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const data = await api.get(`/bookings/user/${user?.id}`);
      setBookings(data.bookings || data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch bookings' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    setCancellingId(bookingId);
    try {
      await api.delete(`/bookings/${bookingId}`);
      toast({ title: 'Booking Cancelled', description: 'Your booking has been cancelled successfully' });
      fetchBookings();
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to cancel booking' });
    } finally {
      setCancellingId(null);
    }
  };

  const getMealIcon = (mealType: MealType) => {
    switch (mealType) {
      case 'breakfast': return <Coffee className="h-5 w-5" />;
      case 'lunch': return <Sun className="h-5 w-5" />;
      case 'dinner': return <Moon className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMealGradient = (mealType: MealType) => {
    switch (mealType) {
      case 'breakfast': return 'gradient-warning';
      case 'lunch': return 'gradient-primary';
      case 'dinner': return 'gradient-accent';
    }
  };

  const filteredBookings = bookings.filter((booking) => statusFilter === 'all' || booking.status === statusFilter);

  const canCancel = (booking: MealBooking) => {
    return !isBefore(new Date(booking.date), startOfDay(new Date())) && booking.status !== 'cancelled' && booking.status !== 'completed';
  };

  return (
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Bookings</h1>
            <p className="text-muted-foreground">View and manage your meal reservations</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]"><SelectValue placeholder="Filter status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
        ) : filteredBookings.length === 0 ? (
          <Card className="card-shadow">
            <CardContent className="py-12">
              <div className="text-center">
                <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl font-medium">No bookings found</p>
                <p className="text-muted-foreground mt-1">
                  {statusFilter === 'all' ? "You haven't made any meal bookings yet" : `No ${statusFilter} bookings found`}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="card-shadow hover:card-shadow-lg transition-all animate-fade-in">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-white ${getMealGradient(booking.meal_type)}`}>
                        {getMealIcon(booking.meal_type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg capitalize">{booking.meal_type}</CardTitle>
                        <CardDescription>{format(new Date(booking.date), 'EEEE')}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">{format(new Date(booking.date), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Booking ID</span>
                      <span className="font-mono text-xs">{String(booking.id).slice(0, 8)}...</span>
                    </div>
                    {canCancel(booking) && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full mt-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                            {cancellingId === booking.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <X className="h-4 w-4 mr-2" />}Cancel Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to cancel your {booking.meal_type} booking for {format(new Date(booking.date), 'MMMM d, yyyy')}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancelBooking(booking.id)} className="bg-destructive hover:bg-destructive/90">Cancel Booking</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
