# Employee Management System Backend

## Overview

Employee Management System is a REST API built using Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL. It provides authentication, employee management, organization hierarchy, and reporting manager functionality.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Supabase)
- JWT Authentication
- bcrypt
- Zod Validation

---

## Features

- Employee Registration
- Employee Login
- JWT Authentication
- Logout API
- Employee CRUD Operations
- Search Employees
- Pagination
- Organization Tree
- Assign Reporting Manager
- Get Employee Reportees

---

## Installation

### Clone the repository

```bash
git clone <your-github-repository-url>
```

### Go to project

```bash
cd employee-management-system/backend
```

### Install dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=development
```

### Run the server

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/logout |

### Employees

| Method | Endpoint |
|---------|----------|
| GET | /api/employees |
| GET | /api/employees/:id |
| PUT | /api/employees/:id |
| DELETE | /api/employees/:id |

### Organization

| Method | Endpoint |
|---------|----------|
| GET | /api/employees/organization/tree |
| GET | /api/employees/:id/reportees |
| PATCH | /api/employees/:id/manager |

---

## Project Structure

```
backend
├── prisma
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── utils
│   ├── validations
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Author

Ann Annice