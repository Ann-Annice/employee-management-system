# Employee Management System

A Full Stack Employee Management System built as a hiring assignment using Next.js, Node.js, Express.js, PostgreSQL, Prisma, and JWT Authentication.

## Live Demo

Frontend:
https://employee-management-system-chi-gules-50.vercel.app/

Backend API:
https://employee-management-system-production-e08b.up.railway.app

---

## Demo Credentials

### Super Admin

Email:
admin@test.com

Password:
123456

### HR Manager

Email:
zayn@test.com

Password:
123456

### Employee

Email:
kate@test.com

Password:
123456

## 🎥 Demo Video

Watch the complete project demonstration here:

**Google Drive:**  
https://drive.google.com/file/d/1yLiQLr8FmHdWfmIGylca5H-farBRL9_u/view?usp=sharing

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

### Deployment
- Vercel (Frontend)
- Railway (Backend)

---

# Features

## Authentication

- Login
- Logout
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes

---

## Role Based Access Control

### Super Admin

- Dashboard
- Employee CRUD
- Department CRUD
- Assign Managers
- Delete Employees
- View Organization Tree

### HR Manager

- Employee CRUD
- Department CRUD
- View Organization Tree

### Employee

- View Profile
- Edit Own Profile
- Dashboard Access

---

## Dashboard

- Total Employees
- Active Employees
- Inactive Employees
- Total Departments
- Employee Statistics Chart
- Dark Mode

---

## Employee Management

- Create Employee
- Edit Employee
- Delete Employee (Soft Delete)
- View Employee
- Upload Profile Image
- Search Employees
- Filter Employees
- Sort Employees
- Pagination

---

## Department Management

- Create Department
- Edit Department
- Delete Department
- View Departments

---

## Organization Hierarchy

- Assign Reporting Manager
- Organization Tree
- View Direct Reportees
- Circular Reporting Prevention

---

## CSV Features

- Import Employees from CSV
- Export Employees to CSV

---

## Validation

Frontend Validation

Backend Validation

- Email
- Phone
- Salary
- Required Fields

---

## API Endpoints

### Authentication

POST /api/auth/login

POST /api/auth/logout

---

### Employees

GET /api/employees

POST /api/employees

PUT /api/employees/:id

DELETE /api/employees/:id

PATCH /api/employees/:id/manager

GET /api/employees/:id/reportees

---

### Departments

GET /api/departments

POST /api/departments

PUT /api/departments/:id

DELETE /api/departments/:id

---

### Organization

GET /api/organization/tree

---

## Installation

Clone the repository

```bash
git clone https://github.com/Ann-Annice/employee-management-system.git
```

Install dependencies

```bash
npm install
```

Run the frontend

```bash
npm run dev
```

Run the backend

```bash
npm run dev
```

---

## Environment Variables

Backend

```
DATABASE_URL=
JWT_SECRET=
PORT=
```

Frontend

```
NEXT_PUBLIC_API_URL=
```

---

## Bonus Features

- Pagination
- Soft Delete
- CSV Import
- CSV Export
- Dashboard Charts
- Dark Mode

---

## Author

Ann Annice

Full Stack Developer Hiring Assignment