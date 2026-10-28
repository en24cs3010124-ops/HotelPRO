# HotelPro / Roomly - Complete Hotel Booking & Management Solution

A full-stack Hotel Management & Room Reservation platform built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). 

Designed to streamline hotel operations with secure multi-role authentication, real-time room availability, interactive booking workflows with simulated card payments, reservation cancellation, and comprehensive administrative oversight.

---

## 🏗️ Project Architecture & Tech Stack

- **Frontend (`/client`)**: React 18 (Vite), React Router v6, Bootstrap 5, Axios, CSS Modules.
- **Backend (`/server`)**: Node.js, Express.js (MVC Pattern), Mongoose, JSON Web Tokens (JWT), Bcrypt.js, CORS, Dotenv.
- **Database**: MongoDB (Collections: `users`, `rooms`, `Booking`).

### MVC Pattern
- **Model Layer (`server/models/`)**: `userModel.js`, `roomModel.js`, `bookingModel.js`
- **Controller Layer (`server/controllers/`)**: `userController.js`, `roomController.js`, `bookingController.js`
- **View / Routing Layer (`server/routes/`)**: `userRoute.js`, `roomRoute.js`, `bookingRoute.js`

---

## 👥 Roles & Capabilities

### 1. Ordinary User / Customer
- **Registration & Authentication**: Sign up with name, email, password, phone, and login with JWT session.
- **Browse & Filter**: Browse rooms, filter by arrival/departure dates and room types (Delux, Ordinary).
- **Book a Room**: Select room, compute total rent based on days, input payment/card details, and book instantly.
- **My Bookings History**: View active and cancelled reservations, booking IDs, total amount, and cancel active reservations.

### 2. Administrator
- **Admin Dashboard**: Tab-based management interface matching the specification screenshots:
  1. **ALL BOOKINGS**: View all customer reservations with status indicators (`BOOKED` / `CANCELLED`) and cancellation control.
  2. **ALL ROOMS**: View system room inventory, room numbers, capacities, rent/day, and type badges.
  3. **ADD ROOM**: Add new rooms with capacity, rent, 3 photo URLs, room type (Delux / Non-Delux), and description.
  4. **ALL USER**: View registered users, contact numbers, and role badges (`Admin` / `Ordinary`).

---

## 🚀 Quick Start Guide

### Step 1: Backend Setup (Express Server)

1. Open your terminal and navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the environment variables in `.env` (already created with default configuration):
   ```env
   PORT=8001
   MONGO_URI=mongodb://127.0.0.1:27017/hotel
   JWT_SECRET=hotelpro_super_secret_jwt_key_2026
   CLIENT_URL=http://localhost:5173
   ```
4. (Optional) Seed initial demo data matching the screenshots:
   ```bash
   npm run seed
   ```
5. Start the backend server:
   ```bash
   npm start
   # or with nodemon:
   npm run dev
   ```
   *The server runs on `http://localhost:8001`.*

---

### Step 2: Frontend Setup (React Application)

1. Open a new terminal tab and navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *The client runs on `http://localhost:5173`.*

---

## 🔑 Default Credentials for Testing

| Role | Name | Email | Password | Phone |
| :--- | :--- | :--- | :--- | :--- |
| **Admin** | `sun` | `s@gmai.com` | `admin123` | `9704927807` |
| **Admin** | `tousif` | `tousif@gmail.com` | `admin123` | `9704927891` |
| **Ordinary** | `sid` | `sid@gmail.com` | `password123` | `9704927807` |
| **Ordinary** | `rohan` | `rohan3@gmail.com` | `password123` | `9704927800` |

*(You can also click the "Fill Admin" or "Fill Ordinary User" quick buttons on the Login page for one-click access).*

---

## 📡 API Endpoints Reference

### Authentication & Users
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/SignUp` or `/user/SignUp` | Register a new user | Public |
| `POST` | `/Login` or `/user/Login` | Authenticate user & issue JWT | Public |
| `GET` | `/allusers` or `/user/allusers` | Fetch all registered users | Admin |

### Rooms
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/getallrooms` or `/room/getallrooms` | List all available rooms | Public |
| `POST` | `/addroom` or `/room/addroom` | Create a new hotel room | Admin |
| `GET` | `/getroombyid/:id` | Get details of a single room | Public |

### Bookings
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/bookroom` or `/booking/bookroom` | Book a room with card details | Authenticated |
| `POST` | `/cancelbooking` or `/booking/cancelbooking` | Cancel an existing booking | Authenticated / Admin |
| `GET` | `/getallbookings` or `/booking/getallbookings` | List all bookings | Admin |
| `POST` | `/getbookingsbyuserid` | List bookings for a specific user | Authenticated |

---

## 📁 Project Directory Tree

```
HotelPro/
├── README.md
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       ├── services/
│       │   └── api.js
│       └── components/
│           ├── common/
│           │   ├── Navbar.jsx
│           │   ├── Footer.jsx
│           │   ├── Home.jsx
│           │   ├── Login.jsx
│           │   ├── SignUp.jsx
│           │   ├── About.jsx
│           │   ├── AuthIllustration.jsx
│           │   └── ProtectedRoute.jsx
│           ├── user/
│           │   ├── UserHome.jsx
│           │   ├── GetRooms.jsx
│           │   ├── BookingHistory.jsx
│           │   └── BookingStatus.jsx
│           └── admin/
│               ├── AdminHome.jsx
│               ├── AllBookings.jsx
│               ├── AllRooms.jsx
│               ├── AddRoom.jsx
│               └── AllUsers.jsx
└── server/
    ├── package.json
    ├── server.js
    ├── seed.js
    ├── .env
    ├── .env.example
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── userController.js
    │   ├── roomController.js
    │   └── bookingController.js
    ├── middlewares/
    │   └── fetchUser.js
    ├── models/
    │   ├── userModel.js
    │   ├── roomModel.js
    │   └── bookingModel.js
    └── routes/
        ├── userRoute.js
        ├── roomRoute.js
        └── bookingRoute.js
```
