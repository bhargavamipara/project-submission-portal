import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

// Auth
import Login from "@/pages/auth/Login";

// Admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import MenuManagement from "@/pages/admin/MenuManagement";
import Reports from "@/pages/admin/Reports";

// Staff
import StaffDashboard from "@/pages/staff/StaffDashboard";
import Attendance from "@/pages/staff/Attendance";

// Student
import StudentDashboard from "@/pages/student/StudentDashboard";
import BookMeal from "@/pages/student/BookMeal";
import MyBookings from "@/pages/student/MyBookings";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function RoleBasedRedirect() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  switch (role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'staff':
      return <Navigate to="/staff" replace />;
    case 'student':
      return <Navigate to="/student" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
}

function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect based on role */}
      <Route path="/" element={<RoleBasedRedirect />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/menu" element={<MenuManagement />} />
      <Route path="/admin/reports" element={<Reports />} />

      {/* Staff Routes */}
      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/staff/attendance" element={<Attendance />} />

      {/* Student Routes */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route path="/student/book" element={<BookMeal />} />
      <Route path="/student/bookings" element={<MyBookings />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
