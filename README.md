# DriveEase - Driving School Management System

## Overview

DriveEase is a modern Driving School Management System designed to streamline the management of students, instructors, vehicles, training schedules, attendance, and payments.

The system provides administrators with a centralized dashboard to efficiently manage day-to-day driving school operations.

---

## Features

### Authentication & Authorization

* Secure Login
* Role-based Access Control
* JWT Authentication
* Protected Routes

### Student Management

* Add New Students
* Edit Student Information
* View Student Profiles
* Student Status Management
* Course Package Assignment

### Driver Management

* Driver Registration
* License Tracking
* Experience Management
* Availability Tracking
* Driver Status Monitoring

### Vehicle Management

* Vehicle Registration
* Vehicle Availability Management
* Insurance Expiry Tracking
* RC Expiry Tracking
* Pollution Certificate Tracking

### Training Schedule Management

* Schedule Driving Sessions
* Assign Students
* Assign Drivers
* Assign Vehicles
* Session Tracking

### Attendance Management

* Mark Attendance
* Track Student Progress
* Attendance History

### Payment Management

* Payment Recording
* Balance Tracking
* Payment Status Monitoring
* Payment History

### Dashboard Analytics

* Total Students
* Total Drivers
* Total Vehicles
* Scheduled Trainings
* Revenue Summary
* Attendance Reports

---

## Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* React Icons
* Axios

### Backend

* Node.js
* Express.js
* Prisma ORM
* JWT Authentication
* bcrypt

### Database

* PostgreSQL

---

## Project Structure

```text
DriveEase
│
├── frontend
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── Sidebar.jsx
│   │   │   ├── TopNavbar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages
│   │   │   ├── auth
│   │   │   ├── dashboard
│   │   │   ├── students
│   │   │   ├── drivers
│   │   │   ├── vehicles
│   │   │   └── payments
│   │   │
│   │   ├── services
│   │   ├── routes
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── prisma
│   │   ├── schema.prisma
│   │   ├── migrations
│   │   └── seed.js
│   │
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── services
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Database Models

### User

* Authentication
* Role Management

### Student

* Personal Information
* Course Details
* Learning License Information

### Driver

* Instructor Details
* License Information
* Experience Tracking

### Vehicle

* Vehicle Information
* Registration Details
* Availability Status

### TrainingSchedule

* Student Assignment
* Driver Assignment
* Vehicle Assignment

### Attendance

* Session Attendance
* Attendance Status

### Payment

* Payment Tracking
* Balance Management

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/driveease.git
cd driveease
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/driveease"
JWT_SECRET="your-secret-key"
PORT=5000
```

Run Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

Start Backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend

npm install
```

Start Frontend

```bash
npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/login
POST /api/auth/register
```

### Students

```http
GET    /api/students
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
```

### Drivers

```http
GET    /api/drivers
POST   /api/drivers
PUT    /api/drivers/:id
DELETE /api/drivers/:id
```

### Vehicles

```http
GET    /api/vehicles
POST   /api/vehicles
PUT    /api/vehicles/:id
DELETE /api/vehicles/:id
```

### Training Schedules

```http
GET    /api/training-schedules
POST   /api/training-schedules
PUT    /api/training-schedules/:id
DELETE /api/training-schedules/:id
```

### Attendance

```http
GET    /api/attendance
POST   /api/attendance
```

### Payments

```http
GET    /api/payments
POST   /api/payments
```

---

## Future Enhancements

* Calendar View
* Email Notifications
* SMS Reminders
* Student Portal
* Instructor Mobile App
* Online Payments
* Driving Test Management
* Certificate Generation
* Advanced Analytics
* Export Reports (PDF/Excel)

---

## Author

Developed as a full-stack MERN + PostgreSQL + Prisma project for learning and production-ready driving school management.

Project Name: DriveEase
Version: 1.0.0
License: MIT
