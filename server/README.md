# DineFlow Backend - Node.js / Express / MySQL

## Architecture
```
React (Frontend) → Express REST API → MySQL Database
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your MySQL credentials and JWT secret
```

### 3. Create MySQL Database
```bash
mysql -u root -p < config/schema.sql
```

### 4. Start the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | JWT |

### Users (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Menu Items
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/menu` | Get all items | JWT |
| GET | `/api/menu/:id` | Get item by ID | JWT |
| POST | `/api/menu` | Create item | Admin |
| PUT | `/api/menu/:id` | Update item | Admin |
| DELETE | `/api/menu/:id` | Delete item | Admin |

### Bookings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/bookings` | Get all bookings | Admin/Staff |
| GET | `/api/bookings/user/:id` | Get user bookings | JWT |
| POST | `/api/bookings` | Create booking | Student |
| PUT | `/api/bookings/:id` | Update booking | JWT |
| DELETE | `/api/bookings/:id` | Cancel booking | JWT |

### Attendance
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/attendance` | Get all records | Admin/Staff |
| POST | `/api/attendance` | Mark attendance | Admin/Staff |
| PUT | `/api/attendance/:id` | Update record | Admin/Staff |

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL with mysql2 driver
- **Auth**: JWT (jsonwebtoken) + bcryptjs
- **CORS**: Enabled for frontend integration
