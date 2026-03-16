import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import {
  Coffee, Sun, Moon, Loader2, Check, UtensilsCrossed,
} from 'lucide-react';
import { format, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { MealType, MenuItem } from '@/types/database';

export default function BookMeal() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMealType, setSelectedMealType] = useState<MealType>('breakfast');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [existingBooking, setExistingBooking] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchMenuItems();
    checkExistingBooking();
  }, [selectedMealType, selectedDate, user]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const data = await api.get('/menu');
      const items = data.menu_items || data || [];
      setMenuItems(items.filter((i: MenuItem) => i.meal_type === selectedMealType && i.availability));
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkExistingBooking = async () => {
    if (!user) return;
    try {
      const data = await api.get(`/bookings/user/${user.id}`);
      const bookings = data.bookings || data || [];
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      setExistingBooking(bookings.some((b: any) => b.date === dateStr && b.meal_type === selectedMealType));
    } catch (error) {
      console.error('Error checking existing booking:', error);
    }
  };

  const handleBookMeal = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to book a meal' });
      return;
    }
    if (isBefore(startOfDay(selectedDate), startOfDay(new Date()))) {
      toast({ variant: 'destructive', title: 'Invalid Date', description: 'Cannot book meals for past dates' });
      return;
    }
    if (existingBooking) {
      toast({ variant: 'destructive', title: 'Already Booked', description: 'You already have a booking for this meal type on this date' });
      return;
    }

    setBooking(true);
    try {
      await api.post('/bookings', {
        user_id: user.id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        meal_type: selectedMealType,
        menu_item_id: selectedMenuItem,
        status: 'confirmed',
      });

      toast({ title: 'Success!', description: `Your ${selectedMealType} has been booked for ${format(selectedDate, 'MMMM d, yyyy')}` });
      setExistingBooking(true);
      setSelectedMenuItem(null);
    } catch (error: any) {
      console.error('Error booking meal:', error);
      toast({ variant: 'destructive', title: 'Booking Failed', description: error.message || 'Failed to book meal' });
    } finally {
      setBooking(false);
    }
  };

  const mealTypes: { value: MealType; label: string; icon: typeof Coffee; time: string }[] = [
    { value: 'breakfast', label: 'Breakfast', icon: Coffee, time: '7:00 AM - 9:00 AM' },
    { value: 'lunch', label: 'Lunch', icon: Sun, time: '12:00 PM - 2:00 PM' },
    { value: 'dinner', label: 'Dinner', icon: Moon, time: '7:00 PM - 9:00 PM' },
  ];

  const isPastDate = isBefore(startOfDay(selectedDate), startOfDay(new Date()));

  return (
    <DashboardLayout allowedRoles={['student']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Book a Meal</h1>
          <p className="text-muted-foreground">Reserve your meal for a specific date</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <Card className="card-shadow">
              <CardHeader><CardTitle className="text-lg">Select Date</CardTitle></CardHeader>
              <CardContent>
                <Calendar mode="single" selected={selectedDate} onSelect={(date) => date && setSelectedDate(date)} disabled={(date) => isBefore(date, startOfDay(new Date()))} className="rounded-md border pointer-events-auto" />
              </CardContent>
            </Card>
            <Card className="card-shadow">
              <CardHeader><CardTitle className="text-lg">Select Meal Type</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {mealTypes.map((meal) => (
                  <button key={meal.value} onClick={() => setSelectedMealType(meal.value)}
                    className={cn('w-full flex items-center gap-4 p-4 rounded-lg border transition-all',
                      selectedMealType === meal.value ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}>
                    <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg',
                      selectedMealType === meal.value ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground')}>
                      <meal.icon className="h-5 w-5" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium">{meal.label}</p>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                    {selectedMealType === meal.value && <Check className="h-5 w-5 text-primary" />}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className={cn('card-shadow', existingBooking && 'border-yellow-500')}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-muted-foreground capitalize">{selectedMealType}</p>
                  </div>
                  {existingBooking ? (
                    <Badge className="bg-yellow-100 text-yellow-800">Already Booked</Badge>
                  ) : isPastDate ? (
                    <Badge variant="secondary">Past Date</Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800">Available</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="card-shadow">
              <CardHeader><CardTitle>Menu Preview</CardTitle><CardDescription>Available {selectedMealType} items for {format(selectedDate, 'MMM d')}</CardDescription></CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : menuItems.length === 0 ? (
                  <div className="text-center py-8">
                    <UtensilsCrossed className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No menu items available for {selectedMealType}</p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {menuItems.map((item) => (
                      <button key={item.id} onClick={() => setSelectedMenuItem(selectedMenuItem === item.id ? null : item.id)}
                        className={cn('p-4 rounded-lg border text-left transition-all',
                          selectedMenuItem === item.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50')}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <Badge variant="outline" className="mt-1">{item.category}</Badge>
                            {item.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>}
                          </div>
                          <span className="font-bold text-primary">₹{item.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Button onClick={handleBookMeal} disabled={booking || existingBooking || isPastDate} className="w-full gradient-primary hover:opacity-90 h-12 text-lg">
              {booking ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : existingBooking ? 'Already Booked' : isPastDate ? 'Cannot Book Past Dates' : <><Check className="h-5 w-5 mr-2" />Confirm Booking</>}
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
