import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  CalendarIcon, FileText, FileSpreadsheet, Download, Loader2, CalendarCheck, UserCheck, UserX,
} from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { MealType } from '@/types/database';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface ReportBooking {
  id: string;
  date: string;
  meal_type: MealType;
  status: string;
  full_name?: string;
  email?: string;
  attendance_status?: string;
}

export default function Reports() {
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()));
  const [mealType, setMealType] = useState<string>('all');
  const [bookings, setBookings] = useState<ReportBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => { fetchReportData(); }, [startDate, endDate, mealType]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const data = await api.get('/bookings/user/all');
      let allBookings: ReportBooking[] = data.bookings || data || [];

      // Filter by date range
      allBookings = allBookings.filter((b) => {
        const d = b.date;
        return d >= format(startDate, 'yyyy-MM-dd') && d <= format(endDate, 'yyyy-MM-dd');
      });

      if (mealType !== 'all') {
        allBookings = allBookings.filter((b) => b.meal_type === mealType);
      }

      setBookings(allBookings);
    } catch (error) {
      console.error('Error fetching report data:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to fetch report data' });
    } finally {
      setLoading(false);
    }
  };

  const attended = bookings.filter((b) => b.attendance_status === 'present').length;
  const absent = bookings.filter((b) => b.attendance_status === 'absent').length;

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Dining Hall Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Date Range: ${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`, 20, 35);
    doc.text(`Total Bookings: ${bookings.length}`, 20, 50);
    doc.text(`Attended: ${attended}`, 20, 60);
    doc.text(`Absent: ${absent}`, 20, 70);

    let y = 90;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Date', 20, y); doc.text('Student', 60, y); doc.text('Meal', 120, y); doc.text('Status', 160, y);
    doc.setFont('helvetica', 'normal');
    y += 10;
    bookings.slice(0, 20).forEach((b) => {
      doc.text(format(new Date(b.date), 'MMM d, yyyy'), 20, y);
      doc.text(b.full_name || b.email || 'N/A', 60, y);
      doc.text(b.meal_type, 120, y);
      doc.text(b.attendance_status || b.status, 160, y);
      y += 8;
    });
    doc.save(`dining-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    toast({ title: 'Success', description: 'PDF exported successfully' });
  };

  const exportToExcel = () => {
    const data = bookings.map((b) => ({
      Date: format(new Date(b.date), 'MMM d, yyyy'),
      Student: b.full_name || b.email || 'N/A',
      'Meal Type': b.meal_type,
      'Booking Status': b.status,
      'Attendance': b.attendance_status || 'Not Marked',
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, `dining-report-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    toast({ title: 'Success', description: 'Excel exported successfully' });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Student', 'Meal Type', 'Booking Status', 'Attendance'];
    const rows = bookings.map((b) => [
      format(new Date(b.date), 'yyyy-MM-dd'), b.full_name || b.email || 'N/A',
      b.meal_type, b.status, b.attendance_status || 'Not Marked',
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `dining-report-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    toast({ title: 'Success', description: 'CSV exported successfully' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and export dining hall reports</p>
        </div>

        <Card className="card-shadow">
          <CardHeader><CardTitle>Report Filters</CardTitle><CardDescription>Select date range and meal type</CardDescription></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start"><CalendarIcon className="mr-2 h-4 w-4" />{format(startDate, 'PPP')}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={(date) => date && setStartDate(date)} className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start"><CalendarIcon className="mr-2 h-4 w-4" />{format(endDate, 'PPP')}</Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={(date) => date && setEndDate(date)} className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Meal Type</Label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Meals</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard title="Total Bookings" value={bookings.length} icon={<CalendarCheck className="h-6 w-6" />} gradient="primary" />
          <StatsCard title="Attended" value={attended} icon={<UserCheck className="h-6 w-6" />} gradient="success" />
          <StatsCard title="Absent" value={absent} icon={<UserX className="h-6 w-6" />} gradient="warning" />
        </div>

        <Card className="card-shadow">
          <CardHeader><CardTitle>Export Report</CardTitle><CardDescription>Download the report in your preferred format</CardDescription></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={exportToPDF} className="gap-2"><FileText className="h-4 w-4" />Export PDF</Button>
              <Button onClick={exportToExcel} variant="outline" className="gap-2"><FileSpreadsheet className="h-4 w-4" />Export Excel</Button>
              <Button onClick={exportToCSV} variant="outline" className="gap-2"><Download className="h-4 w-4" />Export CSV</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader><CardTitle>Booking Details</CardTitle><CardDescription>Showing {bookings.length} bookings</CardDescription></CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No bookings found for the selected filters</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead><TableHead>Student</TableHead><TableHead>Meal Type</TableHead><TableHead>Booking Status</TableHead><TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>{format(new Date(booking.date), 'MMM d, yyyy')}</TableCell>
                        <TableCell>{booking.full_name || booking.email || 'N/A'}</TableCell>
                        <TableCell className="capitalize">{booking.meal_type}</TableCell>
                        <TableCell><Badge className={getStatusColor(booking.status)}>{booking.status}</Badge></TableCell>
                        <TableCell><Badge className={getStatusColor(booking.attendance_status || 'pending')}>{booking.attendance_status || 'Not Marked'}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
