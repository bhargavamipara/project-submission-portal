export type AppRole = 'admin' | 'staff' | 'student';
export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type AttendanceStatus = 'present' | 'absent';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  created_at: string;
}

export interface MenuItem {
  id: string;
  meal_type: MealType;
  name: string;
  category: string;
  description: string | null;
  price: number;
  quantity: number;
  availability: boolean;
  created_at: string;
  updated_at: string;
}

export interface MealBooking {
  id: string;
  user_id: string;
  menu_item_id: string | null;
  date: string;
  meal_type: MealType;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  // Joined data
  profiles?: Profile;
  menu_items?: MenuItem;
}

export interface Attendance {
  id: string;
  booking_id: string;
  status: AttendanceStatus;
  marked_by: string | null;
  marked_at: string;
  // Joined data
  meal_bookings?: MealBooking;
}

export interface UserWithRole extends Profile {
  user_roles: UserRole[];
}
