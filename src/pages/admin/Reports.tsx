import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCard } from '@/components/shared/StatsCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  CalendarIcon,
  FileText,
  FileSpreadsheet,
  Download,
  Loader2,
  CalendarCheck,
  UserCheck,
  UserX,
} from 'lucide-react';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { cn } from '@/lib/utils';
import { MealType, MealBooking, Attendance } from '@/types/database';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

interface ReportData {
  totalBookings: number;
  attended: number;
  absent: number;
  bookings: (MealBooking & { attendance?: Attendance; profile?: { full_name: string; email: string } })[];
}

export default function Reports() {
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()));
  const [mealType, setMealType] = useState<string>('all');
  const [reportData, setReportData] = useState<ReportData>({
    totalBookings: 0,
    attended: 0,
    absent: 0,
    bookings: [],
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReportData();
  }, [startDate, endDate, mealType]);

  const fetchReportData = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('meal_bookings')
        .select(`
          *,
          profiles (full_name, email),
          attendance (*)
        `)
        .gte('date', format(startDate, 'yyyy-MM-dd'))
        .lte('date', format(endDate, 'yyyy-MM-dd'))
        .order('date', { ascending: false });

      if (mealType !== 'all') {
        query = query.eq('meal_type', mealType as MealType);
      }

      const { data, error } = await query;

      if (error) throw error;

      const bookings = data || [];
      const attended = bookings.filter(
        (b: any) => b.attendance && b.attendance.length > 0 && b.attendance[0].status === 'present'
      ).length;
      const absent = bookings.filter(
        (b: any) => b.attendance && b.attendance.length > 0 && b.attendance[0].status === 'absent'
      ).length;

      setReportData({
        totalBookings: bookings.length,
        attended,
        absent,
        bookings: bookings.map((b: any) => ({
          ...b,
          attendance: b.attendance?.[0],
          profile: b.profiles,
        })) as any,
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch report data',
      });
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = 'Dining Hall Report';
    const dateRange = `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;

    doc.setFontSize(20);
    doc.text(title, 20, 20);

    doc.setFontSize(12);
    doc.text(`Date Range: ${dateRange}`, 20, 35);
    doc.text(`Meal Type: ${mealType === 'all' ? 'All' : mealType}`, 20, 45);

    doc.setFontSize(14);
    doc.text('Summary', 20, 60);

    doc.setFontSize(12);
    doc.text(`Total Bookings: ${reportData.totalBookings}`, 20, 72);
    doc.text(`Attended: ${reportData.attended}`, 20, 82);
    doc.text(`Absent: ${reportData.absent}`, 20, 92);

    // Table headers
    let y = 110;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Date', 20, y);
    doc.text('Student', 60, y);
    doc.text('Meal Type', 120, y);
    doc.text('Status', 160, y);

    doc.setFont('helvetica', 'normal');
    y += 10;

    reportData.bookings.slice(0, 20).forEach((booking) => {
      doc.text(format(new Date(booking.date), 'MMM d, yyyy'), 20, y);
      doc.text(booking.profile?.full_name || booking.profile?.email || 'N/A', 60, y);
      doc.text(booking.meal_type, 120, y);
      doc.text(booking.attendance?.status || booking.status, 160, y);
      y += 8;
    });

    doc.save(`dining-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    toast({ title: 'Success', description: 'PDF exported successfully' });
  };

  const exportToExcel = () => {
    const data = reportData.bookings.map((booking) => ({
      Date: format(new Date(booking.date), 'MMM d, yyyy'),
      Student: booking.profile?.full_name || booking.profile?.email || 'N/A',
      'Meal Type': booking.meal_type,
      'Booking Status': booking.status,
      'Attendance Status': booking.attendance?.status || 'Not Marked',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, `dining-report-${format(new Date(), 'yyyy-MM-dd')}.xlsx`);
    toast({ title: 'Success', description: 'Excel exported successfully' });
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Student', 'Meal Type', 'Booking Status', 'Attendance Status'];
    const rows = reportData.bookings.map((booking) => [
      format(new Date(booking.date), 'yyyy-MM-dd'),
      booking.profile?.full_name || booking.profile?.email || 'N/A',
      booking.meal_type,
      booking.status,
      booking.attendance?.status || 'Not Marked',
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
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout allowedRoles={['admin']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and export dining hall reports</p>
        </div>

        {/* Filters */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>Select date range and meal type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(startDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-[200px] justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(endDate, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Meal Type</Label>
                <Select value={mealType} onValueChange={setMealType}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
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

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Total Bookings"
            value={reportData.totalBookings}
            icon={<CalendarCheck className="h-6 w-6" />}
            gradient="primary"
          />
          <StatsCard
            title="Attended"
            value={reportData.attended}
            icon={<UserCheck className="h-6 w-6" />}
            gradient="success"
          />
          <StatsCard
            title="Absent"
            value={reportData.absent}
            icon={<UserX className="h-6 w-6" />}
            gradient="warning"
          />
        </div>

        {/* Export Buttons */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Export Report</CardTitle>
            <CardDescription>Download the report in your preferred format</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={exportToPDF} className="gap-2">
                <FileText className="h-4 w-4" />
                Export PDF
              </Button>
              <Button onClick={exportToExcel} variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Export Excel
              </Button>
              <Button onClick={exportToCSV} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>
              Showing {reportData.bookings.length} bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : reportData.bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No bookings found for the selected filters
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead>Meal Type</TableHead>
                      <TableHead>Booking Status</TableHead>
                      <TableHead>Attendance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          {format(new Date(booking.date), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell>
                          {booking.profile?.full_name || booking.profile?.email || 'N/A'}
                        </TableCell>
                        <TableCell className="capitalize">{booking.meal_type}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getStatusColor(
                              booking.attendance?.status || 'pending'
                            )}
                          >
                            {booking.attendance?.status || 'Not Marked'}
                          </Badge>
                        </TableCell>
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
