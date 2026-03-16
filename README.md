# 🍽️ DineFlow - Dining Hall Management System

A full-stack web application for managing university dining hall operations with role-based access control.

## Architecture

```
React (Frontend) → Express REST API (Backend) → MySQL Database
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS, shadcn/ui, Vite |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Authentication | JWT (jsonwebtoken) + bcryptjs |
| Reports | jsPDF, SheetJS (xlsx) |

## Project Structure

```
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   ├── db.js           # MySQL connection pool
│   │   └── schema.sql      # Database schema
│   ├── controllers/        # Route handlers
│   ├── middleware/          # JWT auth & role middleware
│   ├── models/             # Database models
│   ├── routes/             # API route definitions
│   ├── server.js           # Express app entry point
│   └── package.json
│
├── src/                    # Frontend (React)
│   ├── components/         # Reusable UI components
│   ├── hooks/              # Custom hooks (useAuth)
│   ├── lib/                # API utility (api.ts)
│   ├── pages/              # Page components
│   │   ├── auth/           # Login page
│   │   ├── admin/          # Admin dashboard, users, menu, reports
│   │   ├── staff/          # Staff dashboard, attendance
│   │   └── student/        # Student dashboard, book meal, bookings
│   └── types/              # TypeScript type definitions
```

## Setup Instructions

### 1. Database Setup (MySQL)

```bash
mysql -u root -p
source server/config/schema.sql
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MySQL credentials and JWT secret
npm run dev
```

Server runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

## Default Admin Login

- **Email:** admin@dineflow.com
- **Password:** admin123

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (JWT) |

### Users (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Menu Items
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Get all items (JWT) |
| POST | `/api/menu` | Create item (Admin) |
| PUT | `/api/menu/:id` | Update item (Admin) |
| DELETE | `/api/menu/:id` | Delete item (Admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/bookings` | Get all (Admin/Staff) |
| GET | `/api/bookings/user/:id` | Get user bookings (JWT) |
| POST | `/api/bookings` | Create booking (Student) |
| DELETE | `/api/bookings/:id` | Cancel booking (JWT) |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance` | Get all records (Admin/Staff) |
| POST | `/api/attendance` | Mark attendance (Admin/Staff) |
| PUT | `/api/attendance/:id` | Update record (Admin/Staff) |

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
