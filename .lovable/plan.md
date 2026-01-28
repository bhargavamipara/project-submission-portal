

# 🍽️ Dining Hall Management System - Implementation Plan

## Overview
A full-stack university dining hall management application with role-based access for **Admin**, **Staff**, and **Student** users.

---

## 🎨 Design System
- **Color Palette**: Vibrant gradients (orange-to-red primary, teal accents, soft purples)
- **Layout**: Card-based with rounded corners and subtle shadows
- **Animations**: Smooth transitions, hover effects, fade-ins
- **Typography**: Clean, modern fonts with clear hierarchy
- **Responsive**: Mobile-first approach, works on all devices

---

## 🔐 Phase 1: Authentication System

### Login Page
- Clean, centered login card with gradient header
- Email/password fields
- Role selector dropdown (Admin, Staff, Student)
- Animated login button
- Error handling with toast notifications

### Protected Routes
- Role-based route guards
- Automatic redirect based on user role
- Session persistence

---

## 🗄️ Phase 2: Database Structure (Supabase)

### Tables

| Table | Fields | Purpose |
|-------|--------|---------|
| `profiles` | id, email, full_name, avatar_url, created_at | User information |
| `user_roles` | id, user_id, role (enum: admin/staff/student) | Role assignments |
| `menu_items` | id, meal_type, name, category, description, price, quantity, availability, created_at | Food menu |
| `meal_bookings` | id, user_id, menu_item_id, date, meal_type, status, created_at | Student reservations |
| `attendance` | id, booking_id, status, marked_by, marked_at | Attendance records |

### Security (RLS Policies)
- Admins: Full CRUD on all tables
- Staff: Read bookings, write attendance
- Students: Read menu, CRUD own bookings

### Helper Function
- `has_role(user_id, role)` - Security definer function to prevent RLS recursion

---

## 👨‍💼 Phase 3: Admin Module

### Admin Dashboard
- **Stats Cards**: Total Users, Today's Bookings, Menu Items, Active Staff
- Quick action buttons
- Recent activity feed
- Colorful icons and gradients

### User Management
- Data table with search & filters
- Add user modal with role assignment
- Edit/Delete functionality
- Role badges (color-coded)

### Menu Management
- Grid view of menu items by meal type
- Add/Edit menu item form
- Category tabs (Breakfast, Lunch, Dinner)
- Toggle availability

### Reports Page
- Date range picker
- Meal type filter
- Statistics display: Total Bookings, Attended, Absent
- **Export Buttons**: 
  - PDF (using jspdf)
  - Excel (using xlsx)
  - CSV (native generation)

---

## 👨‍🍳 Phase 4: Staff Module

### Attendance Marking Page
- Date selector
- Meal type tabs
- Student list with booking status
- Present/Absent toggle for each student
- Summary bar: Total | Present | Absent
- Submit button with confirmation
- Real-time updates

---

## 🎓 Phase 5: Student Module

### Student Dashboard
- Personal stats cards: Total Bookings, This Week, Pending
- Recent bookings list
- Quick book button
- Upcoming meals reminder

### Book Meal Page
- Calendar date picker (blocks past dates)
- Meal type selector with icons
- Menu preview cards
- Book confirmation with validation
- Prevents duplicate bookings

### My Bookings Page
- Bookings list with status badges
- Filter by status (All, Confirmed, Pending, Completed)
- Cancel button for upcoming bookings
- Booking details view

---

## 📊 Phase 6: UML & Database Diagrams

### Entity Relationship Diagram (ERD)
- Visual representation of all tables
- Relationships between entities
- Primary/Foreign key indicators

### Use Case Diagram
- Actor: Admin, Staff, Student
- Use cases for each role

### Class Diagram
- Main application components
- Relationships and methods

### Sequence Diagrams
- Login flow
- Booking flow
- Attendance marking flow

---

## ✅ Validations & Business Rules

1. **Booking Limits**: Max 1 booking per meal type per day per student
2. **Date Validation**: Cannot book for past dates
3. **Auto-Status Update**: Booking status updates based on attendance
4. **Real-time Sync**: Supabase real-time subscriptions for live updates
5. **Role Verification**: Server-side role checks for all protected actions

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/          # Shadcn components
│   ├── layout/      # Sidebar, Header, Navigation
│   └── shared/      # Reusable components
├── pages/
│   ├── auth/        # Login
│   ├── admin/       # Dashboard, Users, Menu, Reports
│   ├── staff/       # Attendance
│   └── student/     # Dashboard, Book, Bookings
├── hooks/           # Custom hooks (useAuth, useRole)
├── lib/             # Supabase client, utils
└── types/           # TypeScript interfaces
```

---

## 🚀 Deliverables

1. **Working Web Application** with all features
2. **Supabase Backend** fully configured
3. **Role-based Authentication** & Authorization
4. **Working Report Downloads** (PDF, Excel, CSV)
5. **Database Schema** ready for submission
6. **UML Diagrams** for academic submission

